import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SECURITE } from '../../content/securite';
import { DobbyState } from '../../core/dobby-state.service';
import { ScrollService } from '../../core/scroll.service';
import { StopService } from '../../core/stop.service';
import { Flux } from '../../features/securite/flux';
import { Proximite } from '../../features/securite/proximite';
import { Zones } from '../../features/securite/zones';
import { CtaBlock } from '../../ui/cta-block';
import { Fleche } from '../../ui/icons';
import { LitPhoto } from '../../ui/lit-photo';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

@Component({
  selector: 'app-securite',
  imports: [RouterLink, Reveal, LitPhoto, CtaBlock, Fleche, Proximite, Flux, Zones],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './securite.html',
  styleUrl: './securite.css',
})
export class Securite {
  protected readonly t = SECURITE;
  protected readonly state = inject(DobbyState);
  private readonly stop = inject(StopService);
  private readonly scroll = inject(ScrollService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly actif = signal('physique');
  protected readonly essaye = signal(false);
  protected readonly niveau = signal(0);
  private readonly sections = viewChildren<ElementRef<HTMLElement>>('ancre');

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.actif.set((e.target as HTMLElement).id);
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      this.sections().forEach((s) => io.observe(s.nativeElement));
      // L'échelle IESD se remplit jusqu'au niveau 5
      const echelle = this.el.nativeElement.querySelector('.echelle');
      let timer = 0;
      const stopVu = echelle
        ? onceVisible(
            echelle,
            () => {
              const monte = () => {
                this.niveau.update((n) => n + 1);
                if (this.niveau() < 5) timer = window.setTimeout(monte, this.state.reducedMotion() ? 0 : 380);
              };
              monte();
            },
            0.5,
          )
        : () => {};
      destroy.onDestroy(() => {
        io.disconnect();
        stopVu();
        clearTimeout(timer);
      });
    });
  }

  protected aller(id: string) {
    this.scroll.to(`#${id}`, -140);
  }

  protected essayer() {
    this.essaye.set(true);
    this.stop.trigger();
  }
}
