import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

let observer: IntersectionObserver | undefined;
const callbacks = new WeakMap<Element, () => void>();

function shared(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        callbacks.get(e.target)?.();
        observer?.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  return observer;
}

/** Apparition lente quand l'élément entre dans l'écran. appReveal="2" décale de 2 crans. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[style.--d]': 'delay()' },
})
export class Reveal {
  readonly delay = input(0, { alias: 'appReveal', transform: (v: string | number) => Number(v) || 0 });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.el.nativeElement;
      callbacks.set(el, () => el.classList.add('is-in'));
      shared().observe(el);
    });
    destroy.onDestroy(() => observer?.unobserve(this.el.nativeElement));
  }
}

/** Appelle fn une fois, quand l'élément devient visible. */
export function onceVisible(el: Element, fn: () => void, threshold = 0.3): () => void {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    },
    { threshold },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** Suit la visibilité d'un élément (pour démarrer ou suspendre une animation). */
export function whileVisible(el: Element, fn: (visible: boolean) => void, rootMargin = '80px'): () => void {
  const io = new IntersectionObserver((entries) => fn(entries.some((e) => e.isIntersecting)), { rootMargin });
  io.observe(el);
  return () => io.disconnect();
}
