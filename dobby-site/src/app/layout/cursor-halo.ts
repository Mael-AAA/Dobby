import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { DobbyState } from '../core/dobby-state.service';
import { PointerService } from '../core/pointer.service';
import { Ticker } from '../core/ticker.service';

/** La lueur : un halo très doux suit le curseur sur ordinateur. Une seule à l'écran. */
@Component({
  selector: 'app-cursor-halo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    @if (state.finePointer() && !state.reducedMotion()) {
      <div #halo class="halo" aria-hidden="true"></div>
    }
  `,
  styles: `
    .halo {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 65;
      width: 560px;
      height: 560px;
      margin: -280px 0 0 -280px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(closest-side, rgb(184 226 242 / 0.085), rgb(184 226 242 / 0.03) 55%, transparent);
      opacity: 0;
      transition: opacity 600ms var(--ease-dobby);
      will-change: transform;
    }
  `,
})
export class CursorHalo {
  protected readonly state = inject(DobbyState);
  private readonly pointer = inject(PointerService);
  private readonly halo = viewChild<ElementRef<HTMLDivElement>>('halo');

  constructor() {
    let x = this.pointer.x;
    let y = this.pointer.y;
    const stop = inject(Ticker).add(() => {
      const el = this.halo()?.nativeElement;
      if (!el) return;
      x += (this.pointer.x - x) * 0.12;
      y += (this.pointer.y - y) * 0.12;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = this.pointer.inside ? '1' : '0';
    });
    inject(DestroyRef).onDestroy(stop);
  }
}
