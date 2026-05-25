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
