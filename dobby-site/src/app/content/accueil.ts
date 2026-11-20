import { deepFr } from '../core/fr';

// Section 4 du document de contenu. Retouches de style : aucune sur les textes validés.
// Ajouts : contenu des petites scènes des cartes « savoir-faire » (menu, linge, thermostat, accord).
export const ACCUEIL = deepFr({
  entree: {
    casque: 'Casque recommandé',
    avecSon: 'Avec le son',
    silence: 'En silence',
    voix: 'Bonsoir. Je vous attendais.',
  },
  hero: {
    etiquette: 'Assistant domestique',
    titre: 'Votre maison, enfin sous contrôle. Votre temps, enfin à vous.',
    texte: "Dobby prend en charge votre maison, de la cuisine au soin de vos animaux. Vous lui parlez, il s'en occupe.",
    cta: 'Demander un devis',
    secondaire: 'Le voir en action',
    note: 'Sans engagement, rappel sous 24 h.',
    arretTitre: 'Arrêt physique en 0,4 s',
    arretTexte: 'Un bouton sur sa nuque, indépendant du logiciel.',
    arretBouton: 'Essayez',
    defiler: 'Défiler',
    fiche: ['1,70 m pour 58 kg', 'moins de 35 dB'],
  },
  reassurance: [
    'Garantie Sérénité 10 ans',
    'Essai de 90 jours',
    "Arrêt physique en moins d'une seconde",
    'Traitement local de vos données',
  ],
  soiree: {
    titre: 'Vous rentrez. Tout est prêt.',
    etapes: [
      {
        heure: '17 h 52',
        minutes: 17 * 60 + 52,
        lieu: 'Dans le train',
        texte: '« Dobby, nous serons six samedi. Claire ne mange pas de viande. »',
        message: 'Message vocal, 0:06',
      },
      {
        heure: '18 h 10',
        minutes: 18 * 60 + 10,
        lieu: 'En cuisine',
        texte: 'Dobby compose le menu, commande les produits et réserve le fleuriste.',
        liste: ['Menu pour six, sans viande pour Claire', 'Courses livrées samedi à 11 h', 'Fleuriste réservé pour 17 h'],
      },
      {
        heure: '18 h 45',
        minutes: 18 * 60 + 45,
        lieu: 'Dans la maison',
        texte: 'Plume a mangé. Le linge est plié. La température monte à 21 °C.',
        liste: ['Plume a mangé', 'Linge plié', 'Salon à 21 °C'],
      },
      {
        heure: '19 h 30',
        minutes: 19 * 60 + 30,
        lieu: 'Votre porte',
        texte: 'Vous ouvrez la porte. La lumière est douce, le dîner est servi.',
      },
    ],
    fin: "Vous n'avez rien demandé d'autre. Ou presque.",
  },
  savoirFaire: {
    titre: 'Une phrase suffit.',
    texte: 'Les assistants vocaux exécutent des commandes. Dobby prend en charge des missions entières.',
    lien: 'Voir tout ce que fait Dobby',
    aide: 'Faites glisser',
    cartes: [
      {
        id: 'cuisine',
        titre: 'Cuisine',
        texte: 'Du petit-déjeuner au dîner de douze couverts, selon les goûts de chacun.',
        objet: {
          entete: 'Samedi soir, six couverts',
          lignes: ['Velouté de potimarron', 'Risotto aux cèpes', 'Tarte fine aux poires'],
          note: 'Claire : sans viande. Léo : sans noisettes.',
        },
      },
      {
        id: 'entretien',
        titre: 'Entretien',
        texte: 'Ménage, linge, rangement, au rythme de votre maison.',
        objet: {
          entete: 'Linge de la semaine',
          lignes: ['Chemises repassées', 'Draps changés mardi', 'Pull en cachemire lavé à la main, séché à plat'],
        },
      },
      {
        id: 'animaux',
        titre: 'Animaux',
        texte: 'Repas, eau, promenade du jardin, et une photo quand vous êtes loin.',
        objet: { entete: 'Plume a mangé', heure: '18 h 45', note: 'Photo envoyée' },
      },
      {
        id: 'maison',
        titre: 'Maison connectée',
        texte: "Lumière, chauffage, alarme et volets, pilotés d'une seule voix.",
        objet: { entete: 'Salon', temperature: '21 °C', lignes: ['Lumière douce, 40 %', 'Volets fermés à 19 h', 'Alarme du jardin activée'] },
      },
      {
        id: 'demarches',
        titre: 'Démarches',
        texte: 'Courses, réservations, rendez-vous, toujours soumis à votre accord.',
        objet: {
          entete: 'Votre accord, s’il vous plaît',
          ligne: 'Bouquet pour samedi, fleuriste du quartier',
          montant: '140 €',
          budget: 'Votre budget : 100 €',
          accepter: 'Accepter',
          refuser: 'Refuser',
          accepte: 'Commande validée. Livraison samedi à 17 h.',
          refuse: 'Je propose un bouquet à 90 € ?',
        },
      },
    ],
  },
  confiance: {
    titre: 'Pourquoi lui ouvrir votre porte ?',
    texte: 'Parce que nous avons conçu Dobby dans cet ordre : d’abord la sécurité, ensuite le service.',
    blocs: [
      { titre: 'Il ne peut pas blesser.', texte: 'Sa force est limitée mécaniquement, pas seulement par logiciel.' },
      { titre: 'Vous gardez la main.', texte: "Un bouton physique l'arrête en moins d'une seconde." },
      { titre: 'Votre intimité reste chez vous.', texte: 'Ce qu’il voit et entend est traité dans la maison.' },
      { titre: 'Certains lieux lui sont interdits.', texte: "Vous définissez des Zones privées où il n'entre jamais." },
    ],
    lien: 'Tout savoir sur la sécurité',
    cta: 'Le rencontrer chez vous',
    note: 'Démonstration à domicile, sans engagement.',
    bouton: 'Le bouton d’arrêt, sur la nuque',
  },
  chiffres: {
    titre: 'Ce que Dobby a déjà changé.',
    foyers: { label: 'foyers équipés', detail: 'dans 5 pays' },
    heures: { label: 'heures rendues chaque semaine', detail: '19 heures sur les 168 d’une semaine, en moyenne' },
    satisfaction: { label: 'de clients satisfaits', detail: '4,9/5 sur 1 840 avis' },
    incidents: { label: 'incident de sécurité', detail: 'depuis le lancement, en mars 2025' },
  },
  application: {
    titre: 'Même loin, vous êtes chez vous.',
    texte: "Une tâche oubliée ? Confiez-la à Dobby depuis l'application. Il vous confirme quand c'est fait.",
    lien: "Découvrir l'application",
  },
  temoignages: {
    titre: 'Ils ont ouvert leur porte.',
    note: '4,9/5 sur 1 840 avis vérifiés',
    lien: 'Voir les photos #MonDobby',
    precedent: 'Témoignage précédent',
    suivant: 'Témoignage suivant',
  },
  garanties: {
    titre: 'Un engagement de dix ans.',
    items: [
      { chiffre: '10 ans', label: 'Garantie Sérénité' },
      { chiffre: '90 jours', label: "D'essai, satisfait ou remboursé" },
      { chiffre: '24 h/24', label: 'Assistance, jour et nuit' },
      { chiffre: '48 h', label: 'Remplacement, déjà configuré' },
    ],
    lien: 'Le détail de nos garanties',
  },
  appel: {
    titre: 'Votre temps commence ici.',
    texte: 'Un Conseiller Dobby vous rappelle sous 24 h pour imaginer Dobby chez vous. Sans engagement.',
    cta: 'Demander mon devis',
    note: 'À partir de 30 000 €. Installation sous 4 à 6 semaines.',
  },
});
