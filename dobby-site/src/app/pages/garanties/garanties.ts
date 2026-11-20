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
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { GARANTIES } from '../../content/garanties';
import { DobbyState } from '../../core/dobby-state.service';
import { CtaBlock } from '../../ui/cta-block';
import { Coche } from '../../ui/icons';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

@Component({
  selector: 'app-garanties',
  imports: [RouterLink, Reveal, CtaBlock, Coche],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './garanties.html',
  styleUrl: './garanties.css',
})
export class Garanties {
  protected readonly t = GARANTIES;
  private readonly state = inject(DobbyState);
  protected readonly signe = signal(false);
  protected readonly avance = signal(0);
  private readonly frise = viewChild<ElementRef<HTMLElement>>('frise');
  private readonly contrat = viewChild<ElementRef<HTMLElement>>('contrat');

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const c = this.contrat()?.nativeElement;
      if (c) destroy.onDestroy(onceVisible(c, () => setTimeout(() => this.signe.set(true), 600), 0.55));

      // La frise de l'installation se remplit au fil du défilement
      const f = this.frise()?.nativeElement;
      if (!f) return;
      if (this.state.reducedMotion()) {
        this.avance.set(1);
        return;
      }
      const st = gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: f,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true,
            onUpdate: (s) => this.avance.set(s.progress),
          },
        },
      );
      destroy.onDestroy(() => {
        st.scrollTrigger?.kill();
        st.kill();
      });
    });
  }
}
