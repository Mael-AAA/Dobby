import { Injectable, signal } from '@angular/core';

export interface Choix {
  mesure: boolean;
  preferences: boolean;
  date: number;
}

const KEY = 'dobby-cookies';
const SIX_MOIS = 1000 * 60 * 60 * 24 * 182;

@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly choix = signal<Choix | null>(lire());
  readonly ouvert = signal(false);

  constructor() {
    if (!this.choix()) setTimeout(() => this.ouvert.set(true), 1600);
  }

  enregistrer(mesure: boolean, preferences: boolean) {
    const c = { mesure, preferences, date: Date.now() };
    this.choix.set(c);
    this.ouvert.set(false);
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {}
  }

  rouvrir() {
    this.ouvert.set(true);
  }
}

function lire(): Choix | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Choix;
    return Date.now() - c.date < SIX_MOIS ? c : null;
  } catch {
    return null;
  }
}
