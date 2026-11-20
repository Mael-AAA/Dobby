import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let n = 0;

/** Plume, le chat de la famille : dessin géométrique, de profil, devant sa gamelle. */
@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <svg viewBox="0 0 240 160" class="h-full w-full" [class.mange]="mange()" role="img" [attr.aria-label]="label()">
      <defs>
        <linearGradient [attr.id]="gid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2b363b" />
          <stop offset="1" stop-color="#1b2427" />
        </linearGradient>
      </defs>
      <rect width="240" height="160" fill="#404e54" />
      <rect y="118" width="240" height="42" [attr.fill]="'url(#' + gid + ')'" />
      <ellipse cx="112" cy="130" rx="70" ry="6" fill="#151d20" opacity=".55" />
      <!-- queue -->
      <path d="M58 112 C 30 108, 26 84, 40 74" fill="none" stroke="#9dc1cf" stroke-width="9" stroke-linecap="round" />
      <!-- corps -->
      <ellipse cx="96" cy="104" rx="46" ry="26" fill="#9dc1cf" />
      <ellipse cx="102" cy="112" rx="30" ry="14" fill="#b8e2f2" opacity=".5" />
      <!-- pattes -->
      <rect x="64" y="112" width="12" height="20" rx="6" fill="#9dc1cf" />
      <rect x="118" y="112" width="12" height="20" rx="6" fill="#9dc1cf" />
      <!-- tête penchée vers la gamelle -->
      <g class="tete">
        <circle cx="146" cy="98" r="22" fill="#9dc1cf" />
        <path d="M132 82 L134 62 L148 77 Z" fill="#9dc1cf" />
        <path d="M152 77 L164 62 L164 84 Z" fill="#9dc1cf" />
        <path d="M137 80 L138 70 L145 78 Z" fill="#7e9aa6" />
        <ellipse cx="156" cy="96" rx="2.4" ry="4" fill="#151d20" />
        <path d="M163 106 l8 -1 M163 109 l8 1" stroke="#e7f3f9" stroke-width="1" stroke-linecap="round" />
      </g>
      <!-- gamelle -->
      <path d="M160 120 h48 l-6 12 h-36 z" fill="#e7f3f9" />
      <ellipse cx="184" cy="120" rx="24" ry="4" fill="#5f747d" />
    </svg>
  `,
  styles: `
    .tete {
      transform-box: fill-box;
      transform-origin: 20% 80%;
    }
    .mange .tete {
      animation: picore 1.6s ease-in-out infinite;
    }
    @keyframes picore {
      0%,
      100% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(12deg) translateY(4px);
      }
    }
  `,
})
export class Chat {
  protected readonly gid = `chat-sol-${n++}`;
  readonly mange = input(true);
  readonly label = input('Plume, le chat, mange dans sa gamelle.');
}
