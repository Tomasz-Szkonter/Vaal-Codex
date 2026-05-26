import ReactMarkdown from 'react-markdown';

// Renders the synthesized kind='info' section (see buildResolver.infoToSection)
// as the BUILD tab: header with author + source links, then one collapsible
// `<details>` per info block. `kind: 'recipe'` blocks start collapsed (long
// crafting walls most users don't actively need); all other blocks start open.
//
// Block bodies are markdown — paragraphs / **bold** / `- list` / `1. ordered`.
// Element styling lives in `mdComponents` so we avoid pulling in the Tailwind
// typography plugin for one consumer.
export default function BuildInfoSection({ section }) {
  const author = section.author || null;
  const sources = Array.isArray(section.sources) ? section.sources : [];
  const blocks = Array.isArray(section.blocks) ? section.blocks : [];
  const hasHeader = !!author || sources.length > 0;

  return (
    <section
      id={section.id}
      className="anchor bg-panel border border-border rounded-lg shadow-panel overflow-hidden"
    >
      {hasHeader && (
        <header className="px-5 pt-5 pb-4 border-b border-border/60">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h2 className="font-serif text-xl text-body leading-tight">
              <a href={`#${section.id}`} className="hover:text-white">
                {section.title}
              </a>
            </h2>
          </div>
          {author && (
            <p className="text-sm text-muted mt-1">
              By <span className="text-body/90">{author}</span>
            </p>
          )}
          {sources.length > 0 && (
            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-widest text-muted mb-1.5">
                Sources
              </div>
              <ul className="space-y-1 text-xs">
                {sources.map((s, idx) => (
                  <li key={s.url || idx} className="flex items-baseline gap-2">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`underline decoration-muted/40 underline-offset-2 transition-colors ${
                        s.primary
                          ? 'text-body hover:text-white'
                          : 'text-muted hover:text-body'
                      }`}
                    >
                      {s.label}
                    </a>
                    {s.primary && (
                      <span className="text-[10px] uppercase tracking-wider text-muted/70 font-mono">
                        primary
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>
      )}

      {blocks.length === 0 ? (
        <div className="px-5 py-10 text-center text-muted text-sm">
          No build info yet.
        </div>
      ) : (
        <div className="px-5 py-4 space-y-2">
          {blocks.map((block) => (
            <BuildInfoBlock key={block.id} block={block} />
          ))}
        </div>
      )}
    </section>
  );
}

function BuildInfoBlock({ block }) {
  const isRecipe = block.kind === 'recipe';
  return (
    <details
      id={block.id}
      open={!isRecipe}
      className="anchor group bg-panel-2/30 border border-border/60 rounded open:bg-panel-2/40 transition-colors"
    >
      <summary className="px-4 py-3 cursor-pointer list-none flex items-baseline justify-between gap-3 hover:bg-panel-2/50 transition-colors rounded">
        <span className="font-serif text-base text-body/90 group-open:text-white">
          {block.title}
        </span>
        <span className="flex items-center gap-2 shrink-0">
          {isRecipe && (
            <span className="text-[10px] uppercase tracking-wider text-gold-dim font-mono">
              recipe
            </span>
          )}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-muted group-open:rotate-90 transition-transform"
            aria-hidden="true"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </span>
      </summary>
      <div className="px-4 pb-4 pt-1">
        <ReactMarkdown components={mdComponents}>{block.body || ''}</ReactMarkdown>
      </div>
    </details>
  );
}

// Markdown -> styled JSX. Sized one notch smaller than checklist text so the
// reference prose reads dense without crowding the rest of the page.
const mdComponents = {
  p: ({ children }) => (
    <p className="text-sm text-body/85 leading-relaxed mb-3 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-body font-medium">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-body/90">{children}</em>,
  ul: ({ children }) => (
    <ul className="text-sm text-body/85 leading-relaxed space-y-1 list-disc list-outside ml-5 mb-3 last:mb-0">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-sm text-body/85 leading-relaxed space-y-1 list-decimal list-outside ml-5 mb-3 last:mb-0">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  code: ({ children }) => (
    <code className="bg-panel-2 border border-border/60 px-1 py-0.5 rounded text-xs font-mono text-body">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-bg/80 border border-border/60 rounded p-3 text-xs font-mono text-body overflow-x-auto mb-3 last:mb-0">
      {children}
    </pre>
  ),
  h1: ({ children }) => (
    <h3 className="font-serif text-lg text-body mt-4 mb-2 first:mt-0">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="font-serif text-lg text-body mt-4 mb-2 first:mt-0">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="font-serif text-base text-body mt-3 mb-1.5 first:mt-0">{children}</h4>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-muted/40 underline-offset-2 text-body hover:text-white"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-3 text-muted italic my-3">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border/60 my-3" />,
};
