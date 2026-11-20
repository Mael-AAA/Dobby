import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../content/site';
import { Reveal } from './reveal.directive';

/**
 * Bloc d'appel de fin de page : un grand aplat Givre, la lumière au bout du parcours.
 * Chaque page passe son libellé, sa micro-réassurance et ses paramètres de devis.
 */
@Component({
  selector: 'app-cta-block',
  imports: [RouterLink, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="theme-givre relative overflow-hidden" [attr.aria-labelledby]="id()">
      <svg
        class="sourire pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full md:h-40"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M-20 46 Q500 168 1020 46" fill="none" stroke="#151d20" stroke-width="2" vector-effect="non-scaling-stroke" pathLength="1" />
      </svg>
      <div class="shell relative grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7" appReveal>
          <h2 class="titre" [id]="id()">{{ titre() || defaut.titre }}</h2>
          <p class="intro mt-6">{{ texte() || defaut.texte }}</p>
        </div>
        <div class="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end lg:text-right" appReveal="2">
          <div class="flex flex-wrap gap-3 lg:justify-end">
            <span class="relative inline-flex">
              <span class="halo" aria-hidden="true"></span>
              <a class="btn btn-sombre relative" routerLink="/devis" [queryParams]="params()">{{ cta() }}</a>
            </span>
            @if (secondaire()) {
              <a class="btn btn-secondaire-sombre" [routerLink]="secondairePath()">{{ secondaire() }}</a>
            }
          </div>
          @if (note()) {
            <p class="note">{{ note() }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .sourire path {
      opacity: 0.35;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 1800ms var(--ease-dobby) 300ms;
    }
    section:has(.is-in) .sourire path {
      stroke-dashoffset: 0;
    }
    .halo {
      position: absolute;
      inset: -14px;
      border-radius: 999px;
      background: radial-gradient(closest-side, rgb(255 255 255 / 0.9), rgb(255 255 255 / 0));
      animation: respire 4.2s var(--ease-dobby) infinite;
    }
    .btn-secondaire-sombre {
      border: 1px solid rgb(21 29 32 / 0.35);
      color: var(--color-nuit);
    }
    .btn-secondaire-sombre:hover {
      border-color: var(--color-nuit);
    }
  `,
})
export class CtaBlock {
  readonly titre = input('');
  readonly texte = input('');
  readonly cta = input('Demander un devis');
  readonly params = input<Record<string, string>>({});
  readonly note = input('');
  readonly secondaire = input('');
  readonly secondairePath = input('/faq');
  readonly id = input('appel-final');

  protected readonly defaut = SITE.appel;
}
