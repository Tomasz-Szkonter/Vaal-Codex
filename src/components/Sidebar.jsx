import { useEffect, useMemo, useRef, useState } from 'react';
import { getSectionItems, isItemChecked } from '../data/helpers.js';

// Sticky left-rail navigation with scroll-spy, scoped to the active chapter.
//
// Observes section and zone anchors *within the active chapter* and highlights
// whichever is closest to the top of the viewport. Cross-chapter navigation
// happens via the tab strip above; the sidebar deliberately doesn't list
// other chapters' sections so the rail stays short.
//
// Collapses to a hamburger drawer below lg.
export default function Sidebar({ build, progress, activeChapter }) {
  const [activeId, setActiveId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sections = activeChapter?.sections || [];

  // Per-section expand/collapse. Re-seeded (all expanded) whenever the active
  // chapter changes so switching tabs gives a fresh, fully-open rail.
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries(sections.map((s) => [s.id, true]))
  );
  useEffect(() => {
    setExpanded(Object.fromEntries(sections.map((s) => [s.id, true])));
  }, [activeChapter?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Flat list of all anchor IDs we want to track (sections + their zones)
  // for the active chapter only.
  const observedIds = useMemo(() => {
    const ids = [];
    for (const section of sections) {
      ids.push(section.id);
      if (Array.isArray(section.zones)) {
        for (const zone of section.zones) ids.push(zone.id);
      }
    }
    return ids;
  }, [sections]);

  // Scroll-spy: keep a live map of which observed nodes are currently visible,
  // pick the one nearest the top of the viewport.
  const visibleRef = useRef(new Map());
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    visibleRef.current = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRef.current.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleRef.current.delete(entry.target.id);
          }
        }
        if (visibleRef.current.size === 0) return;
        let bestId = null;
        let bestTop = Infinity;
        for (const [id, top] of visibleRef.current.entries()) {
          if (top < bestTop) {
            bestTop = top;
            bestId = id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 1],
      }
    );

    const els = observedIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [observedIds]);

  const activeSectionId = useMemo(() => {
    if (!activeId) return null;
    for (const section of sections) {
      if (section.id === activeId) return section.id;
      if (Array.isArray(section.zones)) {
        if (section.zones.some((z) => z.id === activeId)) return section.id;
      }
    }
    return null;
  }, [activeId, sections]);

  const onJump = (id, sectionId) => (e) => {
    e.preventDefault();
    setDrawerOpen(false);
    if (sectionId) {
      setExpanded((prev) => (prev[sectionId] ? prev : { ...prev, [sectionId]: true }));
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  const onToggleExpand = (sectionId) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const Nav = (
    <nav aria-label="Chapter navigation" className="text-sm">
      <div className="text-[10px] uppercase tracking-widest text-muted mb-3 px-1">
        {activeChapter?.label || 'Sections'}
      </div>
      {sections.length === 0 ? (
        <p className="text-xs text-muted px-1">Nothing to show in this tab.</p>
      ) : (
        <ol className="space-y-3">
          {sections.map((section) => {
            const items = getSectionItems(section);
            const total = items.length;
            const done = items.filter((i) => isItemChecked(i, progress)).length;
            const sectionActive = activeSectionId === section.id;
            const sectionAllDone = total > 0 && done === total;

            const hasZones = Array.isArray(section.zones) && section.zones.length > 0;
            const isOpen = !!expanded[section.id];

            return (
              <li key={section.id}>
                <div className="flex items-baseline gap-1">
                  {hasZones ? (
                    <button
                      type="button"
                      onClick={onToggleExpand(section.id)}
                      aria-expanded={isOpen}
                      aria-label={isOpen ? 'Collapse section' : 'Expand section'}
                      className="shrink-0 w-4 h-4 grid place-content-center text-muted hover:text-body rounded -ml-1"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                        aria-hidden="true"
                      >
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </button>
                  ) : (
                    <span className="shrink-0 w-4 h-4" aria-hidden="true" />
                  )}
                  <a
                    href={`#${section.id}`}
                    onClick={onJump(section.id, section.id)}
                    className={`flex-1 min-w-0 flex items-baseline justify-between gap-2 px-1 py-0.5 rounded transition-colors ${
                      sectionActive
                        ? 'text-white'
                        : sectionAllDone
                        ? 'text-muted/60'
                        : 'text-body/85 hover:text-white'
                    }`}
                  >
                    <span
                      className={`truncate ${
                        sectionActive ? 'font-medium' : ''
                      } ${sectionAllDone ? 'line-through decoration-muted/40' : ''}`}
                    >
                      {section.title}
                    </span>
                    {total > 0 && (
                      <span className="text-[10px] font-mono text-muted shrink-0">
                        {done}/{total}
                      </span>
                    )}
                  </a>
                </div>

                {hasZones && isOpen && (
                  <ul className="mt-1 ml-4 border-l border-border/60 pl-2 space-y-0.5">
                    {section.zones.map((zone) => {
                      const zItems = zone.items || [];
                      const zDone = zItems.filter((i) => isItemChecked(i, progress)).length;
                      const zTotal = zItems.length;
                      const zAllDone = zTotal > 0 && zDone === zTotal;
                      const zActive = activeId === zone.id;

                      return (
                        <li key={zone.id}>
                          <a
                            href={`#${zone.id}`}
                            onClick={onJump(zone.id, section.id)}
                            className={`block px-1 py-0.5 rounded text-xs transition-colors truncate ${
                              zActive
                                ? 'text-white bg-panel-2/60'
                                : zAllDone
                                ? 'text-muted/50 line-through decoration-muted/40'
                                : 'text-muted hover:text-body hover:bg-panel-2/40'
                            }`}
                          >
                            {zone.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );

  return (
    <>
      {/* Mobile: floating toggle */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-30 bg-panel border border-border text-body px-3 py-2 rounded-full shadow-panel text-xs font-mono uppercase tracking-wider"
        aria-label="Open navigation"
      >
        Nav
      </button>

      {/* Mobile: drawer */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 flex"
          onClick={() => setDrawerOpen(false)}
        >
          <aside
            className="bg-panel border-r border-border w-72 max-w-[85%] h-full overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif font-semibold text-lg text-body tracking-tight">{build.meta?.name}</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-muted hover:text-body text-xl leading-none"
                aria-label="Close navigation"
              >
                ×
              </button>
            </div>
            {Nav}
          </aside>
        </div>
      )}

      {/* Desktop: sticky rail */}
      <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-3">
        {Nav}
      </aside>
    </>
  );
}
