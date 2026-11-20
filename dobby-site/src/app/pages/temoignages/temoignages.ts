import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CHIFFRES } from '../../content/site';
import { TEMOIGNAGES } from '../../content/temoignages';
import { SoundService } from '../../core/sound.service';
import { Film } from '../../features/temoignages/film';
import { CountUp } from '../../ui/count-up';
import { CtaBlock } from '../../ui/cta-block';
import { Reveal } from '../../ui/reveal.directive';

@Component({
  selector: 'app-temoignages',
  imports: [NgOptimizedImage, Reveal, CountUp, CtaBlock, Film],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './temoignages.html',
  styleUrl: './temoignages.css',
})
export class Temoignages {
  protected readonly t = TEMOIGNAGES;
  protected readonly n = CHIFFRES;
  private readonly sound = inject(SoundService);
  protected readonly filtre = signal<string>('tous');
  protected readonly cartes = computed(() =>
    this.filtre() === 'tous' ? this.t.cartes : this.t.cartes.filter((c) => c.id === this.filtre()),
  );
  protected readonly colonnes = [
    this.t.mur.photos.slice(0, 3),
    this.t.mur.photos.slice(3, 6),
    this.t.mur.photos.slice(6, 9),
  ];
  protected readonly etiquette = (id: string) => this.t.filtres.items.find((f) => f.id === id)?.label ?? '';

  protected filtrer(id: string) {
    this.filtre.set(this.filtre() === id ? 'tous' : id);
    this.sound.tick();
  }
}
