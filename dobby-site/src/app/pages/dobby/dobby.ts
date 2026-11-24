import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DOBBY } from '../../content/dobby';
import { DobbyState } from '../../core/dobby-state.service';
import { srcset } from '../../core/image-loader';
import { ScrollService } from '../../core/scroll.service';
import { SoundService } from '../../core/sound.service';
import { Apprend } from '../../features/dobby/apprend';
import { Fiche } from '../../features/dobby/fiche';
import { Finitions } from '../../features/dobby/finitions';
import { Mission } from '../../features/dobby/mission';
import { Residences } from '../../features/dobby/residences';
import { Salon } from '../../features/dobby/salon';
import { CtaBlock } from '../../ui/cta-block';
import { DobbyFace } from '../../ui/dobby-face';
import { LitPhoto } from '../../ui/lit-photo';
import { Reveal } from '../../ui/reveal.directive';

@Component({
  selector: 'app-dobby',
  imports: [
    NgOptimizedImage,
    RouterLink,
    Reveal,
    DobbyFace,
    LitPhoto,
    CtaBlock,
    Mission,
    Salon,
    Apprend,
    Residences,
    Fiche,
    Finitions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dobby.html',
  styleUrl: './dobby.css',
})
export class DobbyPage {
  protected readonly t = DOBBY;
  /** Dobby en pied, en finition cuivre (même cadrage que dobby-pied) */
  protected readonly sets = srcset('finition-cuivre');
  protected readonly state = inject(DobbyState);
  private readonly scroll = inject(ScrollService);
  private readonly sound = inject(SoundService);

  protected readonly actif = signal('cuisine');
  protected readonly accord = signal<'attente' | 'oui' | 'non'>('attente');
  protected readonly lit = signal(false);

  private readonly hero = viewChild<ElementRef<HTMLElement>>('hero');
  private readonly robot = viewChild<ElementRef<HTMLElement>>('robot');
  private readonly blocs = viewChildren<ElementRef<HTMLElement>>('bloc');

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      setTimeout(() => this.lit.set(true), this.state.reducedMotion() ? 0 : 500);

      // Le haut de page : on part du visage, on recule jusqu'à la silhouette entière
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const h = this.hero()?.nativeElement;
        const r = this.robot()?.nativeElement;
        if (!h || !r) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: h, start: 'top top', end: '+=110%', pin: true, scrub: 0.6 },
        });
        tl.fromTo(r, { scale: 2.5 }, { scale: 1, ease: 'none' });
        tl.fromTo(h.querySelectorAll('.repere-hero'), { opacity: 0, x: -14 }, { opacity: 1, x: 0, stagger: 0.12, ease: 'none' }, 0.55);
        return () => tl.scrollTrigger?.kill();
      });

      // Sommaire des savoir-faire : l'entrée active suit la lecture
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.actif.set((e.target as HTMLElement).id.replace('sf-', ''));
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      this.blocs().forEach((b) => io.observe(b.nativeElement));
      destroy.onDestroy(() => {
        io.disconnect();
        mm.revert();
      });
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });
  }

  protected aller(id: string) {
    this.scroll.to(`#sf-${id}`, -120);
  }

  protected repondre(oui: boolean) {
    this.accord.set(oui ? 'oui' : 'non');
    this.sound.tick();
  }
}
