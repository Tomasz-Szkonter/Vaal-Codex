// Shared helpers for resolved builds. Works on the shape produced by
// buildResolver.resolveBuild — sections have either `items` (flat) or
// `zones[].items` (route). Items may carry an `aliases` array of legacy
// localStorage keys; `isItemChecked` treats any of those as a positive hit
// so progress survives the JSON-id migration.

export function getSectionItems(section) {
  if (!section) return [];
  if (Array.isArray(section.zones)) {
    return section.zones.flatMap((z) => z.items || []);
  }
  return section.items || [];
}

export function getBuildItems(resolved) {
  if (!resolved) return [];
  return (resolved.sections || []).flatMap(getSectionItems);
}

export function isItemChecked(item, progress) {
  if (!item || !progress) return false;
  if (progress[item.id]) return true;
  if (Array.isArray(item.aliases)) {
    for (const alias of item.aliases) {
      if (progress[alias]) return true;
    }
  }
  return false;
}

export function countBuildProgress(resolved, progress) {
  const items = getBuildItems(resolved);
  const total = items.length;
  const done = items.filter((i) => isItemChecked(i, progress)).length;
  return { done, total };
}

// Tri-state status of a zone/section/chapter for the "check-all" UI.
//   'empty'   — no items checked
//   'partial' — some items checked
//   'full'    — every item checked (zone is fully complete)
//   'none'    — no items at all (treat as full-disabled visually)
export function getCompletionStatus(items, progress) {
  if (!items || items.length === 0) return 'none';
  let done = 0;
  for (const item of items) {
    if (isItemChecked(item, progress)) done++;
  }
  if (done === 0) return 'empty';
  if (done === items.length) return 'full';
  return 'partial';
}

// Chapter ids are stable strings the tab strip + URL use.
//   - BUILD chapter wraps the synthesized kind='info' section. Always first.
//   - Overview chapter wraps every build-specific section (pre-launch,
//     patch briefing, endgame day 1) in one tab.
//   - Route chapters wrap a single act/interludes section each.
const ROUTE_SECTION_IDS = new Set(['act-1', 'act-2', 'act-3', 'act-4', 'interludes']);

export function groupSectionsIntoChapters(sections) {
  if (!Array.isArray(sections)) return [];
  const buildSections = [];
  const overview = [];
  const routeChapters = [];
  for (const section of sections) {
    if (section.kind === 'info') {
      buildSections.push(section);
    } else if (ROUTE_SECTION_IDS.has(section.id)) {
      routeChapters.push({
        id: `chapter-${section.id}`,
        label: shortLabelFor(section),
        sections: [section],
      });
    } else {
      overview.push(section);
    }
  }
  const chapters = [];
  if (buildSections.length > 0) {
    chapters.push({
      id: 'chapter-build',
      label: 'Build',
      sections: buildSections,
    });
  }
  if (overview.length > 0) {
    chapters.push({
      id: 'chapter-overview',
      label: 'Overview',
      sections: overview,
    });
  }
  // Preserve the route order (act-1 -> act-4 -> interludes) regardless of how
  // they appear in resolved.sections.
  const order = ['act-1', 'act-2', 'act-3', 'act-4', 'interludes'];
  routeChapters.sort(
    (a, b) =>
      order.indexOf(a.sections[0].id) - order.indexOf(b.sections[0].id)
  );
  return [...chapters, ...routeChapters];
}

function shortLabelFor(section) {
  // Section titles look like "Act I — Clearfell to Ogham"; the bit before the
  // em-dash is the tab label. Fall back to the full title if the format drifts.
  const title = section.title || section.id;
  const dashIdx = title.indexOf('—');
  if (dashIdx > 0) return title.slice(0, dashIdx).trim();
  return title;
}

export function findChapterIdForAnchor(chapters, anchorId) {
  if (!anchorId) return null;
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (section.id === anchorId) return chapter.id;
      if (Array.isArray(section.zones)) {
        if (section.zones.some((z) => z.id === anchorId)) return chapter.id;
      }
    }
  }
  return null;
}
