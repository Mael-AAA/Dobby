import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { DOBBY } from '../../content/dobby';
import { SoundService } from '../../core/sound.service';
import { Reveal, onceVisible } from '../../ui/reveal.directive';
import { PIECES, centre, murs, piece } from '../plan/plan-data';

/**
 * « Il apprend votre maison » : le plan se dessine trait par trait, puis les habitudes apprises
 * viennent se poser dans les pièces. Un bouton efface tout, sauf les Zones privées.
 */
@Component({
  selector: 'app-apprend',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band theme-encre" aria-labelledby="apprend-titre">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-4">
          <h2 id="apprend-titre" class="titre" appReveal>{{ t.titre }}</h2>
          <p class="intro mt-6" appReveal="1">{{ t.texte }}</p>
          <div class="mt-10 flex flex-wrap items-center gap-4" appReveal="2">
            @if (memoire()) {
              <button type="button" class="btn btn-secondaire" (click)="effacer()">{{ t.effacer }}</button>
            } @else {
              <button type="button" class="btn btn-secondaire" (click)="restaurer()">{{ t.restaurer }}</button>
            }
          </div>
          <p class="mt-4 min-h-[3em] text-sm text-givre" aria-live="polite">{{ memoire() ? '' : t.efface }}</p>
        </div>

        <div class="lg:col-span-8" appReveal="1">
          <div class="defile">
            <div class="plan" [class.trace]="trace()">
              <svg viewBox="0 0 600 400" class="block h-auto w-full" aria-hidden="true">
                <defs>
                  <pattern id="apprend-hachures" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#5f747d" stroke-width="2" />
                  </pattern>
                </defs>
                @for (p of pieces; track p.id; let i = $index) {
                  @if (p.id === 'parents' || p.id === 'bain') {
                    <rect class="privee" [attr.x]="p.x" [attr.y]="p.y" [attr.width]="p.w" [attr.height]="p.h" fill="url(#apprend-hachures)" />
                  }
                  <path class="mur" pathLength="1" [attr.d]="murs(p)" [style.--k]="i" />
                  <text [attr.x]="p.x + 12" [attr.y]="p.y + 24" class="nom" [style.--k]="i">{{ p.nom }}</text>
                }
                <line class="mur" pathLength="1" x1="20" y1="170" x2="20" y2="230" style="--k: 7" />
                <line class="mur" pathLength="1" x1="580" y1="170" x2="580" y2="230" style="--k: 7" />
              </svg>
              @for (n of notes; track n.texte; let i = $index) {
                <p
                  class="note-plan"
                  [class.visible]="trace() && memoire()"
                  [style.left.%]="n.x"
                  [style.top.%]="n.y"
                  [style.--k]="i"
                >
                  <span class="regard" aria-hidden="true"></span>{{ n.texte }}
                </p>
              }
              <p class="legende-privee" [class.visible]="trace()">Zone privée</p>
            </div>
          </div>
          <ul class="sr-only">
            @for (n of notes; track n.texte) {
              <li>{{ n.piece }} : {{ n.texte }}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .defile {
      overflow-x: auto;
      border-radius: var(--radius-bloc);
      border: 1px solid rgb(157 193 207 / 0.14);
      background: var(--color-nuit);
    }
    .plan {
      position: relative;
      min-width: 560px;
      padding: 12px;
    }
    .mur {
      fill: none;
      stroke: var(--color-brume);
      stroke-width: 3;
      stroke-linecap: square;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 1300ms var(--ease-dobby);
      transition-delay: calc(var(--k) * 180ms);
    }
    .trace .mur {
      stroke-dashoffset: 0;
    }
    .nom {
      font-family: 'Manrope Variable', sans-serif;
      font-size: 14px;
      font-weight: 600;
      fill: var(--color-lac);
      opacity: 0;
      transition: opacity 700ms var(--ease-dobby);
      transition-delay: calc(var(--k) * 180ms + 900ms);
    }
    .trace .nom {
      opacity: 1;
    }
    .privee {
      opacity: 0;
      transition: opacity 900ms var(--ease-dobby) 1600ms;
    }
    .trace .privee {
      opacity: 0.55;
    }
    .note-plan {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: 210px;
      padding: 7px 12px;
      border-radius: 999px;
      background: rgb(13 19 22 / 0.88);
      border: 1px solid rgb(184 226 242 / 0.3);
      color: var(--color-neige);
      font-size: 0.8rem;
      font-weight: 600;
      line-height: 1.3;
      transform: translate(-50%, -50%) scale(0.92);
      opacity: 0;
      transition:
        opacity 600ms var(--ease-dobby),
        transform 600ms var(--ease-dobby);
      transition-delay: calc(var(--k) * 140ms);
    }
    .note-plan.visible {
      opacity: 1;
      transform: translate(-50%, -50%);
      transition-delay: calc(var(--k) * 260ms + 1700ms);
    }
    .legende-privee {
      position: absolute;
      right: 24px;
      bottom: 18px;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgb(13 19 22 / 0.8);
      color: var(--color-brume);
      font-size: 0.75rem;
      opacity: 0;
      transition: opacity 600ms 2000ms;
    }
    .legende-privee.visible {
      opacity: 1;
    }
  `,
})
export class Apprend {
  protected readonly t = DOBBY.apprend;
  protected readonly pieces = PIECES;
  protected readonly murs = murs;
  protected readonly notes = this.t.notes.map((n) => {
    const p = piece(n.piece);
    const c = centre(p);
    return { ...n, piece: p.nom, x: ((c.x + 12) / 624) * 100, y: ((c.y + 18 + 12) / 424) * 100 };
  });
  protected readonly trace = signal(false);
  protected readonly memoire = signal(true);
  private readonly sound = inject(SoundService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const plan = this.el.nativeElement.querySelector('.plan');
      if (plan) destroy.onDestroy(onceVisible(plan, () => this.trace.set(true), 0.35));
    });
  }

  protected effacer() {
    this.memoire.set(false);
    this.sound.tick();
  }

  protected restaurer() {
    this.memoire.set(true);
    this.sound.tick();
  }
}
