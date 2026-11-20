# Site Dobby

Site vitrine de Dobby, assistant domestique de la Maison Dobby (projet fictif, BUT Techniques de Commercialisation).
Angular 21, Tailwind CSS 4, GSAP pour les animations au défilement, Lenis pour le défilement fluide.

## Voir le site

Les fichiers `.html` de `src/app` sont des gabarits Angular : ouverts directement dans le navigateur, ils affichent du texte brut. Il faut passer par le serveur de développement.

```bash
cd dobby-site
npm install      # la première fois seulement
npm start        # puis ouvrir http://localhost:4200
```

Le site se recharge tout seul à chaque modification. `Ctrl + C` dans le terminal pour l'arrêter.

Version de production (dossier `dist/dobby-site/browser`, à déposer sur Vercel, Netlify ou un hébergement statique) :

```bash
npm run build
```

Sur l'hébergeur, rediriger toutes les adresses vers `index.html` (règle « SPA »), sinon `/securite` ou `/devis` renverront une erreur 404 au rechargement.

## Où modifier quoi

| Je veux changer… | Fichier |
| --- | --- |
| Les textes d'une page | `src/app/content/<page>.ts` (accueil, dobby, securite, application, garanties, temoignages, maison, faq, devis, legal) |
| Les chiffres de référence, le menu, le pied de page | `src/app/content/site.ts` |
| Les couleurs, typographies, boutons | `src/styles.css` (bloc `@theme`) |
| La mise en page d'une page | `src/app/pages/<page>/` |
| Une pièce interactive | `src/app/features/<page>/` |

Les textes s'écrivent normalement : la fonction `fr()` (`src/app/core/fr.ts`) ajoute toute seule les espaces insécables avant `: ; ? !`, dans les guillemets « », entre un nombre et son unité (30 000 €, 24 h, 98 %) et remplace l'apostrophe droite par l'apostrophe typographique.

## Images

Les photos sources sont dans `../Image`. Le script `scripts/images.mjs` les prépare dans `public/img` :

- retouche : logos et inscriptions du robot d'origine effacés, filigrane retiré par recadrage, visière repeinte (le visage de Dobby est dessiné en SVG par-dessus) ;
- deux versions de chaque photo : « jour » (couleurs réelles) et « nuit » (dégradé de la palette) ;
- trois finitions du robot détouré : Obsidienne, Nacre, Cuivre ;
- formats web en deux largeurs, image de partage `og.jpg` et icône d'application.

```bash
node scripts/images.mjs
```

Les photos montrent encore le robot Figure 03 (marques retirées). Elles sont à remplacer par les visuels Dobby définitifs dès qu'ils existent (section 17 du document de contenu) : déposer les nouvelles images dans `../Image`, adapter les noms dans le script, relancer.

## Direction artistique

Palette `Couleur.png` : Givre `#b8e2f2`, Brume `#9dc1cf`, Lac `#7e9aa6`, Ardoise `#5f747d`, Orage `#404e54`.
Deux ombres de la même teinte servent de fonds (Nuit `#151d20`, Encre `#0d1316`), une lumière pour les titres (Neige `#e7f3f9`). Le rouge `#e5484d` est réservé à l'arrêt d'urgence.

Idée directrice : la maison à l'heure bleue. La lumière, c'est Dobby. Les photos sont « éteintes » (teintes de la palette) jusqu'à ce que la lampe du curseur ou l'interrupteur les allume, les chiffres sont des fenêtres qui s'éclairent, le regard du logo suit le visiteur.

Typographies : Italiana pour les titres (chiffres en Manrope fine, car dans Italiana « 10 » se lit « IO »), Manrope pour le texte. Toutes les polices sont hébergées sur le site : aucune requête vers Google.

## Effets et mécaniques

| Où | Quoi |
| --- | --- |
| Partout | Logo vivant : les yeux suivent le curseur, clignent, s'éteignent à l'arrêt d'urgence, se couvrent quand le volet des caméras est fermé |
| Partout | Halo du curseur, transition de page en volets qui s'ouvrent, défilement fluide |
| Partout | Taper « stop » au clavier arrête tout le site (comme « Dobby, stop. ») |
| Accueil | Écran d'entrée avec son synthétisé dans le navigateur et voix de Dobby, ouverture en paupière |
| Accueil | Balayage de lumière sur le robot, puis son regard s'allume |
| Accueil | « Une soirée avec Dobby » : l'horloge roule de 17 h 52 à 19 h 30 au défilement, le ciel passe du crépuscule à la nuit, les pièces s'allument |
| Accueil | 3 200 fenêtres allumées, 19 heures sur 168, 98 regards sur 100, un « 0 » qui cligne |
| Accueil, Sécurité, Application | Bouton d'arrêt « Essayez » : écran noir, chronomètre figé à 0,4 s, second geste pour relancer |
| Photos | Lampe : le curseur révèle les vraies couleurs, l'interrupteur allume toute la photo |
| Découvrir | Conversation avec Dobby, salon connecté à régler, plan qui apprend et s'efface, carte des résidences, repères sur la fiche technique, finitions |
| Sécurité | Approcher l'enfant de Dobby (il ralentit, puis s'arrête), Zones privées sur le plan (Dobby ne franchit plus la porte), échelle IESD |
| Application | Raccourcis joués dans le téléphone, journal relié au plan, trois résidences à faire glisser |
| Garanties | « 10 » tracé en filigrane, engagements rédigés comme un contrat signé d'un sourire |
| Devis | Formulaire en étapes, préremplissage par l'adresse (`?finition=cuivre&formule=privee&motif=demo&source=…`), robot à la finition choisie |

Avec le réglage système « réduire les animations », tout devient un simple fondu.

## Accessibilité

Contrôlé avec axe-core (WCAG 2.1 AA) sur toutes les pages, en 1440 px et 390 px : aucune violation. Navigation au clavier, lien d'évitement, régions annoncées, textes alternatifs.
