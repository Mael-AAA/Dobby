import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ACCUEIL } from '../../content/accueil';
import { CHIFFRES } from '../../content/site';
import { DobbyState } from '../../core/dobby-state.service';
import { CountUp } from '../../ui/count-up';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

interface Win {
  x: number;
  y: number;
  a: number;
}

/**
 * Les chiffres clés, chacun avec son image de lumière :
 * 3 200 foyers = 3 200 fenêtres allumées, 19 h = 19 cases sur 168, 98 % = 98 regards sur 100, 0 = un œil.
 */
@Component({
  selector: 'app-chiffres',
  imports: [CountUp, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './chiffres.html',
  styleUrl: './chiffres.css',
})
export class Chiffres {
  protected readonly t = ACCUEIL.chiffres;
  protected readonly n = CHIFFRES;
  protected readonly jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  protected readonly heures = Array.from({ length: 24 }, (_, h) => h);
  /** soirs de semaine de 18 h à 21 h, matinées du week-end : 19 heures */
  protected readonly rendue = (j: number, h: number) => (j < 5 ? h >= 18 && h <= 20 : h === 10 || h === 11);
  protected readonly regards = Array.from({ length: 100 }, (_, i) => ({ i, k: (i % 25) + Math.floor(i / 25) * 2 }));
  protected readonly vu = signal(false);

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('ville');
  private readonly grille = viewChild<ElementRef<HTMLElement>>('grille');
  private readonly state = inject(DobbyState);
  private windows: Win[] = [];
  private lit = 0;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.dessiner();
      const ro = new ResizeObserver(() => {
        this.dessiner();
        this.allumer(this.lit / Math.max(1, this.windows.length), true);
      });
      const c = this.canvas()?.nativeElement;
      if (c) ro.observe(c);
      const g = this.grille()?.nativeElement;
      const stop = g ? onceVisible(g, () => this.vu.set(true), 0.4) : () => {};
      if (this.state.reducedMotion()) this.vu.set(true);
      destroy.onDestroy(() => {
        ro.disconnect();
        stop();
      });
    });
  }

  /** La ville : des immeubles de hauteurs variées, exactement 3 200 fenêtres */
  private dessiner() {
    const c = this.canvas()?.nativeElement;
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = c.clientWidth;
    const H = c.clientHeight;
    c.width = Math.round(W * dpr);
    c.height = Math.round(H * dpr);
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    let s = 42;
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const cellW = Math.max(3, W / 150);
    const cellH = cellW * 1.25;
    const wins: Win[] = [];
    let x = 0;
    while (x < W) {
      const bw = Math.round(cellW * (5 + Math.floor(rnd() * 9)));
      const bh = Math.round(H * (0.35 + rnd() * 0.62));
      ctx.fillStyle = rnd() > 0.5 ? '#36444a' : '#3a4950';
      ctx.fillRect(x, H - bh, bw - 2, bh);
      for (let wy = H - bh + cellH * 0.8; wy < H - cellH; wy += cellH) {
        for (let wx = x + cellW * 0.6; wx < x + bw - cellW; wx += cellW) {
          wins.push({ x: wx, y: wy, a: 0.55 + rnd() * 0.45 });
        }
      }
      x += bw + Math.round(rnd() * 4);
    }
    // mélange puis on garde 3 200 fenêtres
    for (let i = wins.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [wins[i], wins[j]] = [wins[j], wins[i]];
    }
    this.windows = wins.slice(0, CHIFFRES.foyers);
    ctx.fillStyle = '#2b363b';
    for (const w of this.windows) ctx.fillRect(w.x, w.y, cellW * 0.55, cellH * 0.5);
    this.cell = { w: cellW * 0.55, h: cellH * 0.5 };
  }

  private cell = { w: 2, h: 2 };

  protected allumer(p: number, redraw = false) {
    const c = this.canvas()?.nativeElement;
    const ctx = c?.getContext('2d');
    if (!ctx) return;
    const cible = Math.round(p * this.windows.length);
    const from = redraw ? 0 : this.lit;
    for (let i = from; i < cible; i++) {
      const w = this.windows[i];
      ctx.fillStyle = `rgba(184, 226, 242, ${w.a})`;
      ctx.fillRect(w.x, w.y, this.cell.w, this.cell.h);
    }
    this.lit = Math.max(this.lit, cible);
  }
}
