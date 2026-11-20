import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { ActivatedRouteSnapshot, provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideDobbyImages } from './core/image-loader';

const feuille = (r: ActivatedRouteSnapshot) => {
  while (r.firstChild) r = r.firstChild;
  return r.routeConfig;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
        // pas de volets quand seule l'ancre ou les paramètres changent
        onViewTransitionCreated: ({ transition, from, to }) => {
          if (feuille(from) === feuille(to)) transition.skipTransition();
        },
      }),
    ),
    provideDobbyImages(),
  ],
};
