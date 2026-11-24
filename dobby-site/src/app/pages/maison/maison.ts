import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { MAISON } from '../../content/maison';
import { srcset } from '../../core/image-loader';
import { CtaBlock } from '../../ui/cta-block';
import { Defilement } from '../../ui/defilement.directive';
import { DobbyFace } from '../../ui/dobby-face';
import { Fleche } from '../../ui/icons';
import { LitPhoto } from '../../ui/lit-photo';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

@Component({
  selector: 'app-maison',
  imports: [NgOptimizedImage, Reveal, CtaBlock, LitPhoto, DobbyFace, Defilement, Fleche],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './maison.html',
  styleUrl: './maison.css',
})
export class Maison {
  protected readonly t = MAISON;
  protected readonly sets = srcset('nuque');
  /** La photo du haut (Dobby à la porte) s'allume peu après l'arrivée sur la page, et son visage avec elle */
  protected readonly photoAllumee = signal(false);
  private readonly crete = viewChild<ElementRef<SVGSVGElement>>('crete');
  protected readonly creteVue = signal(false);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      setTimeout(() => this.photoAllumee.set(true), 700);
      const c = this.crete()?.nativeElement;
      if (c) destroy.onDestroy(onceVisible(c, () => this.creteVue.set(true), 0.4));
    });
  }
}
