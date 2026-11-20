import { deepFr } from '../core/fr';

// Section 9 du document de contenu. Noms, villes et médias sont fictifs.
// Retouche de style : la citation de L'Observateur du Luxe (« Dobby ne vend pas de la technologie.
// Il vend des soirées. ») est réécrite sans la tournure « pas X, mais Y ».
// Ajouts : la peur levée sous chaque carte, le script du film de 60 secondes, les légendes du mur.
export type Theme = 'vie-privee' | 'enfants' | 'temps' | 'residences' | 'animaux' | 'sceptiques';

export const TEMOIGNAGES = deepFr({
  hero: {
    titre: 'Ils ont ouvert leur porte.',
    texte: '3 200 foyers vivent avec Dobby. 98 % le recommanderaient. Voici ce qu’ils en disent.',
    note: 'sur 1 840 avis vérifiés',
    foyers: 'foyers équipés',
    satisfaction: 'le recommanderaient',
  },
  filtres: {
    tous: 'Tous',
    label: 'Filtrer par crainte',
    items: [
      { id: 'vie-privee', label: 'Vie privée' },
      { id: 'enfants', label: 'Enfants' },
      { id: 'temps', label: 'Temps' },
      { id: 'residences', label: 'Résidences' },
      { id: 'animaux', label: 'Animaux' },
      { id: 'sceptiques', label: 'Sceptiques' },
    ],
  },
  cartes: [
    {
      id: 'vie-privee',
      peur: 'Il va voir notre chambre.',
      texte:
        "J'avais peur d'avoir des yeux dans ma maison. Le jour de l'installation, j'ai fermé notre chambre. Il n'y est jamais entré.",
      auteur: 'Hélène V.',
      ville: 'Neuilly-sur-Seine',
      initiales: 'HV',
    },
    {
      id: 'enfants',
      peur: 'Et si les jumeaux couraient vers lui ?',
      texte:
        'Nos jumeaux ont 6 ans. Dobby ralentit dès qu’ils courent vers lui. Ils l’appellent par son prénom, comme un membre de la famille.',
      auteur: 'Thomas et Julie R.',
      ville: 'Genève',
      initiales: 'TJ',
    },
    {
      id: 'temps',
      peur: 'Je n’aurai jamais le temps de m’en occuper.',
      texte: 'Je rentrais à 21 h et je gérais encore la maison. Aujourd’hui, mes soirées sont à mes enfants.',
      auteur: 'Karim B.',
      ville: 'Paris 7e',
      initiales: 'KB',
    },
    {
      id: 'residences',
      peur: 'Trois maisons, c’est trois fois plus de soucis.',
      texte:
        'Quand nous arrivons au chalet, le feu est allumé et le réfrigérateur est plein. Je n’ai rien eu à organiser.',
      auteur: 'Famille D.',
      ville: 'Megève',
      initiales: 'D',
    },
    {
      id: 'animaux',
      peur: 'Qui nourrit le chien quand je suis loin ?',
      texte:
        "En déplacement, j'ai oublié le repas du chien. Deux secondes sur l'application, une photo de lui en train de manger.",
      auteur: 'Sophie L.',
      ville: 'Bruxelles',
      initiales: 'SL',
    },
    {
      id: 'sceptiques',
      peur: 'Un robot chez moi ? Jamais.',
      texte: "J'étais le plus réticent de la famille. Trois mois après, je ne reviendrais pas en arrière.",
      auteur: 'Marc-Antoine F.',
      ville: 'Monaco',
      initiales: 'MF',
    },
  ],
  peurLevee: 'Crainte levée',
  vide: 'Aucun témoignage pour ce thème.',
  film: {
    titre: 'Une famille en 60 secondes.',
    texte: 'Thomas et Julie R. vivent à Genève avec leurs jumeaux de 6 ans. Ils racontent leurs trois premiers mois.',
    lire: 'Lancer le film',
    pause: 'Mettre en pause',
    reprendre: 'Reprendre',
    sousTitres: [
      { img: 'linge2', t: 'Au début, on se demandait surtout comment les jumeaux allaient réagir.' },
      { img: 'nuque', t: 'Le premier soir, Jules a couru vers lui. Dobby s’est arrêté net, et il a attendu.' },
      { img: 'vaisselle', t: 'Maintenant, ils lui demandent leur goûter et lui racontent leur journée.' },
      { img: 'linge', t: 'Nous, on a retrouvé nos soirées. On dîne ensemble, à l’heure.' },
      { img: 'linge2', t: 'Et notre chambre reste fermée. Il n’y est jamais entré.' },
    ],
  },
  medias: {
    titre: 'Ils en parlent.',
    items: [
      { media: 'Maison & Futur', citation: 'Le premier robot domestique qu’on a envie de présenter à ses invités.' },
      { media: "L'Observateur du Luxe", citation: 'Les familles équipées nous ont surtout parlé de leurs soirées retrouvées.' },
    ],
  },
  mur: {
    titre: 'Leur quotidien, en images.',
    texte: 'Partagez vos moments avec #MonDobby.',
    reseaux: ['Instagram', 'LinkedIn', 'YouTube'],
    photos: [
      { img: 'mur-vaisselle', legende: 'Mardi, 19 h. La vaisselle avant le film.' },
      { img: 'mur-linge2-rideaux', legende: 'Neuilly. Les rideaux tirés à la tombée du jour.' },
      { img: 'mur-linge-mains', legende: 'Le linge plié comme le faisait ma grand-mère.' },
      { img: 'mur-nuque-profil', legende: 'Il attend toujours qu’on lui parle.' },
      { img: 'mur-vaisselle-fleurs', legende: 'Les pivoines du samedi, changées sans qu’on demande.' },
      { img: 'mur-linge2-lit', legende: 'Megève. Les lits faits avant notre arrivée.' },
      { img: 'mur-linge-visiere', legende: 'Les collines derrière la fenêtre, et lui qui range.' },
      { img: 'mur-vaisselle-couloir', legende: 'Le couloir éclairé quand les enfants rentrent.' },
      { img: 'mur-nuque-tissu', legende: 'Son revêtement, tout doux. Les enfants adorent.' },
    ],
  },
  appel: {
    titre: 'Et si votre famille était la prochaine ?',
    texte: 'Un Conseiller vous rappelle sous 24 h. Sans engagement.',
    cta: 'Rejoindre ces familles',
    note: '98 % de clients satisfaits.',
  },
});
