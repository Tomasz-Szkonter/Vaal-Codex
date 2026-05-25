import { Link } from 'react-router-dom';
import { resolveBuild } from '../data/buildResolver.js';
import { countBuildProgress } from '../data/helpers.js';
import { readProgress } from '../hooks/useProgress.js';

export default function BuildCard({ build }) {
  const resolved = resolveBuild(build);
  const meta = resolved?.meta || {};
  const progress = readProgress(meta.id || '');
  const { done, total } = countBuildProgress(resolved, progress);
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;
  const placeholder = total === 0;

  return (
    <Link
      to={`/build/${meta.id}`}
      className="group block bg-panel border border-border hover:border-gold/60 rounded-lg p-5 transition-all shadow-panel hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl text-gold group-hover:text-gold-bright">
            {meta.name}
          </h3>
          <p className="text-sm text-muted mt-0.5">
            {meta.class}
            {meta.ascendancy && (
              <>
                {' · '}
                <span className="text-body/80">{meta.ascendancy}</span>
              </>
            )}
          </p>
        </div>
        {meta.patch && (
          <span className="text-xs text-muted border border-border rounded px-2 py-0.5 whitespace-nowrap">
            Patch {meta.patch}
          </span>
        )}
      </div>

      {meta.tagline && (
        <p className="text-sm text-body/80 mt-3 leading-relaxed">
          {meta.tagline}
        </p>
      )}

      <div className="mt-4">
        {placeholder ? (
          <p className="text-xs text-muted italic">No checklist yet — coming soon.</p>
        ) : (
          <>
            <div className="flex items-center justify-between text-xs text-muted mb-1.5">
              <span>
                <span className="text-body">{done}</span>
                <span className="text-muted"> / {total} items</span>
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 bg-panel-2 rounded overflow-hidden">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
