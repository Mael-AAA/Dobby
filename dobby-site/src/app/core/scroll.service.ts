import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filter } from 'rxjs';
import { DobbyState } from './dobby-state.service';

gsap.registerPlugin(ScrollTrigger);

/** Défilement fluide (Lenis) relié aux animations au défilement (GSAP ScrollTrigger). */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly router = inject(Router);
  private readonly state = inject(DobbyState);
  lenis?: Lenis;

  init() {
    if (!this.state.reducedMotion()) {
      this.lenis = new Lenis({ lerp: 0.11, smoothWheel: true, autoRaf: false });
      this.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => this.lenis?.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const fragment = this.router.parseUrl(this.router.url).fragment;
      if (fragment) {
        setTimeout(() => this.to(`#${fragment}`), 120);
      } else {
        this.top();
      }
      // les sections épinglées doivent recalculer leurs positions une fois la page dessinée
      setTimeout(() => ScrollTrigger.refresh(), 160);
      setTimeout(() => ScrollTrigger.refresh(), 900);
    });
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  top() {
    if (this.lenis) this.lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }

  to(target: string | HTMLElement | number, offset = -96) {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (el === null) return;
    if (this.lenis) {
      this.lenis.scrollTo(el, { offset, duration: 1.4, force: true });
    } else if (typeof el === 'number') {
      window.scrollTo({ top: el, behavior: 'auto' });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: this.state.reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  freeze(on: boolean) {
    if (on) this.lenis?.stop();
    else this.lenis?.start();
  }
}
