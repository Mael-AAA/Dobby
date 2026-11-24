import { DestroyRef, Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { DobbyState } from '../core/dobby-state.service';

/**
 * Bande qui défile à l'horizontale, pilotée par des flèches (précédent, suivant),
 * au doigt ou au pavé tactile. Les éléments défilés sont les <li> de la liste contenue.
 * Exemple : <div appDefilement #bande="defilement"> … <button (click)="bande.suivant()">
 */
@Directive({
  selector: '[appDefilement]',
  exportAs: 'defilement',
  host: {
    '(scroll)': 'mesurer()',
    '[class.au-debut]': 'debut()',
    '[class.a-la-fin]': 'fin()',
  },
})
export class Defilement {
  /** la bande est tout à gauche : la flèche « précédent » ne sert à rien */
  readonly debut = signal(true);
  /** la bande est tout à droite : la flèche « suivant » ne sert à rien */
  readonly fin = signal(false);
  /** rang du dernier élément visible à l'écran */
  readonly dernierVisible = signal(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly state = inject(DobbyState);
  private image = 0;

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      this.mesurer();
      const ro = new ResizeObserver(() => this.mesurer());
      ro.observe(this.el.nativeElement);
      destroy.onDestroy(() => {
        ro.disconnect();
        cancelAnimationFrame(this.image);
      });
    });
  }

  suivant() {
    this.decaler(1);
  }

  precedent() {
    this.decaler(-1);
  }

  /** un cran = la distance entre deux éléments voisins */
  private decaler(sens: 1 | -1) {
    const items = this.items();
    if (!items.length) return;
    const pas = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].offsetWidth;
    this.el.nativeElement.scrollBy({ left: sens * pas, behavior: this.state.reducedMotion() ? 'auto' : 'smooth' });
  }

  protected mesurer() {
    cancelAnimationFrame(this.image);
    this.image = requestAnimationFrame(() => {
      const el = this.el.nativeElement;
      const max = el.scrollWidth - el.clientWidth;
      this.debut.set(el.scrollLeft <= 2);
      this.fin.set(el.scrollLeft >= max - 2);
      // un élément compte comme visible dès que ses 40 premiers pour cent sont à l'écran
      const droite = el.getBoundingClientRect().right;
      let dernier = 0;
      this.items().forEach((it, i) => {
        const r = it.getBoundingClientRect();
        if (r.left + r.width * 0.4 <= droite) dernier = i;
      });
      this.dernierVisible.set(dernier);
    });
  }

  private items(): HTMLElement[] {
    return Array.from(this.el.nativeElement.querySelectorAll<HTMLElement>(':scope > ol > li, :scope > ul > li'));
  }
}
