import { builds } from '../data/builds/index.js';
import BuildCard from '../components/BuildCard.jsx';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif font-bold text-3xl md:text-4xl text-body tracking-tight">Builds</h1>
        <p className="text-muted text-sm mt-1">
          Pick a build to open its leveling checklist. Progress saves locally per build.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {builds.map((b) => (
          <BuildCard key={b.meta.id} build={b} />
        ))}
      </div>
    </div>
  );
}
