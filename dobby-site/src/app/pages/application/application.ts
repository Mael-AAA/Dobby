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
import { APPLICATION } from '../../content/application';
import { StopService } from '../../core/stop.service';
import { DemoTache } from '../../features/application/demo-tache';
import { Journal } from '../../features/application/journal';
import { CtaBlock } from '../../ui/cta-block';
import { Fleche } from '../../ui/icons';
import { Phone } from '../../ui/phone';
import { Reveal } from '../../ui/reveal.directive';

@Component({
  selector: 'app-application',
  imports: [Reveal, Phone, Fleche, CtaBlock, DemoTache, Journal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  templateUrl: './application.html',
  styleUrl: './application.css',
})
export class ApplicationPage {
  protected readonly t = APPLICATION;
  private readonly stop = inject(StopService);
  protected readonly ecran = signal(false);
  protected readonly residence = signal(0);
  private readonly rail = viewChild<ElementRef<HTMLElement>>('rail');

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      // l'écran s'allume au premier défilement (ou de lui-même après trois secondes)
      const id = setTimeout(() => this.ecran.set(true), 3000);
      destroy.onDestroy(() => clearTimeout(id));
    });
  }

  protected onScroll() {
    if (!this.ecran() && window.scrollY > 40) this.ecran.set(true);
  }

  protected arreter() {
    this.stop.trigger();
  }

  protected allerResidence(i: number) {
    const n = this.t.residences.ecrans.length;
    const k = (i + n) % n;
    this.residence.set(k);
    const rail = this.rail()?.nativeElement;
    const cible = rail?.children[k] as HTMLElement | undefined;
    if (rail && cible) rail.scrollTo({ left: cible.offsetLeft - (rail.clientWidth - cible.clientWidth) / 2, behavior: 'smooth' });
  }

  protected suiviRail() {
    const rail = this.rail()?.nativeElement;
    if (!rail) return;
    const centreRail = rail.scrollLeft + rail.clientWidth / 2;
    let meilleur = 0;
    let ecart = Infinity;
    Array.from(rail.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - centreRail);
      if (d < ecart) {
        ecart = d;
        meilleur = i;
      }
    });
    if (meilleur !== this.residence()) this.residence.set(meilleur);
  }
}
