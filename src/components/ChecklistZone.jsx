import ChecklistItem from './ChecklistItem.jsx';
import { isItemChecked } from '../data/helpers.js';

// A zone (in-game map / area) inside a route section.
// Items live directly under the zone — no further nesting.
export default function ChecklistZone({ zone, progress, onToggle }) {
  const items = zone.items || [];
  const done = items.filter((i) => isItemChecked(i, progress)).length;
  const total = items.length;
  const allDone = total > 0 && done === total;

  return (
    <div
      id={zone.id}
      className={`anchor border-l-2 pl-3 md:pl-4 py-1 transition-colors ${
        allDone
          ? 'border-l-gold/30'
          : done > 0
          ? 'border-l-gold/60'
          : 'border-l-border'
      }`}
    >
      <header className="flex items-baseline justify-between gap-3 mb-1">
        <h3
          className={`font-serif text-lg uppercase tracking-widest ${
            allDone ? 'text-gold/50' : 'text-gold/90'
          }`}
        >
          {zone.name}
        </h3>
        {total > 0 && (
          <span className="text-[10px] uppercase tracking-wider text-muted whitespace-nowrap font-mono">
            {done}/{total}
          </span>
        )}
      </header>

      {zone.intro && (
        <p className="text-xs text-muted mb-1.5">{zone.intro}</p>
      )}

      <ul className="divide-y divide-border/30">
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
