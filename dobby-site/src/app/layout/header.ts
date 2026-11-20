import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { NAV, SITE } from '../content/site';
import { DobbyState } from '../core/dobby-state.service';
import { ScrollService } from '../core/scroll.service';
import { SoundService } from '../core/sound.service';
import { IconeSon } from '../ui/icons';
import { Logo } from '../ui/logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logo, IconeSon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'contents',
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'close()',
  },
  template: `
    <a
      href="#contenu"
      class="sr-only z-[120] rounded-full bg-givre px-5 py-3 font-semibold text-nuit focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >Aller au contenu</a
    >
    <header class="entete" [class.fine]="slim() || state.menuOpen() || pageClaire()">
      <div class="shell flex h-full items-center justify-between gap-6">
        <a routerLink="/" class="relative z-10 shrink-0 rounded-md" aria-label="Dobby, retour à l'accueil" (click)="close()">
          <app-logo [size]="slim() ? 26 : 30" />
        </a>

        <nav aria-label="Navigation principale" class="hidden xl:block">
          <ul class="flex items-center gap-7">
            @for (l of nav; track l.path) {
              <li>
                <a
                  [routerLink]="l.path"
                  routerLinkActive="actif"
                  ariaCurrentWhenActive="page"
                  class="navlien"
                  ><span class="regard" aria-hidden="true"></span>{{ l.label }}</a
                >
              </li>
            }
          </ul>
        </nav>

        <div class="relative z-10 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            class="rond"
            (click)="sound.toggle()"
            [attr.aria-pressed]="sound.on()"
            [attr.aria-label]="sound.on() ? 'Couper le son' : 'Activer le son'"
            [title]="sound.on() ? 'Couper le son' : 'Activer le son'"
          >
            <app-icone-son [on]="sound.on()" />
          </button>
          @if (!onDevis()) {
            <a class="btn btn-primaire btn-petit hidden sm:inline-flex" routerLink="/devis" [queryParams]="{ source: 'entete' }">{{
              site.devis
            }}</a>
          }
          <button
            #burger
            type="button"
            class="rond menu-btn xl:hidden"
            (click)="toggle()"
            [attr.aria-expanded]="state.menuOpen()"
            aria-controls="menu-mobile"
          >
            <span class="sr-only">{{ state.menuOpen() ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
            <span class="barres" [class.croix]="state.menuOpen()" aria-hidden="true"><i></i><i></i></span>
          </button>
        </div>
      </div>
    </header>

    @if (state.menuOpen()) {
      <div id="menu-mobile" class="menu-mobile" role="dialog" aria-modal="true" aria-label="Menu">
        <nav aria-label="Menu mobile" class="shell flex h-full flex-col pt-28 pb-32">
          <ul class="flex flex-col gap-1">
            @for (l of nav; track l.path; let i = $index) {
              <li class="entree-menu" [style.--i]="i">
                <a [routerLink]="l.path" routerLinkActive="actif" ariaCurrentWhenActive="page" (click)="close()" class="grandlien">{{
                  l.label
                }}</a>
              </li>
            }
          </ul>
          <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-brume">
            <li><a routerLink="/temoignages" (click)="close()" class="lien">Témoignages</a></li>
            <li><a routerLink="/faq" (click)="close()" class="lien">FAQ</a></li>
            <li>
              <a [href]="'tel:' + site.telephoneLien" class="lien">{{ site.telephone }}</a>
            </li>
          </ul>
        </nav>
        <div class="fixed inset-x-0 bottom-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a class="btn btn-primaire w-full" routerLink="/devis" [queryParams]="{ source: 'menu-mobile' }" (click)="close()">{{
            site.devis
          }}</a>
        </div>
      </div>
    }
  `,
  styles: `
    .entete {
      position: fixed;
      inset: 0 0 auto 0;
      z-index: 90;
      height: 88px;
      transition:
        height 500ms var(--ease-dobby),
        background-color 500ms var(--ease-dobby),
        border-color 500ms var(--ease-dobby);
      border-bottom: 1px solid transparent;
    }
    .entete.fine {
      height: 66px;
      background: rgb(13 19 22 / 0.82);
      border-bottom-color: rgb(157 193 207 / 0.1);
      backdrop-filter: blur(14px) saturate(1.2);
    }
    .navlien {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-brume);
      transition: color 300ms var(--ease-dobby);
      white-space: nowrap;
    }
    .navlien:hover,
    .navlien.actif {
      color: var(--color-neige);
    }
    .navlien .regard {
      width: 0;
      opacity: 0;
      transition: all 400ms var(--ease-dobby);
    }
    .navlien.actif .regard {
      width: 0.42em;
      opacity: 1;
    }
    .rond {
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 999px;
      color: var(--color-neige);
      border: 1px solid rgb(157 193 207 / 0.25);
      transition: border-color 300ms var(--ease-dobby), background 300ms;
    }
    .rond:hover {
      border-color: var(--color-givre);
    }
    .rond[aria-pressed='true'] {
      background: rgb(184 226 242 / 0.12);
      border-color: var(--color-givre);
    }
    /* les styles de composant passent avant les utilitaires Tailwind : on masque ici */
    @media (min-width: 1280px) {
      .menu-btn {
        display: none;
      }
    }
    .barres {
      position: relative;
      width: 18px;
      height: 10px;
    }
    .barres i {
      position: absolute;
      left: 0;
      width: 18px;
      height: 1.5px;
      border-radius: 2px;
      background: currentColor;
      transition: transform 400ms var(--ease-dobby), top 400ms var(--ease-dobby);
    }
    .barres i:first-child {
      top: 0;
    }
    .barres i:last-child {
      top: 8.5px;
    }
    .croix i:first-child {
      top: 4.25px;
      transform: rotate(45deg);
    }
    .croix i:last-child {
      top: 4.25px;
      transform: rotate(-45deg);
    }
    .menu-mobile {
      position: fixed;
      inset: 0;
      z-index: 85;
      background: var(--color-encre);
      overflow-y: auto;
      animation: menu-in 500ms var(--ease-dobby) both;
    }
    @keyframes menu-in {
      from {
        opacity: 0;
      }
    }
    .grandlien {
      display: block;
      padding: 0.35rem 0;
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 9vw, 3.2rem);
      line-height: 1.15;
      color: var(--color-neige);
    }
    .grandlien.actif {
      color: var(--color-givre);
    }
    .entree-menu {
      animation: entree 700ms var(--ease-dobby) both;
      animation-delay: calc(var(--i) * 60ms + 80ms);
    }
    @keyframes entree {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
    }
  `,
})
export class Header {
  protected readonly nav = NAV;
  protected readonly site = SITE;
  protected readonly state = inject(DobbyState);
  protected readonly sound = inject(SoundService);
  private readonly scroll = inject(ScrollService);
  private readonly router = inject(Router);
  private readonly burger = viewChild<ElementRef<HTMLButtonElement>>('burger');

  protected readonly slim = signal(false);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: '' },
  );
  protected readonly onDevis = computed(() => this.url().startsWith('/devis'));
  /** pages légales en thème Jour : l'en-tête garde son fond sombre pour rester lisible */
  protected readonly pageClaire = computed(() =>
    ['/mentions-legales', '/confidentialite', '/cookies', '/conditions-garantie'].some((p) => this.url().startsWith(p)),
  );

  constructor() {
    effect(() => {
      const open = this.state.menuOpen();
      document.documentElement.style.overflow = open ? 'hidden' : '';
      this.scroll.freeze(open);
    });
  }

  protected onScroll() {
    const s = window.scrollY > 40;
    if (s !== this.slim()) this.slim.set(s);
  }

  protected toggle() {
    this.state.menuOpen.update((v) => !v);
  }

  protected close() {
    if (!this.state.menuOpen()) return;
    this.state.menuOpen.set(false);
    this.burger()?.nativeElement.focus();
  }
}
