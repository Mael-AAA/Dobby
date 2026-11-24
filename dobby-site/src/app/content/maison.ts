import { deepFr } from '../core/fr';

// Section 10 du document de contenu.
// Retouches de style :
// - « Nous ne fabriquons pas des robots. Nous rendons du temps aux familles, avec le plus grand respect
//   pour ce qu'elles ont de plus précieux. » devient une phrase directe, sans la tournure « pas X, mais Y ».
// - « au cœur de la vallée de l'Arve, réputée pour sa mécanique de précision » devient
//   « dans la vallée de l'Arve, capitale du décolletage » (fait vérifiable plutôt que formule).
// Ajouts : citations des fondateurs, texte de l'atelier, monogrammes des partenaires.
// Fondateurs : Maël et Theddy, avec leurs photos, à la place des deux personnages fictifs du document de contenu.
export const MAISON = deepFr({
  hero: {
    titre: 'Derrière Dobby, une maison.',
    texte: 'Depuis 2021, nous rendons du temps aux familles. Leur intimité passe avant tout le reste.',
    // photo : public/img/porte-*.webp, la même qu'à 19 h 30 sur l'accueil
    alt: 'Dobby ouvre la porte d’entrée. Derrière lui, la table est dressée pour le dîner.',
  },
  histoire: {
    titre: 'Notre histoire.',
    bande: 'Frise de notre histoire',
    precedent: 'Date précédente',
    suivant: 'Date suivante',
    dates: [
      {
        annee: '2021',
        texte: 'Maël et Theddy fondent la Maison Dobby à Paris. Leur conviction : le vrai luxe, c’est un service qu’on ne remarque pas.',
      },
      { annee: '2023', texte: 'Premier prototype testé dans 40 familles volontaires pendant un an.' },
      { annee: '2024', texte: 'Certification Sécurité Domestique Niveau 5 par l’IESD, une première.' },
      {
        annee: 'Mars 2025',
        texte: 'Lancement commercial en France, en Suisse, en Belgique, au Luxembourg et à Monaco.',
      },
      { annee: 'Aujourd’hui', texte: '3 200 foyers équipés, 240 collaborateurs.' },
    ],
  },
  // Portraits : public/img/fondateur-*.webp, préparés par scripts/portraits.mjs
  fondateurs: {
    titre: 'Les fondateurs.',
    items: [
      {
        nom: 'Maël',
        role: 'Cofondateur, sécurité et conception',
        img: 'fondateur-mael',
        alt: 'Portrait de Maël.',
        citation: 'Je voulais un assistant qu’on puisse arrêter d’une main, sans réfléchir. Tout le reste est venu après.',
      },
      {
        nom: 'Theddy',
        role: 'Cofondateur, service et relation client',
        img: 'fondateur-theddy',
        alt: 'Portrait de Theddy, bras croisés.',
        citation: 'Dans un palace, le meilleur service est celui qu’on ne remarque pas. Dobby travaille de la même façon.',
      },
    ],
  },
  engagements: {
    titre: 'Nos engagements.',
    items: [
      { titre: 'La sécurité avant la performance.', texte: 'Une capacité qui ne passe pas nos tests de sécurité ne sort pas.' },
      {
        titre: 'L’intimité comme principe.',
        texte: 'Notre modèle économique ne repose pas sur vos données. Il repose sur votre satisfaction.',
      },
      { titre: 'La transparence.', texte: 'Les avis de notre comité d’éthique sont publics.' },
      {
        titre: 'Le savoir-faire.',
        texte: 'Dobby est assemblé en Haute-Savoie, dans la vallée de l’Arve, capitale du décolletage.',
      },
    ],
  },
  atelier: {
    titre: 'Assemblé en Haute-Savoie.',
    texte:
      'Chaque Dobby est monté et réglé à la main dans notre atelier de la vallée de l’Arve. Avant de partir, il passe 72 heures de tests : escaliers, portes, coupures de courant, mannequins à taille d’enfant.',
    alt: 'Gros plan sur la nuque et le revêtement tricoté de Dobby, en atelier.',
    chiffres: [
      { v: '72 h', l: 'de tests avant livraison' },
      { v: '240', l: 'collaborateurs' },
    ],
  },
  comite: {
    titre: 'Le comité d’éthique.',
    texte:
      'Sept experts indépendants valident chaque nouvelle capacité et peuvent bloquer une mise à jour. Leurs avis sont publiés chaque trimestre.',
    membres: [
      'Deux juristes',
      'Une médecin pédiatre',
      'Un philosophe',
      'Deux spécialistes en cybersécurité',
      'Une représentante d’association de consommateurs',
    ],
  },
  partenaires: {
    titre: 'Nos partenaires.',
    bande: 'Bandeau des partenaires',
    precedent: 'Partenaire précédent',
    suivant: 'Partenaire suivant',
    items: [
      { nom: 'IESD', role: 'Certification de sécurité' },
      { nom: 'Lumen Habitat', role: 'Intégration domotique' },
      { nom: 'Atrium Assurances', role: 'Assurance habitation, garant de la Garantie Sérénité' },
      { nom: 'Studio Verrière', role: 'Architecture d’intérieur, finitions sur mesure' },
      { nom: 'Conciergerie Alcôve', role: 'Conciergerie privée' },
    ],
  },
  appel: {
    titre: 'Rencontrons-nous.',
    texte: 'Notre showroom vous reçoit au 12 avenue Montaigne, à Paris.',
    cta: 'Prendre rendez-vous au showroom',
    note: 'Paris, sur rendez-vous.',
  },
});
