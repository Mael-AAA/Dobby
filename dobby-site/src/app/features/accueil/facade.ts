import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface Fenetre {
  x: number;
  y: number;
  w: number;
  h: number;
  d: number;
  o: number;
}

/** 19 h 30 : façade d'immeuble parisien à l'heure bleue. Les fenêtres s'allument une à une, puis la porte s'ouvre. */
@Component({
  selector: 'app-facade',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <svg
      viewBox="0 0 600 480"
      preserveAspectRatio="xMidYMax slice"
      class="h-full w-full"
      [class.allume]="lit()"
      role="img"
      aria-label="La façade de la maison à 19 h 30 : les fenêtres s'allument, la porte s'ouvre."
    >
      <defs>
        <linearGradient id="fa-ciel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0d1316" />
          <stop offset="1" stop-color="#2b363b" />
        </linearGradient>
        <linearGradient id="fa-flaque" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#b8e2f2" stop-opacity=".55" />
          <stop offset="1" stop-color="#b8e2f2" stop-opacity="0" />
        </linearGradient>
        <filter id="fa-lueur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="600" height="480" fill="url(#fa-ciel)" />
      <!-- toit mansardé et lucarnes -->
      <polygon points="76,72 102,22 498,22 524,72" fill="#151d20" stroke="rgb(157 193 207 / .3)" />
      @for (x of [150, 300, 450]; track x) {
        <rect [attr.x]="x - 15" y="34" width="30" height="30" rx="14" fill="#1b2427" stroke="rgb(157 193 207 / .3)" />
      }
      <!-- corps de l'immeuble -->
      <rect x="70" y="72" width="460" height="378" fill="#1b2427" stroke="rgb(157 193 207 / .3)" />
      <line x1="62" y1="72" x2="538" y2="72" stroke="rgb(157 193 207 / .45)" stroke-width="3" />
      <line x1="70" y1="378" x2="530" y2="378" stroke="rgb(157 193 207 / .35)" stroke-width="2" />
      @for (y of [141, 293]; track y) {
        <g stroke="rgb(157 193 207 / .4)">
          <line x1="80" [attr.y1]="y" x2="520" [attr.y2]="y" />
          <line x1="80" [attr.y1]="y + 10" x2="520" [attr.y2]="y + 10" />
          @for (b of barreaux; track b) {
            <line [attr.x1]="b" [attr.y1]="y" [attr.x2]="b" [attr.y2]="y + 10" stroke-width=".8" />
          }
        </g>
      }
      <!-- fenêtres -->
      <g filter="url(#fa-lueur)">
        @for (f of fenetres; track $index) {
          <rect
            class="fenetre"
            [attr.x]="f.x"
            [attr.y]="f.y"
            [attr.width]="f.w"
            [attr.height]="f.h"
            rx="2"
            [style.--d]="f.d + 'ms'"
            [style.--o]="f.o"
          />
        }
      </g>
      <!-- porte -->
      <path class="interieur" d="M278 450 V404 A22 22 0 0 1 322 404 V450 Z" />
      <path class="battant" d="M278 450 V404 A22 22 0 0 1 300 382 V450 Z" />
      <path class="battant droit" d="M300 450 V382 A22 22 0 0 1 322 404 V450 Z" />
      <rect y="450" width="600" height="30" fill="#0d1316" />
      <polygon class="flaque" points="282,450 318,450 392,480 208,480" fill="url(#fa-flaque)" />
    </svg>
  `,
  styles: `
    .fenetre {
      fill: #10171a;
      stroke: rgb(157 193 207 / 0.22);
      transition:
        fill 900ms var(--ease-dobby) var(--d),
        opacity 900ms var(--ease-dobby) var(--d);
    }
    .allume .fenetre {
      fill: var(--color-givre);
      opacity: var(--o);
    }
    .interieur {
      fill: #10171a;
      transition: fill 800ms var(--ease-dobby) 1300ms;
    }
    .allume .interieur {
      fill: #e7f3f9;
    }
    .battant {
      fill: #2b363b;
      stroke: rgb(157 193 207 / 0.4);
      transform-box: fill-box;
      transform-origin: left;
      transition: transform 1100ms var(--ease-dobby) 1400ms;
    }
    .battant.droit {
      transform-origin: right;
    }
    .allume .battant {
      transform: scaleX(0.18);
    }
    .flaque {
      opacity: 0;
      transition: opacity 1000ms var(--ease-dobby) 1700ms;
    }
    .allume .flaque {
      opacity: 1;
    }
  `,
})
export class Facade {
  readonly lit = input(false);

  protected readonly barreaux = Array.from({ length: 45 }, (_, i) => 84 + i * 10);
  protected readonly fenetres: Fenetre[] = (() => {
    const out: Fenetre[] = [];
    let s = 7;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const centres = [108, 185, 262, 338, 415, 492];
    for (const y of [86, 160, 236, 310]) {
      for (const c of centres) out.push({ x: c - 17, y, w: 34, h: 54, d: Math.round(rnd() * 1300), o: rnd() > 0.82 ? 0.35 : 0.72 + rnd() * 0.28 });
    }
    for (const c of [185, 415]) out.push({ x: c - 30, y: 394, w: 60, h: 44, d: Math.round(rnd() * 900), o: 0.85 });
    for (const x of [150, 450]) out.push({ x: x - 9, y: 42, w: 18, h: 18, d: 1100 + Math.round(rnd() * 400), o: 0.6 });
    return out;
  })();
}
