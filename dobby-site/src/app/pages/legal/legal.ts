import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL } from '../../content/legal';
import { SITE } from '../../content/site';
import { ConsentService } from '../../core/consent.service';

/** Pages légales : thème Jour, texte seul, même mise en page pour les quatre. */
@Component({
  selector: 'app-legal',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (contenu(); as c) {
      <article class="theme-jour min-h-screen">
        <div class="mx-auto max-w-3xl px-5 pt-36 pb-24 md:px-8 lg:pt-44">
          <h1 class="font-display text-[clamp(2.8rem,6vw,4.4rem)] leading-none">{{ c.titre }}</h1>
          <p class="mt-4 text-sm text-orage">{{ c.maj }}</p>
          @for (s of c.sections; track s.titre) {
            <section class="mt-12">
              <h2 class="text-[1.25rem] font-bold">{{ s.titre }}</h2>
              @for (p of s.texte; track $index) {
                <p class="mt-3 text-[1.05rem] leading-relaxed">{{ p }}</p>
              }
            </section>
          }
          @if (page() === 'cookies') {
            <button type="button" class="btn btn-sombre mt-10" (click)="consent.rouvrir()">Modifier mes choix</button>
          }
          <nav class="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-orage/20 pt-8 text-sm" aria-label="Autres pages légales">
            @for (l of liens; track l.path) {
              <a [routerLink]="l.path" class="underline-offset-4 hover:underline">{{ l.label }}</a>
            }
          </nav>
        </div>
      </article>
    }
  `,
})
export class Legal {
  /** fourni par les données de la route */
  readonly page = input<string>('mentions-legales');
  protected readonly consent = inject(ConsentService);
  protected readonly contenu = computed(() => LEGAL[this.page()] ?? LEGAL['mentions-legales']);
  protected readonly liens = SITE.footer.legal;
}
