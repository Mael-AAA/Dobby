import { LowerCasePipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACCUEIL } from '../../content/accueil';
import { DobbyState } from '../../core/dobby-state.service';
import { ScrollService } from '../../core/scroll.service';
import { StopService } from '../../core/stop.service';
import { srcset } from '../../core/image-loader';
import { Chiffres } from '../../features/accueil/chiffres';
import { SavoirFaire } from '../../features/accueil/savoir-faire';
import { Soiree } from '../../features/accueil/soiree';
import { Temoins } from '../../features/accueil/temoins';
import { Chat } from '../../ui/chat';
import { CtaBlock } from '../../ui/cta-block';
import { DobbyFace } from '../../ui/dobby-face';
import { Fleche } from '../../ui/icons';
import { LitPhoto } from '../../ui/lit-photo';
import { Phone } from '../../ui/phone';
import { Reveal, onceVisible } from '../../ui/reveal.directive';

@Component({
  selector: 'app-accueil',
  imports: [
    NgOptimizedImage,
    LowerCasePipe,
    RouterLink,
    Reveal,
    DobbyFace,
    LitPhoto,
    Phone,
    Chat,
    Fleche,
    CtaBlock,
    Soiree,
    SavoirFaire,
    Chiffres,
    Temoins,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  protected readonly t = ACCUEIL;
  protected readonly state = inject(DobbyState);
  private readonly stop = inject(StopService);
  private readonly scroll = inject(ScrollService);

  protected readonly mots = ACCUEIL.hero.titre.split(' ');
  protected readonly sets = srcset('dobby-buste');
  /** l'animation d'ouverture démarre quand l'écran d'entrée est refermé */
  protected readonly go = signal(false);
  protected readonly regard = signal(false);
  protected readonly ecranAppli = signal(false);
  private readonly tel = viewChild<ElementRef<HTMLElement>>('tel');

  constructor() {
    const destroy = inject(DestroyRef);
    const timers: number[] = [];
    effect(() => {
      if (!this.state.introDone() || this.go()) return;
      const rapide = this.state.reducedMotion();
      timers.push(window.setTimeout(() => this.go.set(true), rapide ? 0 : 120));
      timers.push(window.setTimeout(() => this.regard.set(true), rapide ? 0 : 1500));
    });
    afterNextRender(() => {
      const el = this.tel()?.nativeElement;
      if (el) destroy.onDestroy(onceVisible(el, () => this.ecranAppli.set(true), 0.45));
    });
    destroy.onDestroy(() => timers.forEach(clearTimeout));
  }

  protected essayer() {
    this.stop.trigger();
  }

  protected descendre() {
    this.scroll.to('#reassurance', -40);
  }
}
