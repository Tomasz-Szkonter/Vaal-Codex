// Twister + Whirling Slash, Huntress / Spirit Walker, Patch 0.5.
//
// This file is the build's overlay on top of the general route plus the
// build-specific reference sections (gem progression, gear, regex, boss tips).
// IDs on overlay items are preserved verbatim from the pre-refactor builds.js
// so existing localStorage progress survives untouched. JSON-derived steps
// that absorbed a legacy hand-authored item are wired up via the alias map in
// buildResolver.js, not here.

export default {
  meta: {
    id: 'twister-spirit-walker',
    name: 'Twister + Whirling Slash',
    class: 'Huntress',
    ascendancy: 'Spirit Walker',
    patch: '0.5',
    tagline:
      "Cold-conversion projectile build. League-start friendly. Squishy early, scales hard once Mhacha's Gift comes online.",
  },

  // BUILD-tab info — placeholders for now. Real prose lands when we backfill
  // this build to match the explosive-witchhunter shape. The fields exist so
  // the future BUILD-tab UI renders cleanly for every build.
  info: {
    author: null,
    sources: [],
    blocks: [
      {
        id: 'overview',
        title: 'Build overview',
        body: 'TODO: write the elevator pitch (cold-conversion projectile, league-start friendly, Mhacha’s Gift spike).',
      },
      {
        id: 'main-skills',
        title: 'Main skills',
        body: 'TODO: distill from the skill-gem section below (Twister, Whirling Slash, Frost Bomb, Barrage, Ice-Tipped Arrows, Parry, Freezing Mark, War Banner).',
      },
      {
        id: 'main-mechanics',
        title: 'Main mechanics',
        body: 'TODO: cold conversion, chill/freeze loops, projectile shotgunning, spear breakpoints.',
      },
      {
        id: 'general-tips',
        title: 'General league-start tips',
        body: 'TODO: weapon-swap binds, attribute distribution, Sapphire Ring before Geonor, etc.',
      },
    ],
  },

  // Utility — surfaced in the slide-out panel on the build page. Not part of
  // the checklist (no progress tracking); these are reference strings the user
  // pastes into the in-game vendor search bar (250-char limit in 0.5).
  utility: {
    regex: [
      {
        id: 'multi',
        name: 'Multi-purpose leveling',
        pattern: 'phys|projectile|cold dam|life|to all elem|to (cold|fire|light)|movement|atk speed|spirit',
        notes: 'All-around scan: spear/proj damage, life, res, movement. Works through Act 3.',
      },
      {
        id: 'tight-a1',
        name: 'Tight Act 1',
        pattern: 'cold|phys|life|to all|move',
        notes: 'Quick recall for Act 1 vendor refreshes — fits the old 50-char bar too.',
      },
      {
        id: 'a1-geonor',
        name: 'Act 1 — Geonor prep',
        pattern: 'cold res|sapphire|life|to (cold|all)',
        notes: 'Cold res + Sapphire ring + life before Geonor.',
      },
      {
        id: 'a2-jamanra',
        name: 'Act 2 — Jamanra prep',
        pattern: 'light res|fire res|topaz|ruby|to all elem|life',
        notes: 'Lightning + fire res for the Dreadnought fight.',
      },
      {
        id: 'a3-doryani',
        name: 'Act 3 — Doryani / 75% caps',
        pattern: 'to all elem|res|life|topaz|ruby|sapphire',
        notes: 'Push to 75/75/75 all res before Black Chambers.',
      },
      {
        id: 'amulet',
        name: 'Amulet hunt (+proj skills)',
        pattern: 'proj skill|all skill|level of all|\\+1 to|\\+2 to|life',
        notes: 'Post-L20: hunt +# Projectile Skill Levels amulets.',
      },
      {
        id: 'currency',
        name: 'Currency / orbs (always on)',
        pattern: 'regal|exalt|chaos|divine|orb of (alchemy|augment|trans)|fusing',
        notes: 'Quick scan of vendor inventories for currency drops.',
      },
    ],
  },

  buildSections: [
    {
      id: 'pre-launch',
      title: 'Pre-launch setup',
      position: 'before-route',
      intro: 'Do these once, before league start. Saves you minutes per day.',
      items: [
        { id: 'pre-loot-filter', label: 'Load a build-specific loot filter (spears, evasion, +proj skills)', scope: 'build' },
        { id: 'pre-stash', label: 'Pre-organize stash tabs in Standard (layout carries to the new league)' },
        { id: 'pre-weapon-swap-binds', label: 'Bind weapon swap sets: Ctrl+Shift+LMB -> set 1, Ctrl+Shift+RMB -> set 2', scope: 'build' },
        { id: 'pre-quick-assign', label: 'Enable "Quick Assign" for attribute nodes in keybinds' },
        { id: 'pre-gem-restrictions', label: 'Settings -> Game: remove gem-cutting and equipping restrictions' },
        { id: 'pre-tree-confirm', label: 'Confirm Ctrl auto-confirms passive tree allocations' },
      ],
    },

    {
      id: 'patch-briefing',
      title: '0.5 patch briefing',
      position: 'before-route',
      intro: 'Things that changed campaign-side. Internalize these before day 1.',
      items: [
        { id: 'patch-vanguard-removed', label: 'Dreadnought Vanguard is removed - fight Jamanra directly in The Dreadnought', icon: 'warning' },
        { id: 'patch-act3-reorder', label: 'Act 3 is reordered - do NOT rely on 0.4 memory; follow visual cues', icon: 'warning' },
        { id: 'patch-waterways-pads', label: 'Matlan Waterways: levers are walk-over pressure pads; final canal ships pre-drained' },
        { id: 'patch-waterways-entrance', label: 'Waterways entrance moved from Infested Barrens -> Jungle Ruins (Azak Bog lives inside now)' },
        { id: 'patch-density', label: 'Monster density reduced in second half of campaign (especially Interludes)' },
        { id: 'patch-regex-250', label: 'NPC vendor search bar is now 250 chars (was 50) - use longer regex strings', icon: 'vendor' },
        { id: 'patch-vaal-core', label: 'Fate of the Vaal is core: 6 Ancient Beacons in Act 3 + 6 in Interludes opens Vaal Ruins' },
      ],
    },

    {
      id: 'endgame-day1',
      title: 'Endgame - Day 1',
      intro: 'First night in Maps. Pivot from leveling shape to atlas shape.',
      items: [
        { id: 'end-fortress', label: 'First Tower -> summon Fortress' },
        { id: 'end-atlas-master', label: 'Choose a Master of the Atlas (Doryani / Hilda / Jado)' },
        { id: 'end-atlas-points', label: 'Run Fortress maps for Atlas Passive Points' },
        { id: 'end-currency-exchange', label: 'Trade for build-defining amulet/uniques via Currency Exchange', scope: 'build', icon: 'vendor' },
        { id: 'end-runic-ward', label: 'Verisium Runeforge all armour (apply Runic Ward) - unlocked via Farrow chain', icon: 'vendor' },
        { id: 'end-jewellers', label: "Greater Jeweller's Orbs -> upgrade to a 4-socket main skill", scope: 'build', icon: 'gem' },
      ],
    },

    {
      id: 'ascendancy',
      title: 'Spirit Walker - Ascendancy order',
      intro: 'Mirrors the per-act picks above. Re-check before each trial. Alternate safer order: Wild Protector + Vivid Stampede at Trial 1 if dying a lot.',
      items: [
        { id: 'asc-t1-1', label: 'Trial 1, point 1: Primal Bounty (Owl core)', scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t1-2', label: 'Trial 1, point 2: Wild Protector (Bear core)', scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t2-1', label: "Trial 2, point 1: The Mhacha's Gift (Owl upgrade)", scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t2-2', label: 'Trial 2, point 2: Vivid Stampede (Stag core)', scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t3-sacred', label: 'Trial 3: Sacred Unity (free 9th point) once Vivid Stampede + Primal Bounty + Wild Protector are all in', scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t3-pick', label: "Trial 3: The Catha's Balance (strong spear) OR Idolatry (endgame companion pivot)", scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t4', label: "Trial 4: The Morrigan's Guidance (raw damage) OR The Natural Order (tame beasts)", scope: 'build', icon: 'ascendancy' },
        { id: 'asc-idolatry-warn', label: 'Reminder: do NOT take Idolatry in campaign (-4% all res per non-Idol augment)', scope: 'build', icon: 'warning' },
      ],
    },

    {
      id: 'skill-gems',
      title: 'Skill gem progression',
      intro: "Upgrade Twister first. Do NOT upgrade Whirling Slash - it's a setup/whirlwind tool, not direct damage.",
      items: [
        { id: 'gem-twister-l1', label: 'L1: Twister (Renly quest reward)', scope: 'build', icon: 'gem' },
        { id: 'gem-frostbomb-l1', label: 'L1: Frost Bomb (Clearfell uncut gem)', scope: 'build', icon: 'gem' },
        { id: 'gem-twister-l3', label: 'L3: Upgrade Twister (Lachlann)', scope: 'build', icon: 'gem' },
        { id: 'gem-fangs-l3', label: 'L3: Fangs of Frost (Rust King) - drop later when Frost Nexus comes online', scope: 'build', icon: 'gem' },
        { id: 'gem-barrage-l5', label: 'L5: Barrage (Leitis)', scope: 'build', icon: 'gem' },
        { id: 'gem-ice-tipped-l5', label: 'L5: Ice-Tipped Arrows (Vastiri Outskirts - Zarka)', scope: 'build', icon: 'gem' },
        { id: 'gem-whirling', label: 'Act 1: Whirling Slash (quest reward) - main setup skill [VERIFY exact unlock]', scope: 'build', icon: 'gem' },
        { id: 'gem-parry-l10', label: 'L10: Parry (slot in offhand)', scope: 'build', icon: 'gem' },
        { id: 'gem-freezing-mark-l10', label: 'L10: Freezing Mark (useful curse for bosses)', scope: 'build', icon: 'gem' },
        { id: 'gem-war-banner-a2', label: 'Act 2: add War Banner (+25% more attack damage on single target)', scope: 'build', icon: 'gem' },
        { id: 'gem-drop-fangs', label: 'Act 3: drop Fangs of Frost once Twister has Frost Nexus support', scope: 'build', icon: 'gem' },
        { id: 'gem-drop-parry', label: 'Act 3+: phase out Parry once Ice-Tipped + Frost Nexus carry chilled ground/freeze', scope: 'build', icon: 'gem' },
      ],
    },

    {
      id: 'support-gems',
      title: 'Support gems - pickup order & sources',
      intro: 'Slot in priority order. Sources are Act 1 zones unless noted.',
      items: [
        { id: 'sup-rage', label: '1st: Rage I (Grelwood, Areagne) -> Whirling Slash - builds rage on hit', scope: 'build', icon: 'gem' },
        { id: 'sup-rapid', label: '2nd: Rapid Attacks I (Ogham Village, The Executioner) -> Whirling Slash - faster whirlwind stacks', scope: 'build', icon: 'gem' },
        { id: 'sup-retreat', label: '3rd: Retreat I (Tomb of the Consort, Haunted Treasure) -> Twister - bonus dmg after dodge', scope: 'build', icon: 'gem' },
        { id: 'sup-prolonged', label: '4th: Prolonged Duration I (Manor Ramparts, The Gallows) -> War Banner uptime', scope: 'build', icon: 'gem' },
        { id: 'sup-faster-casting', label: '5th: Faster Casting -> Frost Bomb / utility', scope: 'build', icon: 'gem' },
      ],
    },

    {
      id: 'gear',
      title: 'Gear priority + leveling uniques',
      intro: 'Weapon is your single biggest lever. Spend currency at the breakpoints, not in between.',
      items: [
        { id: 'gear-spear-l11', label: 'Spear breakpoint L11: regal/exalt-dump candidate', scope: 'build', icon: 'vendor' },
        { id: 'gear-spear-l22', label: 'Spear breakpoint L22: regal/exalt-dump candidate', scope: 'build', icon: 'vendor' },
        { id: 'gear-spear-l33', label: 'Spear breakpoint L33: regal/exalt-dump candidate', scope: 'build', icon: 'vendor' },
        { id: 'gear-amulet-proj', label: 'Amulet: +# Projectile Skill Levels (biggest single DPS upgrade)', scope: 'build', icon: 'loot' },
        { id: 'gear-boots-ms', label: 'Boots: 30%+ Movement Speed first, then res, then life', scope: 'build', icon: 'loot' },
        { id: 'gear-runic-ward', label: 'Apply Runic Wood / Runic Ward to all armour pieces (new 0.5)', icon: 'vendor' },
        { id: 'gear-loratta', label: 'Watch for Splinter of Loratta (spear) - Unique Verisium Runeforging target', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-goldrim', label: 'Watch for Goldrim (helm) - all-res budget cap', priority: 'optional', icon: 'loot' },
        { id: 'gear-wanderlust', label: 'Watch for Wanderlust (boots) - MS + freeze immunity', priority: 'optional', icon: 'loot' },
        { id: 'gear-skip-facebreaker', label: 'SKIP Facebreaker from Elder Madox - wants unarmed, not spear', scope: 'build', icon: 'warning' },
      ],
    },

    {
      id: 'regex',
      title: 'Vendor regex strings (250-char limit in 0.5)',
      intro: 'Save these somewhere accessible (notepad, second monitor). Paste into the vendor search bar.',
      items: [
        { id: 'regex-multi', label: 'Save: multi-purpose Twister leveling regex (~200 chars)', scope: 'build', icon: 'vendor' },
        { id: 'regex-tight-a1', label: 'Save: tight Act 1 regex (~85 chars) for quick recall', scope: 'build', icon: 'vendor' },
        { id: 'regex-geonor', label: 'Save: Act 1 Geonor regex (cold/sapphire/life)', scope: 'build', icon: 'vendor' },
        { id: 'regex-jamanra', label: 'Save: Act 2 Jamanra regex (lightning + fire + topaz/ruby)', scope: 'build', icon: 'vendor' },
        { id: 'regex-doryani', label: 'Save: Act 3 Doryani regex (all res, 75% target)', scope: 'build', icon: 'vendor' },
        { id: 'regex-amulet', label: 'Save: amulet hunt regex (post-L20, +proj skills priority)', scope: 'build', icon: 'vendor' },
        { id: 'regex-currency', label: 'Save: currency/orbs regex (always-on)', icon: 'vendor' },
      ],
    },

    {
      id: 'boss-tips',
      title: 'Build-specific boss tips',
      intro: 'How Twister + Whirling Slash handles each major fight. Each line is also annotated on the route step itself.',
      items: [
        { id: 'boss-crowbell', label: 'Crowbell (A1): strafe sideways; Whirling Slash 3x -> Twister + Frost Bomb', scope: 'build', icon: 'boss' },
        { id: 'boss-executioner', label: "The Executioner (A1): kite from range; Barrage when enraged - don't melee", scope: 'build', icon: 'boss' },
        { id: 'boss-geonor', label: "Geonor (A1): cold conversion isn't online - lean on phys Twister; Sapphire Ring on", scope: 'build', icon: 'boss' },
        { id: 'boss-balbala', label: 'Balbala (A2): walk through poison; Frost Bomb the hidden spot to reveal', scope: 'build', icon: 'boss' },
        { id: 'boss-jamanra', label: 'Jamanra (A2): multi-phase - save flask charges for transitions; Whirling Slash blind uptime', scope: 'build', icon: 'boss' },
        { id: 'boss-silverfist', label: 'Mighty Silverfist (A3): STRAFE SIDEWAYS ONLY - shockwave follows facing. Twister kites at range', scope: 'build', icon: 'boss' },
        { id: 'boss-bog-witch', label: 'Ignagduk / Bog Witch (A3): cold-themed - stack fire/cold res; Banner + Mark for burst', scope: 'build', icon: 'boss' },
        { id: 'boss-xyclucian', label: 'Xyclucian (A3): 3 elemental forms - Frost Bomb between phases; Twister multi-hits help', scope: 'build', icon: 'boss' },
        { id: 'boss-viper', label: 'Viper Napuatzi (A3): anti-poison charm + chaos/fire res', scope: 'build', icon: 'boss' },
        { id: 'boss-doryani', label: 'Doryani (A3): 75% all res; Whirling Slash to blind during his telegraphs', scope: 'build', icon: 'boss' },
        { id: 'boss-karui-islands', label: 'Karui island bosses (A4): mostly beast-type - Natural Order can tame later', scope: 'build', icon: 'boss' },
      ],
    },
  ],

  routeOverlay: {
    // ---- Act 1 ----
    'act-1-z-clearfell-encampment': {
      prepend: [
        { id: 'a1-renly-twister', label: 'Renly: take Twister as quest reward', scope: 'build', icon: 'gem' },
        { id: 'a1-clearfell-frostbomb', label: 'Clearfell uncut skill gem: cut into Frost Bomb', scope: 'build', icon: 'gem' },
      ],
    },
    'act-1-z-hunting-grounds': {
      annotate: {
        'act-1-z-hunting-grounds-1': {
          buildNote: 'Strafe sideways, never dodge backward — Whirling Slash 3x → Twister + Frost Bomb.',
          scope: 'build',
        },
      },
    },
    'act-1-z-ogham-village': {
      annotate: {
        'act-1-z-ogham-village-2': {
          buildNote: "Kite from range; Barrage when enraged — don't melee.",
          scope: 'build',
        },
      },
    },
    'act-1-z-ogham-manor': {
      prepend: [
        { id: 'a1-redblade-rack', label: "Hit Redblade's weapon racks - guaranteed one of every tier-2 martial weapon", icon: 'vendor' },
        { id: 'a1-greater-flask', label: 'Upgrade to Greater Life Flask at L10 - BEFORE Geonor', icon: 'vendor' },
        { id: 'a1-sapphire-ring', label: 'Buy/craft a Sapphire Ring for cold res before Geonor', icon: 'vendor' },
        { id: 'a1-audit', label: 'Audit: L10+, Greater Flask, Cold Res > 30%, ~250 Life', icon: 'audit' },
      ],
      annotate: {
        'act-1-z-ogham-manor-1': {
          buildNote: "Cold conversion not online yet — lean on phys Twister; Sapphire Ring on.",
          scope: 'build',
        },
      },
    },

    // ---- Act 2 ----
    'act-2-z-traitors-passage': {
      annotate: {
        'act-2-z-traitors-passage-1': {
          buildNote: 'Frost Bomb the hidden spot to reveal.',
          scope: 'build',
        },
      },
    },
    'act-2-z-trial-of-sekhemas': {
      prepend: [
        { id: 'a2-asc-primal-bounty', label: 'Pick #1: Primal Bounty (Owl) - Twister damage multiplier', scope: 'build', icon: 'ascendancy' },
        { id: 'a2-asc-wild-protector', label: 'Pick #2: Wild Protector (Bear) - survivability through the squishy phase', scope: 'build', icon: 'ascendancy' },
      ],
    },
    'act-2-z-dreadnought': {
      prepend: [
        { id: 'a2-dreadnought-res', label: 'Hit 70% all res (Lightning priority) before entering', icon: 'audit' },
        { id: 'a2-audit', label: 'Audit: L29, 70% all res, ~600 Life+ES, Greater -> Grand Life Flask', icon: 'audit' },
      ],
      annotate: {
        'act-2-z-dreadnought-1': {
          buildNote: 'Whirling Slash blind uptime helps during transitions.',
          scope: 'build',
        },
      },
    },

    // ---- Act 3 ----
    'act-3-z-sandswept': {
      prepend: [
        { id: 'a3-soul-core-warning', label: 'Internalize: never respawn at checkpoint while holding a Soul Core', icon: 'warning' },
      ],
    },
    'act-3-z-jungle-ruins': {
      annotate: {
        'act-3-z-jungle-ruins-0': {
          buildNote: 'Twister kites at range.',
          scope: 'build',
        },
      },
    },
    'act-3-z-chimeral-wetlands': {
      annotate: {
        'act-3-z-chimeral-wetlands-4': {
          buildNote: 'Frost Bomb between phases; Twister multi-hits help.',
          scope: 'build',
        },
      },
    },
    'act-3-z-azak-bog': {
      annotate: {
        'act-3-z-azak-bog-2': {
          buildNote: 'Cold-themed — stack fire/cold res; Banner + Mark for burst. Spear + Gemrot Skull → +30 Spirit (60 total).',
          scope: 'build',
        },
      },
    },
    'act-3-z-utzaal': {
      annotate: {
        'act-3-z-utzaal-6': {
          buildNote: 'Anti-poison charm + chaos/fire res.',
          scope: 'build',
        },
      },
    },
    'act-3-z-trial-of-chaos': {
      prepend: [
        { id: 'a3-asc-mhacha', label: "Pick #1: The Mhacha's Gift - THE damage spike (+6 proj, ~204% proj speed)", scope: 'build', icon: 'ascendancy' },
        { id: 'a3-asc-vivid-stampede', label: 'Pick #2: Vivid Stampede - unlocks free Sacred Unity later', scope: 'build', icon: 'ascendancy' },
      ],
    },
    'act-3-z-black-chambers': {
      prepend: [
        { id: 'a3-audit', label: 'Audit (CRITICAL): 75/75/75 res, 1,500+ Life, 400+ ES, 4,000+ Evasion, 30%+ MS', icon: 'audit' },
      ],
      annotate: {
        'act-3-z-black-chambers-0': {
          buildNote: 'Whirling Slash to blind during his telegraphs; 75% all res.',
          scope: 'build',
        },
      },
    },

    // ---- Act 4 ----
    'act-4-z-trial-of-ancestors': {
      prepend: [
        { id: 'a4-halls-2', label: 'Hall #2: choose +5 attribute OR +5 res (PERMANENT)', icon: 'loot' },
        { id: 'a4-halls-3', label: 'Hall #3: choose +5 attribute OR +5 res (PERMANENT)', icon: 'loot' },
        { id: 'a4-navali', label: 'After all 3 Halls: talk to Navali -> Greater Mind Rune', icon: 'portal' },
      ],
    },
    'act-4-z-finale': {
      prepend: [
        { id: 'a4-audit', label: 'Audit: L52+, 75/75/75 res, all 8 islands cleared', icon: 'audit' },
      ],
    },

    // ---- Interludes ----
    'interludes-z-interlude-52': {
      prepend: [
        { id: 'inter-trial-3', label: "Trial 3 (L~60): Sacred Unity (FREE) + The Catha's Balance OR Idolatry", scope: 'build', icon: 'ascendancy' },
      ],
    },
    'interludes-z-interlude-53': {
      prepend: [
        { id: 'inter-trial-4', label: "Trial 4 (L~70): The Morrigan's Guidance (default) OR The Natural Order (companion meme)", scope: 'build', icon: 'ascendancy' },
      ],
      annotate: {
        'interludes-z-interlude-53-8': {
          buildNote: 'Free Unique pick — SKIP Facebreaker (wants unarmed, not spear).',
          scope: 'build',
        },
      },
    },
    'interludes-z-completion': {
      prepend: [
        { id: 'inter-siege', label: 'Siege of Oriath (+2 passives)', icon: 'boss' },
      ],
    },
  },
};
