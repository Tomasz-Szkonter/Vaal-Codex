// Build-agnostic campaign route, derived from guide-resources/structured/*.json.
//
// Each JSON file becomes one section. Zones get prefixed IDs (`<code>-z-<zoneId>`)
// and steps become items with IDs `<zoneId>-<stepIndex>`. IDs are deterministic
// as long as the upstream JSON step order doesn't change — if the source data
// gets re-ordered, we'll need to bump aliases in buildResolver.js to compensate.

import act1 from '../../../guide-resources/structured/act1.json';
import act2 from '../../../guide-resources/structured/act2.json';
import act3 from '../../../guide-resources/structured/act3.json';
import act4 from '../../../guide-resources/structured/act4.json';
import interludes from '../../../guide-resources/structured/interludes.json';

function makeIntro(file) {
  const rewards = Array.isArray(file.permanentRewards) ? file.permanentRewards : [];
  const head = file.levelRange ? `L${file.levelRange}` : '';
  const tail = rewards.join(', ');
  if (head && tail) return `${head} · ${tail}.`;
  return head || tail;
}

function stepToItem(step, zoneId, idx) {
  const item = {
    id: `${zoneId}-${idx}`,
    label: step.text,
  };
  if (step.note) item.note = step.note;
  if (step.icon) item.icon = step.icon;
  if (step.reward) item.reward = step.reward;
  if (step.firstChar) item.firstChar = true;
  if (step.newIn05) item.newIn05 = true;
  item.priority = step.optional ? 'optional' : 'must';
  return item;
}

function fileToSection(file) {
  const sectionId = file.code;
  const zones = (file.zones || []).map((zone) => {
    const zoneId = `${sectionId}-z-${zone.id}`;
    const items = (zone.steps || []).map((step, idx) => stepToItem(step, zoneId, idx));
    const z = { id: zoneId, name: zone.name, items };
    if (zone.newIn05) z.intro = zone.newIn05;
    return z;
  });
  return {
    id: sectionId,
    title: file.title,
    intro: makeIntro(file),
    zones,
  };
}

export const generalRoute = [
  fileToSection(act1),
  fileToSection(act2),
  fileToSection(act3),
  fileToSection(act4),
  fileToSection(interludes),
];
