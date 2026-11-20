import { deepFr } from '../core/fr';

// Section 11 du document de contenu.
// Retouche de style : « Vos questions, nos réponses. » devient « Les questions qu'on nous pose. »
// Ajout : question 16 (« Et si la Maison Dobby disparaissait ? »). La carte de réassurance (section 16)
// prévoit cette crainte dans la FAQ, mais elle manquait parmi les quinze questions.
export type ThemeFaq = 'securite' | 'confidentialite' | 'utilisation' | 'acquisition';

export interface Question {
  id: string;
  theme: ThemeFaq;
  q: string;
  r: string;
}

export const FAQ = deepFr({
  titre: 'Les questions qu’on nous pose.',
  intro: 'Seize réponses courtes. Si la vôtre n’y est pas, un Conseiller vous répond 24 h/24.',
  recherche: 'Rechercher une question',
  effacer: 'Effacer la recherche',
  resultats: 'résultat',
  aucun: 'Aucune question ne correspond. Essayez un autre mot, ou posez-la directement à un Conseiller.',
  themes: [
    { id: 'securite', label: 'Sécurité' },
    { id: 'confidentialite', label: 'Confidentialité' },
    { id: 'utilisation', label: 'Utilisation' },
    { id: 'acquisition', label: 'Acquisition et services' },
  ],
  questions: [
    {
      id: 'blesser',
      theme: 'securite',
      q: 'Dobby peut-il blesser quelqu’un ?',
      r: 'Non. Sa force et sa vitesse sont limitées mécaniquement, et il s’arrête dès qu’une personne s’approche trop près. Aucune mise à jour ne peut lever ces limites.',
    },
    {
      id: 'urgence',
      theme: 'securite',
      q: 'Comment l’arrêter en urgence ?',
      r: 'Trois façons : le bouton physique sur sa nuque, la commande « Dobby, stop », ou le bouton d’arrêt de l’application. L’arrêt prend moins d’une seconde.',
    },
    {
      id: 'enfants',
      theme: 'securite',
      q: 'Peut-on le laisser seul avec les enfants ?',
      r: 'Dobby est certifié pour vivre en présence d’enfants, mais il n’est pas une nounou. Il ne remplace pas la surveillance d’un adulte.',
    },
    {
      id: 'courant',
      theme: 'securite',
      q: 'Que se passe-t-il en cas de panne de courant ?',
      r: 'Il continue grâce à sa batterie, puis se met en sécurité sur sa station.',
    },
    {
      id: 'conversations',
      theme: 'confidentialite',
      q: 'Mes conversations sont-elles enregistrées ?',
      r: 'Elles sont traitées dans Dobby, puis effacées. Rien n’est envoyé sur nos serveurs sans votre accord.',
    },
    {
      id: 'cameras',
      theme: 'confidentialite',
      q: 'Quelqu’un peut-il voir chez moi à travers ses caméras ?',
      r: 'Non. Aucun employé n’a accès à ses caméras. Vous pouvez les couvrir à tout moment.',
    },
    {
      id: 'pirate',
      theme: 'confidentialite',
      q: 'Et si Dobby est piraté ?',
      r: 'Ses fonctions de sécurité sont mécaniques, donc hors de portée d’un pirate. Ses communications sont chiffrées de bout en bout et auditées chaque année.',
    },
    {
      id: 'effacer',
      theme: 'confidentialite',
      q: 'Puis-je effacer ce qu’il a appris ?',
      r: 'Oui, en partie ou en totalité, depuis l’application.',
    },
    {
      id: 'connectee',
      theme: 'utilisation',
      q: 'Faut-il une maison connectée ?',
      r: 'Non. Dobby fonctionne seul, et s’intègre à vos équipements si vous en avez.',
    },
    {
      id: 'escaliers',
      theme: 'utilisation',
      q: 'Fonctionne-t-il dans les escaliers ?',
      r: 'Oui, y compris les escaliers en colimaçon standards. Votre Conseiller le vérifie lors de la visite.',
    },
    {
      id: 'personnel',
      theme: 'utilisation',
      q: 'Comment s’entend-il avec mon personnel de maison ?',
      r: 'Très bien. Il prend les tâches répétitives et laisse à votre personnel ce qui demande une attention humaine.',
    },
    {
      id: 'prix',
      theme: 'acquisition',
      q: 'Combien coûte Dobby ?',
      r: 'À partir de 30 000 €. Le prix final dépend de la finition, du nombre de résidences et de la formule choisie.',
    },
    {
      id: 'devis',
      theme: 'acquisition',
      q: 'Pourquoi passer par un devis ?',
      r: 'Parce que chaque maison est différente. Votre Conseiller construit la configuration adaptée à la vôtre.',
    },
    {
      id: 'delai',
      theme: 'acquisition',
      q: 'Quel est le délai d’installation ?',
      r: '4 à 6 semaines après la signature.',
    },
    {
      id: 'satisfait',
      theme: 'acquisition',
      q: 'Et si je ne suis pas satisfait ?',
      r: 'Vous disposez de 90 jours d’essai. Nous reprenons Dobby et vous remboursons intégralement.',
    },
    {
      id: 'disparition',
      theme: 'acquisition',
      q: 'Et si la Maison Dobby disparaissait ?',
      r: 'Votre Garantie Sérénité de 10 ans est adossée à Atrium Assurances. Elle reste valable même en cas de défaillance de la marque.',
    },
  ] as Question[],
  appel: {
    titre: 'Vous ne trouvez pas votre réponse ?',
    texte: 'Un Conseiller vous répond 24 h/24.',
    cta: 'Un Conseiller vous répond',
    note: 'Jour et nuit, sans engagement.',
  },
});
