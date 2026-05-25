# Guide Resources

Structured data extracted from the Domistae PoE2 leveling guide (Patch 0.5).
This is the **source data** for the React app's checklist. It is intentionally
build-agnostic — the data describes the route, not how a specific build runs it.

**Source:** https://domistae.github.io/poe2-leveling/ (community-driven, fan-made — not affiliated with GGG)
**Fetched:** 2026-05-25
**Patch:** 0.5 (Return of the Ancients, ships 2026-05-29)

## Layout

```
guide-resources/
├── README.md             ← you are here
├── raw/
│   └── SOURCE_NOTE.md    ← pointer to original URLs
└── structured/
    ├── act1.json         ← 14 zones, 64 steps
    ├── act2.json         ← 20 zones, 85 steps
    ├── act3.json         ← 19 zones, 90 steps
    ├── act4.json         ← 18 zones, 63 steps
    └── interludes.json   ← 5 zones, 30 steps
```

Total: **76 zones / 332 actionable steps** across the campaign. Roughly 3.8x
more granular than the hand-curated `Vaal Codex/src/data/builds.js` currently has.

## JSON Schema

```jsonc
{
  "act": 1,                          // 1-4, or 5 for interludes
  "code": "act-1",                   // matches section.id in builds.js
  "title": "Act I — Clearfell to Ogham",
  "patch": "0.5",
  "levelRange": "1-14",              // string, may be "L11-14" etc.
  "source": "https://...",           // origin URL
  "fetched": "2026-05-25",
  "permanentRewards": [ ... ],       // bulleted list of rewards from this act
  "routingNotes": [ ... ],           // top-of-page strategy bullets
  "speedrunTips": [ ... ],           // community speedrun habits
  "patch05Notes": "...",             // optional act-level 0.5 callout
  "zones": [
    {
      "id": "riverbank",             // unique within the act
      "name": "Riverbank",
      "level": "1",                  // string, "1" / "5-6" / "L26+" etc.
      "tags": ["intro"],             // free-form labels (see Tag vocabulary below)
      "newIn05": "...",              // optional zone-level 0.5 callout
      "steps": [
        {
          "text": "Kill The Bloated Miller",
          "icon": "boss",            // see Icon vocabulary below
          "reward": "+2 Skill Points",  // optional, when the step grants something
          "optional": true,          // omit or false for required
          "firstChar": true,         // step only matters on first character through
          "newIn05": true,           // step is new/changed in 0.5
          "note": "Long-form callout..."
        }
      ]
    }
  ]
}
```

### Field reference

| Field | Required | Purpose |
|---|---|---|
| `act` | yes | Numeric act (1-5). |
| `code` | yes | Stable string id — used as the `section.id` when merging into builds.js. |
| `title` | yes | Display title for the section header. |
| `levelRange` | yes | Free-form level band. |
| `source` / `fetched` | yes | Provenance — keep updated when re-pulling. |
| `permanentRewards[]` | yes | Bulleted reward summary, shown in the section intro. |
| `routingNotes[]` | optional | Strategy bullets above the route. |
| `speedrunTips[]` | optional | Community speedrun habits. |
| `patch05Notes` | optional | Act-level 0.5 callout. |
| `zones[].id` | yes | Stable per-act zone id. |
| `zones[].name` | yes | In-game zone name. |
| `zones[].level` | yes | Free-form level band for the zone. |
| `zones[].tags[]` | optional | See Tag vocabulary. |
| `zones[].newIn05` | optional | Zone-level 0.5 callout (string). |
| `zones[].steps[].text` | yes | The actionable line. |
| `zones[].steps[].icon` | optional | Icon hint — see Icon vocabulary. |
| `zones[].steps[].reward` | optional | What you get (e.g. "+2 Skill Points"). |
| `zones[].steps[].optional` | optional | `true` if the source marked `(Opt)`. |
| `zones[].steps[].firstChar` | optional | `true` if only relevant on a fresh league character. |
| `zones[].steps[].newIn05` | optional | `true` if changed/added in 0.5. |
| `zones[].steps[].note` | optional | Long-form callout (mechanics, tips). |

### Icon vocabulary

Matches the `ItemIcon.jsx` set in the React app:

| Icon | Meaning |
|---|---|
| `vendor` | NPC dialog, quest accept, town turn-in |
| `portal` | Zone transition |
| `boss` | Named monster / boss |
| `gem` | Skill or support gem reward |
| `loot` | Specific item drop / interactable |
| `ascendancy` | Trial entry, ascendancy pick |
| `audit` | Resistance / level / gear checkpoint |
| `warning` | Permanent choice, missable, instant-death risk |

Items without an icon render plain. Don't invent new icons — extend `ItemIcon.jsx` first.

### Tag vocabulary

Free-form, used for filtering / styling at the zone level:

| Tag | Meaning |
|---|---|
| `town` | Hub zone (no combat objectives) |
| `intro` | Tutorial / opening |
| `waypoint` | Zone has a waypoint to grab |
| `skill-points` | Zone awards +N passive points |
| `spirit-reward` | Zone awards Spirit |
| `life-reward` | Zone awards max life |
| `mana-reward` | Zone awards max mana |
| `act-boss` | Final act boss arena |
| `act-end` | Post-boss town wrap-up |
| `ascendancy` | Trial entry zone |
| `island` | Act 4 island |
| `frag-or-matiki` | Act 4 fragment-bearing zone |
| `vaal-beacons` | Has Fate of the Vaal beacons |
| `warning` | Contains a permanent/missable choice |
| `endgame` | Maps / atlas |
| `optional` | Zone can be skipped |

## How this maps to `Vaal Codex/src/data/builds.js`

The app's `builds.js` shape is a **superset**: each build has sections,
sections have zones, zones have items. The mapping is roughly:

| Domistae JSON | builds.js |
|---|---|
| File (one per act) | One `section` |
| `code` | `section.id` |
| `title` | `section.title` |
| `permanentRewards` joined | `section.intro` |
| `zones[]` | `section.zones[]` |
| `zones[].id` | `section.zones[].id` (prefix recommended, e.g. `a1-z-riverbank`) |
| `zones[].name` | `section.zones[].name` |
| `zones[].steps[]` | `section.zones[].items[]` |
| `step.text` | `item.label` |
| `step.icon` | `item.icon` |
| `step.note` | `item.note` |
| `step.optional` | `item.priority = 'optional'` |
| `step.reward` | append to `item.label` (e.g. `"... → +2 Skill Points"`) or store in `item.note` |
| (build-specific overlay) | `item.scope = 'build'` |

### Generating builds.js items

`step` objects have no stable id of their own. When merging, build the item id from:

```
<act-code>-<zone-id>-<step-index>     e.g. a1-z-riverbank-0
```

Or, when the existing builds.js already has a hand-authored id that covers the same
in-game action (e.g. `a1-renly-twister`), **reuse the existing id** so localStorage
progress survives. Treat the JSON as the source of truth for *content* but the
existing builds.js as the source of truth for *ids* during the migration.

### Build-specific overlay

The JSON files are intentionally build-agnostic — they describe the route, not
which steps matter for Twister vs Lightning Spear. The React app has its own
`scope: 'build'` field on items that should only show for a specific build.

Recommended split:
- **Domistae JSON → general steps** (route, zones, audits, rewards)
- **builds.js manual additions → build overlay** (gem pickups specific to the build,
  ascendancy node order, build-specific boss tips, regex strings)

When merging, items from the JSON come in with `scope` unset (= general); items
the user/curator adds get `scope: 'build'`.

## When to re-fetch

The Domistae site updates near patch launch and during the league. Re-fetch the
5 act URLs when:

- A patch ships (especially major version bumps like 0.5 → 0.6)
- Patch notes change route/zone names
- The site author posts a major update

After re-fetching, run a diff against the existing JSON to spot real changes vs
noise, and update `fetched` timestamps.

## Caveats

- The Domistae site is community-driven, AI-assisted, and may lag patch-day reality
  by hours. Verify any critical change against the official 0.5 patch notes
  (https://www.pathofexile.com/forum/view-thread/3932540) before relying on it.
- Some Act 4 island fragments/Matiki locations are randomized per league —
  the JSON marks those zones with the `frag-or-matiki` tag and `Fragment?` reward.
- Act 3's zone order is flagged as "reordered in 0.5 but exact sequence
  not enumerated in patch notes" — treat as approximate.
