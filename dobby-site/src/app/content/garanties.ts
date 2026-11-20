import { deepFr } from '../core/fr';

// Section 8 du document de contenu (avec la précision Atrium Assurances du document de contexte).
export const GARANTIES = deepFr({
  hero: {
    titre: 'Dix ans de sérénité. Inclus.',
    texte:
      "Acquérir Dobby, c'est aussi s'assurer qu'il ne vous fera jamais défaut. Voici nos engagements, écrits noir sur blanc dans votre contrat.",
  },
  engagements: {
    titre: 'Nos engagements.',
    items: [
      {
        chiffre: '10 ans',
        titre: 'Garantie Sérénité',
        texte:
          'Pièces, main-d’œuvre et déplacement inclus. Batterie remplacée gratuitement à 5 ans. Garantie adossée à Atrium Assurances, maintenue même en cas de défaillance de la marque.',
      },
      { chiffre: '90 jours', titre: 'Essai', texte: 'Satisfait ou remboursé : nous reprenons Dobby et vous remboursons intégralement.' },
      { chiffre: '24 h/24', titre: 'Assistance', texte: 'Un Conseiller joignable jour et nuit, par téléphone ou depuis l’application.' },
      {
        chiffre: '48 h',
        titre: 'Remplacement',
        texte: 'Si Dobby doit partir en atelier, un Dobby de remplacement arrive chez vous en 48 h, déjà configuré.',
      },
      {
        chiffre: 'À vie',
        titre: 'Mises à jour',
        texte: 'Nouvelles capacités et correctifs de sécurité, sans frais, validés par le comité d’éthique.',
      },
    ],
  },
  installation: {
    titre: 'Un Conseiller, du premier appel à la dixième année.',
    etapes: [
      { titre: 'Visite à domicile', texte: 'Votre Conseiller découvre votre maison et vos habitudes.' },
      { titre: 'Cartographie', texte: 'Dobby apprend chaque pièce. Vous définissez les Zones privées.' },
      { titre: 'Intégration', texte: 'Connexion à vos équipements existants (lumière, chauffage, alarme).' },
      { titre: 'Prise en main', texte: 'Deux jours aux côtés de votre famille, enfants compris.' },
      { titre: 'Suivi', texte: 'Un point à 30 jours, puis chaque année.' },
    ],
  },
  formules: {
    titre: 'Trois formules de conciergerie.',
    texte: 'Toutes sur devis. Elles expliquent l’écart entre le prix d’appel et le prix final.',
    items: [
      {
        id: 'essentielle',
        nom: 'Essentielle',
        pour: 'Une résidence',
        ajoute: ['Installation', 'Assistance 24 h/24', 'Garantie 10 ans'],
        inclus: 'Incluse avec chaque Dobby',
      },
      {
        id: 'privee',
        nom: 'Privée',
        pour: 'Familles très actives',
        ajoute: ['Conseiller dédié joignable en direct', 'Visite trimestrielle', 'Apprentissage de vos recettes de famille'],
        inclus: 'Tout ce que contient Essentielle',
        recommandee: 'Notre conseil pour les familles',
      },
      {
        id: 'residences',
        nom: 'Résidences',
        pour: 'Plusieurs maisons',
        ajoute: ['Un Dobby par résidence', 'Préférences synchronisées', 'Préparation avant chaque arrivée'],
        inclus: 'Tout ce que contient Privée',
      },
    ],
    choisir: 'Choisir',
    note: 'Modifiable à tout moment avec votre Conseiller.',
  },
  appel: {
    titre: 'Construisons votre formule.',
    texte: 'Votre Conseiller vous rappelle sous 24 h pour en parler.',
    cta: 'Construire ma formule',
    note: 'Garantie 10 ans incluse.',
  },
});
