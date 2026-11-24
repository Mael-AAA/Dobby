import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACCUEIL } from '../../content/accueil';
import { TEMOIGNAGES } from '../../content/temoignages';
import { DobbyState } from '../../core/dobby-state.service';
import { Fleche } from '../../ui/icons';
import { Reveal } from '../../ui/reveal.directive';

/** Nombre de photos de la galerie #MonDobby montrées en aperçu sur l'accueil */
const APERCU = 6;

/**
 * Trois témoignages, carrousel lent. Pause au survol, au focus, ou avec le bouton dédié.
 * À gauche : la note en étoiles et un aperçu de la galerie #MonDobby (page Témoignages).
 */
@Component({
  selector: 'app-temoins',
  imports: [NgOptimizedImage, RouterLink, Reveal, Fleche],
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
              <span class="flex gap-1" aria-hidden="true">
                @for (i of [0, 1, 2, 3, 4]; track i) {
                  <span class="etoile" [style.--f]="i < 4 ? 1 : 0.9"></span>
                }
              </span>
              <span class="text-sm text-brume">{{ t.note }}</span>
            </span>
          </div>
          <!--
            Aperçu de la galerie : les vignettes mènent aussi à la galerie, à la souris.
            Au clavier et pour les lecteurs d'écran, c'est le lien texte juste en dessous qui compte (pas de doublon).
          -->
          <a routerLink="/temoignages" fragment="mon-dobby" class="apercu mt-10" tabindex="-1" aria-hidden="true">
            @for (p of apercu; track p.img; let dernier = $last) {
              <span class="vignette">
                <img [ngSrc]="p.img" ngSrcset="560w" sizes="120px" fill alt="" />
                @if (dernier && reste > 0) {
                  <span class="plus">+{{ reste }}</span>
                }
              </span>
            }
          </a>
          <a routerLink="/temoignages" fragment="mon-dobby" class="lien mt-6">{{ t.lien }} <app-fleche /></a>
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
    .citation {
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
    /*
      Étoiles jaunes à la façon des avis Google (jaune #fbbc04, hors palette, à la demande).
      La forme vient d'un masque ; le dégradé remplit l'étoile selon --f (0,9 pour la cinquième : 4,9/5).
      L'étoile occupe de 8,3 % à 91,7 % de la largeur de sa boîte : le remplissage est calculé sur cette partie.
    */
    .etoile {
      width: 22px;
      height: 22px;
      background: linear-gradient(to right, #fbbc04 calc((0.083 + var(--f) * 0.834) * 100%), var(--color-ardoise) 0);
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E")
        center / contain no-repeat;
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E")
        center / contain no-repeat;
    }
    /* Aperçu de la galerie #MonDobby : six vignettes, la dernière annonce la suite */
    .apercu {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      max-width: 360px;
    }
    .vignette {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: 14px;
    }
    .vignette img {
      object-fit: cover;
      transition: scale 700ms var(--ease-dobby);
    }
    .apercu:hover .vignette img {
      scale: 1.06;
    }
    .plus {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      background: rgb(13 19 22 / 0.6);
      font-family: var(--font-display);
      font-size: 1.7rem;
      color: var(--color-neige);
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
  protected readonly apercu = TEMOIGNAGES.mur.photos.slice(0, APERCU);
  /** photos de la galerie qui ne sont pas dans l'aperçu (« +3 » sur la dernière vignette) */
  protected readonly reste = TEMOIGNAGES.mur.photos.length - APERCU;
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
