import { useEffect, useState } from 'react';

// Right-side slide-out panel for build "utility" data — reference strings
// that don't belong in the checklist (no progress tracking). Today: vendor
// regex. Designed to grow (links, hotkey cheatsheet, etc.).
//
// The panel is mounted unconditionally; if a build has no utility data,
// the trigger tab hides itself and nothing renders.
export default function UtilityPanel({ utility }) {
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const regex = Array.isArray(utility?.regex) ? utility.regex : [];
  const hasContent = regex.length > 0;

  // Close on Escape when open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!hasContent) return null;

  const copy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1200);
    } catch {
      // Clipboard blocked (insecure context / permissions). Silent — user
      // can still select & copy the text manually from the code block.
    }
  };

  return (
    <>
      {/* Edge tab — vertical text, always visible on the right side */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open build utility"
        aria-expanded={open}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-panel border border-r-0 border-border text-body hover:bg-panel-2 px-1.5 py-3 rounded-l shadow-panel text-[10px] font-mono uppercase tracking-widest"
        style={{ writingMode: 'vertical-rl' }}
      >
        Utility
      </button>

      {/* Slide-out container — always mounted so transitions work both ways */}
      <div
        className={`fixed inset-0 z-40 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel */}
        <aside
          role="dialog"
          aria-label="Build utility"
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-panel border-l border-border shadow-panel flex flex-col transition-transform duration-200 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <header className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h2 className="font-serif font-semibold text-xl text-body leading-tight tracking-tight">
                Build utility
              </h2>
              <p className="text-[11px] text-muted mt-0.5">
                Reference strings &amp; tools — not part of the checklist.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted hover:text-body text-2xl leading-none px-2"
              aria-label="Close utility panel"
            >
              ×
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {regex.length > 0 && (
              <section>
                <h3 className="font-serif font-semibold text-xs uppercase tracking-widest text-body mb-1">
                  Vendor regex
                </h3>
                <p className="text-[11px] text-muted mb-3">
                  Paste into the NPC vendor search bar. Patch 0.5 raised the
                  limit to 250 characters.
                </p>
                <ul className="space-y-3">
                  {regex.map((entry) => {
                    const len = entry.pattern.length;
                    const overLimit = len > 250;
                    return (
                      <li
                        key={entry.id}
                        className="bg-bg/60 border border-border rounded p-3"
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-1.5">
                          <span className="text-sm text-body font-medium">
                            {entry.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono shrink-0 ${
                              overLimit ? 'text-red-300' : 'text-muted'
                            }`}
                            title={overLimit ? 'Over 250-char limit' : ''}
                          >
                            {len} ch
                          </span>
                        </div>
                        <code className="block bg-bg/80 border border-border/60 rounded px-2 py-1.5 text-xs font-mono text-body break-all whitespace-pre-wrap select-all">
                          {entry.pattern}
                        </code>
                        {entry.notes && (
                          <p className="text-[11px] text-muted mt-2">
                            {entry.notes}
                          </p>
                        )}
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => copy(entry.id, entry.pattern)}
                            className={`px-2 py-1 text-[11px] border rounded transition-colors ${
                              copiedId === entry.id
                                ? 'border-success/60 bg-success/10 text-success'
                                : 'border-border text-muted hover:text-body hover:border-zinc-500'
                            }`}
                          >
                            {copiedId === entry.id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
