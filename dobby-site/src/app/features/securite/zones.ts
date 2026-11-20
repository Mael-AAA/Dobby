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
import { SECURITE } from '../../content/securite';
import { DobbyState } from '../../core/dobby-state.service';
import { SoundService } from '../../core/sound.service';
import { Ticker } from '../../core/ticker.service';
import { COULOIR_Y, PIECES, Pt, STATION, centre, longueur, murs, pointA, ronde } from '../plan/plan-data';

const VITESSE = 0.07; // unités de plan par milliseconde

/**
 * Zones privées : on touche une pièce pour l'interdire. Dobby fait sa ronde et ne franchit plus la porte.
 * Le volet des caméras se ferme partout sur le site (logo compris) : vous le voyez, il ne voit plus.
 */
@Component({
  selector: 'app-zones',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div class="lg:col-span-8">
        <div class="defile">
          <div class="plan">
            <svg viewBox="0 0 600 400" class="block h-auto w-full" aria-hidden="true">
              <defs>
                <pattern id="zones-hachures" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="9" stroke="#5f747d" stroke-width="2.5" />
                </pattern>
              </defs>
              <rect x="20" y="170" width="560" height="60" fill="rgb(64 78 84 / .25)" />
              @for (p of pieces; track p.id) {
                <g class="piece" [class.privee]="privees().has(p.id)" (click)="basculer(p.id)">
                  <rect [attr.x]="p.x" [attr.y]="p.y" [attr.width]="p.w" [attr.height]="p.h" class="sol" />
                  <rect [attr.x]="p.x" [attr.y]="p.y" [attr.width]="p.w" [attr.height]="p.h" fill="url(#zones-hachures)" class="hachures" />
                  <path [attr.d]="murs(p)" class="mur" />
                  <text [attr.x]="p.x + 12" [attr.y]="p.y + 24" class="nom">{{ p.nom }}</text>
                  @if (privees().has(p.id)) {
                    <g [attr.transform]="'translate(' + (centre(p).x - 9) + ' ' + (centre(p).y - 6) + ')'" class="cadenas">
                      <rect y="8" width="18" height="14" rx="3" />
                      <path d="M4 8V5a5 5 0 0 1 10 0v3" fill="none" stroke-width="2.2" />
                    </g>
                  }
                </g>
              }
              <circle [attr.cx]="station.x" [attr.cy]="station.y" r="9" class="station" />
              <g #dobby class="dobby-point">
                <circle r="13" class="aura" />
                <circle r="8" class="corps" />
              </g>
            </svg>
          </div>
        </div>
        <p class="mt-3 text-sm text-lac">{{ t.consigne }}</p>
      </div>

      <div class="flex flex-col gap-6 lg:col-span-4">
        <fieldset>
          <legend class="text-sm font-semibold text-neige">Vos Zones privées</legend>
          <div class="mt-3 flex flex-wrap gap-2">
            @for (p of pieces; track p.id) {
              <button type="button" class="puce" [attr.aria-pressed]="privees().has(p.id)" (click)="basculer(p.id)">{{ p.nom }}</button>
            }
          </div>
        </fieldset>

        <div class="visiere-boite">
          <svg viewBox="0 0 200 130" class="w-full" aria-hidden="true">
            <rect x="20" y="10" width="160" height="110" rx="52" fill="#0b1012" stroke="#404e54" />
            <g class="yeux-v" [class.couverts]="state.shutter()">
              <ellipse cx="78" cy="56" rx="9" ry="15" />
              <ellipse cx="122" cy="56" rx="9" ry="15" />
            </g>
            <path d="M76 86 Q100 100 124 86" fill="none" stroke="#e7f3f9" stroke-width="5" stroke-linecap="round" />
            <rect class="volet-v" [class.ferme]="state.shutter()" x="40" y="28" width="120" height="56" rx="12" />
          </svg>
          <p class="mt-3 flex items-center gap-2 text-sm font-semibold" aria-live="polite">
            <span class="regard" [class.regard-eteint]="state.shutter()" aria-hidden="true"></span>
            {{ state.shutter() ? t.volet.voitPlus : t.volet.voit }}
          </p>
          <button type="button" class="btn btn-secondaire mt-4 w-full" [attr.aria-pressed]="state.shutter()" (click)="volet()">
            {{ state.shutter() ? t.volet.ouvrir : t.volet.fermer }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .defile {
      overflow-x: auto;
      border-radius: var(--radius-bloc);
      border: 1px solid rgb(157 193 207 / 0.14);
      background: var(--color-nuit);
    }
    .plan {
      min-width: 560px;
      padding: 12px;
    }
    .piece {
      cursor: pointer;
    }
    .sol {
      fill: transparent;
      transition: fill 500ms var(--ease-dobby);
    }
    .piece:hover .sol {
      fill: rgb(184 226 242 / 0.06);
    }
    .piece.privee .sol {
      fill: #0b1012;
    }
    .hachures {
      opacity: 0;
      transition: opacity 500ms var(--ease-dobby);
    }
    .piece.privee .hachures {
      opacity: 0.5;
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
      pointer-events: none;
    }
    .piece.privee .nom {
      fill: var(--color-ardoise);
    }
    .cadenas rect {
      fill: var(--color-lac);
    }
    .cadenas path {
      stroke: var(--color-lac);
    }
    .station {
      fill: none;
      stroke: var(--color-lac);
      stroke-dasharray: 3 3;
    }
    .aura {
      fill: rgb(184 226 242 / 0.18);
    }
    .corps {
      fill: var(--color-givre);
      filter: drop-shadow(0 0 5px rgb(184 226 242 / 0.9));
    }
    .puce {
      min-height: 40px;
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.3);
      color: var(--color-neige);
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 300ms var(--ease-dobby);
    }
    .puce:hover {
      border-color: var(--color-givre);
    }
    .puce[aria-pressed='true'] {
      background: var(--color-orage);
      border-color: var(--color-lac);
    }
    .visiere-boite {
      padding: 22px;
      border-radius: var(--radius-carte);
      background: rgb(64 78 84 / 0.3);
      border: 1px solid rgb(157 193 207 / 0.14);
      color: var(--color-neige);
    }
    .yeux-v {
      fill: var(--color-givre);
      filter: drop-shadow(0 0 4px rgb(184 226 242 / 0.9));
    }
    .volet-v {
      fill: #404e54;
      transform-box: fill-box;
      transform-origin: top;
      transform: scaleY(0);
      transition: transform 600ms var(--ease-dobby);
    }
    .volet-v.ferme {
      transform: scaleY(1);
    }
  `,
})
export class Zones {
  protected readonly t = SECURITE.zones;
  protected readonly pieces = PIECES;
  protected readonly murs = murs;
  protected readonly centre = centre;
  protected readonly station = STATION;
  protected readonly state = inject(DobbyState);
  private readonly sound = inject(SoundService);
  protected readonly privees = signal(new Set(['parents', 'bain']));
  private readonly dobby = viewChild<ElementRef<SVGGElement>>('dobby');

  private trajet: Pt[] = ronde(PIECES.filter((p) => !this.privees().has(p.id)));
  private total = longueur(this.trajet);
  private d = 0;
  private pos: Pt = STATION;
  protected readonly autorisees = computed(() => PIECES.filter((p) => !this.privees().has(p.id)));

  constructor() {
    const stop = inject(Ticker).add((_t, dt) => {
      const g = this.dobby()?.nativeElement;
      if (!g) return;
      this.d += dt * VITESSE * (this.state.reducedMotion() ? 0 : 1);
      if (this.d > this.total) {
        this.trajet = ronde(this.autorisees());
        this.total = longueur(this.trajet);
        this.d = 0;
      }
      this.pos = pointA(this.trajet, this.d);
      g.setAttribute('transform', `translate(${this.pos.x.toFixed(1)} ${this.pos.y.toFixed(1)})`);
    });
    inject(DestroyRef).onDestroy(() => {
      stop();
      this.state.shutter.set(false);
    });
  }

  protected basculer(id: string) {
    this.privees.update((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
    this.sound.tick();
    // Dobby sort tout de suite de la pièce s'il s'y trouve, puis reprend une ronde qui l'évite
    const p = this.pos;
    const debut: Pt[] = [p];
    const dans = PIECES.find((q) => p.x > q.x && p.x < q.x + q.w && p.y > q.y && p.y < q.y + q.h);
    if (dans) debut.push({ x: dans.porte.x, y: dans.porte.y }, { x: dans.porte.x, y: COULOIR_Y });
    else debut.push({ x: p.x, y: COULOIR_Y });
    const suite = ronde(this.autorisees()).slice(1);
    this.trajet = [...debut, ...suite];
    this.total = longueur(this.trajet);
    this.d = 0;
  }

  protected volet() {
    this.state.shutter.update((v) => !v);
    this.sound.tick();
  }
}
