import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { SITE } from '../content/site';
import { DobbyState } from '../core/dobby-state.service';
import { StopService } from '../core/stop.service';

/** Écran d'arrêt : noir d'un coup, chronomètre figé à 0,4 s, puis un second geste pour relancer. */
@Component({
  selector: 'app-stop-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', '(document:keydown.escape)': 'relancer()' },
  template: `
    @if (state.stopped()) {
      <div class="stop-overlay" role="alertdialog" aria-modal="true" aria-labelledby="arret-titre" aria-describedby="arret-texte">
        <div class="mx-auto flex max-w-xl flex-col items-center px-6 text-center">
          <p class="chrono" aria-hidden="true">{{ chrono() }}<span>s</span></p>
          <p class="sr-only">{{ t.mesure }} : 0,4 seconde.</p>
          <div class="suite">
            <h2 id="arret-titre" class="titre-carte">{{ t.titre }}</h2>
            <p id="arret-texte" class="mt-4 text-brume">{{ t.texte }}</p>
            <button #relance type="button" class="btn btn-secondaire mt-10" (click)="relancer()">{{ t.relancer }}</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .stop-overlay {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: grid;
      place-items: center;
      background: #000;
      color: var(--color-neige);
    }
    .chrono {
      font-family: var(--font-display);
      font-size: clamp(5rem, 16vw, 9rem);
      line-height: 1;
      font-variant-numeric: tabular-nums;
      color: var(--color-arret);
    }
    .chrono span {
      font-size: 0.4em;
      margin-left: 0.15em;
    }
    .suite {
      opacity: 0;
      animation: apparait 900ms var(--ease-dobby) 650ms forwards;
    }
    @keyframes apparait {
      to {
        opacity: 1;
      }
    }
  `,
})
export class StopOverlay {
  protected readonly state = inject(DobbyState);
  private readonly stop = inject(StopService);
  protected readonly t = SITE.arret;
  protected readonly chrono = signal('0,00');
  private readonly relance = viewChild<ElementRef<HTMLButtonElement>>('relance');

  constructor() {
    effect(() => {
      if (!this.state.stopped()) return;
      const t0 = performance.now();
      this.chrono.set('0,00');
      const step = (t: number) => {
        const v = Math.min(0.4, ((t - t0) / 400) * 0.4);
        this.chrono.set(v.toFixed(2).replace('.', ','));
        if (v < 0.4) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      setTimeout(() => this.relance()?.nativeElement.focus(), 700);
    });
  }

  protected relancer() {
    this.stop.resume();
  }
}
