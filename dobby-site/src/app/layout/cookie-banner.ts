import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../content/site';
import { ConsentService } from '../core/consent.service';
import { DobbyState } from '../core/dobby-state.service';

/** Bandeau discret, sans pression : Accepter · Refuser · Personnaliser, à égalité. */
@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    @if (visible()) {
      <section class="bandeau" aria-labelledby="cookies-titre">
        <h2 id="cookies-titre" class="sr-only">Cookies</h2>
        <div class="texte">
          <p class="text-sm leading-relaxed text-brume">
            {{ t.texte }} <a routerLink="/cookies" class="underline underline-offset-4 hover:text-givre">{{ t.lien }}</a>
          </p>
          @if (details()) {
            <fieldset class="mt-3 flex flex-col gap-2 text-sm">
              <legend class="sr-only">Vos choix</legend>
              <label class="flex items-start gap-3">
                <input type="checkbox" class="case" [checked]="mesure()" (change)="mesure.set(!mesure())" />
                <span>{{ t.mesure }}</span>
              </label>
              <label class="flex items-start gap-3">
                <input type="checkbox" class="case" [checked]="prefs()" (change)="prefs.set(!prefs())" />
                <span>{{ t.preferences }}</span>
              </label>
            </fieldset>
          }
        </div>
        <div class="actions flex flex-wrap gap-2">
          @if (details()) {
            <button type="button" class="btn btn-primaire btn-petit" (click)="consent.enregistrer(mesure(), prefs())">{{ t.enregistrer }}</button>
          } @else {
            <button type="button" class="btn btn-secondaire btn-petit" (click)="consent.enregistrer(true, true)">{{ t.accepter }}</button>
            <button type="button" class="btn btn-secondaire btn-petit" (click)="consent.enregistrer(false, false)">{{ t.refuser }}</button>
            <button type="button" class="btn btn-secondaire btn-petit" (click)="details.set(true)">{{ t.personnaliser }}</button>
          }
        </div>
      </section>
    }
  `,
  styles: `
    .bandeau {
      position: fixed;
      left: 16px;
      right: 16px;
      bottom: 104px;
      z-index: 95;
      padding: 1.1rem 1.25rem;
      border-radius: 20px;
      background: rgb(21 29 32 / 0.97);
      border: 1px solid rgb(157 193 207 / 0.2);
      backdrop-filter: blur(10px);
      animation: monte 700ms var(--ease-dobby) both;
    }
    .actions {
      margin-top: 0.9rem;
    }
    /* sur ordinateur : un bandeau fin en bas de l'écran, qui ne masque pas le contenu du haut de page */
    @media (min-width: 1024px) {
      .bandeau {
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 0.9rem max(48px, calc((100vw - 1320px) / 2 + 48px));
        border-radius: 0;
        border-width: 1px 0 0;
      }
      .texte {
        max-width: 760px;
      }
      .actions {
        flex: none;
        margin-top: 0;
      }
    }
    @keyframes monte {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
    }
    .case {
      width: 18px;
      height: 18px;
      margin-top: 2px;
      accent-color: var(--color-givre);
    }
  `,
})
export class CookieBanner {
  protected readonly consent = inject(ConsentService);
  private readonly state = inject(DobbyState);
  protected readonly t = SITE.cookies;
  protected readonly details = signal(false);
  protected readonly mesure = signal(false);
  protected readonly prefs = signal(true);
  protected readonly visible = computed(() => this.consent.ouvert() && this.state.introDone() && !this.state.stopped());
}
