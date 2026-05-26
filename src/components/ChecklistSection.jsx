import ChecklistItem from './ChecklistItem.jsx';
import ChecklistZone from './ChecklistZone.jsx';
import { getSectionItems, isItemChecked } from '../data/helpers.js';

export default function ChecklistSection({ section, progress, onToggle, onCheckAll }) {
  const hasZones = Array.isArray(section.zones) && section.zones.length > 0;
  const allItems = getSectionItems(section);
  const done = allItems.filter((i) => isItemChecked(i, progress)).length;
  const total = allItems.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isRoute = section.kind === 'route';
  const hasRouteMeta =
    isRoute &&
    (section.routingNotes?.length ||
      section.speedrunTips?.length ||
      section.patch05Notes);

  return (
    <section
      id={section.id}
      className="anchor bg-panel border border-border rounded-lg shadow-panel overflow-hidden"
    >
      {/* Section header */}
      <header className="px-5 pt-5 pb-3 border-b border-border/60">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h2 className="font-serif font-semibold text-xl text-body leading-tight tracking-tight">
            <a href={`#${section.id}`} className="hover:text-white">
              {section.title}
            </a>
          </h2>
          <span className="text-xs text-muted whitespace-nowrap font-mono tabular-nums">
            {done} / {total} · {pct}%
          </span>
        </div>

        {/* Inline progress strip — sits right under the title so progress reads
            without scanning down to the body. */}
        {total > 0 && (
          <div className="mt-2 h-1 bg-panel-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                pct === 100 ? 'bg-success/70' : 'bg-zinc-400/70'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}

        {section.intro && (
          <p className="text-sm text-muted mt-2 leading-relaxed">
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
                          ? 'text-muted/60 line-through decoration-muted/40'
                          : 'text-body/80 hover:text-white hover:bg-panel-2/60'
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

      {/* Route metadata band — routing notes + speedrun tips + 0.5 callout.
          Only renders for route sections that carry the data. */}
      {hasRouteMeta && <RouteHeaderBand section={section} />}

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
                onCheckAll={onCheckAll}
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5">
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

      {(section.source || section.fetched) && (
        <footer className="px-5 py-2 border-t border-border/60 text-[10px] text-muted/70 flex flex-wrap gap-x-3 gap-y-0.5">
          {section.source && (
            <a
              href={section.source}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-body underline decoration-muted/40 underline-offset-2"
            >
              Source
            </a>
          )}
          {section.fetched && <span>Fetched {section.fetched}</span>}
        </footer>
      )}
    </section>
  );
}

function RouteHeaderBand({ section }) {
  const { routingNotes, speedrunTips, patch05Notes } = section;
  return (
    <div className="px-5 pt-3 pb-1 space-y-3 border-b border-border/60">
      {patch05Notes && (
        <div className="border border-cyan-400/30 bg-cyan-400/5 rounded px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-cyan-300/80 mb-0.5">
            New in 0.5
          </div>
          <p className="text-xs text-body/90 leading-relaxed">{patch05Notes}</p>
        </div>
      )}
      {(routingNotes?.length || speedrunTips?.length) && (
        <div className="grid gap-3 md:grid-cols-2">
          {routingNotes?.length > 0 && (
            <NotesPanel title="Routing notes" items={routingNotes} />
          )}
          {speedrunTips?.length > 0 && (
            <NotesPanel title="Speedrun tips" items={speedrunTips} dim />
          )}
        </div>
      )}
    </div>
  );
}

function NotesPanel({ title, items, dim }) {
  return (
    <div className="bg-panel-2/40 border border-border/60 rounded px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted mb-1.5">
        {title}
      </div>
      <ul className={`text-xs leading-relaxed space-y-1 ${dim ? 'text-muted' : 'text-body/85'}`}>
        {items.map((bullet, idx) => (
          <li key={idx} className="flex gap-2">
            <span aria-hidden="true" className="text-muted/60">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
