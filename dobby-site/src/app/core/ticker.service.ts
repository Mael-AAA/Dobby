import { Injectable, inject } from '@angular/core';
import { DobbyState } from './dobby-state.service';

export type Tick = (time: number, dt: number) => void;

/** Une seule boucle requestAnimationFrame pour tout le site, figée pendant l'arrêt d'urgence. */
@Injectable({ providedIn: 'root' })
export class Ticker {
  private readonly state = inject(DobbyState);
  private readonly fns = new Set<Tick>();
  private raf = 0;
  private last = 0;

  add(fn: Tick): () => void {
    this.fns.add(fn);
    if (!this.raf) this.raf = requestAnimationFrame(this.loop);
    return () => this.fns.delete(fn);
  }

  private loop = (t: number) => {
    const dt = this.last ? Math.min(64, t - this.last) : 16;
    this.last = t;
    if (!this.state.stopped() && !document.hidden) {
      for (const fn of this.fns) fn(t, dt);
    }
    if (this.fns.size) {
      this.raf = requestAnimationFrame(this.loop);
    } else {
      this.raf = 0;
      this.last = 0;
    }
  };
}
