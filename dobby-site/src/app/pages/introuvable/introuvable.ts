import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DobbyState } from '../../core/dobby-state.service';
import { PointerService } from '../../core/pointer.service';
import { SoundService } from '../../core/sound.service';
import { Ticker } from '../../core/ticker.service';

/** 404 : une chaussette flotte dans le noir, éclairée d'une lueur. Un clic, et elle s'envole. Dobby est libre. */
@Component({
  selector: 'app-introuvable',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page" aria-labelledby="libre-titre">
      <div class="lueur" aria-hidden="true"></div>
      <button #chaussette type="button" class="chaussette" [class.envol]="envol()" (click)="liberer()" aria-label="Lancer la chaussette">
        <svg viewBox="0 0 120 160" aria-hidden="true">
          <defs>
            <pattern id="tricot" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 4 Q2 0 4 4 T8 4" fill="none" stroke="#7e9aa6" stroke-width=".8" />
            </pattern>
          </defs>
          <path d="M38 6 h44 v86 q0 10 8 16 l14 11 q14 12 4 28 q-9 13 -26 6 l-44 -26 q-12 -8 -12 -22 V6z" fill="#9dc1cf" />
          <path d="M38 6 h44 v86 q0 10 8 16 l14 11 q14 12 4 28 q-9 13 -26 6 l-44 -26 q-12 -8 -12 -22 V6z" fill="url(#tricot)" opacity=".7" />
          <rect x="34" y="2" width="52" height="20" rx="6" fill="#e7f3f9" />
          <path d="M40 8 v10 M48 8 v10 M56 8 v10 M64 8 v10 M72 8 v10 M80 8 v10" stroke="#9dc1cf" stroke-width="1.5" />
          <path d="M84 128 q10 4 18 -2" fill="none" stroke="#e7f3f9" stroke-width="3" stroke-linecap="round" />
        </svg>
      </button>
      <div class="texte">
        <h1 id="libre-titre" class="titre-hero">Dobby est libre.</h1>
        <p class="intro mx-auto mt-6">Cette page a reçu une chaussette, et elle est partie. Revenons en terrain connu.</p>
        <a routerLink="/" class="btn btn-primaire mt-10">Retour à l’accueil</a>
      </div>
    </section>
  `,
  styles: `
    .page {
      position: relative;
      display: grid;
      place-items: center;
      min-height: 100svh;
      padding: 120px 20px 80px;
      overflow: hidden;
      background: var(--color-encre);
      text-align: center;
    }
    .lueur {
      position: absolute;
      left: 50%;
      top: 34%;
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: radial-gradient(closest-side, rgb(184 226 242 / 0.2), transparent);
      transform: translate(-50%, -50%);
    }
    .chaussette {
      position: relative;
      width: 150px;
      margin-bottom: 30px;
      cursor: pointer;
      transition: transform 1600ms cubic-bezier(0.5, 0, 0.2, 1), opacity 1600ms;
      filter: drop-shadow(0 0 24px rgb(184 226 242 / 0.35));
    }
    .chaussette svg {
      animation: flotte 5s ease-in-out infinite;
    }
    @keyframes flotte {
      0%,
      100% {
        transform: translateY(0) rotate(-8deg);
      }
      50% {
        transform: translateY(-18px) rotate(6deg);
      }
    }
    .chaussette.envol {
      transform: translate(40vw, -90vh) rotate(160deg) !important;
      opacity: 0;
    }
    .texte {
      position: relative;
    }
  `,
})
export class Introuvable {
  protected readonly envol = signal(false);
  private readonly chaussette = viewChild<ElementRef<HTMLElement>>('chaussette');
  private readonly sound = inject(SoundService);
  private readonly state = inject(DobbyState);

  constructor() {
    const pointer = inject(PointerService);
    let x = 0;
    let y = 0;
    // la chaussette suit le curseur, de loin, avec paresse
    const stop = inject(Ticker).add(() => {
      const el = this.chaussette()?.nativeElement;
      if (!el || this.envol() || this.state.reducedMotion()) return;
      const r = el.parentElement!.getBoundingClientRect();
      const tx = pointer.inside ? (pointer.x - (r.left + r.width / 2)) * 0.06 : 0;
      const ty = pointer.inside ? (pointer.y - (r.top + r.height / 3)) * 0.05 : 0;
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    inject(DestroyRef).onDestroy(stop);
  }

  protected liberer() {
    if (this.envol()) return;
    this.envol.set(true);
    this.sound.say('Dobby est libre.');
    setTimeout(() => {
      const el = this.chaussette()?.nativeElement;
      if (el) {
        el.style.transition = 'none';
        el.style.transform = 'translate(0, 40px)';
        el.style.opacity = '0';
      }
      this.envol.set(false);
      requestAnimationFrame(() => {
        if (!el) return;
        el.style.transition = '';
        el.style.opacity = '';
      });
    }, 2600);
  }
}
