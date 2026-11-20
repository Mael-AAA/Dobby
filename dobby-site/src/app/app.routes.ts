import { Routes } from '@angular/router';

const t = (titre: string) => `${titre} | Maison Dobby`;

export const routes: Routes = [
  {
    path: '',
    title: 'Dobby, assistant domestique | Maison Dobby',
    loadComponent: () => import('./pages/accueil/accueil').then((m) => m.Accueil),
  },
  {
    path: 'dobby',
    title: t('Découvrir Dobby'),
    data: { description: 'Ce que Dobby fait concrètement : cuisine, entretien, animaux, maison connectée et démarches. Fiche technique et finitions.' },
    loadComponent: () => import('./pages/dobby/dobby').then((m) => m.DobbyPage),
  },
  {
    path: 'securite',
    title: t('Sécurité & confidentialité'),
    data: { description: "Force limitée mécaniquement, arrêt en 0,4 s, traitement local, Zones privées, label IESD Niveau 5. Pourquoi vous pouvez lui ouvrir votre porte." },
    loadComponent: () => import('./pages/securite/securite').then((m) => m.Securite),
  },
  {
    path: 'application',
    title: t("L'application"),
    data: { description: "Confier une tâche, savoir ce qu'il fait, l'arrêter à distance : l'application Dobby, remise par votre Conseiller." },
    loadComponent: () => import('./pages/application/application').then((m) => m.ApplicationPage),
  },
  {
    path: 'garanties',
    title: t('Garanties & services'),
    data: { description: 'Garantie Sérénité 10 ans, essai de 90 jours, assistance 24 h/24, remplacement sous 48 h. Trois formules de conciergerie.' },
    loadComponent: () => import('./pages/garanties/garanties').then((m) => m.Garanties),
  },
  {
    path: 'temoignages',
    title: t('Témoignages'),
    data: { description: '3 200 foyers vivent avec Dobby. Ce qu’ils en disent, crainte par crainte.' },
    loadComponent: () => import('./pages/temoignages/temoignages').then((m) => m.Temoignages),
  },
  {
    path: 'maison-dobby',
    title: t('La Maison Dobby'),
    data: { description: 'Notre histoire, nos fondateurs, notre atelier en Haute-Savoie, notre comité d’éthique et nos partenaires.' },
    loadComponent: () => import('./pages/maison/maison').then((m) => m.Maison),
  },
  {
    path: 'faq',
    title: t('Questions fréquentes'),
    data: { description: 'Sécurité, confidentialité, utilisation, acquisition : les réponses aux questions qu’on nous pose.' },
    loadComponent: () => import('./pages/faq/faq').then((m) => m.FaqPage),
  },
  {
    path: 'devis',
    title: t('Demande de devis'),
    data: { description: 'Quelques questions, deux minutes. Un Conseiller Dobby vous rappelle sous 24 h, sans engagement.' },
    loadComponent: () => import('./pages/devis/devis').then((m) => m.Devis),
  },
  ...(['mentions-legales', 'confidentialite', 'cookies', 'conditions-garantie'] as const).map((page) => ({
    path: page,
    title: t(
      {
        'mentions-legales': 'Mentions légales',
        confidentialite: 'Confidentialité',
        cookies: 'Cookies',
        'conditions-garantie': 'Conditions de garantie',
      }[page],
    ),
    data: { page },
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
  })),
  {
    path: '**',
    title: t('Dobby est libre'),
    loadComponent: () => import('./pages/introuvable/introuvable').then((m) => m.Introuvable),
  },
];
