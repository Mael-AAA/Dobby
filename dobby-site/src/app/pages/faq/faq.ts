import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQ, Question, ThemeFaq } from '../../content/faq';
import { plat } from '../../core/fr';
import { SoundService } from '../../core/sound.service';
import { CtaBlock } from '../../ui/cta-block';
import { Fleche } from '../../ui/icons';
import { Reveal } from '../../ui/reveal.directive';

interface Morceau {
  t: string;
  m: boolean;
}

/** Découpe un texte autour des mots recherchés, pour les surligner */
function surligne(texte: string, termes: string[]): Morceau[] {
  if (!termes.length) return [{ t: texte, m: false }];
  const p = plat(texte);
  const marques = new Array<boolean>(texte.length).fill(false);
  for (const terme of termes) {
    let i = p.indexOf(terme);
    while (i !== -1) {
      for (let k = i; k < i + terme.length; k++) marques[k] = true;
      i = p.indexOf(terme, i + terme.length);
    }
  }
  const out: Morceau[] = [];
  for (let i = 0; i < texte.length; i++) {
    const last = out[out.length - 1];
    if (last && last.m === marques[i]) last.t += texte[i];
    else out.push({ t: texte[i], m: marques[i] });
  }
  return out;
}

@Component({
  selector: 'app-faq',
  imports: [RouterLink, Reveal, CtaBlock, Fleche],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FaqPage {
  protected readonly t = FAQ;
  private readonly sound = inject(SoundService);
  protected readonly theme = signal<ThemeFaq>('securite');
  protected readonly recherche = signal('');
  protected readonly ouverte = signal<string | null>('blesser');

  protected readonly termes = computed(() =>
    plat(this.recherche())
      .split(/\s+/)
      .filter((m) => m.length > 2),
  );

  protected readonly liste = computed(() => {
    const termes = this.termes();
    const qs: Question[] = termes.length
      ? this.t.questions.filter((q) => termes.every((m) => plat(q.q + ' ' + q.r).includes(m)))
      : this.t.questions.filter((q) => q.theme === this.theme());
    return qs.map((q) => ({ ...q, qm: surligne(q.q, termes), rm: surligne(q.r, termes) }));
  });

  protected readonly libelleTheme = (id: string) => this.t.themes.find((x) => x.id === id)?.label ?? '';

  protected choisirTheme(id: string) {
    this.theme.set(id as ThemeFaq);
    this.recherche.set('');
    this.ouverte.set(null);
    this.sound.tick();
  }

  protected chercher(e: Event) {
    this.recherche.set((e.target as HTMLInputElement).value);
    const l = this.liste();
    this.ouverte.set(l.length === 1 ? l[0].id : null);
  }

  protected basculer(id: string) {
    this.ouverte.update((o) => (o === id ? null : id));
  }

  /** Flèches gauche et droite pour passer d'un onglet à l'autre */
  protected clavier(e: KeyboardEvent, i: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = this.t.themes.length;
    const k = (i + (e.key === 'ArrowRight' ? 1 : -1) + n) % n;
    this.choisirTheme(this.t.themes[k].id);
    const tabs = (e.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role=tab]');
    tabs?.[k]?.focus();
  }
}
