import { Injectable, signal } from '@angular/core';

type Pref = 'on' | 'off' | null;
const KEY = 'dobby-son';

/**
 * Le son du site est entièrement synthétisé dans le navigateur (aucun fichier audio) :
 * - une nappe douce (accord de ré, filtre lent, réverbération générée)
 * - la voix de Dobby via la synthèse vocale du système, en français
 * - deux bruitages : un « tic » discret et le « clac » de l'arrêt d'urgence
 */
@Injectable({ providedIn: 'root' })
export class SoundService {
  readonly pref = signal<Pref>(read());
  readonly on = signal(false);
  readonly speaking = signal(false);

  private ctx?: AudioContext;
  private master?: GainNode;
  private pad?: GainNode;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      const load = () => (this.voices = speechSynthesis.getVoices());
      load();
      speechSynthesis.addEventListener?.('voiceschanged', load);
    }
    // Préférence mémorisée : le navigateur exige un geste avant de jouer un son
    if (this.pref() === 'on') {
      const resume = () => {
        window.removeEventListener('pointerdown', resume);
        window.removeEventListener('keydown', resume);
        if (this.pref() === 'on') this.start();
      };
      window.addEventListener('pointerdown', resume, { once: true });
      window.addEventListener('keydown', resume, { once: true });
    }
  }

  choose(on: boolean) {
    this.pref.set(on ? 'on' : 'off');
    try {
      localStorage.setItem(KEY, on ? 'on' : 'off');
    } catch {}
    on ? this.start() : this.mute();
  }

  toggle() {
    this.choose(!this.on());
  }

  start() {
    try {
      if (!this.ctx) this.build();
      void this.ctx!.resume();
      const t = this.ctx!.currentTime;
      this.master!.gain.cancelScheduledValues(t);
      this.master!.gain.setValueAtTime(this.master!.gain.value, t);
      this.master!.gain.linearRampToValueAtTime(1, t + 2.4);
      this.on.set(true);
    } catch {
      this.on.set(false);
    }
  }

  mute() {
    this.on.set(false);
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(0, t + 0.6);
  }

  /** Coupure nette (arrêt d'urgence) puis retour progressif */
  cut(silent: boolean) {
    if (!this.ctx || !this.master || !this.on()) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(silent ? 0 : 1, t + (silent ? 0.05 : 1.8));
  }

  say(text: string, onEnd?: () => void) {
    if (!this.on() || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'fr-FR';
    const v = this.voice();
    if (v) u.voice = v;
    u.rate = 0.94;
    u.pitch = 0.92;
    u.volume = 0.95;
    u.onstart = () => {
      this.speaking.set(true);
      this.duck(true);
    };
    u.onend = u.onerror = () => {
      this.speaking.set(false);
      this.duck(false);
      onEnd?.();
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  tick() {
    if (!this.on() || !this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(1320, t);
    o.frequency.exponentialRampToValueAtTime(760, t + 0.07);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.1);
  }

  clac() {
    if (!this.on() || !this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.28);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.36);
    // petit bruit mécanique
    const len = Math.floor(ctx.sampleRate * 0.06);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
    const n = ctx.createBufferSource();
    const f = ctx.createBiquadFilter();
    const ng = ctx.createGain();
    f.type = 'bandpass';
    f.frequency.value = 1800;
    ng.gain.value = 0.18;
    n.buffer = buf;
    n.connect(f).connect(ng).connect(ctx.destination);
    n.start(t);
  }

  private duck(down: boolean) {
    if (!this.ctx || !this.pad) return;
    const t = this.ctx.currentTime;
    this.pad.gain.cancelScheduledValues(t);
    this.pad.gain.setValueAtTime(this.pad.gain.value, t);
    this.pad.gain.linearRampToValueAtTime(down ? 0.012 : 0.034, t + 0.5);
  }

  private voice(): SpeechSynthesisVoice | undefined {
    const fr = this.voices.filter((v) => v.lang?.toLowerCase().startsWith('fr'));
    const naturelle = (v: SpeechSynthesisVoice) => /natural|neural|online|google|premium|enhanced/i.test(v.name);
    const posee = (v: SpeechSynthesisVoice) => /henri|r[ée]my|paul|thomas|antoine|claude|daniel|gerard|nicolas/i.test(v.name);
    return (
      fr.find((v) => posee(v) && naturelle(v)) ??
      fr.find(naturelle) ??
      fr.find(posee) ??
      fr.find((v) => v.lang === 'fr-FR') ??
      fr[0]
    );
  }

  private build() {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // réverbération : réponse impulsionnelle générée (bruit qui décroît sur 3 s)
    const conv = ctx.createConvolver();
    const len = ctx.sampleRate * 3;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.6;
    }
    conv.buffer = ir;
    const wet = ctx.createGain();
    wet.gain.value = 0.55;
    conv.connect(wet).connect(master);

    const pad = ctx.createGain();
    pad.gain.value = 0.034;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 820;
    filter.Q.value = 0.3;
    pad.connect(filter);
    filter.connect(master);
    filter.connect(conv);

    // filtre qui respire très lentement
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.045;
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();

    // accord de ré majeur neuvième, voix légèrement désaccordées
    const notes = [73.42, 146.83, 220.0, 277.18, 329.63];
    notes.forEach((f, i) => {
      for (const detune of [-5, 5]) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = i === 0 ? 'sine' : 'triangle';
        o.frequency.value = f;
        o.detune.value = detune;
        g.gain.value = i === 0 ? 0.5 : 0.22;
        // chaque voix gonfle et retombe à son rythme
        const swell = ctx.createOscillator();
        const sg = ctx.createGain();
        swell.frequency.value = 0.03 + i * 0.011;
        sg.gain.value = 0.12;
        swell.connect(sg).connect(g.gain);
        swell.start();
        o.connect(g).connect(pad);
        o.start();
      }
    });

    this.ctx = ctx;
    this.master = master;
    this.pad = pad;
  }
}

function read(): Pref {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'on' || v === 'off' ? v : null;
  } catch {
    return null;
  }
}
