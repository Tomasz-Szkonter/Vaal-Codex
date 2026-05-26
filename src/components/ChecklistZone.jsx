import ChecklistItem from './ChecklistItem.jsx';
import { getCompletionStatus, isItemChecked } from '../data/helpers.js';

// A zone (in-game map / area) inside a route section.
// Items live directly under the zone — no further nesting.
//
// The zone header carries a tri-state checkbox that drives a batch check-all /
// uncheck-all via `onCheckAll(items, status)`. Status is one of:
//   'empty'   -> click checks every item
//   'partial' -> click checks every item
//   'full'    -> click unchecks every item (clearing primary id + aliases)
//   'none'    -> disabled (no items)
export default function ChecklistZone({ zone, progress, onToggle, onCheckAll }) {
  const items = zone.items || [];
  const done = items.filter((i) => isItemChecked(i, progress)).length;
  const total = items.length;
  const status = getCompletionStatus(items, progress);
  const allDone = status === 'full';
  const hasTags = Array.isArray(zone.tags) && zone.tags.length > 0;

  return (
    <div
      id={zone.id}
      className={`anchor border-l-2 pl-3 md:pl-4 py-1 transition-colors ${
        allDone
          ? 'border-l-success/40'
          : done > 0
          ? 'border-l-zinc-400/60'
          : 'border-l-border'
      }`}
    >
      <header className="mb-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2 min-w-0">
            <ZoneCheckAll
              status={status}
              zoneName={zone.name}
              onClick={() => onCheckAll && onCheckAll(items, status)}
            />
            <h3
              className={`font-serif font-semibold text-base uppercase tracking-widest truncate ${
                allDone ? 'text-muted/70' : 'text-body'
              }`}
            >
              {zone.name}
            </h3>
            {zone.level && (
              <span
                className={`text-[10px] font-mono uppercase tracking-wider whitespace-nowrap px-1.5 py-0.5 rounded border ${
                  allDone
                    ? 'text-muted/60 border-border/60'
                    : 'text-muted border-border'
                }`}
                title="Recommended level"
              >
                L{zone.level}
              </span>
            )}
          </div>
          {total > 0 && (
            <span className="text-[10px] uppercase tracking-wider text-muted whitespace-nowrap font-mono tabular-nums">
              {done}/{total}
            </span>
          )}
        </div>
        {total > 0 && (
          <div className="mt-1 h-0.5 bg-panel-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                allDone ? 'bg-success/60' : 'bg-zinc-400/60'
              }`}
              style={{ width: `${Math.round((done / total) * 100)}%` }}
            />
          </div>
        )}
        {hasTags && (
          <ul className="mt-1.5 flex flex-wrap gap-1">
            {zone.tags.map((tag) => (
              <li
                key={tag}
                className="text-[10px] font-mono uppercase tracking-wider text-muted/80 bg-panel-2/60 border border-border/60 rounded px-1.5 py-0.5"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {zone.intro && (
        <p className="text-xs text-muted mb-1.5">{zone.intro}</p>
      )}

      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <ChecklistItem
              id={item.id}
              label={item.label}
              note={item.note}
              buildNote={item.buildNote}
              scope={item.scope}
              priority={item.priority}
              icon={item.icon}
              reward={item.reward}
              firstChar={item.firstChar}
              newIn05={item.newIn05}
              checked={isItemChecked(item, progress)}
              onToggle={() => onToggle(item.id, item.aliases)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ZoneCheckAll({ status, zoneName, onClick }) {
  const disabled = status === 'none';
  const labelByStatus = {
    empty: `Check all items in ${zoneName}`,
    partial: `Check remaining items in ${zoneName}`,
    full: `Uncheck all items in ${zoneName}`,
    none: 'No items in this zone',
  };
  const boxClass =
    status === 'full'
      ? 'bg-success/70 border-success/70 text-bg'
      : status === 'partial'
      ? 'bg-panel-2 border-zinc-400/70 text-zinc-200'
      : 'bg-transparent border-border text-transparent';
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={labelByStatus[status]}
      title={labelByStatus[status]}
      className={`shrink-0 self-center w-4 h-4 grid place-content-center rounded-sm border transition-colors ${boxClass} ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-zinc-300 cursor-pointer'
      }`}
    >
      {status === 'full' ? (
        <svg viewBox="0 0 16 16" className="w-3 h-3" aria-hidden="true">
          <path
            d="M3 8l3.5 3.5L13 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : status === 'partial' ? (
        <svg viewBox="0 0 16 16" className="w-3 h-3" aria-hidden="true">
          <path
            d="M4 8h8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </button>
  );
}
