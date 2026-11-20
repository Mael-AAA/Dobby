import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SECURITE } from '../../content/securite';

/**
 * Ce qui reste, ce qui sort : les images, les sons et les habitudes tournent dans la maison sans jamais en sortir.
 * Seules vos instructions et les commandes validées traversent, chiffrées.
 */
@Component({
  selector: 'app-flux',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <figure class="schema" aria-labelledby="flux-legende">
      <div class="maison">
        <svg class="toit" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40 L100 2 L200 40" fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" />
        </svg>
        <p class="titre-boite">{{ s.maison }}</p>
        <ul class="dedans">
          @for (d of s.dedans; track d; let i = $index) {
            <li [style.--i]="i">{{ d }}</li>
          }
        </ul>
        <p class="mention"><span class="regard" aria-hidden="true"></span>{{ s.reste }}</p>
      </div>

      <div class="canal" aria-hidden="true">
        <span class="fil"></span>
        @for (p of paquets; track p) {
          <span class="paquet" [style.--p]="p">••••</span>
        }
      </div>

      <div class="serveurs">
        <p class="titre-boite">{{ s.dehors }}</p>
        <ul class="mt-4 flex flex-col gap-2">
          @for (o of s.sortent; track o) {
            <li class="sortie">{{ o }}</li>
          }
        </ul>
        <p class="mention">
          <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true"><rect x="1" y="7" width="12" height="8" rx="2" fill="currentColor" /><path d="M4 7V5a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
          {{ s.chiffre }}
        </p>
      </div>
      <figcaption id="flux-legende" class="sr-only">
        Chez vous, les images, les sons, les habitudes et le plan de la maison sont traités dans Dobby et ne sortent pas.
        Seules vos instructions et les commandes validées vont vers nos serveurs, chiffrées de bout en bout.
      </figcaption>
    </figure>
  `,
  styles: `
    .schema {
      display: grid;
      gap: 0;
      align-items: stretch;
    }
    @media (min-width: 768px) {
      .schema {
        grid-template-columns: minmax(0, 1.2fr) minmax(90px, 0.5fr) minmax(0, 1fr);
        align-items: center;
      }
    }
    .maison,
    .serveurs {
      position: relative;
      padding: 26px;
      border-radius: 20px;
      border: 1px solid rgb(157 193 207 / 0.25);
    }
    .maison {
      margin-top: 34px;
      background: rgb(184 226 242 / 0.06);
      color: var(--color-brume);
    }
    .toit {
      position: absolute;
      left: -1px;
      right: -1px;
      bottom: 100%;
      width: calc(100% + 2px);
      height: 34px;
      color: rgb(157 193 207 / 0.5);
    }
    .serveurs {
      background: rgb(64 78 84 / 0.3);
    }
    .titre-boite {
      font-family: var(--font-display);
      font-size: 1.8rem;
      color: var(--color-neige);
    }
    .dedans {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }
    .dedans li {
      padding: 6px 12px;
      border-radius: 999px;
      background: var(--color-nuit);
      border: 1px solid rgb(157 193 207 / 0.2);
      color: var(--color-neige);
      font-size: 0.85rem;
      animation: tourne 6s ease-in-out infinite;
      animation-delay: calc(var(--i) * -1.4s);
    }
    @keyframes tourne {
      0%,
      100% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(4px, -3px);
      }
      50% {
        transform: translate(-3px, 2px);
      }
      75% {
        transform: translate(2px, 3px);
      }
    }
    .mention {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 18px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-givre);
    }
    .sortie {
      padding: 8px 12px;
      border-radius: 12px;
      background: var(--color-nuit);
      color: var(--color-neige);
      font-size: 0.9rem;
    }
    .canal {
      position: relative;
      height: 90px;
      overflow: hidden;
    }
    .fil {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      border-left: 1px dashed rgb(184 226 242 / 0.5);
    }
    .paquet {
      position: absolute;
      left: 50%;
      top: 0;
      padding: 1px 6px;
      border-radius: 6px;
      background: var(--color-givre);
      color: var(--color-nuit);
      font-size: 0.6rem;
      letter-spacing: 1px;
      transform: translate(-50%, -20px);
      animation: passe-v 2.8s linear infinite;
      animation-delay: calc(var(--p) * -0.93s);
    }
    @keyframes passe-v {
      to {
        transform: translate(-50%, 100px);
      }
    }
    @media (min-width: 768px) {
      .canal {
        height: 40px;
      }
      .fil {
        left: 0;
        right: 0;
        top: 50%;
        bottom: auto;
        border-left: 0;
        border-top: 1px dashed rgb(184 226 242 / 0.5);
      }
      .paquet {
        left: 0;
        top: 50%;
        transform: translate(-40px, -50%);
        animation-name: passe-h;
      }
      @keyframes passe-h {
        to {
          transform: translate(calc(100cqi + 40px), -50%);
        }
      }
      .canal {
        container-type: inline-size;
      }
    }
  `,
})
export class Flux {
  protected readonly s = SECURITE.confidentialite.schema;
  protected readonly paquets = [0, 1, 2];
}
