
# Projet Dobby (site vitrine, projet fictif de BUT TC)

- Contenu de référence : `../dobby-contexte-complet (1).md` et `../Dobby — Arborescence, squelette et contenu du site.md`. Les textes du site vivent dans `src/app/content/*.ts`, jamais en dur dans les gabarits.
- Typographie française : passer les textes par `deepFr()` / `fr()` (`src/app/core/fr.ts`). Dans un gabarit, écrire `&nbsp;` avant `:` et dans « ».
- Chiffres identiques partout : 3 200 foyers, 5 pays, 98 %, 4,9/5 sur 1 840 avis, 19 h par semaine, 0 incident depuis mars 2025, arrêt en 0,4 s, 240 collaborateurs, à partir de 30 000 €, installation sous 4 à 6 semaines.
- Vocabulaire : « assistant domestique » (jamais humanoïde, autonome, intelligent), « Conseiller Dobby », « Demander un devis » (un seul CTA, tous vers `/devis?source=page-position`).
- Palette Couleur.png (givre, brume, lac, ardoise, orage) + nuit, encre, neige. Rouge `arret` réservé à l'arrêt d'urgence. Contraste AA obligatoire : sur fond orage ou carte claire, utiliser brume ou givre plutôt que lac.
- Écriture sans marqueurs IA : pas de tiret cadratin, pas de « pas X, mais Y », pas de formules creuses (véritable, au cœur de, expérience unique…), pas d'emoji, pas de capitales espacées en sur-titre.
- Les styles de composant passent avant les utilitaires Tailwind (couche `utilities`) : ne pas fixer `display` en CSS de composant sur un élément qui porte `hidden`/`lg:block`.
- Vérifier : `npm run build` sans avertissement, puis axe-core sur les pages modifiées.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
