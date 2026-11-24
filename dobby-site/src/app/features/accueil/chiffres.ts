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
import { DobbyFace } from '../../ui/dobby-face';
import { LitPhoto } from '../../ui/lit-photo';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

/**
 * Les chiffres clés, chacun avec son image de lumière :
 * 3 200 foyers = un salon équipé qui s'allume pendant que le compteur monte, 19 h = 19 cases sur 168,
 * 98 % = 98 regards sur 100, 0 = un œil.
 */
@Component({
  selector: 'app-chiffres',
  imports: [CountUp, Reveal, LitPhoto, DobbyFace],
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
  /** La photo du salon s'allume, et le visage de Dobby avec elle, dès que le compteur des foyers démarre */
  protected readonly foyerAllume = signal(false);

  private readonly grille = viewChild<ElementRef<HTMLElement>>('grille');
  private readonly state = inject(DobbyState);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const g = this.grille()?.nativeElement;
      const stop = g ? onceVisible(g, () => this.vu.set(true), 0.4) : () => {};
      if (this.state.reducedMotion()) this.vu.set(true);
      destroy.onDestroy(stop);
    });
  }

  protected allumer(p: number) {
    if (p > 0) this.foyerAllume.set(true);
  }
}
