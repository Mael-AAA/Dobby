// Captures de la vraie application Dobby, telle qu'elle est en ligne, pour la page Application du site
// - l'appli est ouverte comme sur un ordinateur : elle s'affiche alors dans un téléphone dessiné, avec sa barre d'état ;
//   on capture l'écran de ce téléphone (390 × 844 points, en double densité)
// - l'horloge du navigateur est réglée (18 h 44, 19 h 02) : les heures affichées collent au récit du site
// - sorties : public/img/appli-*-390.webp et appli-*-780.webp
// Lancer : node scripts/captures-appli.mjs (il faut Microsoft Edge, déjà présent sur Windows)
// À relancer après chaque changement visible de l'appli (dossier dobby-app), une fois celle-ci remise en ligne.
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const ADRESSE = 'https://dobby-app.baudet.workers.dev/';
const OUT = new URL('../public/img/', import.meta.url);
const out = (f) => decodeURIComponent(new URL(f, OUT).pathname).replace(/^\/([A-Za-z]:)/, '$1');

const navigateur = await chromium.launch({ channel: 'msedge', headless: true });

async function ouvrir(heure, chemin = '') {
  const ctx = await navigateur.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
  });
  await ctx.clock.install({ time: new Date(`2026-11-24T${heure}:00+01:00`) });
  const page = await ctx.newPage();
  await page.goto(ADRESSE + chemin, { waitUntil: 'networkidle' });
  // l'appli est prête quand son bouton d'arrêt est là (en-tête de chaque onglet), puis ses fondus se terminent
  const appli = page.frameLocator('iframe');
  await appli.getByRole('button', { name: 'Arrêter Dobby immédiatement' }).waitFor({ timeout: 60000 });
  await page.waitForTimeout(2500);
  // l'écran du téléphone dessiné (il contient l'appli, dans un cadre) ; coins carrés : le site arrondit lui-même l'écran
  const ecran = page.locator('iframe').locator('..');
  await ecran.evaluate((el) => {
    el.style.borderRadius = '0';
  });
  return { ctx, page, ecran, appli };
}

async function capturer(ecran, nom) {
  const png = await ecran.screenshot();
  for (const w of [390, 780]) {
    await sharp(png)
      .resize({ width: w })
      .webp({ quality: 88, smartSubsample: true, effort: 6 })
      .toFile(out(`${nom}-${w}.webp`));
  }
  console.log(nom);
}

// boutons de l'appli : les raccourcis portent leur texte (après une icône), les points des résidences seulement un nom
const raccourci = (appli, texte) =>
  appli.getByRole('button').filter({ hasText: texte, visible: true }).first();
const bouton = (appli, nom) =>
  appli.getByRole('button', { name: nom, exact: true }).filter({ visible: true });

// 1. Accueil, résidence de Paris, 18 h 44 (haut de la page Application)
{
  const s = await ouvrir('18:44');
  await capturer(s.ecran, 'appli-accueil');
  await s.ctx.close();
}

// 2. Messages au repos, puis les trois raccourcis de la démonstration, en trois temps (envoyé, confirmé, fait)
{
  const s = await ouvrir('18:44', 'messages');
  await capturer(s.ecran, 'appli-messages');
  await s.ctx.close();
}
for (const [id, label, duree] of [
  ['plume', 'Nourrir Plume', 6000],
  ['lessive', 'Lancer une lessive', 6000],
  ['diner', 'Préparer le dîner', 8000],
]) {
  const s = await ouvrir('18:44', 'messages');
  await raccourci(s.appli, label).click();
  await s.page.waitForTimeout(500);
  await capturer(s.ecran, `appli-${id}-1`);
  await s.page.waitForTimeout(1300);
  await capturer(s.ecran, `appli-${id}-2`);
  // Dobby confirme au bout de 0,9 s, puis la tâche dure de 6 à 8 s ; on laisse la photo arriver
  await s.page.waitForTimeout(duree + 900);
  await capturer(s.ecran, `appli-${id}-3`);
  await s.ctx.close();
}

// 3. Accueil des trois résidences, 19 h 02 (section « Paris, Megève, Cap-Ferret »)
{
  const s = await ouvrir('19:02');
  await capturer(s.ecran, 'appli-paris');
  for (const [id, nom] of [
    ['megeve', 'Megève'],
    ['capferret', 'Cap-Ferret'],
  ]) {
    await bouton(s.appli, nom).click();
    await s.page.waitForTimeout(1500);
    await capturer(s.ecran, `appli-${id}`);
  }
  await s.ctx.close();
}

await navigateur.close();
console.log('Captures prêtes dans public/img');
