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
import { DOBBY } from '../../content/dobby';
import { DobbyState } from '../../core/dobby-state.service';
import { SoundService } from '../../core/sound.service';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

type Phase = 'repos' | 'ecoute' | 'reponse' | 'plan';

/**
 * « Parlez-lui comme à un proche » : on choisit une phrase, Dobby l'écoute (onde),
 * répond (et parle, si le son est activé), puis déroule la mission heure par heure.
 */
@Component({
  selector: 'app-mission',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band" aria-labelledby="parler-titre">
      <div class="shell grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <h2 id="parler-titre" class="titre" appReveal>{{ t.titre }}</h2>
          <p class="intro mt-6" appReveal="1">{{ t.texte }}</p>
          <p class="etiquette mt-10" appReveal="2" id="consigne-phrases">{{ t.consigne }}</p>
          <ul class="mt-4 flex flex-col gap-3" appReveal="2" aria-labelledby="consigne-phrases">
            @for (e of t.exemples; track e.phrase; let i = $index) {
              <li>
                <button type="button" class="phrase" [attr.aria-pressed]="choix() === i" (click)="jouer(i)">
                  «&nbsp;{{ e.phrase }}&nbsp;»
                </button>
              </li>
            }
          </ul>
        </div>

        <div class="lg:col-span-7" appReveal="1">
          <div class="conversation" [class.vivant]="phase() !== 'repos'">
            @if (exemple(); as e) {
              <div class="vous">
                <span class="onde" [class.anime]="phase() === 'ecoute'" aria-hidden="true">
                  @for (b of barres; track $index) {
                    <i [style.height.%]="b"></i>
                  }
                </span>
                <p>«&nbsp;{{ e.phrase }}&nbsp;»</p>
              </div>

              <div class="dobby" aria-live="polite">
                <p class="flex items-center gap-2 text-sm font-semibold text-givre">
                  <span class="regard" aria-hidden="true"></span> Dobby
                  @if (phase() === 'ecoute') {
                    <span class="font-normal text-lac">écoute…</span>
                  }
                </p>
                <p class="reponse">{{ ecrit() }}<span class="curseur" [class.cache]="phase() === 'plan'" aria-hidden="true"></span></p>
                @if (phase() === 'plan') {
                  <ol class="plan">
                    @for (p of e.plan; track p.quoi; let k = $index) {
                      <li [style.--k]="k">
                        <span class="quand">{{ p.quand }}</span>
                        <span>{{ p.quoi }}</span>
                      </li>
                    }
                  </ol>
                  @if (e.accord) {
                    <p class="accord" [style.--k]="e.plan.length">{{ e.accord }}</p>
                  }
                }
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .phrase {
      width: 100%;
      padding: 16px 20px;
      border-radius: 18px;
      border: 1px solid rgb(157 193 207 / 0.22);
      text-align: left;
      font-size: 1.02rem;
      color: var(--color-neige);
      transition:
        border-color 300ms var(--ease-dobby),
        background 300ms var(--ease-dobby);
    }
    .phrase:hover {
      border-color: var(--color-givre);
    }
    .phrase[aria-pressed='true'] {
      background: rgb(184 226 242 / 0.1);
      border-color: var(--color-givre);
    }
    .conversation {
      min-height: 460px;
      padding: clamp(20px, 3vw, 36px);
      border-radius: var(--radius-bloc);
      background: linear-gradient(160deg, rgb(64 78 84 / 0.5), rgb(21 29 32 / 0.6));
      border: 1px solid rgb(157 193 207 / 0.14);
    }
    .vous {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-left: auto;
      width: fit-content;
      max-width: 100%;
      padding: 12px 18px;
      border-radius: 20px 20px 6px 20px;
      background: var(--color-givre);
      color: var(--color-nuit);
      font-weight: 600;
    }
    .onde {
      display: flex;
      align-items: center;
      gap: 2px;
      height: 26px;
      flex: none;
    }
    .onde i {
      width: 2.5px;
      border-radius: 2px;
      background: currentColor;
      transform: scaleY(0.35);
      transition: transform 300ms;
    }
    .onde.anime i {
      animation: parle 0.5s ease-in-out infinite alternate;
    }
    .onde.anime i:nth-child(3n) {
      animation-delay: -0.2s;
    }
    .onde.anime i:nth-child(4n + 1) {
      animation-delay: -0.35s;
    }
    @keyframes parle {
      from {
        transform: scaleY(0.25);
      }
      to {
        transform: scaleY(1);
      }
    }
    .dobby {
      margin-top: 28px;
    }
    .reponse {
      margin-top: 12px;
      min-height: 2.4em;
      font-family: var(--font-display);
      font-size: clamp(1.6rem, 2.6vw, 2.2rem);
      line-height: 1.2;
      color: var(--color-neige);
    }
    .curseur {
      display: inline-block;
      width: 2px;
      height: 0.9em;
      margin-left: 4px;
      vertical-align: -0.1em;
      background: var(--color-givre);
      animation: clignote 1s steps(2) infinite;
    }
    .curseur.cache {
      display: none;
    }
    @keyframes clignote {
      50% {
        opacity: 0;
      }
    }
    .plan {
      margin-top: 26px;
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgb(157 193 207 / 0.16);
    }
    .plan li,
    .accord {
      animation: entre 700ms var(--ease-dobby) both;
      animation-delay: calc(var(--k) * 260ms);
    }
    .plan li {
      display: grid;
      grid-template-columns: minmax(7.5rem, auto) 1fr;
      gap: 16px;
      padding: 14px 0;
      border-bottom: 1px solid rgb(157 193 207 / 0.16);
      color: var(--color-brume);
    }
    .quand {
      font-weight: 700;
      color: var(--color-givre);
      white-space: nowrap;
    }
    .accord {
      margin-top: 18px;
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--color-neige);
    }
    @keyframes entre {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
    }
  `,
})
export class Mission {
  protected readonly t = DOBBY.parler;
  protected readonly barres = [30, 55, 80, 45, 95, 60, 35, 70, 90, 50, 40, 75, 55, 30, 65, 85, 45, 25];
  protected readonly choix = signal(0);
  protected readonly phase = signal<Phase>('repos');
  protected readonly ecrit = signal('');
  protected readonly exemple = computed(() => this.t.exemples[this.choix()]);

  private readonly sound = inject(SoundService);
  private readonly state = inject(DobbyState);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private timers: number[] = [];

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      destroy.onDestroy(onceVisible(this.el.nativeElement.querySelector('.conversation')!, () => this.jouer(0), 0.5));
    });
    destroy.onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected jouer(i: number) {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.choix.set(i);
    this.ecrit.set('');
    this.sound.tick();
    const e = this.t.exemples[i];
    if (this.state.reducedMotion()) {
      this.ecrit.set(e.reponse);
      this.phase.set('plan');
      return;
    }
    this.phase.set('ecoute');
    this.timers.push(
      window.setTimeout(() => {
        this.phase.set('reponse');
        this.sound.say(e.reponse);
        let n = 0;
        const ecrire = () => {
          n++;
          this.ecrit.set(e.reponse.slice(0, n));
          if (n < e.reponse.length) this.timers.push(window.setTimeout(ecrire, 28));
          else this.timers.push(window.setTimeout(() => this.phase.set('plan'), 350));
        };
        ecrire();
      }, 1300),
    );
  }
}
