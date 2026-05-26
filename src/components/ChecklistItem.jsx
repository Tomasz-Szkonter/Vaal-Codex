import ItemIcon, { iconMeta } from './ItemIcon.jsx';
import { getRewardStyle } from './rewardStyle.js';

// Two-axis tagging plus optional badges/pills:
//   scope     - 'general' (default, no chip) vs 'build' (small "BUILD" chip)
//   priority  - 'must' (default, no chip)    vs 'optional' (dim "OPT" chip)
//   firstChar - small "1ST" chip for steps that only matter on a fresh character
//   newIn05   - small "0.5" chip in cyan accent for changed-in-patch steps
//   reward    - right-aligned gold pill (e.g. "+2 Skill Points")
//   note      - dimmer second line under the label
//   buildNote - per-build annotation, rendered below `note` in a still-dimmer tone
//   icon      - vendor | portal | boss | gem | loot | ascendancy | audit | warning
export default function ChecklistItem({
  id,
  label,
  note,
  buildNote,
  scope,
  priority,
  icon,
  reward,
  firstChar,
  newIn05,
  checked,
  onToggle,
}) {
  const isBuild = scope === 'build';
  const isOptional = priority === 'optional';

  // Icon type drives the row's left stripe + the inline gradient background.
  // Build-scope rows without an icon fall back to gold (matches BUILD chip).
  // Anything else: transparent stripe (still reserves space for alignment) and
  // no gradient.
  const meta = iconMeta(icon);
  const stripe =
    meta?.stripe ?? (isBuild ? 'border-l-gold/40' : 'border-l-transparent');
  const gradientHex = meta?.hex ?? (isBuild ? '#c9a96e' : null);
  const rowStyle = gradientHex
    ? { backgroundImage: `linear-gradient(25deg, ${gradientHex}45, transparent)` }
    : undefined;

  return (
    <label
      htmlFor={`item-${id}`}
      style={rowStyle}
      className={`group flex items-start gap-2.5 py-1.5 pr-2 pl-2.5 -mx-2 border-l-[5px] ${stripe} hover:bg-panel-2/60 cursor-pointer`}
    >
      <input
        id={`item-${id}`}
        type="checkbox"
        className="chk"
        checked={!!checked}
        onChange={onToggle}
      />

      {icon && (
        <span className="mt-0.5 inline-flex">
          <ItemIcon name={icon} />
        </span>
      )}

      <span className="flex-1 leading-snug min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span
            className={
              checked
                ? 'text-muted line-through decoration-muted/60'
                : 'text-body'
            }
          >
            {label}
          </span>

          {/* Tag chips. Only render when set. Kept tiny and uppercase. */}
          {isBuild && (
            <span
              className="text-[9px] leading-none uppercase tracking-wider px-1 py-0.5 rounded border border-gold/40 text-gold/90 bg-gold/5 font-mono"
              title="Specific to this build"
            >
              Build
            </span>
          )}
          {isOptional && (
            <span
              className="text-[9px] leading-none uppercase tracking-wider px-1 py-0.5 rounded border border-slate-400/40 text-slate-300/80 bg-slate-400/5 font-mono"
              title="Optional / side content"
            >
              Opt
            </span>
          )}
          {firstChar && (
            <span
              className="text-[9px] leading-none uppercase tracking-wider px-1 py-0.5 rounded border border-indigo-400/50 text-indigo-300/90 bg-indigo-400/5 font-mono"
              title="Only matters on a fresh league character"
            >
              1st
            </span>
          )}
          {newIn05 && (
            <span
              className="text-[9px] leading-none uppercase tracking-wider px-1 py-0.5 rounded border border-cyan-400/50 text-cyan-300/90 bg-cyan-400/5 font-mono"
              title="New or changed in patch 0.5"
            >
              0.5
            </span>
          )}

          {/* Reward pill — pushed to the right. Color resolved from reward text;
              see rewardStyle.js for the rule list. */}
          {reward && (
            <span
              className={`ml-auto text-[10px] leading-none px-1.5 py-1 rounded border ${getRewardStyle(reward)} font-mono whitespace-nowrap`}
              title="Reward from this step"
            >
              {reward}
            </span>
          )}
        </span>

        {note && (
          <span className="block text-xs text-muted mt-0.5">{note}</span>
        )}
        {buildNote && (
          <span className="block text-xs text-gold/70 mt-0.5">
            {buildNote}
          </span>
        )}
      </span>
    </label>
  );
}
