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
} from '@angular/core';
import { gsap } from 'gsap';
import { MAISON } from '../../content/maison';
import { srcset } from '../../core/image-loader';
import { Facade } from '../../features/accueil/facade';
import { CtaBlock } from '../../ui/cta-block';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

@Component({
  selector: 'app-maison',
  imports: [NgOptimizedImage, Reveal, CtaBlock, Facade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './maison.html',
  styleUrl: './maison.css',
})
export class Maison {
  protected readonly t = MAISON;
  protected readonly sets = srcset('nuque');
  protected readonly maisonAllumee = signal(false);
  protected readonly annee = signal(0);
  private readonly frise = viewChild<ElementRef<HTMLElement>>('frise');
  private readonly piste = viewChild<ElementRef<HTMLElement>>('piste');
  private readonly crete = viewChild<ElementRef<SVGSVGElement>>('crete');
  protected readonly creteVue = signal(false);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      setTimeout(() => this.maisonAllumee.set(true), 700);
      const c = this.crete()?.nativeElement;
      if (c) destroy.onDestroy(onceVisible(c, () => this.creteVue.set(true), 0.4));

      // La frise avance au défilement : sur ordinateur, la section s'épingle et la frise glisse
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const f = this.frise()?.nativeElement;
        const p = this.piste()?.nativeElement;
        if (!f || !p) return;
        const distance = () => p.scrollWidth - f.clientWidth + 96;
        const tween = gsap.to(p, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: f,
            start: 'top top+=90',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (s) => this.annee.set(Math.min(this.t.histoire.dates.length - 1, Math.floor(s.progress * this.t.histoire.dates.length))),
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(p, { clearProps: 'transform' });
        };
      });
      destroy.onDestroy(() => mm.revert());
    });
  }
}
