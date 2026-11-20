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
import { DOBBY } from '../../content/dobby';
import { SoundService } from '../../core/sound.service';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

// Contour simplifié de la France métropolitaine (longitude, latitude)
const FRANCE: [number, number][] = [
  [2.55, 51.08], [4.2, 49.95], [5.9, 49.5], [8.2, 48.97], [7.6, 47.58], [6.15, 46.2], [7.0, 45.3],
  [7.5, 43.78], [6.2, 43.1], [4.6, 43.4], [3.1, 42.45], [-1.78, 43.36], [-1.2, 46.2], [-2.2, 47.1],
  [-4.75, 48.4], [-3.0, 48.8], [-1.6, 49.7], [0.2, 49.5], [1.6, 50.9],
];
const LIEUX: Record<string, [number, number]> = {
  paris: [2.35, 48.86],
  megeve: [6.62, 45.86],
  capferret: [-1.25, 44.64],
};
const W = 520;
const H = 460;
const proj = ([lon, lat]: [number, number]) => ({ x: ((lon + 5.2) / 14.4) * W, y: ((51.6 - lat) / 10.6) * H });

function dedans([x, y]: [number, number], poly: { x: number; y: number }[]): boolean {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) c = !c;
  }
  return c;
}

/** « Plusieurs résidences, un seul Dobby » : une carte en points, trois regards allumés et reliés. */
@Component({
  selector: 'app-residences',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band" aria-labelledby="residences-titre">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-5">
          <h2 id="residences-titre" class="titre" appReveal>{{ t.titre }}</h2>
          <p class="intro mt-6" appReveal="1">{{ t.texte }}</p>
          <div class="mt-10 flex flex-wrap gap-2" role="group" aria-label="Choisir une résidence" appReveal="2">
            @for (l of t.lieux; track l.id) {
              <button type="button" class="puce" [attr.aria-pressed]="choix() === l.id" (click)="choisir(l.id)">{{ l.nom }}</button>
            }
          </div>
          @if (lieu(); as l) {
            <div class="etat" aria-live="polite">
              <p class="text-sm font-semibold text-givre">{{ l.type }}, {{ l.nom }}</p>
              <p class="mt-2 text-lg text-neige">{{ l.etat }}</p>
            </div>
          }
        </div>
        <div class="lg:col-span-7" appReveal="1">
          <svg #carte [attr.viewBox]="'0 0 ' + w + ' ' + h" class="carte" [class.vu]="vu()" role="img" aria-label="Carte de France avec trois résidences reliées : Paris, Megève et Cap-Ferret.">
            @for (p of points; track $index) {
              <circle [attr.cx]="p.x" [attr.cy]="p.y" [attr.r]="p.in ? 2.1 : 1.3" [attr.fill]="p.in ? '#5f747d' : '#2b363b'" />
            }
            @for (l of liens; track l.id; let i = $index) {
              <path class="lien-carte" [attr.d]="l.d" pathLength="1" [style.--k]="i" />
            }
            @for (m of marques; track m.id) {
              <g class="marque" [class.choisi]="choix() === m.id" (click)="choisir(m.id)">
                <circle [attr.cx]="m.x" [attr.cy]="m.y" r="22" class="zone" />
                <ellipse [attr.cx]="m.x" [attr.cy]="m.y" rx="6" ry="10" class="oeil-carte" />
                <text [attr.x]="m.x + (m.id === 'capferret' ? -16 : 16)" [attr.y]="m.y - 14" [attr.text-anchor]="m.id === 'capferret' ? 'end' : 'start'" class="nom-carte">{{ m.nom }}</text>
              </g>
            }
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: `
    .puce {
      min-height: 44px;
      padding: 0.55rem 1.1rem;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.3);
      color: var(--color-neige);
      font-weight: 600;
      transition: all 300ms var(--ease-dobby);
    }
    .puce:hover {
      border-color: var(--color-givre);
    }
    .puce[aria-pressed='true'] {
      background: var(--color-givre);
      border-color: var(--color-givre);
      color: var(--color-nuit);
    }
    .etat {
      margin-top: 28px;
      padding: 20px 22px;
      border-radius: var(--radius-carte);
      background: rgb(64 78 84 / 0.35);
      border: 1px solid rgb(157 193 207 / 0.14);
    }
    .carte {
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .lien-carte {
      fill: none;
      stroke: var(--color-givre);
      stroke-width: 1.5;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      opacity: 0.7;
      transition: stroke-dashoffset 1600ms var(--ease-dobby);
      transition-delay: calc(var(--k) * 400ms + 900ms);
    }
    .vu .lien-carte {
      stroke-dashoffset: 0;
    }
    .marque {
      cursor: pointer;
    }
    .zone {
      fill: rgb(184 226 242 / 0.08);
      stroke: rgb(184 226 242 / 0.25);
      transition: fill 300ms;
    }
    .marque.choisi .zone {
      fill: rgb(184 226 242 / 0.2);
    }
    .oeil-carte {
      fill: var(--color-ardoise);
      transition: fill 600ms var(--ease-dobby);
    }
    .vu .oeil-carte {
      fill: var(--color-givre);
      filter: drop-shadow(0 0 6px rgb(184 226 242 / 0.9));
    }
    .nom-carte {
      font-family: 'Manrope Variable', sans-serif;
      font-size: 15px;
      font-weight: 700;
      fill: var(--color-neige);
      paint-order: stroke;
      stroke: var(--color-nuit);
      stroke-width: 4px;
    }
  `,
})
export class Residences {
  protected readonly t = DOBBY.residences;
  protected readonly w = W;
  protected readonly h = H;
  protected readonly choix = signal('megeve');
  protected readonly vu = signal(false);
  protected readonly lieu = computed(() => this.t.lieux.find((l) => l.id === this.choix()));

  private readonly poly = FRANCE.map(proj);
  protected readonly points = (() => {
    const out: { x: number; y: number; in: boolean }[] = [];
    for (let y = 10; y < H; y += 13) for (let x = 10; x < W; x += 13) out.push({ x, y, in: dedans([x, y], this.poly) });
    return out;
  })();
  protected readonly marques = this.t.lieux.map((l) => ({ ...l, ...proj(LIEUX[l.id]) }));
  protected readonly liens = (() => {
    const [p, m, c] = this.marques;
    const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2 - 40;
      return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
    };
    return [
      { id: 'pm', d: arc(p, m) },
      { id: 'pc', d: arc(p, c) },
      { id: 'cm', d: arc(c, m) },
    ];
  })();

  private readonly sound = inject(SoundService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const svg = this.el.nativeElement.querySelector('svg');
      if (svg) destroy.onDestroy(onceVisible(svg, () => this.vu.set(true), 0.4));
    });
  }

  protected choisir(id: string) {
    this.choix.set(id);
    this.sound.tick();
  }
}
