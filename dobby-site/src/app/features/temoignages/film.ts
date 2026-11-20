import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { TEMOIGNAGES } from '../../content/temoignages';
import { DobbyState } from '../../core/dobby-state.service';
import { srcset } from '../../core/image-loader';
import { Reveal } from '../../ui/reveal.directive';

const DUREE_PLAN = 5200;

/**
 * « Une famille en 60 secondes » : pas de vidéo pour l'instant, alors un film de plans fixes
 * (lent travelling sur chaque photo) et des sous-titres, avec lecture, pause et barre de progression.
 */
@Component({
  selector: 'app-film',
  imports: [NgOptimizedImage, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band theme-encre" aria-labelledby="film-titre">
      <div class="shell grid gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-4">
          <h2 id="film-titre" class="titre" appReveal>{{ t.titre }}</h2>
          <p class="intro mt-6" appReveal="1">{{ t.texte }}</p>
        </div>
        <figure class="lg:col-span-8" appReveal="1">
          <div class="ecran" [class.lecture]="lecture()">
            @for (p of t.sousTitres; track $index; let i = $index) {
              <div class="plan" [class.actif]="i === index()" aria-hidden="true">
                <img [ngSrc]="p.img" [ngSrcset]="sets(p.img)" sizes="(min-width: 1024px) 60vw, 100vw" fill alt="" class="object-cover" />
              </div>
            }
            <div class="voile-film" aria-hidden="true"></div>
            @if (demarre()) {
              <p class="sous-titre" aria-live="polite">{{ courant().t }}</p>
            }
            @if (!demarre()) {
              <button type="button" class="lire" (click)="lire()">
                <span class="triangle" aria-hidden="true"></span>
                {{ t.lire }}
              </button>
            }
            <div class="progression" aria-hidden="true"><span [style.transform]="'scaleX(' + progression() + ')'"></span></div>
          </div>
          @if (demarre()) {
            <div class="mt-4 flex items-center gap-4">
              <button type="button" class="btn btn-secondaire btn-petit" (click)="basculer()">{{ lecture() ? t.pause : t.reprendre }}</button>
              <p class="text-sm text-lac">{{ index() + 1 }} / {{ t.sousTitres.length }}</p>
            </div>
          }
          <figcaption class="sr-only">
            Transcription : @for (p of t.sousTitres; track $index) { {{ p.t }} }
          </figcaption>
        </figure>
      </div>
    </section>
  `,
  styles: `
    .ecran {
      position: relative;
      aspect-ratio: 16 / 9;
      border-radius: var(--radius-bloc);
      overflow: hidden;
      background: #000;
    }
    .plan {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 1200ms var(--ease-dobby);
    }
    .plan.actif {
      opacity: 1;
    }
    .lecture .plan.actif img {
      animation: travelling 6s linear both;
    }
    @keyframes travelling {
      from {
        transform: scale(1.02);
      }
      to {
        transform: scale(1.12) translateX(-2%);
      }
    }
    .voile-film {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgb(0 0 0 / 0.75), transparent 45%);
    }
    .sous-titre {
      position: absolute;
      left: 8%;
      right: 8%;
      bottom: 11%;
      text-align: center;
      font-family: var(--font-display);
      font-size: clamp(1.25rem, 2.4vw, 2rem);
      line-height: 1.25;
      color: var(--color-neige);
    }
    .lire {
      position: absolute;
      inset: 0;
      margin: auto;
      width: fit-content;
      height: fit-content;
      display: inline-flex;
      align-items: center;
      gap: 14px;
      padding: 14px 24px 14px 16px;
      border-radius: 999px;
      background: rgb(13 19 22 / 0.75);
      border: 1px solid rgb(184 226 242 / 0.5);
      color: var(--color-neige);
      font-weight: 700;
      backdrop-filter: blur(8px);
    }
    .lire:hover {
      border-color: var(--color-givre);
    }
    .triangle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-givre);
      clip-path: polygon(38% 28%, 72% 50%, 38% 72%);
    }
    .progression {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: rgb(255 255 255 / 0.15);
    }
    .progression span {
      display: block;
      height: 100%;
      background: var(--color-givre);
      transform-origin: left;
    }
  `,
})
export class Film {
  protected readonly t = TEMOIGNAGES.film;
  protected readonly demarre = signal(false);
  protected readonly lecture = signal(false);
  protected readonly index = signal(0);
  protected readonly ecoule = signal(0);
  protected readonly courant = computed(() => this.t.sousTitres[this.index()]);
  protected readonly progression = computed(
    () => (this.index() * DUREE_PLAN + this.ecoule()) / (this.t.sousTitres.length * DUREE_PLAN),
  );
  private readonly state = inject(DobbyState);
  protected readonly sets = (img: string) => srcset(img);

  constructor() {
    const id = setInterval(() => {
      if (!this.lecture() || this.state.stopped() || document.hidden) return;
      const e = this.ecoule() + 100;
      if (e >= DUREE_PLAN) {
        if (this.index() >= this.t.sousTitres.length - 1) {
          this.lecture.set(false);
          this.ecoule.set(DUREE_PLAN);
          return;
        }
        this.index.update((i) => i + 1);
        this.ecoule.set(0);
      } else {
        this.ecoule.set(e);
      }
    }, 100);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  protected lire() {
    this.demarre.set(true);
    this.index.set(0);
    this.ecoule.set(0);
    this.lecture.set(true);
  }

  protected basculer() {
    if (!this.lecture() && this.index() >= this.t.sousTitres.length - 1 && this.ecoule() >= DUREE_PLAN) {
      this.lire();
      return;
    }
    this.lecture.update((v) => !v);
  }
}
