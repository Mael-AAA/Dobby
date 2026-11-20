import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Flèche fine des liens de lecture */
@Component({
  selector: 'app-fleche',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex', 'aria-hidden': 'true' },
  template: `<svg width="22" height="10" viewBox="0 0 22 10" fill="none">
    <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`,
})
export class Fleche {}

/** Le sourire du logo, utilisé comme coche de confirmation (il se dessine quand « done » passe à vrai) */
@Component({
  selector: 'app-coche',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex', 'aria-hidden': 'true' },
  template: `<svg [attr.width]="size()" [attr.height]="size() * 0.6" viewBox="0 0 40 24" fill="none">
    <path
      d="M5 9 Q20 25 35 9"
      pathLength="1"
      [class.trace]="done()"
      stroke="currentColor"
      [attr.stroke-width]="weight()"
      stroke-linecap="round"
    />
  </svg>`,
  styles: `
    path {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 700ms var(--ease-dobby);
    }
    path.trace {
      stroke-dashoffset: 0;
    }
  `,
})
export class Coche {
  readonly size = input(22);
  readonly done = input(true);
  readonly weight = input(3.2);
}

/** Icône son (haut-parleur avec ou sans ondes) */
@Component({
  selector: 'app-icone-son',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex', 'aria-hidden': 'true' },
  template: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 8v4h3l4 3.5v-11L6 8H3z" />
    @if (on()) {
      <path d="M13 7.5a3.5 3.5 0 0 1 0 5" />
      <path d="M15.5 5a7 7 0 0 1 0 10" />
    } @else {
      <path d="M13.5 8l4 4M17.5 8l-4 4" />
    }
  </svg>`,
})
export class IconeSon {
  readonly on = input(false);
}
