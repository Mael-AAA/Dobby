import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOBBY } from '../../content/dobby';
import { srcset } from '../../core/image-loader';
import { SoundService } from '../../core/sound.service';
import { DobbyFace } from '../../ui/dobby-face';

export type Finition = 'obsidienne' | 'nacre' | 'cuivre';

/** Le robot dans ses trois finitions (images préparées par scripts/images.mjs), avec le visage allumé. */
@Component({
  selector: 'app-robot-finition',
  imports: [NgOptimizedImage, DobbyFace],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="robot">
      @for (f of finitions; track f) {
        <img
          [ngSrc]="'finition-' + f"
          [ngSrcset]="sets"
          [sizes]="sizes()"
          fill
          [alt]="f === finition() ? 'Dobby en finition ' + nom(f) : ''"
          [attr.aria-hidden]="f !== finition()"
          [class.visible]="f === finition()"
        />
      }
      <app-dobby-face [vw]="1700" [vh]="4534" [cx]="443" [cy]="548" [s]="1" />
    </div>
  `,
  styles: `
    .robot {
      position: relative;
      width: 100%;
      aspect-ratio: 1700 / 4534;
      -webkit-mask-image: linear-gradient(to right, transparent 0, #000 16%);
      mask-image: linear-gradient(to right, transparent 0, #000 16%);
    }
    img {
      opacity: 0;
      transition: opacity 700ms var(--ease-dobby);
    }
    img.visible {
      opacity: 1;
    }
  `,
})
export class RobotFinition {
  readonly finition = input<Finition>('nacre');
  readonly sizes = input('(min-width: 1024px) 26vw, 60vw');
  protected readonly finitions: Finition[] = ['obsidienne', 'nacre', 'cuivre'];
  protected readonly sets = srcset('finition-nacre');
  protected nom(f: Finition) {
    return DOBBY.finitions.choix.find((c) => c.id === f)?.nom ?? f;
  }
}

/** Les trois pastilles. Le libellé du bouton de devis suit la finition choisie. */
@Component({
  selector: 'app-finitions',
  imports: [RouterLink, RobotFinition],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="band theme-encre overflow-hidden" aria-labelledby="finitions-titre">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:items-center">
        <div class="mx-auto w-[min(100%,300px)] lg:col-span-4 lg:col-start-2">
          <app-robot-finition [finition]="choix()" />
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <h2 id="finitions-titre" class="titre">{{ t.titre }}</h2>
          <div class="mt-10 flex flex-wrap gap-4" role="group" aria-label="Finition">
            @for (f of t.choix; track f.id) {
              <button type="button" class="pastille" [attr.aria-pressed]="choix() === f.id" (click)="choisir(f.id)">
                <span class="disque" [class]="f.id" aria-hidden="true"></span>
                <span class="text-left">
                  <span class="block font-semibold text-neige">{{ f.nom }}</span>
                  <span class="block text-sm text-lac">{{ f.detail }}</span>
                </span>
              </button>
            }
          </div>
          <p class="mt-10 max-w-xl text-brume">{{ t.mention }}</p>
          <div class="mt-8">
            <a class="btn btn-primaire" routerLink="/devis" [queryParams]="{ source: 'dobby-finition', finition: choix() }">
              {{ t.cta }} {{ nomChoisi() }}
            </a>
            <p class="note mt-3">{{ t.note }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .pastille {
      display: inline-flex;
      align-items: center;
      gap: 14px;
      min-height: 64px;
      padding: 10px 20px 10px 10px;
      border-radius: 999px;
      border: 1px solid rgb(157 193 207 / 0.25);
      transition: border-color 300ms var(--ease-dobby), background 300ms;
    }
    .pastille:hover {
      border-color: var(--color-givre);
    }
    .pastille[aria-pressed='true'] {
      border-color: var(--color-givre);
      background: rgb(184 226 242 / 0.08);
    }
    .disque {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15);
    }
    .obsidienne {
      background: radial-gradient(circle at 35% 30%, #4a5357, #15191b 60%, #050607);
    }
    .nacre {
      background: radial-gradient(circle at 35% 30%, #ffffff, #e3ebee 45%, #b9c6cc);
    }
    .cuivre {
      background: radial-gradient(circle at 35% 30%, #f2c9a2, #a8653b 55%, #5a2f17);
    }
  `,
})
export class Finitions {
  protected readonly t = DOBBY.finitions;
  /** Cuivre par défaut, comme le Dobby du haut de l'accueil et de cette page */
  readonly choix = model<Finition>('cuivre');
  private readonly sound = inject(SoundService);
  protected readonly nomChoisi = computed(() => this.t.choix.find((c) => c.id === this.choix())?.nom ?? '');

  protected choisir(id: string) {
    this.choix.set(id as Finition);
    this.sound.tick();
  }
}
