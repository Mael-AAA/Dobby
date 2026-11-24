import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { Provider } from '@angular/core';

/** Largeurs disponibles pour chaque image générée par scripts/images.mjs */
export const LARGEURS: Record<string, number[]> = {
  'dobby-buste': [700, 1200],
  'dobby-buste-cuivre': [700, 1200],
  'dobby-pied': [560, 960],
  'finition-nacre': [560, 960],
  'finition-obsidienne': [560, 960],
  'finition-cuivre': [560, 960],
  nuque: [700, 1300],
  linge: [600, 1066],
  linge2: [800, 1672],
  vaisselle: [900, 1842],
  // portraits des fondateurs, préparés par scripts/portraits.mjs
  'fondateur-mael': [360, 540],
  'fondateur-theddy': [360, 540],
  // Plume, le chat (photo envoyée par Dobby, sans version nuit), le comité d'éthique, Dobby à la porte
  plume: [600, 900],
  comite: [700, 1000, 1400],
  porte: [1200, 1492],
  salon: [700, 1200, 1672],
  // Dobby aux fourneaux (soirée de l'accueil), Dobby dresse la table et passe l'aspirateur (cartes de l'accueil)
  fourneaux: [1200, 1672],
  table: [600, 1100],
  aspirateur: [600, 1100],
};

export function largeurs(nom: string): number[] {
  const base = nom.replace(/-nuit$/, '');
  // captures de la vraie application (scripts/captures-appli.mjs) : écran de 390 points, simple et double densité
  if (base.startsWith('appli-')) return [390, 780];
  return LARGEURS[base] ?? [560];
}

export function srcset(nom: string): string {
  return largeurs(nom)
    .map((w) => `${w}w`)
    .join(', ');
}

/** ngSrc="linge-nuit" + largeur demandée → /img/linge-nuit-1066.webp */
export const provideDobbyImages = (): Provider => ({
  provide: IMAGE_LOADER,
  useValue: (config: ImageLoaderConfig) => {
    const dispo = largeurs(config.src);
    const voulu = config.width ?? dispo[dispo.length - 1];
    const w = dispo.find((d) => d >= voulu) ?? dispo[dispo.length - 1];
    return `/img/${config.src}-${w}.webp`;
  },
});
