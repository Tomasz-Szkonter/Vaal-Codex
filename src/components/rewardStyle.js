// Maps a free-text reward (e.g. "+10% Cold Res", "Skill Gem Lv1", "+2 Skill
// Points", "Exalted Orb") to a Tailwind class string for the reward pill.
//
// Rules run top-to-bottom; the first hit wins. Order is deliberate:
//   - Element-specific resistances before the generic "res" catch-all.
//   - Spirit Gem / Support Gem read as "gem" (emerald) — keeps the visual tied
//     to the gem icon. Bare "+N Spirit" still resolves to the spirit hue.
// Returned classes only cover border-color / text-color / bg-fill. Callers
// supply the base `border rounded px-… py-…` chrome.

const RULES = [
  { test: /cold\s*res/i,                cls: 'border-cyan-400/50 text-cyan-300/90 bg-cyan-400/10' },
  { test: /fire\s*res/i,                cls: 'border-orange-400/50 text-orange-300/90 bg-orange-400/10' },
  { test: /lightning\s*res/i,           cls: 'border-yellow-400/50 text-yellow-300/90 bg-yellow-400/10' },
  { test: /chaos\s*res/i,               cls: 'border-purple-400/50 text-purple-300/90 bg-purple-400/10' },
  { test: /\bres(ist|istance)?\b/i,     cls: 'border-teal-400/50 text-teal-300/90 bg-teal-400/10' },
  { test: /max(imum)?\s*life|\blife\b/i, cls: 'border-rose-400/50 text-rose-300/90 bg-rose-400/10' },
  { test: /max(imum)?\s*mana|\bmana\b/i, cls: 'border-sky-400/50 text-sky-300/90 bg-sky-400/10' },
  { test: /skill\s*point/i,             cls: 'border-gold-bright/60 text-gold-bright bg-gold-bright/10' },
  { test: /\bgem\b|prism/i,             cls: 'border-emerald-400/50 text-emerald-300/90 bg-emerald-400/10' },
  { test: /\bspirit\b/i,                cls: 'border-violet-400/50 text-violet-300/90 bg-violet-400/10' },
  { test: /\borb\b|exalt|regal|alch|jeweller|\brune\b|currency|\bgold\b/i,
                                        cls: 'border-amber-400/50 text-amber-300/90 bg-amber-400/10' },
  { test: /\bring\b|\bamulet\b|\bbelt\b|\bjewel\b|\bflask\b|\bunique\b|torn\s*map|\bbarya\b|catafract/i,
                                        cls: 'border-amber-400/40 text-amber-300/80 bg-amber-400/5' },
  { test: /unlock|hideout|trading|boon|bench/i,
                                        cls: 'border-teal-400/50 text-teal-300/90 bg-teal-400/10' },
  { test: /random|\?\s*$/i,             cls: 'border-slate-400/30 text-slate-300/70 bg-slate-400/5' },
];

const DEFAULT_CLS = 'border-zinc-500/40 text-zinc-300/80 bg-zinc-500/5';

export function getRewardStyle(text) {
  if (!text) return DEFAULT_CLS;
  for (const rule of RULES) {
    if (rule.test.test(text)) return rule.cls;
  }
  return DEFAULT_CLS;
}
