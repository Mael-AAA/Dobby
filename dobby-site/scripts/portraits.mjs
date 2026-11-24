// Portraits des fondateurs, à partir des photos sur fond blanc du dossier ../Image
// - le fond blanc devient transparent : le site pose les portraits sur un fond clair de la palette
// - même cadrage pour les deux (format 5/8, haut de la tête à 11,7 % du cadre, tête de taille voisine)
// Lancer : node scripts/portraits.mjs
import sharp from 'sharp';

const SRC = new URL('../../Image/', import.meta.url);
const OUT = new URL('../public/img/', import.meta.url);
const chemin = (base, f) => decodeURIComponent(new URL(f, base).pathname).replace(/^\/([A-Za-z]:)/, '$1');

/**
 * Détourage d'une photo déjà détourée puis aplatie sur du blanc :
 * 1. le blanc relié aux bords de l'image devient transparent ;
 * 2. sur un liseré de 2 px autour de la silhouette, on retire le blanc mélangé aux cheveux
 *    (« couleur vers alpha »), pour éviter un halo clair sur le fond du site.
 */
async function detoure(fichier, { seuil = 24, bande = 2, opaque = 110 } = {}) {
  const { data, info } = await sharp(fichier).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const n = w * h;
  // écart au blanc : 0 pour un blanc pur
  const ecart = new Uint8Array(n);
  for (let i = 0; i < n; i++) ecart[i] = 255 - Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);

  // 1. remplissage depuis les bords
  const fond = new Uint8Array(n);
  const pile = [];
  const ajoute = (i) => {
    if (!fond[i] && ecart[i] < seuil) {
      fond[i] = 1;
      pile.push(i);
    }
  };
  for (let x = 0; x < w; x++) {
    ajoute(x);
    ajoute((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    ajoute(y * w);
    ajoute(y * w + w - 1);
  }
  while (pile.length) {
    const i = pile.pop();
    const x = i % w;
    if (x > 0) ajoute(i - 1);
    if (x < w - 1) ajoute(i + 1);
    if (i >= w) ajoute(i - w);
    if (i < n - w) ajoute(i + w);
  }

  // 2. distance au fond (deux passes), pour repérer le liseré
  const dist = new Float32Array(n).map((_, i) => (fond[i] ? 0 : 1e9));
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (x > 0) dist[i] = Math.min(dist[i], dist[i - 1] + 1);
      if (y > 0) dist[i] = Math.min(dist[i], dist[i - w] + 1);
    }
  for (let y = h - 1; y >= 0; y--)
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x;
      if (x < w - 1) dist[i] = Math.min(dist[i], dist[i + 1] + 1);
      if (y < h - 1) dist[i] = Math.min(dist[i], dist[i + w] + 1);
    }

  // 3. transparence, et couleur du liseré débarrassée du blanc
  const rgba = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const a = fond[i] ? 0 : dist[i] <= bande ? Math.min(1, ecart[i] / opaque) : 1;
    for (let c = 0; c < 3; c++) {
      const v = data[i * 3 + c];
      rgba[i * 4 + c] = a > 0.02 && a < 1 ? Math.max(0, Math.round(255 - (255 - v) / a)) : v;
    }
    rgba[i * 4 + 3] = Math.round(a * 255);
  }
  // bord adouci d'un demi-pixel
  const flou = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).extractChannel(3).blur(0.6).raw().toBuffer();
  for (let i = 0; i < n; i++) if (rgba[i * 4 + 3] > 0) rgba[i * 4 + 3] = Math.round((rgba[i * 4 + 3] + flou[i]) / 2);
  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
}

async function portrait(source, nom, cadre) {
  const detoure_ = await detoure(chemin(SRC, source));
  const base = await sharp(detoure_).extract(cadre).resize(540, 864, { kernel: 'lanczos3' }).sharpen({ sigma: 0.5 }).png().toBuffer();
  for (const largeur of [360, 540]) {
    await sharp(base)
      .resize({ width: largeur })
      .webp({ quality: 84, alphaQuality: 90, effort: 5 })
      .toFile(chemin(OUT, `${nom}-${largeur}.webp`));
  }
}

// Cadres au format 5/8 : haut de la tête à 11,7 % de la hauteur, visage centré
// (Maël : photo 648 × 864 ; Theddy : photo 389 × 864, bras croisés)
await portrait('Fondateur Maël.png', 'fondateur-mael', { left: 30, top: 0, width: 540, height: 864 });
await portrait('Fondateur Theddy.png', 'fondateur-theddy', { left: 16, top: 146, width: 357, height: 571 });

console.log('Portraits prêts dans public/img');
