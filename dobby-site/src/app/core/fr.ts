// Typographie française appliquée à tout le contenu du site :
// espaces insécables avant « : ; ! ? », dans les guillemets, entre un nombre et son unité,
// séparateur de milliers, apostrophe typographique.
const NBSP = ' ';
const FINE = ' ';

const UNITES =
  '€|%|h|min|s|m|km|kg|N|dB|°C|ans?|jours?|semaines?|mois|minutes?|secondes?|heures?|foyers|pays|avis|couverts|recettes|langues|collaborateurs|experts|familles|personnes|enfants|étapes|questions|niveaux|pièces|résidences|fois|mètres?|degrés';

const UNITE = new RegExp(`(\\d) (?=(?:${UNITES})(?![\\p{L}\\d]))`, 'gu');

export function fr(s: string): string {
  return s
    .replace(/'/g, '’')
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`)
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;!?])/g, `${FINE}$1`)
    .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${FINE}`)
    .replace(/(\d{1,2}) h (\d{2})/g, `$1${NBSP}h${NBSP}$2`)
    .replace(UNITE, (_m, d: string) => `${d}${NBSP}`)
    .replace(/(\d) %/g, `$1${FINE}%`)
    .replace(/ (—|–) /g, `${NBSP}$1 `);
}

export function deepFr<T>(value: T): T {
  if (typeof value === 'string') return fr(value) as T;
  if (Array.isArray(value)) return value.map((v) => deepFr(v)) as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      // les liens et paramètres restent intacts
      out[k] = k === 'path' || k === 'params' || k === 'id' || k === 'img' || k === 'fragment' ? v : deepFr(v);
    }
    return out as T;
  }
  return value;
}

/** Nombre au format français : 3 200, 4,9 */
export function nombre(n: number, decimales = 0): string {
  const parts = n.toFixed(decimales).split('.');
  const entier = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, FINE);
  return parts[1] ? `${entier},${parts[1]}` : entier;
}

/** Pour la recherche : sans accents, sans casse, apostrophes unifiées */
export function plat(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, "'")
    .replace(/[  ]/g, ' ')
    .toLowerCase();
}
