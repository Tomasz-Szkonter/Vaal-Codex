// Resolves a build module into a render-ready { meta, sections } shape.
//
// A build describes (a) a per-zone overlay applied to the general route and
// (b) build-specific reference sections (gem progression, gear, regex, etc.).
// The resolver merges those with the build-agnostic general route from
// `general/route.js` and attaches alias arrays to JSON-derived items so
// pre-refactor localStorage keys (e.g. `a1-geonor`) keep counting.
//
// Alias map: keys are the new JSON-derived item IDs, values are the legacy
// hand-authored IDs they replace. Kept inline so a grep for the old ID
// surfaces both the new ID and the historical context.

import { generalRoute } from './general/route.js';

const ID_ALIASES = {
  // ---- Act 1 ----
  'act-1-z-clearfell-encampment-1': ['a1-farrow-1'],
  'act-1-z-clearfell-1': ['a1-mud-burrow'],
  'act-1-z-clearfell-2': ['a1-campsite-chest'],
  'act-1-z-hunting-grounds-1': ['a1-hunting-grounds'],
  'act-1-z-freythorn-0': ['a1-freythorn'],
  'act-1-z-ogham-village-2': ['a1-ogham-executioner'],
  'act-1-z-manor-ramparts-0': ['a1-manor-gallows'],
  'act-1-z-ogham-manor-1': ['a1-geonor'],
  // ---- Act 2 ----
  'act-2-z-vastiri-3': ['a2-zarka'],
  'act-2-z-caravan-1': ['a2-farrow-2'],
  'act-2-z-traitors-passage-0': ['a2-traitors-passage'],
  'act-2-z-traitors-passage-1': ['a2-balbala'],
  'act-2-z-buried-shrines-1': ['a2-azarian-offering'],
  'act-2-z-valley-of-titans-0': ['a2-titans-seals'],
  'act-2-z-titan-grotto-0': ['a2-zalmarath'],
  'act-2-z-titan-grotto-4': ['a2-sound-horn'],
  'act-2-z-deshar-0': ['a2-fallen-dekhara'],
  'act-2-z-deshar-2': ['a2-baryas'],
  'act-2-z-spires-of-deshar-2': ['a2-tor-gul'],
  'act-2-z-trial-of-sekhemas-0': ['a2-trial-1-l28'],
  'act-2-z-dreadnought-1': ['a2-jamanra'],
  'act-2-z-act-end-0': ['a2-caravan-postjam'],
  // a2-rust-king was misfiled under Act 2 in the old builds.js — the actual
  // Rust King fight lives in Act 1 Red Vale ("The Rust King spawns on last obelisk").
  'act-1-z-red-vale-1': ['a2-rust-king'],
  // ---- Act 3 ----
  'act-3-z-sandswept-1': ['a3-rootdredge'],
  'act-3-z-sandswept-2': ['a3-orok-basket'],
  'act-3-z-sandswept-3': ['a3-hanging-tree'],
  'act-3-z-ziggurat-0': ['a3-ziggurat'],
  'act-3-z-ziggurat-1': ['a3-farrow-3'],
  'act-3-z-jungle-ruins-0': ['a3-silverfist'],
  'act-3-z-venom-crypts-1': ['a3-venom-crypts'],
  'act-3-z-chimeral-wetlands-4': ['a3-xyclucian'],
  'act-3-z-machinarium-4': ['a3-flame-core'],
  'act-3-z-sanctum-2': ['a3-zicoatly'],
  'act-3-z-matlan-1': ['a3-matlan'],
  'act-3-z-azak-bog-1': ['a3-flameskin'],
  'act-3-z-azak-bog-2': ['a3-ignagduk'],
  'act-3-z-apex-of-filth-2': ['a3-queen-filth'],
  'act-3-z-temple-kopec-2': ['a3-ketzuli'],
  'act-3-z-aggorat-2': ['a3-aggorat'],
  'act-3-z-utzaal-3': ['a3-beacons-1'],
  'act-3-z-utzaal-6': ['a3-viper'],
  'act-3-z-black-chambers-0': ['a3-doryani'],
  'act-3-z-trial-of-chaos-3': ['a3-trial-2'],
  'act-3-z-act-end-1': ['a3-doryani-town'],
  // ---- Act 4 ----
  'act-4-z-kingsmarch-3': ['a4-farrow-4'],
  'act-4-z-kingsmarch-4': ['a4-kingsmarch'],
  'act-4-z-whakapanu-1': ['a4-great-one'],
  'act-4-z-singing-caverns-0': ['a4-humming-pearl'],
  'act-4-z-shrike-1': ['a4-shrike-island'],
  'act-4-z-abandoned-prison-1': ['a4-goddess-justice'],
  'act-4-z-halls-of-the-dead-1': ['a4-yama'],
  'act-4-z-trial-of-ancestors-1': ['a4-halls-1'],
  'act-4-z-eye-of-hinekora-3': ['a4-hinekora'],
  'act-4-z-journeys-end-5': ['a4-omniphobia'],
  'act-4-z-finale-0': ['a4-karui-final'],
  // The 0.5 layout moved several Act 4 bosses into Interlude 5.3 zones —
  // these aliases keep progress from the pre-refactor flat builds.js intact.
  'interludes-z-interlude-53-4': ['a4-lythara'],
  'interludes-z-interlude-53-6': ['a4-yeti'],
  'interludes-z-interlude-53-8': ['a4-elder-madox'],
  // ---- Interludes ----
  'interludes-z-interlude-51-4': ['inter-v1'],
  'interludes-z-interlude-52-1': ['inter-v2-east'],
  'interludes-z-interlude-52-10': ['inter-v2'],
  'interludes-z-interlude-53-10': ['inter-beacons-2'],
  'interludes-z-completion-0': ['inter-v3'],
};

function attachAliases(item) {
  const aliases = ID_ALIASES[item.id];
  return aliases ? { ...item, aliases } : item;
}

function applyAnnotate(item, annotate) {
  if (!annotate) return item;
  const patch = annotate[item.id];
  if (!patch) return item;
  return { ...item, ...patch };
}

function applyOverlayToZone(zone, zoneOverlay) {
  const baseItems = (zone.items || []).map((item) =>
    applyAnnotate(attachAliases(item), zoneOverlay?.annotate)
  );
  const prepend = zoneOverlay?.prepend || [];
  const append = zoneOverlay?.append || [];
  return { ...zone, items: [...prepend, ...baseItems, ...append] };
}

function applyOverlay(section, routeOverlay) {
  if (!routeOverlay || !Array.isArray(section.zones)) return section;
  const zones = section.zones.map((zone) =>
    applyOverlayToZone(zone, routeOverlay[zone.id])
  );
  return { ...section, zones };
}

function partitionBuildSections(buildSections = []) {
  const before = [];
  const after = [];
  for (const s of buildSections) {
    if (s.position === 'before-route') before.push(s);
    else after.push(s);
  }
  return { before, after };
}

export function resolveBuild(build) {
  if (!build) return null;
  const { before, after } = partitionBuildSections(build.buildSections);
  const route = generalRoute.map((section) =>
    applyOverlay(section, build.routeOverlay)
  );
  return {
    meta: build.meta,
    sections: [...before, ...route, ...after],
    utility: build.utility || null,
  };
}
