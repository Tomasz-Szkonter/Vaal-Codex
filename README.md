# Vaal Codex

A leveling checklist app for **Path of Exile 2** — campaign-zone-by-zone, tick-as-you-go, progress saved in your browser.

Built for the patch-cycle reality of PoE2: the long-form guides on Mobalytics / Maxroll / forums are great to read once, but useless while you're actually playing. Vaal Codex strips the same information down to "what do I do in *this* zone, right now."

## Current builds

| Build                        | Class                    | Patch                          | Status |
| ---------------------------- | ------------------------ | ------------------------------ | ------ |
| **Twister + Whirling Slash** | Huntress — Spirit Walker | 0.5 *Return of the Ancients*   | Live   |

A second placeholder build exists only to exercise the multi-card layout. New builds are authored as a single module under `src/data/builds/`.

## Features

- **Two-column build page** — sticky zone sidebar with scroll-spy on the left, checklist on the right. Collapses to a drawer below `lg`.
- **Per-item tagging** — every step is tagged on two orthogonal axes:
  - `scope`: `general` (any Huntress does this) vs `build` (only this build cares)
  - `priority`: `must` vs `optional`
  - plus an optional icon (`vendor`, `portal`, `boss`, `gem`, `loot`, `ascendancy`, `audit`, `warning`)
- **Progress persists locally** — checked items are stored in `localStorage` under `poe2-leveling:progress:<buildId>`, scoped per build. Clearing it resets that build only.
- **Alias-aware checks** — when items get split or renumbered between patches, legacy IDs are tracked as aliases so old saves don't lose progress.
- **Utility slide-out** — a right-edge tab on the build page for reference strings you paste into the game (stash regex, etc.). Separate from the checklist; not tied to progress.
- **Route overlay** — optional zone-route imagery layered onto the checklist when a build provides one.

## Stack

- React 18 + React Router 6
- Vite 5
- Tailwind 3
- No backend. No accounts. No tracking. State lives in `localStorage`..

## Running locally

```bash
npm install
npm run dev       # vite dev server
npm run build     # production build to dist/
npm run preview   # serve the built bundle
```

Requires Node 18+.

## Project layout

```text
src/
  pages/
    Home.jsx              build grid
    BuildDetail.jsx       sidebar + checklist
  components/
    Sidebar.jsx           sticky scroll-spy nav
    ChecklistSection.jsx
    ChecklistZone.jsx
    ChecklistItem.jsx
    ItemIcon.jsx          8 inline-SVG glyphs
    UtilityPanel.jsx      right-edge slide-out
    BuildCard.jsx
  hooks/
    useProgress.js        localStorage-backed checklist state
  data/
    builds/               one module per build
    general/              shared zone data reused across builds
    buildResolver.js      merges general + build-specific data
    helpers.js
```

## Authoring a new build

Each build is a module under `src/data/builds/` exporting `meta`, `buildSections`, and optionally `routeOverlay` and `utility`. The data shape for a checklist item is:

```js
{
  id,        // stable — this is the localStorage key. Never renumber.
  label,     // row text
  note,      // optional dim secondary line
  scope,     // 'general' (default) | 'build'
  priority,  // 'must' (default) | 'optional'
  icon,      // optional, one of the 8 glyph names
}
```

Defaults (`general`, `must`) are implicit — omit the field when it matches. The renderer only shows a chip when a field is non-default.

> **Stable IDs:** never renumber existing item IDs. Add new ones at the end. Renaming an ID wipes saved progress for that item across every user's browser.

## Why "Vaal Codex"

It's a checklist for the campaign — the part of PoE2 where the Vaal show up and ruin your day. "Codex" because it's the small reference book you keep open in the second monitor.

## License

Personal project. No license declared yet — assume all rights reserved until one is added.
