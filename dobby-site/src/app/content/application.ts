import { deepFr } from '../core/fr';

// Section 7 du document de contenu.
// Retouche de style : « Tout est visible. Rien n'est caché. » devient « Rien ne se fait dans votre dos. »
// (deux phrases qui disaient la même chose).
// Ajouts : scénarios des trois raccourcis, journal d'activité, écrans des trois résidences.
// Les téléphones de la page montrent de vraies captures de l'application (scripts/captures-appli.mjs) :
// les textes des raccourcis reprennent mot pour mot ce que Dobby y écrit, ils servent aux lecteurs d'écran.
export const APPLICATION = deepFr({
  hero: {
    titre: 'Votre maison tient dans votre main.',
    texte:
      "L'application Dobby vous permet de lui confier une tâche, de savoir ce qu'il fait et de l'arrêter, où que vous soyez.",
    capture:
      "L'accueil de l'application Dobby, à Paris 16e : « Dobby range la bibliothèque. Le reste est en ordre. » En dessous, la température, la batterie et les raccourcis pour lui confier une tâche.",
  },
  confier: {
    titre: 'Un oubli ? Deux secondes suffisent.',
    texte:
      'Écrivez ou dictez votre demande, ou choisissez un raccourci : « Nourrir Plume », « Lancer une lessive », « Préparer le dîner ». Dobby confirme, exécute, puis vous envoie une photo quand c’est fait.',
    consigne: 'Touchez un raccourci',
    // l'écran Messages avant tout échange (capture appli-messages), puis chaque raccourci en trois captures
    ecran: "L'écran Messages de l'application Dobby : il vous attend, avec ses raccourcis au-dessus du champ « Écrire à Dobby ».",
    vous: 'Vous',
    dobby: 'Dobby',
    photo: 'Photo envoyée',
    raccourcis: [
      {
        id: 'plume',
        label: 'Nourrir Plume',
        confirme: "C'est noté, j'y vais.",
        fait: "C'est fait. Plume a mangé à 18 h 44.",
        legende: 'Plume, 18 h 44',
      },
      {
        id: 'lessive',
        label: 'Lancer une lessive',
        confirme: 'Draps de la chambre des enfants, programme 40 °C.',
        fait: "Lessive lancée. Fin prévue à 19 h 59, je l'étendrai.",
        legende: 'Chambre des enfants, 18 h 44',
      },
      {
        id: 'diner',
        label: 'Préparer le dîner',
        confirme: 'Velouté et risotto pour quatre, sans noisettes pour Léo. Prêts à 19 h 30.',
        fait: 'Le dîner est prêt. Table dressée pour quatre.',
        legende: 'Salle à manger, 18 h 44',
      },
    ],
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
    // id : nom de la capture (public/img/appli-paris-*.webp…)
    ecrans: [
      {
        id: 'paris',
        nom: 'Paris 16e',
        alt: "L'accueil de l'application pour l'appartement de Paris 16e : Dobby range la bibliothèque, il fait 21 °C, batterie à 82 %.",
      },
      {
        id: 'megeve',
        nom: 'Megève',
        alt: "L'accueil de l'application pour le chalet de Megève : en veille jusqu'à votre arrivée, il fait 17 °C, batterie à 100 %.",
      },
      {
        id: 'capferret',
        nom: 'Cap-Ferret',
        alt: "L'accueil de l'application pour la villa du Cap-Ferret : en veille, volets fermés, il fait 18 °C, batterie à 64 %.",
      },
    ],
    precedent: 'Résidence précédente',
    suivant: 'Résidence suivante',
  },
  dispo: {
    titre: 'Remise en main propre.',
    texte:
      "L'application est réservée aux foyers équipés. Elle vous est remise et configurée par votre Conseiller le jour de l'installation.",
    // les deux badges ouvrent la version en ligne de l'application Dobby
    badges: [
      { label: "Télécharger dans l'App Store", url: 'https://dobby-app.baudet.workers.dev/' },
      { label: 'Disponible sur Google Play', url: 'https://dobby-app.baudet.workers.dev/' },
    ],
    nouvelOnglet: '(nouvel onglet)',
  },
  appel: { cta: 'Demander mon devis', note: "L'application est incluse." },
});
