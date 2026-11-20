import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input, viewChild } from '@angular/core';
import { DobbyState } from '../core/dobby-state.service';
import { svgPointOnScreen, useBlink, useGaze } from './gaze';

let uid = 0;

/**
 * Le visage de Dobby posé sur la visière d'une photo détourée.
 * Les coordonnées sont celles de l'image source (viewBox), pour tomber pile sur la visière
 * quel que soit le cadrage. Le sourire se dessine, puis les yeux s'allument.
 */
@Component({
  selector: 'app-dobby-face',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'pointer-events-none absolute inset-0 block' },
  template: `
    <svg
      #svg
      class="h-full w-full overflow-visible"
      [attr.viewBox]="'0 0 ' + vw() + ' ' + vh()"
      [attr.preserveAspectRatio]="align() + ' ' + fit()"
      [class.allume]="lit() && !state.stopped()"
      [class.voile]="state.shutter()"
      aria-hidden="true"
    >
      <defs>
        <filter [attr.id]="fid" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur [attr.stdDeviation]="14 * s()" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g [attr.filter]="'url(#' + fid + ')'">
        <g #eyes>
          <g class="yeux">
            <ellipse class="oeil" [attr.cx]="cx() - 70 * s()" [attr.cy]="cy()" [attr.rx]="24 * s()" [attr.ry]="40 * s()" />
            <ellipse class="oeil" [attr.cx]="cx() + 70 * s()" [attr.cy]="cy()" [attr.rx]="24 * s()" [attr.ry]="40 * s()" />
          </g>
        </g>
        <path class="sourire" pathLength="1" [attr.d]="smile()" [attr.stroke-width]="13 * s()" />
      </g>
      <rect
        class="volet"
        [attr.x]="cx() - 130 * s()"
        [attr.y]="cy() - 74 * s()"
        [attr.width]="260 * s()"
        [attr.height]="150 * s()"
        [attr.rx]="20 * s()"
      />
    </svg>
  `,
  styles: `
    .yeux {
      fill: var(--color-givre);
      opacity: 0;
      transition: opacity 900ms var(--ease-dobby) 650ms;
    }
    .sourire {
      fill: none;
      stroke: var(--color-neige);
      stroke-linecap: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 900ms var(--ease-dobby);
    }
    .allume .yeux {
      opacity: 1;
    }
    .allume .sourire {
      stroke-dashoffset: 0;
    }
    .volet {
      fill: #0b1012;
      transform-box: fill-box;
      transform-origin: top;
      transform: scaleY(0);
      transition: transform 600ms var(--ease-dobby);
    }
    .voile .volet {
      transform: scaleY(1);
    }
  `,
})
export class DobbyFace {
  readonly vw = input(1600);
  readonly vh = input(2600);
  readonly cx = input(1150);
  readonly cy = input(548);
  readonly s = input(1);
  readonly lit = input(true);
  readonly align = input('xMidYMid');
  readonly fit = input<'slice' | 'meet'>('slice');

  protected readonly state = inject(DobbyState);
  protected readonly fid = `lueur-${uid++}`;
  protected readonly smile = computed(() => {
    const s = this.s();
    const x = this.cx();
    const y = this.cy();
    return `M ${x - 76 * s} ${y + 94 * s} Q ${x} ${y + 134 * s} ${x + 76 * s} ${y + 94 * s}`;
  });

  private readonly svg = viewChild<ElementRef<SVGSVGElement>>('svg');
  private readonly eyes = viewChild<ElementRef<SVGGElement>>('eyes');

  constructor() {
    useGaze({
      target: () => this.eyes()?.nativeElement,
      center: () => svgPointOnScreen(this.svg()?.nativeElement, this.cx(), this.cy()),
      max: () => ({ x: 18 * this.s(), y: 11 * this.s() }),
      reach: 700,
    });
    useBlink(() => this.svg()?.nativeElement, 5200);
  }
}
