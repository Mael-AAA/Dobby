import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { APPLICATION } from '../../content/application';
import { DobbyState } from '../../core/dobby-state.service';
import { fr } from '../../core/fr';
import { SoundService } from '../../core/sound.service';
import { Phone } from '../../ui/phone';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

/** 0 : écran Messages au repos ; 1 : demande envoyée, Dobby écrit ; 2 : Dobby confirme ; 3 : c'est fait, photo à l'appui */
type Temps = 0 | 1 | 2 | 3;

/**
 * « Un oubli ? Deux secondes suffisent. » : la démonstration se joue dans le téléphone, avec de vraies captures
 * de l'application (scripts/captures-appli.mjs). Un raccourci touché fait passer ses trois captures :
 * la demande part, Dobby confirme, puis la photo arrive quand c'est fait.
 */
@Component({
  selector: 'app-demo-tache',
  imports: [NgOptimizedImage, RouterLink, Phone, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band" aria-labelledby="confier-titre">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-5">
          <h2 id="confier-titre" class="titre" appReveal>{{ t.titre }}</h2>
          <p class="intro mt-6" appReveal="1">{{ t.texte }}</p>
          <p class="etiquette mt-10" id="raccourcis" appReveal="2">{{ t.consigne }}</p>
          <div class="mt-4 flex flex-wrap gap-2" role="group" aria-labelledby="raccourcis" appReveal="2">
            @for (r of t.raccourcis; track r.id; let i = $index) {
              <button type="button" class="puce" [attr.aria-pressed]="choix() === i" (click)="jouer(i)">{{ r.label }}</button>
            }
          </div>
          <div class="mt-12" appReveal="3">
            <a class="btn btn-primaire" routerLink="/devis" [queryParams]="{ source: 'appli-demo', motif: 'demo' }">{{ t.cta }}</a>
            <p class="note mt-3">{{ t.note }}</p>
          </div>
        </div>

        <div class="flex justify-center lg:col-span-6 lg:col-start-7" appReveal="1">
          <app-phone [width]="310" [plein]="true" class="relative">
            <img ngSrc="appli-messages" ngSrcset="390w, 780w" sizes="310px" fill [alt]="t.ecran" class="object-cover" />
            <!-- les captures d'un raccourci se chargent la première fois qu'il est joué, puis restent prêtes -->
            @for (r of t.raccourcis; track r.id; let i = $index) {
              @if (joues().includes(i)) {
                @for (k of [1, 2, 3]; track k) {
                  <img
                    [ngSrc]="'appli-' + r.id + '-' + k"
                    ngSrcset="390w, 780w"
                    sizes="310px"
                    fill
                    alt=""
                    class="capture object-cover"
                    [class.vue]="i === choix() && k <= temps()"
                  />
                }
              }
            }
          </app-phone>
          <!-- ce que montrent les captures, pour les lecteurs d'écran -->
          <p class="sr-only" aria-live="polite">{{ annonce() }}</p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .puce {
      min-height: 44px;
      padding: 0.55rem 1.1rem;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.3);
      color: var(--color-neige);
      font-weight: 600;
      transition: all 300ms var(--ease-dobby);
    }
    .puce:hover {
      border-color: var(--color-givre);
    }
    .puce[aria-pressed='true'] {
      background: var(--color-givre);
      border-color: var(--color-givre);
      color: var(--color-nuit);
    }
    /*
      les captures s'empilent sur l'écran Messages au repos ; chaque étape apparaît en un fondu bref,
      comme l'écran qui se met à jour (plus long, on verrait deux étapes l'une sur l'autre)
    */
    .capture {
      opacity: 0;
      transition: opacity 160ms ease-out;
    }
    .capture.vue {
      opacity: 1;
    }
    @media (prefers-reduced-motion: reduce) {
      .capture {
        transition: none;
      }
    }
  `,
})
export class DemoTache {
  protected readonly t = APPLICATION.confier;
  protected readonly choix = signal(0);
  protected readonly temps = signal<Temps>(0);
  /** raccourcis déjà joués : leurs captures sont dans la page */
  protected readonly joues = signal<number[]>([]);
  protected readonly annonce = computed(() => {
    const r = this.t.raccourcis[this.choix()];
    switch (this.temps()) {
      case 1:
        return fr(`${this.t.vous} : ${r.label}`);
      case 2:
        return fr(`${this.t.dobby} : ${r.confirme}`);
      case 3:
        return fr(`${this.t.dobby} : ${r.fait} ${this.t.photo} : ${r.legende}.`);
      default:
        return '';
    }
  });
  private readonly state = inject(DobbyState);
  private readonly sound = inject(SoundService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private timers: number[] = [];

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const tel = this.el.nativeElement.querySelector('app-phone');
      if (tel) destroy.onDestroy(onceVisible(tel, () => this.jouer(0), 0.5));
    });
    destroy.onDestroy(() => this.timers.forEach(clearTimeout));
  }

  /** Même rythme que dans l'appli : Dobby confirme au bout d'une seconde, la photo arrive ensuite */
  protected jouer(i: number) {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.choix.set(i);
    if (!this.joues().includes(i)) this.joues.update((j) => [...j, i]);
    this.sound.tick();
    const r = this.t.raccourcis[i];
    if (this.state.reducedMotion()) {
      this.temps.set(3);
      return;
    }
    const at = (ms: number, fn: () => void) => this.timers.push(window.setTimeout(fn, ms));
    this.temps.set(1);
    at(900, () => {
      this.temps.set(2);
      this.sound.say(r.confirme);
      at(2400, () => {
        this.temps.set(3);
        this.sound.tick();
      });
    });
  }
}
