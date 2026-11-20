import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DOBBY } from '../../content/dobby';
import { srcset } from '../../core/image-loader';
import { Reveal } from '../../ui/reveal.directive';

/** Fiche technique : repères annotés sur le robot (survol, focus ou toucher) et tableau des caractéristiques. */
@Component({
  selector: 'app-fiche',
  imports: [NgOptimizedImage, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band border-t filet" aria-labelledby="fiche-titre">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:items-start">
        <div class="lg:col-span-5" appReveal>
          <div class="robot">
            <img ngSrc="dobby-pied-nuit" [ngSrcset]="sets" sizes="(min-width: 1024px) 34vw, 80vw" fill alt="Dobby en pied, de face, revêtement clair et visière sombre." />
            @for (r of t.reperes; track r.id) {
              <button
                type="button"
                class="repere"
                [style.left.%]="r.x"
                [style.top.%]="r.y"
                [attr.aria-expanded]="ouvert() === r.id"
                [attr.aria-controls]="'repere-' + r.id"
                (click)="basculer(r.id)"
                (mouseenter)="ouvert.set(r.id)"
                (focus)="ouvert.set(r.id)"
              >
                <span class="sr-only">{{ r.label }}</span>
              </button>
            }
            @if (actif(); as r) {
              <div class="bulle" [id]="'repere-' + r.id" role="note" [style.left.%]="r.x" [style.top.%]="r.y" [class.gauche]="r.x > 55">
                <p class="text-sm font-semibold text-givre">{{ r.label }}</p>
                <p class="mt-1 text-sm text-neige">{{ r.texte }}</p>
              </div>
            }
          </div>
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <h2 id="fiche-titre" class="titre" appReveal>{{ t.titre }}</h2>
          <p class="mt-4 text-brume" appReveal="1">{{ t.texte }}</p>
          <dl class="mt-10 border-t filet" appReveal="2">
            @for (l of t.lignes; track l.k) {
              <div class="ligne">
                <dt>{{ l.k }}</dt>
                <dd>{{ l.v }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
  styles: `
    .robot {
      position: relative;
      width: min(100%, 330px);
      margin-inline: auto;
      aspect-ratio: 1700 / 4534;
      -webkit-mask-image: linear-gradient(to right, transparent 0, #000 16%);
      mask-image: linear-gradient(to right, transparent 0, #000 16%);
    }
    .robot img {
      object-fit: contain;
    }
    .repere {
      position: absolute;
      z-index: 2;
      width: 30px;
      height: 30px;
      margin: -15px 0 0 -15px;
      border-radius: 50%;
      background: rgb(13 19 22 / 0.5);
      border: 2px solid var(--color-givre);
      box-shadow: 0 0 12px rgb(184 226 242 / 0.7);
      transition: transform 300ms var(--ease-dobby);
    }
    .repere::after {
      content: '';
      position: absolute;
      inset: 8px;
      border-radius: 50%;
      background: var(--color-givre);
    }
    .repere:hover,
    .repere[aria-expanded='true'] {
      transform: scale(1.15);
    }
    .bulle {
      position: absolute;
      z-index: 3;
      width: 220px;
      padding: 12px 14px;
      margin: 22px 0 0 -16px;
      border-radius: 14px;
      background: rgb(13 19 22 / 0.94);
      border: 1px solid rgb(184 226 242 / 0.3);
      pointer-events: none;
      animation: ouvre 400ms var(--ease-dobby) both;
    }
    .bulle.gauche {
      margin-left: -204px;
    }
    @keyframes ouvre {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
    }
    .ligne {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.3fr);
      gap: 20px;
      padding: 16px 0;
      border-bottom: 1px solid rgb(157 193 207 / 0.16);
    }
    dt {
      font-weight: 600;
      color: var(--color-neige);
    }
    dd {
      color: var(--color-brume);
    }
  `,
})
export class Fiche {
  protected readonly t = DOBBY.fiche;
  protected readonly sets = srcset('dobby-pied');
  protected readonly ouvert = signal<string>('visiere');
  protected readonly actif = computed(() => this.t.reperes.find((r) => r.id === this.ouvert()));

  protected basculer(id: string) {
    this.ouvert.update((o) => (o === id ? '' : id));
  }
}
