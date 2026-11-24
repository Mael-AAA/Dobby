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
  untracked,
} from '@angular/core';
import { srcset } from '../core/image-loader';
import { onceVisible } from './reveal.directive';

/**
 * Photo « à l'heure bleue » : par défaut, elle est dans les teintes de la palette.
 * Dès que la souris passe dessus, la lumière part du pointeur, révèle toute la photo en vraies couleurs
 * et reste allumée. Sur écran tactile (pas de survol), elle s'allume seule quand elle arrive à l'écran.
 * C'est la métaphore du site : la lumière, c'est Dobby qui s'occupe de la maison.
 */
@Component({
  selector: 'app-lit-photo',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lampe relative block overflow-hidden',
    '[style.--lampe-r]': 'radius()',
    '(pointerenter)': 'entrer($event)',
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
  `,
})
export class LitPhoto {
  readonly name = input.required<string>();
  readonly alt = input('');
  readonly sizes = input('100vw');
  readonly position = input('50% 50%');
  readonly priority = input(false);
  /** Allumage piloté par le parent (récit au défilement, bouton placé dans la photo) */
  readonly lit = input<boolean | undefined>(undefined);
  /** S'allume seule la première fois qu'elle est bien visible */
  readonly autoLight = input(false);
  /** Le passage de la souris allume la photo pour de bon. Faux : seul le parent l'allume, avec « lit ». */
  readonly survol = input(true);
  /** Point d'où part la lumière quand la photo s'allume sans la souris (« x y » en %) */
  readonly origine = input('50% 50%');

  protected readonly on = signal(false);
  protected readonly sets = computed(() => srcset(this.name()));
  protected readonly radius = computed(() => (this.on() ? '170vmax' : '0px'));

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      const l = this.lit();
      if (l === undefined) return;
      untracked(() => {
        this.centrer(this.origine());
        this.on.set(l);
      });
    });
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      // sans souris, rien ne peut allumer une photo « à survoler » : elle s'allume en arrivant à l'écran
      const tactile = this.survol() && this.lit() === undefined && matchMedia('(hover: none)').matches;
      if (!this.autoLight() && !tactile) return;
      // autoLight a pu être lu avant que le parent passe la photo en mode piloté (« lit », soirée épinglée
      // de l'accueil) : dans ce cas, c'est le parent qui décide, la photo ne s'allume pas seule
      const stop = onceVisible(
        this.host.nativeElement,
        () =>
          setTimeout(() => {
            if (this.lit() === undefined) this.on.set(true);
          }, 700),
        0.6,
      );
      destroy.onDestroy(stop);
    });
  }

  /** La lumière part de l'endroit où la souris entre, puis la photo reste allumée. */
  protected entrer(e: PointerEvent) {
    if (!this.survol() || e.pointerType === 'touch' || this.on()) return;
    const r = this.host.nativeElement.getBoundingClientRect();
    this.centrer(`${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
    this.on.set(true);
  }

  private centrer(point: string) {
    const [x, y = x] = point.trim().split(/\s+/);
    this.host.nativeElement.style.setProperty('--lampe-x', x);
    this.host.nativeElement.style.setProperty('--lampe-y', y);
  }
}
