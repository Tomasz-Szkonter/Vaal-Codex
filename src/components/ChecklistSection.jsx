import ChecklistItem from './ChecklistItem.jsx';
import ChecklistZone from './ChecklistZone.jsx';
import { getSectionItems, isItemChecked } from '../data/helpers.js';

export default function ChecklistSection({ section, progress, onToggle }) {
  const hasZones = Array.isArray(section.zones) && section.zones.length > 0;
  const allItems = getSectionItems(section);
  const done = allItems.filter((i) => isItemChecked(i, progress)).length;
  const total = allItems.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <section
      id={section.id}
      className="anchor bg-panel border border-border rounded-lg shadow-panel overflow-hidden"
    >
      {/* Section header */}
      <header className="px-5 pt-5 pb-3 border-b border-border/60">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h2 className="font-serif text-xl text-gold leading-tight">
            <a href={`#${section.id}`} className="hover:text-gold-bright">
              {section.title}
            </a>
          </h2>
          <span className="text-xs text-muted whitespace-nowrap font-mono">
            {done} / {total} · {pct}%
          </span>
        </div>

        {section.intro && (
          <p className="text-sm text-muted mt-1 leading-relaxed">
            {section.intro}
          </p>
        )}

        {/* Route chain — only shown for zoned sections, gives an at-a-glance
            map of the act. Hidden on very narrow viewports to avoid clutter. */}
        {hasZones && (
          <nav className="hidden sm:block mt-3" aria-label="Zones in this act">
            <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
              Route
            </div>
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
              {section.zones.map((z, idx) => {
                const zItems = z.items || [];
                const zDone = zItems.filter((i) => isItemChecked(i, progress)).length;
                const zAllDone = zItems.length > 0 && zDone === zItems.length;
                return (
                  <span key={z.id} className="flex items-center gap-1">
                    {idx > 0 && (
                      <span className="text-muted/60">→</span>
                    )}
                    <a
                      href={`#${z.id}`}
                      className={`px-1.5 py-0.5 rounded transition-colors ${
                        zAllDone
                          ? 'text-gold/40 line-through decoration-gold/30'
                          : 'text-body/80 hover:text-gold hover:bg-panel-2/60'
                      }`}
                    >
                      {z.name}
                    </a>
                  </span>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Body */}
      <div className="px-5 py-4">
        {hasZones ? (
          <div className="flex flex-col gap-4">
            {section.zones.map((zone) => (
              <ChecklistZone
                key={zone.id}
                zone={zone}
                progress={progress}
                onToggle={onToggle}
              />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-border/40">
            {(section.items || []).map((item) => (
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
        )}
      </div>
    </section>
  );
}
