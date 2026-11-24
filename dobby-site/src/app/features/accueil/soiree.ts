import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ACCUEIL } from '../../content/accueil';
import { ScrollService } from '../../core/scroll.service';
import { DobbyFace } from '../../ui/dobby-face';
import { Coche } from '../../ui/icons';
import { LitPhoto } from '../../ui/lit-photo';

/** Position de chaque étape dans le défilement de la section épinglée */
const REPERES = [0.03, 0.29, 0.55, 0.8];

/**
 * « Une soirée avec Dobby » : faire défiler, c'est faire passer le temps.
 * L'horloge roule de 17 h 52 à 19 h 30, le ciel passe du crépuscule à la nuit,
 * chaque tâche accomplie allume une pièce.
 */
@Component({
  selector: 'app-soiree',
  imports: [LitPhoto, Coche, DobbyFace],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './soiree.html',
  styleUrl: './soiree.css',
})
export class Soiree {
  protected readonly t = ACCUEIL.soiree;
  protected readonly progress = signal(0);
  protected readonly pinned = signal(false);
  private readonly pin = viewChild<ElementRef<HTMLElement>>('pin');
  private readonly scroll = inject(ScrollService);
  private trigger?: ScrollTrigger;

  protected readonly step = computed(() => {
    const p = this.progress();
    let s = 0;
    REPERES.forEach((r, i) => {
      if (p >= r - 0.02) s = i;
    });
    return s;
  });

  /** minutes depuis minuit, interpolées entre les étapes */
  protected readonly minutes = computed(() => {
    const p = this.progress();
    const m = this.t.etapes.map((e) => e.minutes);
    if (p <= REPERES[0]) return m[0];
    for (let i = 0; i < REPERES.length - 1; i++) {
      if (p < REPERES[i + 1]) {
        const k = (p - REPERES[i]) / (REPERES[i + 1] - REPERES[i]);
        return Math.round(m[i] + (m[i + 1] - m[i]) * k);
      }
    }
    return m[m.length - 1];
  });

  protected readonly chiffres = computed(() => {
    const h = Math.floor(this.minutes() / 60);
    const mn = this.minutes() % 60;
    return [Math.floor(h / 10), h % 10, Math.floor(mn / 10), mn % 10];
  });

  protected readonly nuit = computed(() => Math.min(1, this.progress() / 0.85));
  protected readonly fin = computed(() => this.progress() > 0.9);
  protected readonly digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const el = this.pin()?.nativeElement;
        if (!el) return;
        this.pinned.set(true);
        this.trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: '+=320%',
          pin: true,
          onUpdate: (s) => this.progress.set(s.progress),
        });
        return () => {
          this.trigger?.kill();
          this.trigger = undefined;
          this.pinned.set(false);
          this.progress.set(1);
        };
      });
      if (!this.pinned()) this.progress.set(1);
      destroy.onDestroy(() => mm.revert());
    });
  }

  /** Aller directement à une heure de la soirée */
  protected aller(i: number) {
    const st = this.trigger;
    if (!st) return;
    const y = st.start + (st.end - st.start) * (REPERES[i] + 0.02);
    this.scroll.to(y, 0);
  }
}
