import { Injectable } from '@angular/core';

/** Position du pointeur, lue à chaque image par les composants qui en ont besoin (regard, halo). */
@Injectable({ providedIn: 'root' })
export class PointerService {
  x = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  y = typeof window !== 'undefined' ? window.innerHeight / 3 : 0;
  inside = false;
  lastMove = 0;

  constructor() {
    if (typeof window === 'undefined') return;
    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType === 'touch') return;
        this.x = e.clientX;
        this.y = e.clientY;
        this.inside = true;
        this.lastMove = performance.now();
      },
      { passive: true },
    );
    document.documentElement.addEventListener('pointerleave', () => (this.inside = false));
    window.addEventListener('blur', () => (this.inside = false));
  }
}
