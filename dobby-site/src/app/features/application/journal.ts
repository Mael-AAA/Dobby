import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { APPLICATION } from '../../content/application';
import { DobbyState } from '../../core/dobby-state.service';
import { Ticker } from '../../core/ticker.service';
import { Reveal } from '../../ui/reveal.directive';
import { COULOIR_Y, PIECES, Pt, centre, longueur, murs, piece, pointA } from '../plan/plan-data';

/** Le journal d'activité défile, le point de Dobby se déplace sur le plan vers la pièce de chaque action. */
@Component({
  selector: 'app-journal',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band theme-encre" aria-labelledby="journal-titre">
      <div class="shell">
        <div class="grid gap-6 lg:grid-cols-12">
          <h2 id="journal-titre" class="titre lg:col-span-6" appReveal>{{ t.titre }}</h2>
          <p class="intro lg:col-span-5 lg:col-start-8" appReveal="1">{{ t.texte }}</p>
        </div>
        <div class="mt-14 grid gap-8 lg:grid-cols-12" appReveal="1">
          <ol class="journal lg:col-span-4" aria-label="Journal d'activité">
            @for (e of t.entrees; track e.h; let i = $index) {
              <li [class.courant]="i === index()" [class.passe]="i < index()">
                <span class="heure">{{ e.h }}</span>
                <span class="flex-1">
                  {{ e.t }}
                  @if (i === index()) {
                    <span class="mt-1 flex items-center gap-1.5 text-xs font-semibold text-givre"><span class="regard" aria-hidden="true"></span>{{ t.enCours }}</span>
                  }
                </span>
              </li>
            }
          </ol>
          <div class="lg:col-span-8">
            <div class="defile">
              <svg viewBox="0 0 600 400" class="plan" aria-hidden="true">
                <rect x="20" y="170" width="560" height="60" fill="rgb(64 78 84 / .25)" />
                @for (p of pieces; track p.id) {
                  <rect [attr.x]="p.x" [attr.y]="p.y" [attr.width]="p.w" [attr.height]="p.h" [class.cible]="p.id === pieceCourante()" class="sol" />
                  <path [attr.d]="murs(p)" class="mur" />
                  <text [attr.x]="p.x + 12" [attr.y]="p.y + 24" class="nom">{{ p.nom }}</text>
                }
                <g #point>
                  <circle r="14" class="aura" />
                  <circle r="8" class="corps" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .journal {
      display: flex;
      flex-direction: column;
    }
    .journal li {
      display: flex;
      gap: 16px;
      padding: 14px 0;
      border-bottom: 1px solid rgb(157 193 207 / 0.14);
      color: var(--color-lac);
      transition: color 500ms var(--ease-dobby);
    }
    .journal li.passe {
      color: var(--color-brume);
    }
    .journal li.courant {
      color: var(--color-neige);
    }
    .heure {
      width: 4.5rem;
      flex: none;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .courant .heure {
      color: var(--color-givre);
    }
    .defile {
      overflow-x: auto;
      border-radius: var(--radius-bloc);
      border: 1px solid rgb(157 193 207 / 0.14);
      background: var(--color-nuit);
      padding: 12px;
    }
    .plan {
      display: block;
      width: 100%;
      min-width: 540px;
      height: auto;
    }
    .sol {
      fill: transparent;
      transition: fill 600ms var(--ease-dobby);
    }
    .sol.cible {
      fill: rgb(184 226 242 / 0.08);
    }
    .mur {
      fill: none;
      stroke: var(--color-brume);
      stroke-width: 3;
    }
    .nom {
      font-family: 'Manrope Variable', sans-serif;
      font-size: 14px;
      font-weight: 600;
      fill: var(--color-lac);
    }
    .aura {
      fill: rgb(184 226 242 / 0.18);
    }
    .corps {
      fill: var(--color-givre);
      filter: drop-shadow(0 0 5px rgb(184 226 242 / 0.9));
    }
  `,
})
export class Journal {
  protected readonly t = APPLICATION.journal;
  protected readonly pieces = PIECES;
  protected readonly murs = murs;
  protected readonly index = signal(0);
  protected readonly pieceCourante = computed(() => this.t.entrees[this.index()].piece);
  private readonly point = viewChild<ElementRef<SVGGElement>>('point');
  private readonly state = inject(DobbyState);

  private pos: Pt = { x: 560, y: COULOIR_Y };
  private trajet: Pt[] = [this.pos];
  private total = 0;
  private d = 0;
  private pause = 0;

  constructor() {
    this.cap(0);
    const stop = inject(Ticker).add((_t, dt) => {
      const g = this.point()?.nativeElement;
      if (!g) return;
      if (this.d < this.total) {
        this.d = Math.min(this.total, this.d + dt * (this.state.reducedMotion() ? 10 : 0.09));
        this.pos = pointA(this.trajet, this.d);
      } else {
        this.pause += dt;
        if (this.pause > 1600) this.cap((this.index() + 1) % this.t.entrees.length);
      }
      g.setAttribute('transform', `translate(${this.pos.x.toFixed(1)} ${this.pos.y.toFixed(1)})`);
    });
    inject(DestroyRef).onDestroy(stop);
  }

  /** Nouvelle action : on sort de la pièce actuelle par sa porte, on longe le couloir, on entre dans la suivante */
  private cap(i: number) {
    this.index.set(i);
    const p = piece(this.t.entrees[i].piece);
    const c = centre(p);
    const ici = this.pos;
    const pts: Pt[] = [ici];
    const dans = PIECES.find((q) => ici.x > q.x && ici.x < q.x + q.w && ici.y > q.y && ici.y < q.y + q.h);
    if (dans) pts.push({ x: dans.porte.x, y: dans.porte.y }, { x: dans.porte.x, y: COULOIR_Y });
    pts.push({ x: p.porte.x, y: COULOIR_Y }, { x: p.porte.x, y: p.porte.y }, c);
    this.trajet = pts;
    this.total = longueur(pts);
    this.d = 0;
    this.pause = 0;
  }
}
