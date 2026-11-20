import { Injectable, signal } from '@angular/core';

/** États partagés par tous les « visages » de Dobby sur le site. */
@Injectable({ providedIn: 'root' })
export class DobbyState {
  /** Arrêt d'urgence déclenché par le visiteur */
  readonly stopped = signal(false);
  /** Volet des caméras fermé (section Zones privées) : les yeux se couvrent partout */
  readonly shutter = signal(false);
  /** L'écran d'entrée est terminé : l'accueil peut lancer son animation */
  readonly introDone = signal(false);
  /** Menu mobile ouvert */
  readonly menuOpen = signal(false);

  readonly reducedMotion = signal(
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  readonly finePointer = signal(typeof matchMedia !== 'undefined' && matchMedia('(pointer: fine)').matches);

  constructor() {
    if (typeof matchMedia === 'undefined') return;
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => this.reducedMotion.set(e.matches));
    matchMedia('(pointer: fine)').addEventListener('change', (e) => this.finePointer.set(e.matches));
  }
}
