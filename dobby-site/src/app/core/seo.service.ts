import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const DEFAUT =
  "Dobby prend en charge votre maison, de la cuisine au soin de vos animaux. Assistant domestique conçu d'abord pour la sécurité. À partir de 30 000 €, sur devis.";

/** Met à jour la description de chaque page (le titre est géré par le routeur). */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(Meta);

  init() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let r = this.route.snapshot;
      while (r.firstChild) r = r.firstChild;
      const description = (r.data['description'] as string | undefined) ?? DEFAUT;
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:title', content: document.title });
    });
  }
}
