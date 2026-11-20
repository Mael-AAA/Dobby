import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACCUEIL } from '../../content/accueil';
import { TEMOIGNAGES } from '../../content/temoignages';
import { DobbyState } from '../../core/dobby-state.service';
import { Fleche } from '../../ui/icons';
import { Reveal } from '../../ui/reveal.directive';

/** Trois témoignages, carrousel lent. Pause au survol, au focus, ou avec le bouton dédié. */
@Component({
  selector: 'app-temoins',
  imports: [RouterLink, Reveal, Fleche],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band" aria-labelledby="temoins-titre">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-4" appReveal>
          <h2 id="temoins-titre" class="titre">{{ t.titre }}</h2>
          <div class="mt-8 flex items-center gap-3">
            <span class="note-chiffre font-display text-[3.4rem] leading-none text-neige">4,9</span>
            <span class="flex flex-col gap-1">
              <span class="flex gap-1.5" aria-hidden="true">
                @for (i of [0, 1, 2, 3, 4]; track i) {
                  <span class="etoile" [style.--f]="i < 4 ? 1 : 0.9"></span>
                }
              </span>
              <span class="text-sm text-brume">{{ t.note }}</span>
            </span>
          </div>
          <a routerLink="/temoignages" fragment="mon-dobby" class="lien mt-8">{{ t.lien }} <app-fleche /></a>
        </div>

        <div
          class="lg:col-span-8"
          appReveal="1"
          role="group"
          aria-roledescription="carrousel"
          aria-label="Témoignages de clients"
          (mouseenter)="survol.set(true)"
          (mouseleave)="survol.set(false)"
          (focusin)="survol.set(true)"
          (focusout)="survol.set(false)"
        >
          <div class="scene" [attr.aria-live]="enLecture() ? 'off' : 'polite'">
            @for (c of cartes; track c.id; let i = $index) {
              <div
                class="temoin"
                [class.actif]="i === index()"
                [attr.aria-hidden]="i !== index() ? 'true' : null"
                role="group"
                aria-roledescription="diapositive"
                [attr.aria-label]="i + 1 + ' sur ' + cartes.length"
              >
                <p class="peur"><span class="regard"></span> {{ peurLevee }}&nbsp;: «&nbsp;{{ c.peur }}&nbsp;»</p>
                <blockquote class="citation">«&nbsp;{{ c.texte }}&nbsp;»</blockquote>
                <p class="mt-8 flex items-center gap-4">
                  <span class="monogramme" aria-hidden="true">{{ c.initiales }}</span>
                  <span>
                    <span class="block font-semibold text-neige">{{ c.auteur }}</span>
                    <span class="block text-sm text-lac">{{ c.ville }}</span>
                  </span>
                </p>
              </div>
            }
          </div>

          <div class="mt-10 flex flex-wrap items-center gap-3">
            <button type="button" class="rond" (click)="aller(-1)" [attr.aria-label]="t.precedent">
              <app-fleche class="rotate-180" />
            </button>
            <button type="button" class="rond" (click)="aller(1)" [attr.aria-label]="t.suivant">
              <app-fleche />
            </button>
            <span class="ml-2 flex gap-2" aria-hidden="true">
              @for (c of cartes; track c.id; let i = $index) {
                <span class="regard" [class.regard-eteint]="i !== index()"></span>
              }
            </span>
            @if (!state.reducedMotion()) {
              <button type="button" class="ml-auto text-sm text-brume underline-offset-4 hover:underline" (click)="pause.set(!pause())">
                {{ pause() ? 'Reprendre le défilement' : 'Mettre en pause' }}
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .scene {
      display: grid;
    }
    .temoin {
      grid-area: 1 / 1;
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px);
      transition:
        opacity 900ms var(--ease-dobby),
        transform 900ms var(--ease-dobby),
        visibility 0s 900ms;
    }
    .temoin.actif {
      opacity: 1;
      visibility: visible;
      transform: none;
      transition:
        opacity 900ms var(--ease-dobby) 200ms,
        transform 900ms var(--ease-dobby) 200ms,
        visibility 0s;
    }
    .peur {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-givre);
    }
    .citation {
      margin-top: 22px;
      font-family: var(--font-display);
      font-size: clamp(1.9rem, 3.3vw, 3rem);
      line-height: 1.18;
      color: var(--color-neige);
    }
    .monogramme {
      display: inline-grid;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: 999px;
      border: 1px solid rgb(184 226 242 / 0.4);
      font-family: var(--font-display);
      font-size: 1.15rem;
      color: var(--color-givre);
    }
    .etoile {
      width: 9px;
      height: 15px;
      border-radius: 50%;
      background: linear-gradient(to right, var(--color-givre) calc(var(--f) * 100%), var(--color-ardoise) 0);
    }
    .rond {
      display: inline-grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.3);
      color: var(--color-neige);
      transition: border-color 300ms var(--ease-dobby);
    }
    .rond:hover {
      border-color: var(--color-givre);
    }
  `,
})
export class Temoins {
  protected readonly t = ACCUEIL.temoignages;
  protected readonly peurLevee = TEMOIGNAGES.peurLevee;
  protected readonly cartes = TEMOIGNAGES.cartes.filter((c) => ['vie-privee', 'temps', 'sceptiques'].includes(c.id));
  protected readonly state = inject(DobbyState);
  protected readonly index = signal(0);
  protected readonly survol = signal(false);
  protected readonly pause = signal(false);
  protected readonly enLecture = computed(() => !this.pause() && !this.survol() && !this.state.reducedMotion());

  constructor() {
    const id = setInterval(() => {
      if (this.enLecture() && !this.state.stopped() && !document.hidden) this.index.update((i) => (i + 1) % this.cartes.length);
    }, 8000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  protected aller(sens: number) {
    this.index.update((i) => (i + sens + this.cartes.length) % this.cartes.length);
  }
}
