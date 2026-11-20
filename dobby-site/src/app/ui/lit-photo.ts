import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { srcset } from '../core/image-loader';
import { onceVisible } from './reveal.directive';

/**
 * Photo « à l'heure bleue » : par défaut, elle est dans les teintes de la palette.
 * Le pointeur agit comme une lampe qui révèle les vraies couleurs ; l'interrupteur allume toute la pièce.
 * C'est la métaphore du site : la lumière, c'est Dobby qui s'occupe de la maison.
 */
@Component({
  selector: 'app-lit-photo',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lampe relative block overflow-hidden',
    '[style.--lampe-r]': 'radius()',
    '(pointermove)': 'move($event)',
    '(pointerenter)': 'hover.set(true)',
    '(pointerleave)': 'hover.set(false)',
  },
  template: `
    <img
      [ngSrc]="name() + '-nuit'"
      [ngSrcset]="sets()"
      [sizes]="sizes()"
      fill
      [priority]="priority()"
      [alt]="alt()"
      class="object-cover"
      [style.object-position]="position()"
    />
    <img
      [ngSrc]="name()"
      [ngSrcset]="sets()"
      [sizes]="sizes()"
      fill
      alt=""
      aria-hidden="true"
      class="lampe-jour object-cover"
      [style.object-position]="position()"
    />
    <ng-content />
    @if (switchable()) {
      <button type="button" class="interrupteur" [attr.aria-pressed]="on()" (click)="toggle()">
        <span class="bascule" aria-hidden="true"></span>
        <span>{{ on() ? 'Éteindre' : 'Allumer' }}<span class="sr-only"> la lumière de la photo</span></span>
      </button>
    }
  `,
  styles: `
    .interrupteur {
      position: absolute;
      left: 14px;
      bottom: 14px;
      z-index: 3;
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      padding: 0.45rem 0.85rem 0.45rem 0.5rem;
      border-radius: 999px;
      background: rgb(13 19 22 / 0.72);
      border: 1px solid rgb(157 193 207 / 0.3);
      color: var(--color-neige);
      font-size: 0.8125rem;
      font-weight: 600;
      backdrop-filter: blur(6px);
      transition: border-color 300ms var(--ease-dobby);
    }
    .interrupteur:hover {
      border-color: var(--color-givre);
    }
    .bascule {
      position: relative;
      width: 26px;
      height: 16px;
      border-radius: 999px;
      background: var(--color-orage);
      transition: background 300ms var(--ease-dobby);
    }
    .bascule::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color-lac);
      transition: transform 300ms var(--ease-dobby), background 300ms;
    }
    [aria-pressed='true'] .bascule {
      background: var(--color-givre);
    }
    [aria-pressed='true'] .bascule::after {
      transform: translateX(10px);
      background: var(--color-nuit);
    }
  `,
})
export class LitPhoto {
  readonly name = input.required<string>();
  readonly alt = input('');
  readonly sizes = input('100vw');
  readonly position = input('50% 50%');
  readonly priority = input(false);
  readonly switchable = input(true);
  /** Allumage piloté par le parent (récit au défilement) */
  readonly lit = input<boolean | undefined>(undefined);
  /** S'allume seule la première fois qu'elle est bien visible */
  readonly autoLight = input(false);

  protected readonly on = signal(false);
  protected readonly hover = signal(false);
  protected readonly sets = computed(() => srcset(this.name()));
  protected readonly radius = computed(() => (this.on() ? '170vmax' : this.hover() ? '260px' : '0px'));

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      const l = this.lit();
      if (l !== undefined) this.on.set(l);
    });
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!this.autoLight()) return;
      const stop = onceVisible(
        this.host.nativeElement,
        () => setTimeout(() => this.on.set(true), 700),
        0.6,
      );
      destroy.onDestroy(stop);
    });
  }

  protected move(e: PointerEvent) {
    if (e.pointerType === 'touch') return;
    const r = this.host.nativeElement.getBoundingClientRect();
    this.host.nativeElement.style.setProperty('--lampe-x', `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
    this.host.nativeElement.style.setProperty('--lampe-y', `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
  }

  protected toggle() {
    if (!this.hover()) {
      this.host.nativeElement.style.setProperty('--lampe-x', '50%');
      this.host.nativeElement.style.setProperty('--lampe-y', '50%');
    }
    this.on.update((v) => !v);
  }
}
