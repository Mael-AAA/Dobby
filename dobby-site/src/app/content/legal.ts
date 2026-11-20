import { deepFr } from '../core/fr';

// Section 13.2 du document de contenu. Textes courts et fictifs, à faire relire avant une vraie mise en ligne.
export interface PageLegale {
  titre: string;
  maj: string;
  sections: { titre: string; texte: string[] }[];
}

export const LEGAL: Record<string, PageLegale> = deepFr({
  'mentions-legales': {
    titre: 'Mentions légales',
    maj: 'Mise à jour le 20 novembre 2026',
    sections: [
      {
        titre: 'Éditeur',
        texte: [
          'Maison Dobby SAS (société fictive), au capital de 2 400 000 €, 12 avenue Montaigne, 75008 Paris.',
          'Téléphone : 01 99 00 24 24. E-mail : conseil@maison-dobby.fr.',
        ],
      },
      { titre: 'Directeur de la publication', texte: ['Hugo Valcourt, cofondateur (personnage fictif).'] },
      {
        titre: 'Hébergement',
        texte: ['Site statique hébergé par un prestataire situé dans l’Union européenne. Aucune donnée de formulaire n’est conservée par l’hébergeur.'],
      },
      {
        titre: 'Projet pédagogique',
        texte: [
          'Ce site est un projet fictif réalisé dans le cadre du BUT Techniques de Commercialisation. Marque, chiffres, avis, partenaires, label et médias sont imaginaires.',
          'Dobby est un personnage créé par J.K. Rowling. Les photographies de robot sont des visuels provisoires, retouchés pour l’exercice.',
        ],
      },
    ],
  },
  confidentialite: {
    titre: 'Politique de confidentialité',
    maj: 'Mise à jour le 20 novembre 2026',
    sections: [
      {
        titre: 'Ce que nous collectons',
        texte: [
          'Uniquement ce que vous saisissez dans le formulaire de demande de devis : coordonnées, informations sur votre foyer, finition et formule envisagées, créneau de rappel.',
          'Nous notons aussi la page d’où vous venez, pour savoir quelles pages aident le plus nos visiteurs.',
        ],
      },
      {
        titre: 'Pourquoi',
        texte: ['Pour qu’un Conseiller vous rappelle et prépare votre devis. Rien d’autre. Ces informations ne sont jamais vendues ni louées.'],
      },
      {
        titre: 'Combien de temps',
        texte: [
          'Trois ans après notre dernier échange si vous ne devenez pas client. Pendant toute la durée du contrat, puis cinq ans, si vous le devenez.',
        ],
      },
      {
        titre: 'Vos droits',
        texte: [
          'Vous pouvez consulter, corriger, effacer ou récupérer vos informations, et vous opposer à leur traitement. Écrivez à vie-privee@maison-dobby.fr : nous répondons sous un mois.',
          'Vous pouvez aussi saisir la CNIL.',
        ],
      },
      {
        titre: 'Ce que voit Dobby chez vous',
        texte: [
          'Images et sons sont traités dans Dobby, dans votre maison. Seules sortent vos instructions envoyées depuis l’application et les commandes que vous avez validées, chiffrées de bout en bout.',
        ],
      },
    ],
  },
  cookies: {
    titre: 'Cookies',
    maj: 'Mise à jour le 20 novembre 2026',
    sections: [
      {
        titre: 'Ce que nous déposons',
        texte: [
          'Sans votre accord : rien, sauf votre choix concernant les cookies lui-même.',
          'Avec votre accord : une mesure d’audience anonyme, et la mémorisation de vos préférences (son, finition choisie).',
        ],
      },
      {
        titre: 'Ce que nous ne déposons jamais',
        texte: ['Aucun cookie publicitaire, aucun traceur de réseau social. Les polices du site sont hébergées chez nous : votre visite ne part chez aucun service tiers.'],
      },
      {
        titre: 'Changer d’avis',
        texte: ['Le bouton ci-dessous rouvre le bandeau de choix. Votre choix est conservé six mois.'],
      },
    ],
  },
  'conditions-garantie': {
    titre: 'Conditions de garantie',
    maj: 'Mise à jour le 20 novembre 2026',
    sections: [
      {
        titre: 'Garantie Sérénité 10 ans',
        texte: [
          'Pièces, main-d’œuvre et déplacement inclus pendant dix ans à compter de l’installation. Batterie remplacée gratuitement à cinq ans.',
          'La garantie est adossée à Atrium Assurances et reste valable même en cas de défaillance de la Maison Dobby.',
        ],
      },
      {
        titre: 'Essai de 90 jours',
        texte: ['Satisfait ou remboursé : pendant 90 jours après l’installation, nous reprenons Dobby à domicile et vous remboursons intégralement.'],
      },
      {
        titre: 'Assistance 24 h/24',
        texte: ['Un Conseiller est joignable jour et nuit, par téléphone ou depuis l’application. L’assistance n’accède qu’aux diagnostics de Dobby, et seulement avec votre code.'],
      },
      {
        titre: 'Remplacement sous 48 h',
        texte: ['Si Dobby doit partir en atelier, un Dobby de remplacement arrive chez vous en 48 h, déjà configuré avec vos Zones privées.'],
      },
      {
        titre: 'Mises à jour à vie',
        texte: [
          'Nouvelles capacités et correctifs de sécurité, sans frais, validés par le comité d’éthique. Aucune mise à jour ne peut lever les limites mécaniques de force et de vitesse.',
        ],
      },
      {
        titre: 'Exclusions',
        texte: ['Dommages volontaires, démontage par un tiers non agréé, usage hors des résidences déclarées.'],
      },
    ],
  },
});
