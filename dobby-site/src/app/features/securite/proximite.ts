import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { SECURITE } from '../../content/securite';

const ARRET = 0.6;
const RALENTI = 1.5;
const ECHELLE = 110; // unités SVG par mètre
const DOBBY_X = 500;

/**
 * Démonstration : on approche l'enfant de Dobby (glisser, ou curseur au clavier).
 * Au-delà de 1,5 m il travaille normalement, en dessous il ralentit, à 60 cm il s'arrête.
 */
@Component({
  selector: 'app-proximite',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="demo">
      <svg
        #svg
        viewBox="0 0 600 280"
        class="block h-auto w-full touch-none select-none"
        aria-hidden="true"
        (pointerdown)="saisir($event)"
        (pointermove)="glisser($event)"
        (pointerup)="lacher($event)"
        (pointercancel)="lacher($event)"
      >
        <defs>
          <pattern id="prox-sol" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="#2b363b" />
          </pattern>
        </defs>
        <rect width="600" height="280" fill="url(#prox-sol)" />
        <circle [attr.cx]="dobbyX" cy="140" [attr.r]="rRalenti" class="zone ralenti" [class.active]="etat() !== 'normal'" />
        <circle [attr.cx]="dobbyX" cy="140" [attr.r]="rArret" class="zone arret" [class.active]="etat() === 'arret'" />
        <text [attr.x]="dobbyX - rRalenti + 8" y="134" class="cote">1,5&#8239;m</text>
        <text [attr.x]="dobbyX - rArret + 6" y="134" class="cote">0,6&#8239;m</text>

        <!-- Dobby vu de dessus -->
        <g [attr.transform]="'translate(' + dobbyX + ' 140)'">
          <circle r="30" fill="#e7f3f9" />
          <circle r="21" fill="#151d20" />
          <g [attr.transform]="'translate(' + regard() + ' 0)'">
            <ellipse cx="-7" cy="-2" rx="3.2" ry="5.4" class="yeux-dessus" [class.attentif]="etat() !== 'normal'" />
            <ellipse cx="7" cy="-2" rx="3.2" ry="5.4" class="yeux-dessus" [class.attentif]="etat() !== 'normal'" />
          </g>
          <path d="M-8 8 Q0 13 8 8" fill="none" stroke="#e7f3f9" stroke-width="2" stroke-linecap="round" />
        </g>

        <!-- l'enfant -->
        <g class="enfant" [attr.transform]="'translate(' + enfantX() + ' 140)'">
          <circle r="34" fill="transparent" />
          <circle r="20" fill="#9dc1cf" />
          <circle cy="-4" r="9" fill="#e7f3f9" />
          <path d="M-12 12 Q0 4 12 12" fill="none" stroke="#e7f3f9" stroke-width="3" stroke-linecap="round" />
          <text y="44" text-anchor="middle" class="cote fort">{{ t.enfant }}</text>
        </g>
        <line [attr.x1]="enfantX() + 24" y1="196" [attr.x2]="dobbyX - 32" y2="196" stroke="#5f747d" stroke-dasharray="3 4" />
      </svg>

      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <label class="block">
          <span class="text-sm font-semibold text-neige">{{ t.curseur }}</span>
          <input
            type="range"
            min="0.3"
            max="3.6"
            step="0.05"
            [value]="distance()"
            (input)="regler($event)"
            class="curseur mt-3"
            [attr.aria-valuetext]="distanceTexte()"
          />
        </label>
        <div class="lecture" aria-live="polite">
          <p class="text-sm text-lac">{{ t.distance }} : <span class="font-semibold text-neige">{{ distanceTexte() }}</span></p>
          <p class="mt-1 text-sm text-lac">
            {{ t.vitesse }} :
            <span class="font-semibold text-neige">{{ vitesseTexte() }}</span>
          </p>
          <p class="mt-2 font-semibold" [class.text-givre]="etat() !== 'arret'" [class.text-neige]="etat() === 'arret'">{{ message() }}</p>
        </div>
      </div>
      <p class="mt-4 text-sm text-lac">{{ t.consigne }}</p>
    </div>
  `,
  styles: `
    .demo {
      padding: clamp(16px, 2.4vw, 28px);
      border-radius: var(--radius-bloc);
      background: var(--color-nuit);
      border: 1px solid rgb(157 193 207 / 0.14);
    }
    .zone {
      fill: none;
      stroke-width: 1.5;
      transition: fill 400ms var(--ease-dobby), stroke 400ms;
    }
    .zone.ralenti {
      stroke: #5f747d;
      stroke-dasharray: 5 6;
    }
    .zone.ralenti.active {
      fill: rgb(184 226 242 / 0.06);
      stroke: #9dc1cf;
    }
    .zone.arret {
      stroke: #7e9aa6;
    }
    .zone.arret.active {
      fill: rgb(184 226 242 / 0.14);
      stroke: #b8e2f2;
      animation: pulse 1.4s ease-in-out infinite;
    }
    @keyframes pulse {
      50% {
        stroke-width: 4;
      }
    }
    .yeux-dessus {
      fill: #b8e2f2;
      transition: transform 300ms;
      transform-box: fill-box;
      transform-origin: center;
    }
    .yeux-dessus.attentif {
      transform: scale(1.25);
    }
    .enfant {
      cursor: grab;
    }
    .cote {
      font-family: 'Manrope Variable', sans-serif;
      font-size: 13px;
      fill: #9dc1cf;
    }
    .cote.fort {
      font-weight: 700;
      fill: #e7f3f9;
    }
    .curseur {
      width: 100%;
      height: 44px;
      accent-color: var(--color-givre);
    }
    .lecture {
      padding: 14px 18px;
      border-radius: 16px;
      background: rgb(64 78 84 / 0.35);
    }
  `,
})
export class Proximite {
  protected readonly t = SECURITE.physique.demo;
  protected readonly dobbyX = DOBBY_X;
  protected readonly rArret = ARRET * ECHELLE;
  protected readonly rRalenti = RALENTI * ECHELLE;
  protected readonly distance = signal(2.6);
  private readonly svg = viewChild<ElementRef<SVGSVGElement>>('svg');
  private prise = false;

  protected readonly enfantX = computed(() => DOBBY_X - this.distance() * ECHELLE);
  protected readonly etat = computed(() => {
    const d = this.distance();
    return d <= ARRET ? 'arret' : d <= RALENTI ? 'ralenti' : 'normal';
  });
  protected readonly vitesse = computed(() => {
    const d = this.distance();
    if (d <= ARRET) return 0;
    if (d <= RALENTI) return 0.5 + ((d - ARRET) / (RALENTI - ARRET)) * 2.5;
    return 3;
  });
  protected readonly regard = computed(() => (this.etat() === 'normal' ? 0 : -4));
  protected readonly distanceTexte = computed(() => `${this.distance().toFixed(1).replace('.', ',')} m`);
  protected readonly vitesseTexte = computed(() =>
    this.vitesse() === 0 ? '0 km/h' : `${this.vitesse().toFixed(1).replace('.', ',')} km/h`,
  );
  protected readonly message = computed(() =>
    this.etat() === 'arret' ? this.t.arret : this.etat() === 'ralenti' ? this.t.ralenti : this.t.normal,
  );

  protected regler(e: Event) {
    this.distance.set(Number((e.target as HTMLInputElement).value));
  }

  protected saisir(e: PointerEvent) {
    this.prise = true;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    this.glisser(e);
  }

  protected glisser(e: PointerEvent) {
    if (!this.prise) return;
    const svg = this.svg()?.nativeElement;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    const d = (DOBBY_X - p.x) / ECHELLE;
    this.distance.set(Math.min(3.6, Math.max(0.3, d)));
  }

  protected lacher(e: PointerEvent) {
    this.prise = false;
    const el = e.currentTarget as Element;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  }
}
