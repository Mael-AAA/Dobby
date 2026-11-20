import { Injectable, inject } from '@angular/core';
import { gsap } from 'gsap';
import { DobbyState } from './dobby-state.service';
import { ScrollService } from './scroll.service';
import { SoundService } from './sound.service';

/**
 * L'arrêt d'urgence, version site : un clic et tout se fige.
 * Animations CSS, animations GSAP, boucle d'images, défilement fluide et son s'arrêtent net.
 */
@Injectable({ providedIn: 'root' })
export class StopService {
  private readonly state = inject(DobbyState);
  private readonly scroll = inject(ScrollService);
  private readonly sound = inject(SoundService);
  private returnFocus: HTMLElement | null = null;

  trigger() {
    if (this.state.stopped()) return;
    this.returnFocus = document.activeElement as HTMLElement | null;
    this.sound.clac();
    this.sound.cut(true);
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    gsap.globalTimeline.pause();
    this.scroll.freeze(true);
    document.documentElement.classList.add('is-stopped');
    this.state.stopped.set(true);
  }

  resume() {
    if (!this.state.stopped()) return;
    document.documentElement.classList.remove('is-stopped');
    gsap.globalTimeline.resume();
    this.scroll.freeze(false);
    this.sound.cut(false);
    this.state.stopped.set(false);
    this.returnFocus?.focus?.({ preventScroll: true });
  }
}
