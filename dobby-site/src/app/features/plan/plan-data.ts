/**
 * Le plan d'appartement commun aux pages Découvrir, Sécurité et Application.
 * Coordonnées dans un viewBox 600 × 400 : une rangée de pièces en haut, un couloir, une rangée en bas.
 */
export interface Piece {
  id: string;
  nom: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** porte, sur le mur qui donne sur le couloir */
  porte: { x: number; y: number };
}

export const COULOIR_Y = 200;
export const STATION = { x: 560, y: COULOIR_Y };

export const PIECES: Piece[] = [
  { id: 'salon', nom: 'Salon', x: 20, y: 20, w: 240, h: 150, porte: { x: 150, y: 170 } },
  { id: 'cuisine', nom: 'Cuisine', x: 260, y: 20, w: 160, h: 150, porte: { x: 340, y: 170 } },
  { id: 'bureau', nom: 'Bureau', x: 420, y: 20, w: 160, h: 150, porte: { x: 500, y: 170 } },
  { id: 'entree', nom: 'Entrée', x: 20, y: 230, w: 120, h: 150, porte: { x: 80, y: 230 } },
  { id: 'bain', nom: 'Salle de bains', x: 140, y: 230, w: 120, h: 150, porte: { x: 200, y: 230 } },
  { id: 'enfants', nom: 'Chambre des enfants', x: 260, y: 230, w: 160, h: 150, porte: { x: 340, y: 230 } },
  { id: 'parents', nom: 'Chambre parentale', x: 420, y: 230, w: 160, h: 150, porte: { x: 500, y: 230 } },
];

export const piece = (id: string) => PIECES.find((p) => p.id === id) ?? PIECES[0];
export const centre = (p: Piece) => ({ x: p.x + p.w / 2, y: p.y + p.h / 2 + (p.y < COULOIR_Y ? -8 : 8) });

/** Murs : chaque pièce est un rectangle, la porte laisse une ouverture de 36 */
export function murs(p: Piece): string {
  const o = 18;
  const { x, y, w, h, porte } = p;
  const haut = porte.y === y;
  // on part de la porte et on fait le tour
  if (haut) {
    return `M ${porte.x + o} ${y} H ${x + w} V ${y + h} H ${x} V ${y} H ${porte.x - o}`;
  }
  return `M ${porte.x - o} ${y + h} H ${x} V ${y} H ${x + w} V ${y + h} H ${porte.x + o}`;
}

export interface Pt {
  x: number;
  y: number;
}

/** Trajet couloir → porte → centre de la pièce → porte → couloir */
export function visite(p: Piece): Pt[] {
  const c = centre(p);
  return [
    { x: p.porte.x, y: COULOIR_Y },
    { x: p.porte.x, y: p.porte.y },
    c,
    { x: p.porte.x, y: p.porte.y },
    { x: p.porte.x, y: COULOIR_Y },
  ];
}

/** Ronde de Dobby dans toutes les pièces autorisées, en partant de sa station */
export function ronde(autorisees: Piece[]): Pt[] {
  const ordre = [...autorisees].sort((a, b) => a.porte.x - b.porte.x || a.porte.y - b.porte.y);
  const pts: Pt[] = [STATION];
  for (const p of ordre) pts.push(...visite(p));
  pts.push(STATION);
  return pts;
}

export function longueur(pts: Pt[]): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return l;
}

/** Point situé à la distance d le long du trajet */
export function pointA(pts: Pt[], d: number): Pt {
  let reste = d;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const l = Math.hypot(b.x - a.x, b.y - a.y);
    if (reste <= l) {
      const k = l ? reste / l : 0;
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
    }
    reste -= l;
  }
  return pts[pts.length - 1];
}
