import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findBuild } from '../data/builds/index.js';
import { resolveBuild } from '../data/buildResolver.js';
import { countBuildProgress } from '../data/helpers.js';
import { useProgress } from '../hooks/useProgress.js';
import ChecklistSection from '../components/ChecklistSection.jsx';
import Sidebar from '../components/Sidebar.jsx';
import UtilityPanel from '../components/UtilityPanel.jsx';

export default function BuildDetail() {
  const { id } = useParams();
  const resolved = useMemo(() => resolveBuild(findBuild(id)), [id]);
  const { state, toggle, reset, importState } = useProgress(id || '');
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  if (!resolved) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-muted">
        Build not found.{' '}
        <Link to="/" className="text-gold hover:text-gold-bright">
          Back to builds
        </Link>
      </div>
    );
  }

  const meta = resolved.meta;
  const { done, total } = countBuildProgress(resolved, state);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const onReset = () => {
    if (window.confirm('Reset progress for this build? This cannot be undone.')) {
      reset();
    }
  };

  const onExport = () => {
    const payload = {
      buildId: meta.id,
      exportedAt: new Date().toISOString(),
      progress: state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${meta.id}-progress.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onImportSubmit = () => {
    setImportError('');
    try {
      const parsed = JSON.parse(importText);
      const progress =
        parsed && typeof parsed === 'object' && parsed.progress
          ? parsed.progress
          : parsed;
      if (!progress || typeof progress !== 'object') {
        throw new Error('Expected an object of { itemId: true } entries.');
      }
      importState(progress);
      setImportOpen(false);
      setImportText('');
    } catch (err) {
      setImportError(err.message || 'Invalid JSON.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <UtilityPanel utility={resolved.utility} />
      {/* Two-column grid: sidebar | main. Sidebar hides below lg. */}
      <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8">
        <Sidebar build={resolved} progress={state} />

        <div className="min-w-0">
          {/* Header */}
          <div className="mb-6">
            <Link
              to="/"
              className="text-xs text-muted hover:text-gold transition-colors"
            >
              ← All builds
            </Link>

            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-gold leading-tight">
                  {meta.name}
                </h1>
                <p className="text-sm text-muted mt-1">
                  {meta.class}
                  {meta.ascendancy && (
                    <>
                      {' · '}
                      <span className="text-body/80">{meta.ascendancy}</span>
                    </>
                  )}
                  {meta.patch && (
                    <>
                      {' · '}
                      <span>Patch {meta.patch}</span>
                    </>
                  )}
                </p>
                {meta.tagline && (
                  <p className="text-sm text-body/80 mt-2 max-w-2xl">
                    {meta.tagline}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => setImportOpen(true)}
                  className="px-3 py-1.5 border border-border rounded text-muted hover:text-body hover:border-gold/50 transition-colors"
                >
                  Import
                </button>
                <button
                  onClick={onExport}
                  className="px-3 py-1.5 border border-border rounded text-muted hover:text-body hover:border-gold/50 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={onReset}
                  className="px-3 py-1.5 border border-border rounded text-muted hover:text-red-300 hover:border-red-400/40 transition-colors"
                >
                  Reset progress
                </button>
              </div>
            </div>

            {/* Progress bar */}
            {total > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-muted mb-1.5">
                  <span>
                    <span className="text-body">{done}</span>
                    <span> / {total} items</span>
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-panel-2 rounded overflow-hidden border border-border">
                  <div
                    className="h-full bg-gold transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sections */}
          {resolved.sections.length === 0 ? (
            <div className="bg-panel border border-border rounded-lg p-8 text-center text-muted">
              No checklist items yet for this build.
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {resolved.sections.map((section) => (
                <ChecklistSection
                  key={section.id}
                  section={section}
                  progress={state}
                  onToggle={toggle}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Import modal */}
      {importOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setImportOpen(false)}
        >
          <div
            className="bg-panel border border-border rounded-lg w-full max-w-lg p-5 shadow-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl text-gold">Import progress</h3>
            <p className="text-sm text-muted mt-1">
              Paste exported JSON. This overwrites your current progress for this build.
            </p>
            <textarea
              className="mt-3 w-full h-44 bg-bg border border-border rounded p-2 font-mono text-xs text-body focus:outline-none focus:border-gold/60"
              placeholder='{"progress": {"a1-renly-twister": true}}'
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            {importError && (
              <p className="text-xs text-red-300 mt-2">{importError}</p>
            )}
            <div className="flex justify-end gap-2 mt-3 text-xs">
              <button
                onClick={() => {
                  setImportOpen(false);
                  setImportError('');
                }}
                className="px-3 py-1.5 border border-border rounded text-muted hover:text-body"
              >
                Cancel
              </button>
              <button
                onClick={onImportSubmit}
                className="px-3 py-1.5 border border-gold/60 bg-gold/10 rounded text-gold hover:bg-gold/20"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
