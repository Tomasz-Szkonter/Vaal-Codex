import { getSectionItems, isItemChecked } from '../data/helpers.js';

// Horizontal tab strip below the build progress bar. Each chapter wraps one
// (or more, for the Overview chapter) sections from the resolved build. Tabs
// show a `done / total` badge so the user can see at a glance which chapter
// still has work in it.
export default function ChapterTabs({ chapters, activeId, onSelect, progress }) {
  if (!chapters || chapters.length <= 1) return null;
  return (
    <div className="mt-6 -mx-4 px-4 border-b border-border overflow-x-auto">
      <div role="tablist" className="flex items-stretch gap-1 min-w-max">
        {chapters.map((chapter) => {
          const items = chapter.sections.flatMap(getSectionItems);
          const total = items.length;
          const done = items.filter((i) => isItemChecked(i, progress)).length;
          const isActive = chapter.id === activeId;
          const isDone = total > 0 && done === total;
          return (
            <button
              key={chapter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(chapter.id)}
              className={`group relative px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-white'
                  : isDone
                  ? 'text-muted/60 hover:text-body'
                  : 'text-body/70 hover:text-body'
              }`}
            >
              <span className="flex items-baseline gap-2">
                <span
                  className={`font-serif ${
                    isDone && !isActive ? 'line-through decoration-muted/40' : ''
                  }`}
                >
                  {chapter.label}
                </span>
                {total > 0 && (
                  <span className="text-[10px] font-mono tabular-nums text-muted">
                    {done}/{total}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 -bottom-px h-0.5 transition-colors ${
                  isActive
                    ? isDone
                      ? 'bg-success/70'
                      : 'bg-zinc-300'
                    : 'bg-transparent'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
