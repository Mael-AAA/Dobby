import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DobbyState } from './core/dobby-state.service';
import { ScrollService } from './core/scroll.service';
import { SeoService } from './core/seo.service';
import { StopService } from './core/stop.service';
import { CookieBanner } from './layout/cookie-banner';
import { CursorHalo } from './layout/cursor-halo';
import { EntryScreen } from './layout/entry-screen';
import { Footer } from './layout/footer';
import { Header } from './layout/header';
import { MobileCta } from './layout/mobile-cta';
import { StopOverlay } from './layout/stop-overlay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MobileCta, CursorHalo, StopOverlay, CookieBanner, EntryScreen],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'grain block', '(document:keydown)': 'ecoute($event)' },
  template: `
    @if (entree()) {
      <app-entry-screen (done)="entree.set(false)" />
    }
    @if (chargement()) {
      <div class="chargement" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="76" height="76">
          <ellipse class="o" cx="34" cy="36" rx="8.4" ry="14" />
          <ellipse class="o" cx="66" cy="36" rx="8.4" ry="14" />
          <path d="M27 66 Q50 82 73 66" pathLength="1" />
        </svg>
      </div>
    }
    <app-header />
    <main id="contenu" tabindex="-1" class="block outline-none">
      <router-outlet />
    </main>
    <app-footer />
    <app-mobile-cta />
    <app-cursor-halo />
    <app-cookie-banner />
    <app-stop-overlay />
  `,
  styles: `
    .chargement {
      position: fixed;
      inset: 0;
      z-index: 140;
      display: grid;
      place-items: center;
      background: var(--color-encre);
      animation: part 450ms var(--ease-dobby) 650ms forwards;
    }
    .chargement path {
      fill: none;
      stroke: var(--color-neige);
      stroke-width: 5;
      stroke-linecap: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: trace 500ms var(--ease-dobby) forwards;
    }
    .chargement .o {
      fill: var(--color-givre);
      opacity: 0;
      filter: drop-shadow(0 0 5px rgb(184 226 242 / 0.9));
      animation: allume 400ms var(--ease-dobby) 300ms forwards;
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
    @keyframes part {
      to {
        opacity: 0;
        visibility: hidden;
      }
    }
  `,
})
export class App {
  private readonly state = inject(DobbyState);
  private readonly stop = inject(StopService);
  protected readonly entree = signal(false);
  protected readonly chargement = signal(false);
  private tape = '';

  constructor() {
    inject(ScrollService).init();
    inject(SeoService).init();

    let vu = false;
    try {
      vu = sessionStorage.getItem('dobby-entree') === '1';
    } catch {}
    const accueil = location.pathname === '/' || location.pathname === '';
    if (accueil && !vu) {
      this.entree.set(true);
    } else {
      this.state.introDone.set(true);
      if (!vu && !this.state.reducedMotion()) {
        // premier chargement : le monogramme s'allume, une seconde au maximum
        this.chargement.set(true);
        setTimeout(() => this.chargement.set(false), 1150);
      }
      try {
        sessionStorage.setItem('dobby-entree', '1');
      } catch {}
    }
  }

  /** « Dobby, stop. » : taper s-t-o-p n'importe où (hors champ de saisie) arrête tout. */
  protected ecoute(e: KeyboardEvent) {
    const cible = e.target as HTMLElement | null;
    if (cible?.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key.length !== 1) return;
    this.tape = (this.tape + e.key.toLowerCase()).slice(-4);
    if (this.tape === 'stop') {
      this.tape = '';
      this.stop.trigger();
    }
  }
}
