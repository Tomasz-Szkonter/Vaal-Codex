import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BuildDetail from './pages/BuildDetail.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-panel/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2 group">
            <span className="font-serif text-2xl text-gold tracking-wide group-hover:text-gold-bright transition-colors">
              Vaal Codex
            </span>
            <span className="text-xs text-muted hidden sm:inline">
              PoE2 leveling checklists
            </span>
          </Link>
          <nav className="text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2 py-1 rounded transition-colors ${
                  isActive ? 'text-gold' : 'text-muted hover:text-body'
                }`
              }
              end
            >
              Builds
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build/:id" element={<BuildDetail />} />
          <Route
            path="*"
            element={
              <div className="max-w-6xl mx-auto px-4 py-16 text-center text-muted">
                Not found.{' '}
                <Link to="/" className="text-gold hover:text-gold-bright">
                  Back to builds
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-border text-xs text-muted">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between">
          <span>Vaal Codex · v0.1</span>
          <span>Patch 0.5 — Return of the Ancients</span>
        </div>
      </footer>
    </div>
  );
}
