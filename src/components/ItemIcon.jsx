// Small inline SVG glyphs for tagging checklist items. Use currentColor so the
// caller controls hue via Tailwind text-* classes.
//
// Available icons (keep in sync with the `icon` vocabulary in guide-resources/README.md):
//   vendor    - town stop / NPC trade rack
//   portal    - portal back to town / hub talk
//   boss      - act or zone boss
//   gem       - skill / support gem pickup or cut
//   loot      - unique / lootable pickup (chests, baskets, watch-for)
//   ascendancy- trial entry or ascendancy node pick
//   audit     - pre-boss gate check (res/life/MS targets)
//   warning   - critical "do NOT" rule

const ICON_META = {
  vendor: { label: 'Vendor', tone: 'text-sky-300/80' },
  portal: { label: 'Portal / Talk', tone: 'text-violet-300/80' },
  boss: { label: 'Boss', tone: 'text-red-300/80' },
  gem: { label: 'Gem', tone: 'text-emerald-300/80' },
  loot: { label: 'Loot / Unique', tone: 'text-amber-300/80' },
  ascendancy: { label: 'Ascendancy / Trial', tone: 'text-fuchsia-300/80' },
  audit: { label: 'Audit gate', tone: 'text-success' },
  warning: { label: 'Warning', tone: 'text-orange-300' },
};

const PATHS = {
  vendor: (
    // Storefront / awning
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8l1.5-3h15L21 8" />
      <path d="M4 8v11h16V8" />
      <path d="M3 8c0 1.5 1.2 2.5 2.5 2.5S8 9.5 8 8c0 1.5 1.2 2.5 2.5 2.5S13 9.5 13 8c0 1.5 1.2 2.5 2.5 2.5S18 9.5 18 8c0 1.5 1.2 2.5 2.5 2.5S23 9.5 23 8" />
      <path d="M10 19v-5h4v5" />
    </g>
  ),
  portal: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="12" rx="5" ry="9" />
      <ellipse cx="12" cy="12" rx="2.5" ry="9" />
      <path d="M3 12h18" />
    </g>
  ),
  boss: (
    // Skull
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 11a7 7 0 1 1 14 0v3a2 2 0 0 1-1 1.7l-1.5.9V19a1 1 0 0 1-1 1h-1.5v-2h-2v2h-2v-2H8.5a1 1 0 0 1-1-1v-2.4L6 15.7A2 2 0 0 1 5 14z" />
      <circle cx="9" cy="11.5" r="1.3" fill="currentColor" />
      <circle cx="15" cy="11.5" r="1.3" fill="currentColor" />
    </g>
  ),
  gem: (
    // Diamond / cut gem
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h12l3 5-9 11L3 9z" />
      <path d="M3 9h18" />
      <path d="M9 4l3 5 3-5" />
      <path d="M9 9l3 11 3-11" />
    </g>
  ),
  loot: (
    // Treasure chest
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
      <path d="M3 6h18v4H3z" />
      <path d="M11 10h2v3h-2z" fill="currentColor" />
    </g>
  ),
  ascendancy: (
    // Star
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.8 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" />
    </g>
  ),
  audit: (
    // Shield with check
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l8 3v6c0 4.5-3.2 8.4-8 9-4.8-.6-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </g>
  ),
  warning: (
    // Triangle with bang
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l10 17H2z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="17.5" r="0.6" fill="currentColor" />
    </g>
  ),
};

export const ICON_NAMES = Object.keys(PATHS);

export function iconMeta(name) {
  return ICON_META[name];
}

export default function ItemIcon({ name, className = '', title }) {
  const path = PATHS[name];
  if (!path) return null;
  const meta = ICON_META[name];
  return (
    <span
      className={`inline-flex shrink-0 ${meta?.tone || ''} ${className}`}
      title={title || meta?.label || name}
      aria-label={title || meta?.label || name}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        aria-hidden="true"
      >
        {path}
      </svg>
    </span>
  );
}
