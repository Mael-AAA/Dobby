import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ACCUEIL } from '../content/accueil';
import { DobbyState } from '../core/dobby-state.service';
import { SoundService } from '../core/sound.service';

type Phase = 'eveil' | 'choix' | 'voix' | 'ouverture';

/**
 * Écran d'entrée de l'accueil : le logo s'allume, « Casque recommandé », avec le son ou en silence.
 * Avec le son : nappe douce puis la voix de Dobby, « Bonsoir. Je vous attendais. »
 * Sortie : l'écran s'ouvre comme une paupière, la paupière du bas a la courbe du sourire.
 */
@Component({
  selector: 'app-entry-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <div class="entree" [class]="'phase-' + phase()" role="dialog" aria-modal="true" aria-labelledby="entree-titre">
      <div class="paupiere haut" aria-hidden="true"></div>
      <div class="paupiere bas" aria-hidden="true">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 0 Q50 20 100 0 V10 H0z" /></svg>
      </div>

      <div class="centre">
        <svg class="symbole" viewBox="0 0 100 100" width="132" height="132" aria-hidden="true">
          <g class="yeux">
            <ellipse class="oeil" cx="34" cy="36" rx="8.4" ry="14" />
            <ellipse class="oeil" cx="66" cy="36" rx="8.4" ry="14" />
          </g>
          <path class="sourire" pathLength="1" d="M27 66 Q50 82 73 66" />
        </svg>
        <p id="entree-titre" class="mot font-display">DOBBY</p>

        <div class="choix">
          <p class="casque">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
              <rect x="3" y="14" width="4" height="6" rx="1.5" />
              <rect x="17" y="14" width="4" height="6" rx="1.5" />
            </svg>
            {{ t.casque }}
          </p>
          <div class="mt-7 flex flex-wrap justify-center gap-3">
            <button #avec type="button" class="btn btn-primaire" (click)="go(true)" [disabled]="phase() !== 'choix'">{{ t.avecSon }}</button>
            <button type="button" class="btn btn-secondaire" (click)="go(false)" [disabled]="phase() !== 'choix'">{{ t.silence }}</button>
          </div>
        </div>
        <p class="voix" aria-live="polite">{{ phrase() }}</p>
      </div>
    </div>
  `,
  styles: `
    .entree {
      position: fixed;
      inset: 0;
      z-index: 150;
      display: grid;
      place-items: center;
      color: var(--color-neige);
    }
    .paupiere {
      position: absolute;
      left: 0;
      right: 0;
      background: var(--color-encre);
      transition: transform 1300ms cubic-bezier(0.7, 0, 0.2, 1);
    }
    .haut {
      top: 0;
      height: 50.5%;
    }
    .bas {
      bottom: 0;
      height: 50.5%;
    }
    .bas svg {
      position: absolute;
      left: 0;
      bottom: 100%;
      width: 100%;
      height: 9vh;
      fill: var(--color-encre);
      transform: scaleY(-1);
      transform-origin: bottom;
    }
    .phase-ouverture .haut {
      transform: translateY(-101%);
    }
    .phase-ouverture .bas {
      transform: translateY(124%);
    }
    .centre {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 24px;
      text-align: center;
      transition: opacity 500ms var(--ease-dobby);
    }
    .phase-ouverture .centre {
      opacity: 0;
    }
    .sourire {
      fill: none;
      stroke: var(--color-neige);
      stroke-width: 5;
      stroke-linecap: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: trace 1000ms var(--ease-dobby) 250ms forwards;
    }
    .yeux {
      fill: var(--color-givre);
      opacity: 0;
      filter: drop-shadow(0 0 6px rgb(184 226 242 / 0.9));
      animation: allume 900ms var(--ease-dobby) 1050ms forwards;
    }
    .symbole .oeil {
      animation: cligne 300ms ease-in-out 2600ms;
    }
    .mot {
      margin-top: 18px;
      font-size: 1.7rem;
      letter-spacing: 0.3em;
      margin-right: -0.3em;
      opacity: 0;
      animation: allume 900ms var(--ease-dobby) 1300ms forwards;
    }
    .choix {
      margin-top: 52px;
      opacity: 0;
      animation: allume 900ms var(--ease-dobby) 1700ms forwards;
    }
    .phase-voix .choix,
    .phase-ouverture .choix {
      opacity: 0 !important;
      animation: none;
      transition: opacity 400ms;
      visibility: hidden;
    }
    .casque {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      color: var(--color-brume);
    }
    .voix {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -10px;
      pointer-events: none;
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      color: var(--color-givre);
      min-height: 1.2em;
    }
    @keyframes trace {
      to {
        stroke-dashoffset: 0;
      }
    }
    @keyframes allume {
      to {
        opacity: 1;
      }
    }
  `,
})
export class EntryScreen {
  readonly done = output<void>();
  protected readonly t = ACCUEIL.entree;
  protected readonly phase = signal<Phase>('eveil');
  protected readonly phrase = signal('');
  private readonly sound = inject(SoundService);
  private readonly state = inject(DobbyState);
  private readonly avec = viewChild<ElementRef<HTMLButtonElement>>('avec');

  constructor() {
    afterNextRender(() => {
      const delai = this.state.reducedMotion() ? 0 : 1700;
      setTimeout(() => {
        this.phase.set('choix');
        setTimeout(() => this.avec()?.nativeElement.focus({ preventScroll: true }));
      }, delai);
    });
  }

  protected go(avecSon: boolean) {
    this.sound.choose(avecSon);
    this.phase.set('voix');
    const texte = this.t.voix;
    // la phrase s'écrit au rythme de la voix
    let i = 0;
    const ecrire = () => {
      i++;
      this.phrase.set(texte.slice(0, i));
      if (i < texte.length) setTimeout(ecrire, avecSon ? 55 : 38);
    };
    ecrire();
    let fini = false;
    const ouvrir = () => {
      if (fini) return;
      fini = true;
      setTimeout(() => this.ouvrir(), 500);
    };
    if (avecSon) {
      setTimeout(() => this.sound.say(texte, ouvrir), 700);
      setTimeout(ouvrir, 4200);
    } else {
      setTimeout(ouvrir, 1300);
    }
  }

  private ouvrir() {
    this.phase.set('ouverture');
    this.state.introDone.set(true);
    try {
      sessionStorage.setItem('dobby-entree', '1');
    } catch {}
    setTimeout(() => this.done.emit(), this.state.reducedMotion() ? 50 : 1350);
  }
}
