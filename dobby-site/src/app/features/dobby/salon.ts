import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { SoundService } from '../../core/sound.service';
import { onceVisible } from '../../ui/reveal.directive';

type Cle = 'volets' | 'lumiere' | 'chauffage' | 'alarme';

/**
 * Maison connectée : le salon à 19 h. Dobby ferme les volets, allume la lampe, monte le chauffage
 * et arme l'alarme, puis on peut tout reprendre en main, interrupteur par interrupteur.
 */
@Component({
  selector: 'app-salon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="cadre">
      <svg viewBox="0 0 480 300" class="block h-auto w-full" role="img" [attr.aria-label]="description()">
        <defs>
          <linearGradient id="sal-ciel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2b363b" />
            <stop offset="1" stop-color="#7e9aa6" />
          </linearGradient>
          <radialGradient id="sal-lampe" cx="50%" cy="30%" r="60%">
            <stop offset="0" stop-color="#e7f3f9" stop-opacity=".55" />
            <stop offset="1" stop-color="#e7f3f9" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="480" height="300" fill="#151d20" />
        <!-- fenêtre et ciel -->
        <rect x="40" y="40" width="200" height="170" fill="url(#sal-ciel)" />
        @for (b of immeubles; track b.x) {
          <rect [attr.x]="b.x" [attr.y]="210 - b.h" [attr.width]="b.w" [attr.height]="b.h" fill="#1b2427" />
        }
        <g class="volets" [class.ferme]="etat().volets">
          @for (i of lames; track i) {
            <rect x="40" [attr.y]="40 + i * 17" width="200" height="16" fill="#404e54" stroke="#5f747d" stroke-width=".6" />
          }
        </g>
        <rect x="40" y="40" width="200" height="170" fill="none" stroke="#5f747d" stroke-width="5" />
        <line x1="140" y1="40" x2="140" y2="210" stroke="#5f747d" stroke-width="3" />
        <!-- halo de la lampe -->
        <ellipse class="halo" [class.on]="etat().lumiere" cx="372" cy="120" rx="150" ry="130" fill="url(#sal-lampe)" />
        <!-- lampe sur pied -->
        <line x1="372" y1="110" x2="372" y2="258" stroke="#7e9aa6" stroke-width="3" />
        <path d="M346 110 h52 l-10 -36 h-32 z" class="abat-jour" [class.on]="etat().lumiere" />
        <!-- canapé -->
        <rect x="250" y="200" width="200" height="46" rx="12" fill="#404e54" />
        <rect x="262" y="176" width="176" height="36" rx="10" fill="#5f747d" />
        <rect x="256" y="244" width="8" height="14" fill="#2b363b" />
        <rect x="436" y="244" width="8" height="14" fill="#2b363b" />
        <!-- radiateur et chaleur -->
        <rect x="56" y="232" width="150" height="34" rx="4" fill="#2b363b" stroke="#5f747d" />
        @for (k of [0, 1, 2, 3, 4, 5, 6, 7]; track k) {
          <line [attr.x1]="70 + k * 17" y1="236" [attr.x2]="70 + k * 17" y2="262" stroke="#5f747d" />
        }
        <g class="chaleur" [class.on]="etat().chauffage">
          @for (k of [0, 1, 2]; track k) {
            <path [attr.d]="'M' + (90 + k * 40) + ' 226 q 6 -10 0 -20 q -6 -10 0 -20'" fill="none" stroke="#b8e2f2" stroke-width="2" stroke-linecap="round" [style.--k]="k" />
          }
        </g>
        <!-- capteur d'alarme -->
        <rect x="446" y="40" width="18" height="26" rx="4" fill="#2b363b" stroke="#5f747d" />
        <circle cx="455" cy="53" r="4" class="led" [class.on]="etat().alarme" />
        <!-- sol -->
        <rect y="266" width="480" height="34" fill="#0d1316" />
        <text x="24" y="292" class="temp">{{ temperature() }}&#8239;°C</text>
      </svg>
    </div>
    <div class="mt-5 flex flex-wrap gap-2" role="group" aria-label="Commandes du salon">
      @for (c of commandes; track c.cle) {
        <button type="button" class="interrupteur" [attr.aria-pressed]="etat()[c.cle]" (click)="basculer(c.cle)">
          <span class="bascule" aria-hidden="true"></span>{{ c.label }}
        </button>
      }
    </div>
  `,
  styles: `
    .cadre {
      overflow: hidden;
      border-radius: var(--radius-bloc);
      border: 1px solid rgb(157 193 207 / 0.14);
    }
    .volets rect {
      transform-box: fill-box;
      transform-origin: top;
      transform: scaleY(0.12);
      transition: transform 700ms var(--ease-dobby);
    }
    .volets.ferme rect {
      transform: scaleY(1);
    }
    .halo {
      opacity: 0;
      transition: opacity 900ms var(--ease-dobby);
    }
    .halo.on {
      opacity: 1;
    }
    .abat-jour {
      fill: #5f747d;
      transition: fill 500ms var(--ease-dobby);
    }
    .abat-jour.on {
      fill: #e7f3f9;
    }
    .chaleur path {
      opacity: 0;
      transition: opacity 600ms var(--ease-dobby);
    }
    .chaleur.on path {
      opacity: 0.8;
      animation: monte 2.4s ease-in-out infinite;
      animation-delay: calc(var(--k) * -0.8s);
    }
    @keyframes monte {
      0% {
        transform: translateY(6px);
        opacity: 0;
      }
      40% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-14px);
        opacity: 0;
      }
    }
    .led {
      fill: #404e54;
      transition: fill 400ms;
    }
    .led.on {
      fill: #b8e2f2;
      filter: drop-shadow(0 0 4px #b8e2f2);
    }
    .temp {
      font-family: 'Manrope Variable', sans-serif;
      font-size: 15px;
      font-weight: 700;
      fill: #e7f3f9;
    }
    .interrupteur {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      min-height: 44px;
      padding: 0.5rem 1rem 0.5rem 0.6rem;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.3);
      color: var(--color-neige);
      font-size: 0.9rem;
      font-weight: 600;
      transition: border-color 300ms var(--ease-dobby);
    }
    .interrupteur:hover {
      border-color: var(--color-givre);
    }
    .bascule {
      position: relative;
      width: 28px;
      height: 17px;
      border-radius: 999px;
      background: var(--color-orage);
      transition: background 300ms var(--ease-dobby);
    }
    .bascule::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--color-lac);
      transition: transform 300ms var(--ease-dobby), background 300ms;
    }
    [aria-pressed='true'] .bascule {
      background: var(--color-givre);
    }
    [aria-pressed='true'] .bascule::after {
      transform: translateX(11px);
      background: var(--color-nuit);
    }
  `,
})
export class Salon {
  protected readonly commandes: { cle: Cle; label: string }[] = [
    { cle: 'volets', label: 'Volets' },
    { cle: 'lumiere', label: 'Lumière' },
    { cle: 'chauffage', label: 'Chauffage' },
    { cle: 'alarme', label: 'Alarme' },
  ];
  protected readonly lames = Array.from({ length: 10 }, (_, i) => i);
  protected readonly immeubles = [
    { x: 46, w: 30, h: 60 },
    { x: 80, w: 24, h: 92 },
    { x: 108, w: 36, h: 48 },
    { x: 150, w: 26, h: 78 },
    { x: 180, w: 40, h: 56 },
    { x: 222, w: 16, h: 70 },
  ];
  protected readonly etat = signal<Record<Cle, boolean>>({ volets: false, lumiere: false, chauffage: false, alarme: false });
  protected readonly temperature = computed(() => (this.etat().chauffage ? 21 : 19));
  protected readonly description = computed(() => {
    const e = this.etat();
    return `Le salon à 19 h : volets ${e.volets ? 'fermés' : 'ouverts'}, lampe ${e.lumiere ? 'allumée' : 'éteinte'}, ${this.temperature()} °C, alarme ${e.alarme ? 'armée' : 'désarmée'}.`;
  });

  private readonly sound = inject(SoundService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroy = inject(DestroyRef);
    const timers: number[] = [];
    afterNextRender(() => {
      destroy.onDestroy(
        onceVisible(
          this.el.nativeElement,
          () =>
            this.commandes.forEach((c, i) =>
              timers.push(window.setTimeout(() => this.etat.update((e) => ({ ...e, [c.cle]: true })), 500 + i * 700)),
            ),
          0.5,
        ),
      );
    });
    destroy.onDestroy(() => timers.forEach(clearTimeout));
  }

  protected basculer(c: Cle) {
    this.etat.update((e) => ({ ...e, [c]: !e[c] }));
    this.sound.tick();
  }
}
