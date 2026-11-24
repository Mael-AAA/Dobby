import { deepFr } from '../core/fr';

// Section 5 du document de contenu.
// Retouche de style : « Trois finitions, une seule exigence. » devient « Obsidienne, Nacre ou Cuivre. »
// (formule toute faite remplacée par l'information elle-même).
// Ajouts : réponses de Dobby aux trois phrases d'exemple, notes du plan, état des trois résidences.
export const DOBBY = deepFr({
  hero: {
    titre: 'Présent quand il faut. Discret le reste du temps.',
    texte: '1,70 m, une voix posée, des gestes mesurés. Dobby a été dessiné pour se fondre dans les plus belles maisons.',
    cta: 'Configurer mon Dobby',
    note: 'Deux minutes, sans engagement.',
    alt: 'Dobby en pied, de face, en finition cuivre : visière sombre, silhouette fine.',
    reperes: [
      { valeur: '1,70 m', detail: 'une seule taille' },
      { valeur: 'Moins de 35 dB', detail: "plus silencieux qu'une bibliothèque" },
      { valeur: '3 km/h au plus', detail: 'en intérieur, toujours' },
    ],
  },
  parler: {
    titre: 'Parlez-lui comme à un proche.',
    texte:
      "À la maison, de vive voix. Ailleurs, par message depuis l'application. Il comprend les demandes simples comme les missions complètes.",
    consigne: 'Choisissez une phrase',
    exemples: [
      {
        phrase: 'Prépare le chalet pour vendredi soir.',
        reponse: 'Entendu. Le chalet sera prêt vendredi à 19 h.',
        plan: [
          { quand: 'Mercredi', quoi: 'Chauffage relancé, 19 °C dans les chambres' },
          { quand: 'Jeudi', quoi: 'Courses habituelles livrées et rangées' },
          { quand: 'Vendredi, 16 h', quoi: 'Lits faits, cheminée préparée' },
          { quand: 'Vendredi, 18 h 30', quoi: 'Lumières allumées, salon à 21 °C' },
        ],
      },
      {
        phrase: 'Les enfants rentrent à 17 h, il faut un goûter.',
        reponse: 'Goûter prêt à 17 h. Rien avec des noisettes pour Léo.',
        plan: [
          { quand: '16 h 30', quoi: 'Crêpes et compote maison' },
          { quand: '16 h 50', quoi: 'Table de la cuisine dressée pour deux' },
          { quand: '17 h', quoi: 'Porte ouverte, lumière de l’entrée allumée' },
        ],
      },
      {
        phrase: 'Réserve une table pour quatre, jeudi, pas trop loin.',
        reponse: "J'ai trois adresses à moins de dix minutes. Je réserve la première ?",
        plan: [
          { quand: '20 h', quoi: 'Le Petit Verdot, 6 minutes à pied' },
          { quand: '20 h 15', quoi: 'Maison Sauvage, 8 minutes en voiture' },
          { quand: '20 h 30', quoi: 'Chez Odette, 9 minutes en voiture' },
        ],
        accord: 'Rien ne sera réservé sans votre accord.',
      },
    ],
  },
  savoirFaire: {
    titre: 'Cinq savoir-faire.',
    items: [
      {
        id: 'cuisine',
        titre: 'Cuisine.',
        texte:
          'Il connaît les goûts, les allergies et les régimes de chacun. Il cuisine plus de 2 000 recettes et apprend les vôtres.',
        img: 'vaisselle',
        alt: 'Dobby range la vaisselle dans une cuisine en marbre clair, en fin de journée.',
      },
      {
        id: 'entretien',
        titre: 'Entretien.',
        texte: "Ménage, linge, repassage, rangement. Il respecte vos matières nobles et l'ordre de vos objets.",
        img: 'linge',
        alt: 'Dobby plie du linge sur un lit, devant une fenêtre ouverte sur les collines.',
      },
      {
        id: 'animaux',
        titre: 'Animaux.',
        texte: 'Repas à heure fixe, eau fraîche, litière, jeu. Il signale tout changement de comportement.',
        img: '',
        alt: '',
      },
      {
        id: 'maison',
        titre: 'Maison connectée.',
        texte: "Il s'intègre à vos équipements existants et orchestre lumière, climat, sécurité et volets.",
        img: '',
        alt: '',
      },
      {
        id: 'demarches',
        titre: 'Démarches.',
        texte:
          'Courses, réservations, rendez-vous et prestataires. Au-delà du budget que vous fixez, il demande votre accord.',
        img: '',
        alt: '',
      },
    ],
    cta: 'Construire mon devis',
    note: 'Votre Conseiller adapte Dobby à votre maison.',
    plume: {
      titre: 'Journal de Plume',
      // photo : public/img/plume-*.webp, préparée par scripts/images.mjs
      alt: 'Plume, le chat tigré, mange dans sa gamelle.',
      lignes: [
        { h: '7 h 30', t: 'Croquettes, 40 g' },
        { h: '12 h 00', t: 'Eau changée' },
        { h: '15 h 20', t: 'Jeu, dix minutes' },
        { h: '18 h 45', t: 'Pâtée, 85 g. Photo envoyée' },
      ],
      alerte: 'Plume boit moins que d’habitude depuis deux jours. Je vous le signale.',
    },
    scene: { titre: 'Salon, 19 h', etapes: ['Volets', 'Lumière', 'Chauffage', 'Alarme'] },
    accord: {
      titre: 'Demande d’accord',
      ligne: 'Plombier pour la fuite de la buanderie',
      montant: '180 €',
      budget: 'Votre budget pour les prestataires : 150 €',
      ok: 'Accepter',
      non: 'Refuser',
    },
  },
  apprend: {
    titre: 'Chaque jour, un peu plus chez lui. Toujours selon vos règles.',
    texte:
      "Vos habitudes, les goûts de chacun, le caractère du chat. Dobby apprend, et tout ce qu'il apprend reste dans votre maison. Vous pouvez tout consulter et tout effacer depuis l'application.",
    notes: [
      { piece: 'cuisine', texte: 'Café serré pour Claire, à 7 h' },
      { piece: 'bureau', texte: 'Les livres du bureau ne bougent pas' },
      { piece: 'salon', texte: 'Plume dort sur le fauteuil l’après-midi' },
      { piece: 'enfants', texte: 'Léo est allergique aux noisettes' },
      { piece: 'entree', texte: 'Les clés de la voiture vont dans la coupe' },
    ],
    effacer: 'Tout effacer',
    efface: 'Mémoire effacée. Vos Zones privées, elles, sont conservées.',
    restaurer: "Revoir l'exemple",
  },
  residences: {
    titre: 'Arrivez dans une maison qui vous attend.',
    texte:
      'Vous avez plusieurs résidences ? Chaque Dobby connaît la sienne, et vous les pilotez depuis la même application. Avant votre arrivée, il aère, chauffe et remplit le réfrigérateur.',
    lieux: [
      { id: 'paris', nom: 'Paris 16e', type: 'Appartement', etat: '21 °C. Dobby range la bibliothèque.' },
      { id: 'megeve', nom: 'Megève', type: 'Chalet', etat: 'Prêt vendredi à 19 h : lits faits, cheminée préparée.' },
      { id: 'capferret', nom: 'Cap-Ferret', type: 'Villa', etat: 'Volets fermés. Arrosage du jardin à 6 h.' },
    ],
  },
  fiche: {
    titre: 'La fiche technique.',
    texte: 'Survolez ou touchez les repères pour voir ce que cache son revêtement.',
    alt: 'Dobby en pied, de face, en finition cuivre, visière sombre.',
    reperes: [
      { id: 'visiere', label: 'Visière', texte: 'Caméras et micros, avec un volet que vous fermez d’un geste.', x: 22, y: 7 },
      { id: 'nuque', label: 'Nuque', texte: 'Le bouton d’arrêt, à l’arrière, indépendant du logiciel.', x: 27, y: 24 },
      { id: 'torse', label: 'Revêtement', texte: 'Souple sur le torse, les bras et les mains.', x: 38, y: 42 },
      { id: 'hanches', label: 'Batterie', texte: '18 h d’autonomie, recharge en 3 h sur sa station.', x: 27, y: 72 },
      { id: 'mains', label: 'Mains', texte: 'Préhension limitée mécaniquement à 20 N.', x: 80, y: 91 },
    ],
    lignes: [
      { k: 'Taille', v: '1,70 m' },
      { k: 'Poids', v: '58 kg' },
      { k: 'Autonomie', v: '18 h, recharge en 3 h sur sa station' },
      { k: 'Vitesse de marche', v: '3 km/h maximum en intérieur' },
      { k: 'Force de préhension', v: 'Limitée mécaniquement à 20 N' },
      { k: 'Niveau sonore', v: "Moins de 35 dB, plus silencieux qu'une bibliothèque" },
      { k: 'Langues comprises', v: '6, dont français et anglais' },
      { k: 'Connexion', v: 'Wi-Fi 7, chiffrement de bout en bout' },
    ],
  },
  finitions: {
    titre: 'Obsidienne, Nacre ou Cuivre.',
    choix: [
      { id: 'obsidienne', nom: 'Obsidienne', detail: 'Noir mat' },
      { id: 'nacre', nom: 'Nacre', detail: 'Blanc perlé' },
      { id: 'cuivre', nom: 'Cuivre', detail: 'Édition limitée' },
    ],
    mention:
      'À partir de 30 000 €. Le prix final dépend de la finition, du nombre de résidences et de la formule de conciergerie.',
    cta: 'Mon devis en',
    note: 'Prix final selon la finition et la formule.',
  },
  appel: { cta: 'Configurer mon devis', note: 'À partir de 30 000 €. Installation sous 4 à 6 semaines.' },
});
