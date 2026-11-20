import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { SITE } from '../content/site';
import { DobbyState } from '../core/dobby-state.service';

/** Barre devis collée en bas sur mobile : apparaît après le haut de page, disparaît sur la page devis. */
@Component({
  selector: 'app-mobile-cta',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', '(window:scroll)': 'onScroll()' },
  template: `
    <aside
      class="barre lg:hidden"
      aria-label="Demande de devis"
      [class.visible]="visible()"
      [attr.aria-hidden]="visible() ? null : 'true'"
      [attr.inert]="visible() ? null : ''"
    >
      <a class="btn btn-primaire w-full" routerLink="/devis" [queryParams]="{ source: 'barre-mobile' }">{{ site.devis }}</a>
      <p class="mt-2 text-center text-xs text-brume">Sans engagement, rappel sous 24&nbsp;h.</p>
    </aside>
  `,
  styles: `
    .barre {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 80;
      padding: 0.75rem 1rem max(0.75rem, env(safe-area-inset-bottom));
      background: linear-gradient(to top, rgb(13 19 22 / 0.96) 70%, rgb(13 19 22 / 0));
      transform: translateY(110%);
      transition: transform 500ms var(--ease-dobby);
    }
    .barre.visible {
      transform: none;
    }
  `,
})
export class MobileCta {
  protected readonly site = SITE;
  private readonly state = inject(DobbyState);
  private readonly router = inject(Router);
  private readonly past = signal(false);
  private readonly onDevis = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.startsWith('/devis')),
    ),
    { initialValue: false },
  );
  protected readonly visible = computed(() => this.past() && !this.onDevis() && !this.state.menuOpen());

  protected onScroll() {
    const p = window.scrollY > window.innerHeight * 0.75;
    if (p !== this.past()) this.past.set(p);
  }
}
