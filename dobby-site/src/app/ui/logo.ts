import { ChangeDetectionStrategy, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { DobbyState } from '../core/dobby-state.service';
import { centerOf, useBlink, useGaze } from './gaze';

/**
 * Logo « La présence » : deux yeux en ovales verticaux (3 pour 5) et un sourire à bouts ronds,
 * sans tête ni contour. Nom DOBBY en Italiana, espacé de 30 %.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'inline-flex items-center',
    '[class.flex-col]': "variant() === 'stack'",
    '[style.gap]': "variant() === 'stack' ? size() * 0.32 + 'px' : size() * 0.34 + 'px'",
  },
  template: `
    <svg
      #svg
      viewBox="0 0 100 100"
      [attr.width]="size()"
      [attr.height]="size()"
      class="overflow-visible"
      [class.eteint]="state.stopped()"
      [class.voile]="state.shutter()"
      aria-hidden="true"
    >
      <g #eyes>
        <g class="yeux">
          <ellipse class="oeil" cx="34" cy="36" rx="8.4" ry="14" />
          <ellipse class="oeil" cx="66" cy="36" rx="8.4" ry="14" />
        </g>
      </g>
      <rect class="volet" x="18" y="16" width="64" height="0" rx="3" />
      <path class="sourire" d="M27 66 Q50 82 73 66" />
    </svg>
    @if (variant() !== 'symbol') {
      <span
        class="mot font-display text-neige"
        [style.font-size.px]="variant() === 'stack' ? size() * 0.42 : size() * 0.62"
        >DOBBY</span
      >
    }
  `,
  styles: `
    .yeux {
      fill: var(--color-givre);
      filter: drop-shadow(0 0 2.5px rgb(184 226 242 / 0.85));
      transition: fill 300ms, filter 300ms;
    }
    .sourire {
      fill: none;
      stroke: var(--color-neige);
      stroke-width: 6;
      stroke-linecap: round;
    }
    .volet {
      fill: var(--color-orage);
      transition: height 500ms var(--ease-dobby);
    }
    .voile .volet {
      height: 42px;
    }
    .eteint .yeux {
      fill: var(--color-ardoise);
      filter: none;
    }
    .eteint .oeil {
      transform: scaleY(0.12);
    }
    .mot {
      letter-spacing: 0.3em;
      margin-right: -0.3em;
      line-height: 1;
    }
  `,
})
export class Logo {
  readonly variant = input<'horizontal' | 'stack' | 'symbol'>('horizontal');
  readonly size = input(30);
  readonly follow = input(true);

  protected readonly state = inject(DobbyState);
  private readonly svg = viewChild<ElementRef<SVGSVGElement>>('svg');
  private readonly eyes = viewChild<ElementRef<SVGGElement>>('eyes');

  constructor() {
    useGaze({
      target: () => (this.follow() ? this.eyes()?.nativeElement : undefined),
      center: () => centerOf(this.svg()?.nativeElement),
      max: () => ({ x: 4.5, y: 3.2 }),
      reach: 520,
    });
    useBlink(() => this.svg()?.nativeElement, 2200 + Math.random() * 2000);
  }
}
