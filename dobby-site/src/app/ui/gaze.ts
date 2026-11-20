import { DestroyRef, inject } from '@angular/core';
import { DobbyState } from '../core/dobby-state.service';
import { PointerService } from '../core/pointer.service';
import { Ticker } from '../core/ticker.service';

export interface Point {
  x: number;
  y: number;
}

/** Centre d'un élément à l'écran, ou rien s'il est hors de la fenêtre. */
export function centerOf(el: Element | undefined): Point | undefined {
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  if (r.bottom < -50 || r.top > innerHeight + 50 || r.width === 0) return undefined;
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/** Point (en coordonnées du viewBox) d'un SVG, converti en coordonnées écran. */
export function svgPointOnScreen(svg: SVGSVGElement | undefined, x: number, y: number): Point | undefined {
  if (!svg) return undefined;
  const r = svg.getBoundingClientRect();
  if (r.bottom < -50 || r.top > innerHeight + 50 || r.width === 0) return undefined;
  const m = svg.getScreenCTM();
  if (!m) return undefined;
  const p = new DOMPoint(x, y).matrixTransform(m);
  return { x: p.x, y: p.y };
}

/**
 * Le regard : décale un groupe SVG (les deux yeux) vers le pointeur, avec inertie.
 * Sans pointeur (tactile, ou souris immobile), le regard se promène doucement.
 * À appeler dans le constructeur d'un composant.
 */
export function useGaze(opts: {
  target: () => SVGGraphicsElement | undefined;
  center: () => Point | undefined;
  max: () => Point;
  reach?: number;
}) {
  const ticker = inject(Ticker);
  const pointer = inject(PointerService);
  const state = inject(DobbyState);
  const destroy = inject(DestroyRef);

  let x = 0;
  let y = 0;
  let wanderX = 0;
  let wanderY = 0;
  let nextWander = 0;
  const reach = opts.reach ?? 420;

  const stop = ticker.add((t) => {
    const g = opts.target();
    if (!g) return;
    const c = opts.center();
    if (!c) return;
    const max = opts.max();

    let tx = 0;
    let ty = 0;
    const recent = t - pointer.lastMove < 4000;
    if (state.finePointer() && pointer.inside && recent) {
      const dx = pointer.x - c.x;
      const dy = pointer.y - c.y;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / reach);
      tx = (dx / d) * k * max.x;
      ty = (dy / d) * k * max.y;
    } else if (!state.reducedMotion()) {
      if (t > nextWander) {
        wanderX = (Math.random() * 2 - 1) * max.x * 0.7;
        wanderY = (Math.random() * 2 - 1) * max.y * 0.5;
        nextWander = t + 2200 + Math.random() * 2600;
      }
      tx = wanderX;
      ty = wanderY;
    }
    x += (tx - x) * 0.09;
    y += (ty - y) * 0.09;
    g.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
  });
  destroy.onDestroy(stop);
}

/** Clignement lent, de temps en temps (un toutes les 12 à 24 secondes). Renvoie une fonction « cligner maintenant ». */
export function useBlink(el: () => Element | undefined, first = 2600) {
  const destroy = inject(DestroyRef);
  const state = inject(DobbyState);
  let timer = 0;
  const now = () => {
    const e = el();
    if (!e || state.stopped() || document.hidden) return;
    e.classList.remove('cligne');
    void e.getBoundingClientRect();
    e.classList.add('cligne');
    setTimeout(() => e.classList.remove('cligne'), 320);
  };
  const loop = () => {
    now();
    timer = window.setTimeout(loop, 12000 + Math.random() * 12000);
  };
  timer = window.setTimeout(loop, first);
  destroy.onDestroy(() => clearTimeout(timer));
  return now;
}
