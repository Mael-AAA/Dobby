import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Téléphone dessiné en CSS (pas d'image). Son écran montre l'application Dobby de deux façons :
 * - rendue en HTML sous la barre d'état dessinée (lisible, nette à toutes les tailles, animable) ;
 * - plein : une vraie capture de l'appli, qui a sa propre barre d'état, occupe tout l'écran.
 */
@Component({
  selector: 'app-phone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="coque" [class.allume]="on()" [style.width.px]="width()">
      <div class="ecran">
        @if (!plein()) {
          <div class="statut" aria-hidden="true">
            <span>{{ heure() }}</span>
            <span class="ilot"></span>
            <span class="flex items-center gap-1.5">
              <svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 9h2V7H1zm4 0h2V5H5zm4 0h2V3H9zm4 0h2V1h-2z" fill="currentColor"/></svg>
              <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x=".5" y=".5" width="18" height="10" rx="3" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="13" height="7" rx="1.5" fill="currentColor"/><path d="M20.5 4v3" stroke="currentColor" stroke-linecap="round" opacity=".5"/></svg>
            </span>
          </div>
        }
        <div class="contenu" [class.plein]="plein()">
          <ng-content />
        </div>
        <div class="reflet" aria-hidden="true"></div>
      </div>
    </div>
  `,
  styles: `
    .coque {
      position: relative;
      max-width: 100%;
      aspect-ratio: 9 / 19.2;
      padding: 11px;
      border-radius: 48px;
      background: linear-gradient(150deg, #3a464b, #12181b 45%, #2b363b);
      box-shadow:
        inset 0 0 0 1.5px rgb(157 193 207 / 0.25),
        0 40px 80px -30px rgb(0 0 0 / 0.7);
    }
    .ecran {
      position: relative;
      height: 100%;
      overflow: hidden;
      border-radius: 38px;
      background: #070a0b;
      color: var(--color-neige);
      display: flex;
      flex-direction: column;
    }
    .statut,
    .contenu {
      opacity: 0.08;
      filter: blur(1px);
      transition:
        opacity 900ms var(--ease-dobby),
        filter 900ms var(--ease-dobby);
    }
    .allume .statut,
    .allume .contenu {
      opacity: 1;
      filter: none;
    }
    .allume .ecran {
      background: var(--color-nuit);
    }
    .statut {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 22px 6px;
      font-size: 12px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .ilot {
      width: 76px;
      height: 22px;
      border-radius: 999px;
      background: #000;
    }
    .contenu {
      position: relative;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
    .contenu.plein {
      position: absolute;
      inset: 0;
    }
    .reflet {
      pointer-events: none;
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, rgb(255 255 255 / 0.07), transparent 38%);
    }
  `,
})
export class Phone {
  readonly on = input(true);
  readonly heure = input('18:45');
  readonly width = input(300);
  /** Écran plein : le contenu (une capture de l'appli) remplit tout l'écran, sans la barre d'état dessinée */
  readonly plein = input(false);
}
