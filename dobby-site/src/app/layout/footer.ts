import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../content/site';
import { Logo } from '../ui/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <footer class="theme-encre text-brume">
      <div class="shell pt-20 pb-10 md:pt-28">
        <div class="flex flex-col gap-10 border-b filet pb-14 md:flex-row md:items-end md:justify-between">
          <div class="flex flex-col gap-6">
            <app-logo variant="stack" [size]="64" class="items-start!" />
            <p class="font-display text-[2.1rem] leading-tight text-neige">{{ site.signature }}</p>
          </div>
          <a class="btn btn-primaire self-start md:self-auto" routerLink="/devis" [queryParams]="{ source: 'pied-de-page' }">{{
            site.devis
          }}</a>
        </div>

        <div class="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          @for (col of f.colonnes; track col.titre) {
            <nav [attr.aria-label]="col.titre">
              <h2 class="mb-4 text-sm font-semibold text-neige">{{ col.titre }}</h2>
              <ul class="flex flex-col gap-2.5">
                @for (l of col.liens; track l.path) {
                  <li>
                    <a [routerLink]="l.path" class="pied-lien">{{ l.label }}</a>
                  </li>
                }
              </ul>
            </nav>
          }
          <div>
            <h2 class="mb-4 text-sm font-semibold text-neige">{{ f.contact.titre }}</h2>
            <ul class="flex flex-col gap-2.5">
              <li>
                <a routerLink="/devis" [queryParams]="{ source: 'pied-de-page' }" class="pied-lien">{{ f.contact.devis }}</a>
              </li>
              <li>
                <a [href]="'tel:' + site.telephoneLien" class="pied-lien">{{ site.telephone }}</a>
                <span class="block text-sm text-lac">{{ f.contact.tel }}</span>
              </li>
              <li class="text-sm">{{ f.contact.showroom }}</li>
            </ul>
            <ul class="mt-5 flex gap-2" aria-label="Réseaux sociaux">
              @for (r of reseaux; track r.nom) {
                <li>
                  <a [href]="r.url" class="reseau" [attr.aria-label]="r.nom + ' (nouvel onglet)'" target="_blank" rel="noopener">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                      @switch (r.nom) {
                        @case ('Instagram') {
                          <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
                        }
                        @case ('LinkedIn') {
                          <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" stroke-linecap="round" />
                        }
                        @default {
                          <rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
                        }
                      }
                    </svg>
                  </a>
                </li>
              }
            </ul>
          </div>
          <div class="flex flex-col gap-3 lg:items-end">
            <div class="sceau">
              <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
                <circle cx="27" cy="27" r="25" fill="none" stroke="currentColor" stroke-width="1.2" />
                <circle cx="27" cy="27" r="20" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="2 3" />
                <text x="27" y="25" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" font-family="Manrope Variable, sans-serif">IESD</text>
                <text x="27" y="36" text-anchor="middle" font-size="11" fill="currentColor" font-family="Chiffres, Italiana, serif">5</text>
              </svg>
              <span>{{ f.label }}</span>
            </div>
            <div class="sceau">
              <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
                <circle cx="27" cy="27" r="25" fill="none" stroke="currentColor" stroke-width="1.2" />
                <text x="27" y="32" text-anchor="middle" font-size="18" fill="currentColor" font-family="Chiffres, Italiana, serif">10</text>
              </svg>
              <span>{{ f.garantie }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6 border-t filet pt-8 text-sm md:flex-row md:items-start md:justify-between">
          <ul class="flex flex-wrap gap-x-6 gap-y-2">
            @for (l of f.legal; track l.path) {
              <li>
                <a [routerLink]="l.path" class="pied-lien">{{ l.label }}</a>
              </li>
            }
          </ul>
          <p class="shrink-0 text-lac">{{ f.copyright }}</p>
        </div>
        <p class="mt-8 max-w-3xl text-[0.8125rem] leading-relaxed text-lac">{{ f.fictif }}</p>
      </div>
    </footer>
  `,
  styles: `
    .pied-lien {
      color: var(--color-brume);
      transition: color 300ms var(--ease-dobby);
    }
    .pied-lien:hover {
      color: var(--color-givre);
    }
    .reseau {
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.25);
      color: var(--color-neige);
      transition: border-color 300ms var(--ease-dobby);
    }
    .reseau:hover {
      border-color: var(--color-givre);
    }
    .sceau {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      max-width: 17rem;
      font-size: 0.875rem;
      line-height: 1.35;
      color: var(--color-givre);
    }
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly f = SITE.footer;
  protected readonly reseaux = [
    { nom: 'Instagram', url: 'https://www.instagram.com/' },
    { nom: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { nom: 'YouTube', url: 'https://www.youtube.com/' },
  ];
}
