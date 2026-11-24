import { deepFr } from '../core/fr';

/** Chiffres de référence : identiques partout sur le site (section 4 du document de contenu) */
export const CHIFFRES = {
  foyers: 3200,
  pays: 5,
  satisfaction: 98,
  note: '4,9',
  avis: 1840,
  heures: 19,
  incidents: 0,
  arret: '0,4',
  collaborateurs: 240,
} as const;

export interface Lien {
  label: string;
  path: string;
  params?: Record<string, string>;
  fragment?: string;
}

export const NAV: Lien[] = deepFr([
  { label: 'Découvrir Dobby', path: '/dobby' },
  { label: 'Sécurité & confidentialité', path: '/securite' },
  { label: "L'application", path: '/application' },
  { label: 'Garanties & services', path: '/garanties' },
  { label: 'La Maison Dobby', path: '/maison-dobby' },
]);

export const SITE = deepFr({
  devis: 'Demander un devis',
  signature: 'Le temps vous appartient.',
  telephone: '01 99 00 24 24',
  telephoneLien: '+33199002424',
  email: 'conseil@maison-dobby.fr',
  showroom: 'Maison Dobby, 12 avenue Montaigne, 75008 Paris. Sur rendez-vous.',
  footer: {
    colonnes: [
      {
        titre: 'Dobby',
        liens: [
          { label: 'Découvrir Dobby', path: '/dobby' },
          { label: 'Sécurité & confidentialité', path: '/securite' },
          { label: "L'application", path: '/application' },
          { label: 'Garanties & services', path: '/garanties' },
        ],
      },
      {
        titre: 'Maison',
        liens: [
          { label: 'La Maison Dobby', path: '/maison-dobby' },
          { label: 'Témoignages', path: '/temoignages' },
          { label: 'FAQ', path: '/faq' },
        ],
      },
    ],
    contact: {
      titre: 'Contact',
      devis: 'Demande de devis',
      tel: 'Conseiller joignable 24 h/24',
      showroom: 'Showroom à Paris, sur rendez-vous',
    },
    legal: [
      { label: 'Mentions légales', path: '/mentions-legales' },
      { label: 'Confidentialité', path: '/confidentialite' },
      { label: 'Cookies', path: '/cookies' },
      { label: 'Conditions de garantie', path: '/conditions-garantie' },
    ],
    label: 'Label Sécurité Domestique IESD, Niveau 5',
    garantie: 'Garantie Sérénité 10 ans',
    copyright: '© 2026 Maison Dobby',
  },
  cookies: {
    texte:
      "Nous aimerions mesurer l'audience du site, de façon anonyme. Rien n'est déposé sans votre accord.",
    accepter: 'Accepter',
    refuser: 'Refuser',
    personnaliser: 'Personnaliser',
    mesure: "Mesure d'audience anonyme",
    preferences: 'Mémoriser vos préférences (son, finition choisie)',
    enregistrer: 'Enregistrer mes choix',
    lien: 'En savoir plus',
  },
  arret: {
    titre: 'Dobby arrêté en 0,4 s.',
    texte:
      "Le bouton de sa nuque coupe les moteurs sans passer par le logiciel. Pour le relancer, il faut un second geste, volontaire.",
    relancer: 'Relancer Dobby',
    mesure: "Temps d'arrêt",
  },
  /** Bloc d'appel par défaut, repris en fin de page (« même bloc que l'accueil ») */
  appel: {
    titre: 'Votre temps commence ici.',
    texte: 'Un Conseiller Dobby vous rappelle sous 24 h pour imaginer Dobby chez vous. Sans engagement.',
  },
});
