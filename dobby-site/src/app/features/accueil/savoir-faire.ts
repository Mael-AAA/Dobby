import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACCUEIL } from '../../content/accueil';
import { SoundService } from '../../core/sound.service';
import { Coche, Fleche } from '../../ui/icons';
import { Reveal } from '../../ui/reveal.directive';

/**
 * « Une phrase suffit » : cinq cartes, chacune montre une petite scène de la maison plutôt qu'une icône
 * (Dobby qui dresse la table, Dobby qui passe l'aspirateur, la photo de Plume, le thermostat, la demande d'accord).
 */
@Component({
  selector: 'app-savoir-faire',
  imports: [NgOptimizedImage, RouterLink, Reveal, Coche, Fleche],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './savoir-faire.html',
  styleUrl: './savoir-faire.css',
})
export class SavoirFaire {
  protected readonly t = ACCUEIL.savoirFaire;
  protected readonly c = this.t.cartes;
  protected readonly obj = {
    cuisine: this.c[0].objet as { alt: string },
    entretien: this.c[1].objet as { alt: string },
    animaux: this.c[2].objet as { entete: string; heure: string; note: string; alt: string },
    maison: this.c[3].objet as { entete: string; temperature: string; lignes: string[] },
    demarches: this.c[4].objet as {
      entete: string;
      ligne: string;
      montant: string;
      budget: string;
      accepter: string;
      refuser: string;
      accepte: string;
      refuse: string;
    },
  };

  private readonly sound = inject(SoundService);
  private readonly piste = viewChild<ElementRef<HTMLElement>>('piste');
  protected readonly avance = signal(0);
  protected readonly temp = signal(21);
  protected readonly accord = signal<'attente' | 'oui' | 'non'>('attente');
  /** arc du thermostat : de 16 °C à 26 °C sur 270° */
  protected readonly arc = computed(() => ((this.temp() - 16) / 10) * 0.75);

  private drag?: { x: number; left: number; moved: boolean };

  protected onScroll() {
    const el = this.piste()?.nativeElement;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    this.avance.set(max > 0 ? el.scrollLeft / max : 0);
  }

  protected defiler(sens: 1 | -1) {
    const el = this.piste()?.nativeElement;
    if (!el) return;
    const carte = el.querySelector<HTMLElement>('.carte-sf');
    el.scrollBy({ left: sens * ((carte?.offsetWidth ?? 360) + 20), behavior: 'smooth' });
  }

  protected down(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || (e.target as HTMLElement).closest('button')) return;
    const el = this.piste()?.nativeElement;
    if (!el) return;
    this.drag = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
    el.classList.add('saisie');
  }

  protected move(e: PointerEvent) {
    const el = this.piste()?.nativeElement;
    if (!this.drag || !el) return;
    const dx = e.clientX - this.drag.x;
    if (Math.abs(dx) > 4) this.drag.moved = true;
    el.scrollLeft = this.drag.left - dx;
  }

  protected up(e: PointerEvent) {
    const el = this.piste()?.nativeElement;
    el?.classList.remove('saisie');
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    this.drag = undefined;
  }

  protected chauffer(d: number) {
    this.temp.update((t) => Math.min(26, Math.max(16, t + d)));
    this.sound.tick();
  }

  protected repondre(oui: boolean) {
    this.accord.set(oui ? 'oui' : 'non');
    this.sound.tick();
  }
}
