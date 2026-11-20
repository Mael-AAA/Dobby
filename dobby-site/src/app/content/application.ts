import { deepFr } from '../core/fr';

// Section 7 du document de contenu.
// Retouche de style : « Tout est visible. Rien n'est caché. » devient « Rien ne se fait dans votre dos. »
// (deux phrases qui disaient la même chose).
// Ajouts : scénarios des trois raccourcis, journal d'activité, écrans des trois résidences.
export const APPLICATION = deepFr({
  hero: {
    titre: 'Votre maison tient dans votre main.',
    texte:
      "L'application Dobby vous permet de lui confier une tâche, de savoir ce qu'il fait et de l'arrêter, où que vous soyez.",
  },
  confier: {
    titre: 'Un oubli ? Deux secondes suffisent.',
    texte:
      'Écrivez ou dictez votre demande, ou choisissez un raccourci : « Nourrir Plume », « Lancer une lessive », « Préparer le dîner ». Dobby confirme, exécute, puis vous envoie une photo quand c’est fait.',
    consigne: 'Touchez un raccourci',
    raccourcis: [
      {
        id: 'plume',
        label: 'Nourrir Plume',
        confirme: "C'est noté, j'y vais.",
        fait: "C'est fait. Plume a mangé à 18 h 45.",
        photo: 'plume',
        legende: 'Plume, 18 h 45',
      },
      {
        id: 'lessive',
        label: 'Lancer une lessive',
        confirme: 'Draps de la chambre des enfants, programme 40 °C.',
        fait: 'Lessive lancée. Fin prévue à 20 h 10, je l’étendrai.',
        photo: 'linge',
        legende: 'Buanderie, 18 h 52',
      },
      {
        id: 'diner',
        label: 'Préparer le dîner',
        confirme: 'Velouté et risotto pour quatre, prêts à 20 h.',
        fait: 'Le dîner est prêt. Table dressée pour quatre.',
        photo: 'vaisselle',
        legende: 'Cuisine, 19 h 58',
      },
    ],
    champ: 'Écrire à Dobby',
    envoyer: 'Envoyer',
    cta: "Voir l'application en démonstration",
    note: 'Présentée par votre Conseiller.',
  },
  journal: {
    titre: 'Rien ne se fait dans votre dos.',
    texte: "Le journal d'activité liste chaque action, à la minute près. Vous voyez où il se trouve sur le plan de la maison.",
    entrees: [
      { h: '18 h 02', t: 'Courses rangées', piece: 'cuisine' },
      { h: '18 h 20', t: 'Linge plié, chambre des enfants', piece: 'enfants' },
      { h: '18 h 45', t: 'Plume a mangé', piece: 'entree' },
      { h: '19 h 00', t: 'Volets du salon fermés', piece: 'salon' },
      { h: '19 h 05', t: 'Bureau aéré, fenêtre refermée', piece: 'bureau' },
      { h: '19 h 30', t: 'Table dressée pour quatre', piece: 'salon' },
    ],
    enCours: 'En ce moment',
  },
  controle: {
    titre: 'Vos règles, toujours.',
    fonctions: [
      { id: 'arret', titre: 'Arrêt à distance, en un geste', texte: 'Le bouton rouge reste visible sur tous les écrans.' },
      { id: 'zones', titre: 'Zones privées dessinées sur le plan', texte: 'Du bout du doigt, pièce par pièce.' },
      { id: 'budget', titre: 'Votre accord au-delà du budget fixé', texte: 'Il demande, vous validez ou vous refusez.' },
      { id: 'profils', titre: 'Un profil par membre de la famille', texte: 'Les enfants ont des droits limités.' },
    ],
    arret: 'Arrêter Dobby',
  },
  residences: {
    titre: 'Paris, Megève, Cap-Ferret. Une seule application.',
    texte: "Passez d'une maison à l'autre d'un glissement. Demandez à Dobby de préparer le chalet avant votre arrivée.",
    ecrans: [
      { id: 'paris', nom: 'Paris 16e', temp: '21 °C', etat: 'Dobby range la bibliothèque', tache: 'Dîner à 20 h', batterie: 82 },
      { id: 'megeve', nom: 'Megève', temp: '19 °C', etat: 'Chalet préparé pour vendredi', tache: 'Cheminée prête', batterie: 100 },
      { id: 'capferret', nom: 'Cap-Ferret', temp: '17 °C', etat: 'En veille, volets fermés', tache: 'Arrosage à 6 h', batterie: 64 },
    ],
    precedent: 'Résidence précédente',
    suivant: 'Résidence suivante',
  },
  dispo: {
    titre: 'Remise en main propre.',
    texte:
      "L'application est réservée aux foyers équipés. Elle vous est remise et configurée par votre Conseiller le jour de l'installation.",
    badges: ["Télécharger dans l'App Store", 'Disponible sur Google Play'],
    fictif: 'Badges non cliquables : projet fictif.',
  },
  appel: { cta: 'Demander mon devis', note: "L'application est incluse." },
});
