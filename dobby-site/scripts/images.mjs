// Prépare les images du site à partir du dossier ../Image
// - retouche : marques et filigranes masqués (clonage du tissu voisin)
// - deux versions par photo : « jour » (couleurs réelles) et « nuit » (dégradé de la palette Couleur.png)
// - trois finitions du robot détouré : nacre, obsidienne, cuivre
// Lancer : node scripts/images.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = new URL('../../Image/', import.meta.url);
const OUT = new URL('../public/img/', import.meta.url);
const src = (f) => decodeURIComponent(new URL(f, SRC).pathname).replace(/^\/([A-Za-z]:)/, '$1');
const out = (f) => decodeURIComponent(new URL(f, OUT).pathname).replace(/^\/([A-Za-z]:)/, '$1');

// Palette Couleur.png, de l'ombre à la lumière, prolongée par deux ombres de la même teinte
const NUIT = [
  [0.0, '#0b1012'],
  [0.18, '#1b2427'],
  [0.36, '#2b363b'],
  [0.52, '#404e54'],
  [0.66, '#5f747d'],
  [0.78, '#7e9aa6'],
  [0.9, '#9dc1cf'],
  [1.0, '#c9ebf7'],
];
const OBSIDIENNE = [
  [0.0, '#050607'],
  [0.45, '#15191b'],
  [0.75, '#2c3336'],
  [0.9, '#465055'],
  [1.0, '#6c777c'],
];
const CUIVRE = [
  [0.0, '#0a0605'],
  [0.2, '#24130b'],
  [0.45, '#6b3a20'],
  [0.7, '#a8653b'],
  [0.88, '#d39a6c'],
  [1.0, '#f2c9a2'],
];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

function lut(stops) {
  const t = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const v = i / 255;
    let k = 0;
    while (k < stops.length - 2 && v > stops[k + 1][0]) k++;
    const [p0, c0] = stops[k];
    const [p1, c1] = stops[k + 1];
    const f = Math.min(1, Math.max(0, (v - p0) / (p1 - p0)));
    const a = hex(c0);
    const b = hex(c1);
    for (let c = 0; c < 3; c++) t[i * 3 + c] = Math.round(a[c] + (b[c] - a[c]) * f);
  }
  return t;
}

async function gradientMap(input, stops, gamma = 1) {
  const table = lut(stops);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const l = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    const k = Math.min(255, Math.round(Math.pow(l, gamma) * 255)) * 3;
    data[i] = table[k];
    data[i + 1] = table[k + 1];
    data[i + 2] = table[k + 2];
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

// Masque rectangulaire aux bords adoucis : le cœur couvre entièrement la marque
function rectMask(w, h, f) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${f / 2.6}"/></filter>
      <rect x="${f * 0.55}" y="${f * 0.55}" width="${w - f * 1.1}" height="${h - f * 1.1}" rx="${f * 0.5}" fill="#fff" filter="url(#b)"/>
    </svg>`,
  );
}

// Recouvre une zone (x, y, w, h) avec le tissu pris à (sx, sy), bord fondu sur f pixels
async function cloneLayer(base, { x, y, w, h, sx, sy, f = 24 }) {
  const box = { left: x - f, top: y - f, width: w + 2 * f, height: h + 2 * f };
  const srcBox = { left: sx - f, top: sy - f, width: box.width, height: box.height };
  // même luminosité que le tissu autour de la marque : gain calculé sur la couronne extérieure
  const tgt = await sharp(base).extract(box).removeAlpha().raw().toBuffer();
  const sb = await sharp(base).extract(srcBox).removeAlpha().raw().toBuffer();
  const sumT = [0, 0, 0];
  const sumS = [0, 0, 0];
  for (let r = 0; r < box.height; r++)
    for (let c = 0; c < box.width; c++) {
      if (c > f - 4 && c < f + w + 4 && r > f - 4 && r < f + h + 4) continue;
      const i = (r * box.width + c) * 3;
      for (let k = 0; k < 3; k++) {
        sumT[k] += tgt[i + k];
        sumS[k] += sb[i + k];
      }
    }
  const gain = sumT.map((t, k) => t / Math.max(1, sumS[k]));
  const piece = await sharp(base).extract(srcBox).linear([...gain, 1], [0, 0, 0, 0]).png().toBuffer();
  const masked = await sharp(piece)
    .composite([{ input: rectMask(box.width, box.height, f), blend: 'dest-in' }])
    .png()
    .toBuffer();
  return { input: masked, left: box.left, top: box.top };
}

// Efface les petites marques sombres : on ne remplace que les pixels nettement plus foncés que le médian local
async function inpaintLayer(base, { x, y, w, h, win = 21, delta = 20, grow = 2 }) {
  const reg = await sharp(base).extract({ left: x, top: y, width: w, height: h }).removeAlpha().raw().toBuffer();
  const med = await sharp(
    await sharp(base).extract({ left: x, top: y, width: w, height: h }).removeAlpha().png().toBuffer(),
  )
    .median(win)
    .raw()
    .toBuffer();
  const L = (b, i) => 0.2126 * b[i] + 0.7152 * b[i + 1] + 0.0722 * b[i + 2];
  const hit = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) hit[i] = L(med, i * 3) - L(reg, i * 3) > delta ? 1 : 0;
  // dilatation maison (carré de rayon grow) : on couvre aussi le liseré antialiasé des lettres
  const mask = Buffer.alloc(w * h);
  for (let r = 0; r < h; r++)
    for (let c = 0; c < w; c++) {
      let on = 0;
      for (let dr = -grow; dr <= grow && !on; dr++)
        for (let dc = -grow; dc <= grow && !on; dc++) {
          const rr = r + dr;
          const cc = c + dc;
          if (rr >= 0 && rr < h && cc >= 0 && cc < w && hit[rr * w + cc]) on = 1;
        }
      mask[r * w + c] = on ? 255 : 0;
    }
  const soft = await sharp(mask, { raw: { width: w, height: h, channels: 1 } })
    .blur(1.2)
    .extractChannel(0)
    .raw()
    .toBuffer();
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = med[i * 3];
    rgba[i * 4 + 1] = med[i * 3 + 1];
    rgba[i * 4 + 2] = med[i * 3 + 2];
    rgba[i * 4 + 3] = soft[i];
  }
  return { input: await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer(), left: x, top: y };
}

function paintLayer({ cx, cy, r, color, inner = 0.62 }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${r * 2}" height="${r * 2}">
    <defs><radialGradient id="g" cx="50%" cy="50%" r="50%">
      <stop offset="${inner}" stop-color="${color}" stop-opacity="1"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="${r * 2}" height="${r * 2}" fill="url(#g)"/></svg>`;
  return { input: Buffer.from(svg), left: cx - r, top: cy - r };
}

async function retouch(input, { clones = [], inpaints = [], paints = [] } = {}) {
  const base = await sharp(input).ensureAlpha().png().toBuffer();
  const layers = [];
  for (const c of clones) layers.push(await cloneLayer(base, c));
  for (const p of inpaints) layers.push(await inpaintLayer(base, p));
  for (const p of paints) layers.push(paintLayer(p));
  return layers.length ? sharp(base).composite(layers).png().toBuffer() : base;
}

async function save(buffer, name, widths, { quality = 80, alpha = false } = {}) {
  for (const w of widths) {
    await sharp(buffer)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality, alphaQuality: alpha ? 90 : 100, effort: 5 })
      .toFile(out(`${name}-${w}.webp`));
  }
}

async function both(buffer, name, widths, gamma = 1.08, alpha = false) {
  await save(buffer, name, widths, { alpha });
  await save(await gradientMap(buffer, NUIT, gamma), `${name}-nuit`, widths, { alpha });
}

await mkdir(out(''), { recursive: true });

// 1. Le robot détouré : visière repeinte, logos et marquages du torse recouverts de tissu
const pied = await retouch(src('Dobby.webp'), {
  clones: [
    // logo du torse, recouvert par le tissu pris à droite
    // (sources choisies par recherche du meilleur raccord de la maille, voir notes en bas)
    { x: 374, y: 1542, w: 156, h: 286, sx: 693, sy: 1566, f: 30 },
    // « F.03 »
    { x: 372, y: 1976, w: 162, h: 68, sx: 573, sy: 1986, f: 26 },
    // étiquette basse
    { x: 370, y: 3044, w: 144, h: 50, sx: 583, sy: 3043, f: 22 },
    // diode violette sous le col
    { x: 382, y: 1456, w: 138, h: 24, sx: 573, sy: 1454, f: 20 },
  ],
  // le logo lumineux de la visière disparaît : le visage de Dobby est dessiné en SVG par-dessus
  paints: [{ cx: 443, cy: 563, r: 165, color: '#13171a' }],
});

// Buste retourné pour le haut de l'accueil (le robot sort du cadre par la droite)
const buste = await sharp(pied).extract({ left: 0, top: 0, width: 1600, height: 2600 }).flop().png().toBuffer();
await both(buste, 'dobby-buste', [700, 1200], 1.05, true);

// Pied complet (tête aux cuisses) et trois finitions
const entier = await sharp(pied).extract({ left: 0, top: 0, width: 1700, height: 4534 }).png().toBuffer();
await both(entier, 'dobby-pied', [560, 960], 1.05, true);
await save(entier, 'finition-nacre', [560, 960], { alpha: true });
await save(await gradientMap(entier, OBSIDIENNE, 1.1), 'finition-obsidienne', [560, 960], { alpha: true });
await save(await gradientMap(entier, CUIVRE, 1.05), 'finition-cuivre', [560, 960], { alpha: true });

// 2. La nuque : recadrage qui écarte les deux filigranes
const nuque = await sharp(src('Dobby tête.png')).extract({ left: 260, top: 0, width: 1300, height: 1078 }).png().toBuffer();
await both(nuque, 'nuque', [700, 1300]);

// 3. Linge (chambre, fenêtre)
const linge = await retouch(src('Dobby linge.png'), {
  inpaints: [
    { x: 198, y: 478, w: 52, h: 96, win: 23 },
    { x: 382, y: 492, w: 66, h: 84, win: 41, delta: 18 },
    { x: 362, y: 582, w: 56, h: 34, win: 19 },
  ],
});
await both(linge, 'linge', [600, 1066]);

// 4. Linge, chambre beige
const linge2 = await retouch(src('Dobby linge 2.png'), {
  inpaints: [
    { x: 982, y: 252, w: 46, h: 74, win: 31, delta: 16 },
    { x: 982, y: 324, w: 42, h: 28, win: 17, delta: 16 },
    { x: 1162, y: 286, w: 44, h: 74, win: 19, delta: 16 },
  ],
});
await both(linge2, 'linge2', [800, 1672]);

// 5. Vaisselle (cuisine)
const vaisselle = await retouch(src('Dobby vaisselle.png'), {
  inpaints: [
    { x: 1000, y: 326, w: 32, h: 66, win: 19, delta: 16 },
    { x: 1074, y: 304, w: 34, h: 62, win: 27, delta: 16 },
  ],
});
await both(vaisselle, 'vaisselle', [900, 1842]);

// 6. Mur #MonDobby : neuf cadrages carrés
const tiles = [
  ['vaisselle', vaisselle, { left: 1040, top: 470, width: 380, height: 380 }],
  ['vaisselle-couloir', vaisselle, { left: 640, top: 40, width: 330, height: 330 }],
  ['vaisselle-fleurs', vaisselle, { left: 1120, top: 250, width: 330, height: 330 }],
  ['linge-mains', linge, { left: 470, top: 640, width: 560, height: 560 }],
  ['linge-visiere', linge, { left: 380, top: 120, width: 420, height: 420 }],
  ['linge2-rideaux', linge2, { left: 860, top: 0, width: 600, height: 600 }],
  ['linge2-lit', linge2, { left: 380, top: 330, width: 560, height: 560 }],
  ['nuque-tissu', nuque, { left: 300, top: 560, width: 518, height: 518 }],
  ['nuque-profil', nuque, { left: 440, top: 0, width: 640, height: 640 }],
];
for (const [name, buf, box] of tiles) {
  const sq = await sharp(buf).extract(box).resize(560, 560).png().toBuffer();
  await save(sq, `mur-${name}`, [560], { quality: 76 });
}

// 7. Icône d'application et image de partage (le visage de Dobby sur sa visière)
const faceSvg = (w, h, cx, cy, s = 1) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${14 * s}" result="b"/>
  <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <g filter="url(#g)">
    <ellipse cx="${cx - 70 * s}" cy="${cy}" rx="${24 * s}" ry="${40 * s}" fill="#b8e2f2"/>
    <ellipse cx="${cx + 70 * s}" cy="${cy}" rx="${24 * s}" ry="${40 * s}" fill="#b8e2f2"/>
    <path d="M ${cx - 76 * s} ${cy + 94 * s} Q ${cx} ${cy + 134 * s} ${cx + 76 * s} ${cy + 94 * s}" stroke="#e7f3f9" stroke-width="${13 * s}" stroke-linecap="round" fill="none"/>
  </g></svg>`;
{
  const busteNuit = await gradientMap(buste, NUIT, 1.05);
  const lit = await sharp(busteNuit).composite([{ input: Buffer.from(faceSvg(1600, 2600, 1150, 548)) }]).png().toBuffer();
  const part = await sharp(lit).extract({ left: 520, top: 0, width: 1080, height: 1300 }).resize({ height: 630 }).png().toBuffer();
  const meta = await sharp(part).metadata();
  const logo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="260" height="260" viewBox="0 0 100 100">
    <ellipse cx="34" cy="36" rx="8.4" ry="14" fill="#b8e2f2"/><ellipse cx="66" cy="36" rx="8.4" ry="14" fill="#b8e2f2"/>
    <path d="M27 66 Q50 82 73 66" fill="none" stroke="#e7f3f9" stroke-width="6" stroke-linecap="round"/></svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0d1316' } })
    .composite([
      { input: part, left: 1200 - meta.width, top: 0 },
      { input: logo, left: 120, top: 185 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out('og.jpg'));
  const icon = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#151d20"/>
    <ellipse cx="22.5" cy="25" rx="5.4" ry="9" fill="#b8e2f2"/><ellipse cx="41.5" cy="25" rx="5.4" ry="9" fill="#b8e2f2"/>
    <path d="M18.5 41.5 Q32 51 45.5 41.5" fill="none" stroke="#e7f3f9" stroke-width="4" stroke-linecap="round"/></svg>`);
  await sharp(icon).png().toFile(decodeURIComponent(new URL('../public/apple-touch-icon.png', import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1'));
}

console.log('Images prêtes dans public/img');

// Notes
// - Le décalage des clones du torse a été trouvé en comparant la maille autour de chaque marque
//   avec des zones candidates (somme des écarts au carré la plus faible).
// - Les photos sources montrent le robot Figure 03 : marques retirées, mais à remplacer par les
//   visuels Dobby définitifs dès qu'ils existent (voir section 17 du document de contenu).
