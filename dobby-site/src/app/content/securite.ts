import { deepFr } from '../core/fr';

// Section 6 du document de contenu.
// Retouche de style : « Pensé pour les familles. » devient « Les enfants ont leur profil. »
// (formule passe-partout remplacée par le fait concret).
// Ajouts : niveaux 2 et 4 de l'échelle IESD, distances de ralentissement, tableau des droits enfants.
export const SECURITE = deepFr({
  hero: {
    titre: 'Conçu pour vivre parmi les vôtres.',
    texte:
      'Un assistant qui vit chez vous doit mériter votre confiance chaque jour. Voici comment Dobby la mérite.',
    cta: 'Poser une question à un Conseiller',
    note: 'Réponse sous 24 h, sans engagement.',
  },
  sommaire: [
    { id: 'physique', label: 'Physique' },
    { id: 'arret', label: 'Arrêt' },
    { id: 'confidentialite', label: 'Confidentialité' },
    { id: 'zones', label: 'Zones privées' },
    { id: 'enfants', label: 'Enfants' },
    { id: 'certification', label: 'Certification' },
  ],
  physique: {
    titre: 'Il ne peut pas blesser. Par construction.',
    points: [
      'Force et vitesse limitées mécaniquement : aucune mise à jour ne peut lever ces limites.',
      'Revêtement souple sur les mains, les bras et le torse.',
      "Il ralentit puis s'arrête dès qu'un enfant ou un animal s'approche trop près.",
      "Aucun objet tranchant manipulé en présence d'un enfant.",
    ],
    demo: {
      consigne: "Faites glisser l'enfant vers Dobby.",
      enfant: 'Enfant',
      distance: 'Distance',
      vitesse: 'Vitesse de Dobby',
      normal: 'Il travaille normalement.',
      ralenti: 'Il ralentit.',
      arret: "Il s'arrête et attend.",
      curseur: "Distance entre l'enfant et Dobby",
    },
  },
  arret: {
    titre: 'Un geste, et tout s’arrête.',
    texte:
      'Un bouton physique, indépendant du logiciel, coupe Dobby en moins d’une seconde. La même commande existe dans l’application et à la voix : « Dobby, stop. »',
    bouton: 'Essayez',
    aide: 'Le site entier va s’arrêter, comme Dobby.',
    repere: 'Bouton d’arrêt',
    cta: 'Le tester en vrai, chez vous',
    note: 'Démonstration à domicile.',
  },
  confidentialite: {
    titre: 'Ce qui se passe chez vous reste chez vous.',
    points: [
      { titre: 'Traitement local par défaut.', texte: 'Images et sons sont analysés dans Dobby, jamais envoyés sur nos serveurs.' },
      {
        titre: 'Ce qui sort, et seulement ça.',
        texte: "Vos instructions envoyées depuis l'application, et les commandes que vous avez validées. Tout est chiffré de bout en bout.",
      },
      { titre: 'Aucun regard humain.', texte: 'Aucun employé ne peut voir votre maison ni piloter Dobby à distance.' },
      { titre: 'Aucune donnée vendue.', texte: "Ni aujourd'hui, ni demain. C'est écrit dans votre contrat." },
      { titre: 'Tout est effaçable.', texte: "Vous consultez et supprimez ce que Dobby a appris, depuis l'application." },
    ],
    schema: {
      maison: 'Chez vous',
      dedans: ['Images', 'Sons', 'Habitudes', 'Plan de la maison'],
      reste: 'Traité dans Dobby',
      dehors: 'Nos serveurs',
      sortent: ['Vos instructions', 'Commandes validées'],
      chiffre: 'Chiffré de bout en bout',
    },
  },
  zones: {
    titre: 'Certaines portes restent fermées.',
    texte:
      'Dessinez sur le plan les pièces où Dobby n’entre jamais. À tout moment, un volet couvre ses caméras : vous le voyez, il ne voit plus.',
    consigne: 'Touchez une pièce pour en faire une Zone privée.',
    privee: 'Zone privée',
    volet: { fermer: 'Fermer le volet des caméras', ouvrir: 'Ouvrir le volet des caméras', voit: 'Dobby voit', voitPlus: 'Dobby ne voit plus' },
    pieces: [
      { id: 'entree', nom: 'Entrée' },
      { id: 'salon', nom: 'Salon' },
      { id: 'cuisine', nom: 'Cuisine' },
      { id: 'bureau', nom: 'Bureau' },
      { id: 'parents', nom: 'Chambre parentale' },
      { id: 'enfants', nom: 'Chambre des enfants' },
      { id: 'bain', nom: 'Salle de bains' },
    ],
  },
  enfants: {
    titre: 'Les enfants ont leur profil.',
    texte:
      'Profils enfants avec des demandes limitées, aucun achat possible, aucun déplacement hors de la maison. Les parents gardent la main sur tout.',
    colonnes: ['Parents', 'Enfants'],
    lignes: [
      { droit: 'Demander un goûter, une histoire, de l’aide pour ranger', parents: true, enfants: true },
      { droit: 'Acheter, commander, réserver', parents: true, enfants: false },
      { droit: 'Faire sortir Dobby de la maison', parents: true, enfants: false },
      { droit: 'Modifier les Zones privées', parents: true, enfants: false },
      { droit: 'Arrêter Dobby', parents: true, enfants: true },
    ],
    oui: 'Autorisé',
    non: 'Bloqué',
  },
  certification: {
    titre: 'Le premier assistant domestique certifié Niveau 5.',
    texte:
      "Le label Sécurité Domestique de l'IESD (Institut européen de sécurité domestique) compte cinq niveaux. Dobby est le premier à atteindre le plus haut, après 14 mois de tests indépendants.",
    niveaux: [
      { n: 1, texte: 'Usage sans présence humaine' },
      { n: 2, texte: "Usage en présence d'un opérateur formé" },
      { n: 3, texte: "Usage en présence d'adultes" },
      { n: 4, texte: "Usage en présence d'adultes et d'animaux" },
      { n: 5, texte: "Usage en présence d'enfants et d'animaux" },
    ],
    dobby: 'Dobby',
  },
  comite: {
    titre: 'Un comité qui peut dire non.',
    texte:
      'Un comité indépendant de sept experts (droit, médecine, philosophie, cybersécurité) valide chaque nouvelle capacité avant sa sortie. Ses avis sont publiés.',
    lien: 'La Maison Dobby',
    membres: [
      'Juriste',
      'Juriste',
      'Médecin pédiatre',
      'Philosophe',
      'Cybersécurité',
      'Cybersécurité',
      'Association de consommateurs',
    ],
  },
  appel: {
    titre: 'Vous avez une question précise ?',
    texte: 'Un Conseiller vous répond, de jour comme de nuit.',
    cta: 'Parler à un Conseiller',
    secondaire: 'Lire la FAQ',
    note: 'Vos questions restent confidentielles.',
  },
});
