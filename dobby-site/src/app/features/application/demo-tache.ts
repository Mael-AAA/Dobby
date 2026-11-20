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
import { SoundService } from '../../core/sound.service';
import { Chat } from '../../ui/chat';
import { Coche } from '../../ui/icons';
import { Phone } from '../../ui/phone';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

type Etape = 'vide' | 'saisie' | 'envoye' | 'confirme' | 'fait';

/**
 * « Un oubli ? Deux secondes suffisent. » : la démonstration se joue dans le téléphone.
 * Le raccourci s'écrit, part, Dobby confirme, exécute, puis la photo arrive.
 */
@Component({
  selector: 'app-demo-tache',
  imports: [NgOptimizedImage, RouterLink, Phone, Chat, Coche, Reveal],
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
          <app-phone [width]="310" heure="18:44" class="relative">
            <div class="ecran">
              <p class="entete"><span class="regard" aria-hidden="true"></span> Dobby <span class="ml-auto text-xs font-normal text-lac">Paris 16e</span></p>
              <div class="fil" aria-live="polite">
                @if (etape() !== 'vide' && etape() !== 'saisie') {
                  <p class="bulle moi">{{ r().label }}</p>
                }
                @if (etape() === 'confirme' || etape() === 'fait') {
                  <p class="bulle lui">{{ r().confirme }}</p>
                }
                @if (etape() === 'confirme') {
                  <p class="en-cours"><span class="points" aria-hidden="true"><i></i><i></i><i></i></span> En cours</p>
                }
                @if (etape() === 'fait') {
                  <div class="bulle lui photo">
                    @switch (r().photo) {
                      @case ('plume') {
                        <app-chat class="block aspect-[3/2] overflow-hidden rounded-xl" />
                      }
                      @default {
                        <div class="relative aspect-[3/2] overflow-hidden rounded-xl">
                          <img [ngSrc]="r().photo" [ngSrcset]="r().photo === 'linge' ? '600w' : '900w'" sizes="260px" fill alt="" class="object-cover" />
                        </div>
                      }
                    }
                    <p class="mt-2 flex items-center gap-2"><app-coche [size]="18" class="text-givre" />{{ r().fait }}</p>
                    <p class="mt-1 text-[11px] text-lac">{{ r().legende }}</p>
                  </div>
                }
              </div>
              <div class="saisie">
                <span class="champ-tel" [class.actif]="etape() === 'saisie'">{{ tape() || t.champ }}</span>
                <span class="envoyer" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </span>
              </div>
            </div>
          </app-phone>
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
    .ecran {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 6px 14px 16px;
      font-size: 13px;
    }
    .entete {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(157 193 207 / 0.15);
      font-weight: 700;
    }
    .fil {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 0;
      overflow: hidden;
    }
    .bulle {
      max-width: 86%;
      padding: 9px 12px;
      border-radius: 16px;
      line-height: 1.4;
      animation: arrive 500ms var(--ease-dobby) both;
    }
    .moi {
      align-self: flex-end;
      background: var(--color-givre);
      color: var(--color-nuit);
      font-weight: 600;
      border-bottom-right-radius: 4px;
    }
    .lui {
      align-self: flex-start;
      background: var(--color-orage);
      border-bottom-left-radius: 4px;
    }
    .photo {
      padding: 8px;
      width: 86%;
    }
    .en-cours {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--color-lac);
      font-size: 12px;
    }
    .points {
      display: inline-flex;
      gap: 3px;
    }
    .points i {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--color-givre);
      animation: saute 1s ease-in-out infinite;
    }
    .points i:nth-child(2) {
      animation-delay: 0.15s;
    }
    .points i:nth-child(3) {
      animation-delay: 0.3s;
    }
    @keyframes saute {
      50% {
        opacity: 0.3;
        transform: translateY(-3px);
      }
    }
    @keyframes arrive {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
    }
    .saisie {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .champ-tel {
      flex: 1;
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.25);
      color: var(--color-lac);
      white-space: nowrap;
      overflow: hidden;
    }
    .champ-tel.actif {
      color: var(--color-neige);
      border-color: var(--color-givre);
    }
    .envoyer {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--color-givre);
      color: var(--color-nuit);
    }
  `,
})
export class DemoTache {
  protected readonly t = APPLICATION.confier;
  protected readonly choix = signal(0);
  protected readonly etape = signal<Etape>('vide');
  protected readonly tape = signal('');
  protected readonly r = computed(() => this.t.raccourcis[this.choix()]);
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

  protected jouer(i: number) {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.choix.set(i);
    this.sound.tick();
    const r = this.t.raccourcis[i];
    if (this.state.reducedMotion()) {
      this.tape.set('');
      this.etape.set('fait');
      return;
    }
    const at = (ms: number, fn: () => void) => this.timers.push(window.setTimeout(fn, ms));
    this.etape.set('saisie');
    this.tape.set('');
    let n = 0;
    const ecrire = () => {
      n++;
      this.tape.set(r.label.slice(0, n));
      if (n < r.label.length) at(55, ecrire);
      else
        at(350, () => {
          this.tape.set('');
          this.etape.set('envoye');
          this.sound.tick();
          at(800, () => {
            this.etape.set('confirme');
            this.sound.say(r.confirme);
            at(2200, () => {
              this.etape.set('fait');
              this.sound.tick();
            });
          });
        });
    };
    ecrire();
  }
}
