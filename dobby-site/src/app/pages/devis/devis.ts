import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { DEVIS } from '../../content/devis';
import { SITE } from '../../content/site';
import { ScrollService } from '../../core/scroll.service';
import { SoundService } from '../../core/sound.service';
import { Finition, RobotFinition } from '../../features/dobby/finitions';
import { Coche } from '../../ui/icons';

type Etape = 'question' | 'foyer' | 'priorites' | 'finition' | 'formule' | 'coordonnees';
const CLE = 'dobby-devis';
const FINITIONS = ['obsidienne', 'nacre', 'cuivre'];
const FORMULES = ['essentielle', 'privee', 'residences'];

@Component({
  selector: 'app-devis',
  imports: [ReactiveFormsModule, RouterLink, RobotFinition, Coche],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './devis.html',
  styleUrl: './devis.css',
})
export class Devis {
  // paramètres d'URL (/devis?source=…&finition=…&formule=…&motif=…)
  readonly source = input<string>();
  readonly finition = input<string>();
  readonly formule = input<string>();
  readonly motif = input<string>();

  protected readonly t = DEVIS;
  protected readonly site = SITE;
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly sound = inject(SoundService);
  private readonly scroll = inject(ScrollService);

  protected readonly form = this.fb.group({
    question: [''],
    foyer: this.fb.group({
      residences: ['', Validators.required],
      type: ['', Validators.required],
      surface: [''],
      personnes: [''],
      enfants: [''],
      animaux: [''],
    }),
    priorites: this.fb.group({
      savoirs: [[] as string[]],
      connectee: [''],
    }),
    finition: ['nacre'],
    formule: ['essentielle'],
    coordonnees: this.fb.group({
      civilite: [''],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[+\d][\d\s.()-]{7,}$/)]],
      pays: ['France', Validators.required],
      creneau: [''],
      showroom: [''],
      consentement: [false, Validators.requiredTrue],
    }),
  });

  protected readonly etapes = computed<Etape[]>(() => {
    const base: Etape[] = ['foyer', 'priorites', 'finition', 'formule', 'coordonnees'];
    return this.motif() === 'question' ? ['question', ...base] : base;
  });
  protected readonly index = signal(0);
  protected readonly sens = signal<'avant' | 'arriere'>('avant');
  protected readonly etape = computed(() => this.etapes()[this.index()]);
  protected readonly envoye = signal(false);
  protected readonly tente = signal(false);
  protected readonly erreurEtape = signal('');

  private readonly valeur = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });
  protected readonly finitionChoisie = computed(() => (this.valeur().finition ?? 'nacre') as Finition);
  protected readonly titre = computed(() =>
    this.motif() === 'demo' ? this.t.entete.titreDemo : this.motif() === 'showroom' ? this.t.entete.titreShowroom : this.t.entete.titre,
  );
  protected readonly creneauxShowroom = creneaux();

  protected readonly recap = computed(() => {
    const v = this.form.getRawValue();
    this.valeur();
    const l = this.t.recapLabels;
    const nomFinition = this.t.etapes.finition.options.find((o) => o.id === v.finition)?.nom ?? '';
    const nomFormule = this.t.etapes.formule.options.find((o) => o.id === v.formule)?.nom ?? '';
    const lignes: { k: string; v: string }[] = [];
    if (v.question) lignes.push({ k: l.question, v: v.question });
    lignes.push({ k: l.residences, v: v.foyer.residences });
    lignes.push({ k: l.type, v: v.foyer.type });
    if (v.foyer.surface) lignes.push({ k: l.surface, v: `${v.foyer.surface} m²` });
    if (v.foyer.personnes) lignes.push({ k: l.personnes, v: v.foyer.personnes });
    if (v.foyer.enfants) lignes.push({ k: l.enfants, v: v.foyer.enfants });
    if (v.foyer.animaux) lignes.push({ k: l.animaux, v: v.foyer.animaux });
    if (v.priorites.savoirs.length) lignes.push({ k: l.priorites, v: v.priorites.savoirs.join(', ') });
    if (v.priorites.connectee) lignes.push({ k: l.connectee, v: v.priorites.connectee });
    lignes.push({ k: l.finition, v: nomFinition });
    lignes.push({ k: l.formule, v: nomFormule });
    lignes.push({
      k: l.contact,
      v: `${v.coordonnees.civilite ? v.coordonnees.civilite + ' ' : ''}${v.coordonnees.prenom} ${v.coordonnees.nom}, ${v.coordonnees.email}, ${v.coordonnees.telephone}, ${v.coordonnees.pays}`,
    });
    if (v.coordonnees.creneau) lignes.push({ k: l.creneau, v: v.coordonnees.creneau });
    if (v.coordonnees.showroom) lignes.push({ k: l.showroom, v: v.coordonnees.showroom });
    if (this.source()) lignes.push({ k: l.source, v: this.source()! });
    return lignes;
  });

  constructor() {
    // reprise d'une demande commencée pendant la visite
    try {
      const brouillon = sessionStorage.getItem(CLE);
      if (brouillon) this.form.patchValue(JSON.parse(brouillon));
    } catch {}
    const sub = this.form.valueChanges.pipe(debounceTime(400)).subscribe((v) => {
      try {
        sessionStorage.setItem(CLE, JSON.stringify(v));
      } catch {}
    });
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());

    // préremplissage depuis le lien d'origine
    effect(() => {
      const f = this.finition();
      const fo = this.formule();
      const motif = this.motif();
      untracked(() => {
        if (f && FINITIONS.includes(f)) this.form.controls.finition.setValue(f);
        if (fo && FORMULES.includes(fo)) this.form.controls.formule.setValue(fo);
        const showroom = this.form.controls.coordonnees.controls.showroom;
        showroom.setValidators(motif === 'showroom' ? Validators.required : null);
        showroom.updateValueAndValidity();
      });
    });
  }

  /** Groupe de contrôles de l'étape courante */
  private groupe(e: Etape) {
    const c = this.form.controls;
    switch (e) {
      case 'question':
        return c.question;
      case 'foyer':
        return c.foyer;
      case 'priorites':
        return c.priorites;
      case 'finition':
        return c.finition;
      case 'formule':
        return c.formule;
      default:
        return c.coordonnees;
    }
  }

  private etapeValide(e: Etape): string {
    if (e === 'question' && this.form.controls.question.value.trim().length < 3) return this.t.etapes.question.erreur;
    if (e === 'priorites' && !this.form.controls.priorites.controls.savoirs.value.length) return this.t.etapes.priorites.erreur;
    const g = this.groupe(e);
    if (g.invalid) return e === 'foyer' ? this.t.etapes.foyer.erreur : 'invalide';
    return '';
  }

  protected suivant() {
    const e = this.etape();
    this.tente.set(true);
    this.groupe(e).markAllAsTouched();
    const erreur = this.etapeValide(e);
    this.erreurEtape.set(erreur === 'invalide' ? '' : erreur);
    if (erreur) {
      setTimeout(() => this.el.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"], .erreur-etape')?.focus());
      return;
    }
    this.sound.tick();
    this.tente.set(false);
    if (this.index() === this.etapes().length - 1) {
      this.envoyer();
      return;
    }
    this.sens.set('avant');
    this.index.update((i) => i + 1);
    this.focusEtape();
  }

  protected precedent() {
    if (this.index() === 0) return;
    this.sens.set('arriere');
    this.tente.set(false);
    this.erreurEtape.set('');
    this.index.update((i) => i - 1);
    this.focusEtape();
  }

  private focusEtape() {
    setTimeout(() => {
      this.el.nativeElement.querySelector<HTMLElement>('.titre-etape')?.focus({ preventScroll: true });
      this.scroll.to('#formulaire', -110);
    });
  }

  private envoyer() {
    this.envoye.set(true);
    try {
      sessionStorage.removeItem(CLE);
    } catch {}
    setTimeout(() => {
      this.scroll.top();
      this.el.nativeElement.querySelector<HTMLElement>('#confirmation-titre')?.focus();
    });
  }

  protected recommencer() {
    this.form.reset();
    this.index.set(0);
    this.envoye.set(false);
    this.tente.set(false);
  }

  protected recapFinition(f: string): string {
    return this.t.etapes.finition.options.find((o) => o.id === f)?.nom ?? '';
  }

  protected basculerSavoir(s: string) {
    const ctrl = this.form.controls.priorites.controls.savoirs;
    const v = ctrl.value;
    ctrl.setValue(v.includes(s) ? v.filter((x) => x !== s) : [...v, s]);
    if (this.erreurEtape()) this.erreurEtape.set('');
  }

  protected invalide(chemin: string): boolean {
    const c = this.form.get(chemin);
    return !!c && c.invalid && (c.touched || this.tente());
  }

  protected erreurChamp(chemin: string): string {
    const c = this.form.get(chemin);
    const e = this.t.etapes.coordonnees.erreurs;
    if (!c?.errors) return '';
    if (c.errors['required']) return chemin.endsWith('consentement') ? e.consentement : e.requis;
    if (c.errors['email']) return e.email;
    if (c.errors['pattern']) return e.telephone;
    return e.requis;
  }
}

/** Les quatre prochains créneaux du showroom, du mardi au samedi */
function creneaux(): string[] {
  const out: string[] = [];
  const heures = ['10 h', '15 h', '11 h', '16 h'];
  const d = new Date();
  const f = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  while (out.length < 4) {
    d.setDate(d.getDate() + 1);
    const j = d.getDay();
    if (j === 0 || j === 1) continue;
    const libelle = f.format(d);
    out.push(`${libelle.charAt(0).toUpperCase()}${libelle.slice(1)}, ${heures[out.length].replace(' ', ' ')}`);
  }
  return out;
}
