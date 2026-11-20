import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DobbyState } from '../core/dobby-state.service';
import { nombre } from '../core/fr';
import { onceVisible } from './reveal.directive';

/** Compteur qui défile de 0 à sa valeur quand il apparaît. Le nombre final est lu par les lecteurs d'écran. */
@Component({
  selector: 'app-count',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'tabular-nums' },
  template: `<span aria-hidden="true">{{ shown() }}</span><span class="sr-only">{{ final() }}</span>`,
})
export class CountUp {
  readonly value = input.required<number>();
  readonly decimals = input(0);
  readonly duration = input(1800);
  readonly progress = output<number>();

  protected readonly shown = signal('0');
  protected readonly final = signal('');
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly state = inject(DobbyState);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.final.set(nombre(this.value(), this.decimals()));
      if (this.state.reducedMotion()) {
        this.shown.set(this.final());
        this.progress.emit(1);
        return;
      }
      this.shown.set(nombre(0, this.decimals()));
      const stop = onceVisible(this.el.nativeElement, () => this.run(), 0.5);
      destroy.onDestroy(stop);
    });
  }

  private run() {
    const t0 = performance.now();
    const d = this.duration();
    const v = this.value();
    const step = (t: number) => {
      if (this.state.stopped()) {
        requestAnimationFrame(step);
        return;
      }
      const p = Math.min(1, (t - t0) / d);
      const e = 1 - Math.pow(1 - p, 3);
      this.shown.set(nombre(v * e, this.decimals()));
      this.progress.emit(e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
