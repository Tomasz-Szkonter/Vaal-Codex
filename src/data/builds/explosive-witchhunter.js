// Explosive Witchhunter — Mercenary / Witchhunter, Patch 0.5.
//
// First-pass authoring of the new build-info layer (info.author / sources /
// blocks). Content is distilled from BigDucks' Mobalytics guide — see
// info.sources. buildSections and routeOverlay are intentionally empty for
// now: the source's per-act tips live as info blocks until we map its zone
// references (Grellwood, Red Vale, Cemetery of the Eternals, Mawdun Quarry,
// Lightless Passage, Keth, Bone Pits, Singing Caverns, Ngakanu, …) to the
// JSON-derived zone IDs in general/route.js.

export default {
  meta: {
    id: 'explosive-witchhunter',
    name: 'Explosive Witchhunter',
    class: 'Mercenary',
    ascendancy: 'Witchhunter',
    patch: '0.5',
    tagline:
      'Grenade crossbow build. Gem-level scaling one-shots bosses; Sorcery Ward scales to 10k+ shield once maps start.',
  },

  info: {
    author: 'BigDucks',
    sources: [
      {
        label: 'Mobalytics build guide',
        url: 'https://mobalytics.gg/poe-2/builds/explosive-witchhunter',
        primary: true,
      },
      {
        label: 'BigDucks — Explosive Witchhunter league-start (YouTube)',
        url: 'https://www.youtube.com/watch?v=nlhTZQCc1XE',
      },
      {
        label: 'BigDucks — all PoE2 builds',
        url: 'https://mobalytics.gg/poe-2/bigducks',
      },
    ],
    blocks: [
      {
        id: 'overview',
        title: 'Build overview',
        body: `Grenade-focused Mercenary that scales through gem levels rather than weapon damage. Explosive Grenade is one of the strongest numerical abilities in the game — late-game gem levels let it one-shot most bosses with a full ground loadout. Explosive Shot (paired with Arjun's Medal + Ratha's Assault) carries AoE clear with effectively no cooldown or reload.

Defensively the build pivots into Sorcery Ward once you hit maps: a 10k+ damage shield that snapshots off evasion/armour and refills 6 seconds after damage stops.

The original guide is published in two halves — an SSF league-start path covering campaign through first pinnacles, and a trade-gear path with PoB for players who'd rather buy power early.`,
      },
      {
        id: 'main-skills',
        title: 'Main skills',
        body: `**Explosive Grenade** — primary single-target. Gem levels scale this absurdly; with a full ground loadout you can one-shot most bosses.

**Explosive Shot** — primary clear once it comes online. With Arjun's Medal (25% chance to load a bolt on kill) + Ratha's Assault (4 total bolts), reloads become rare. Patch 0.5 may require a 2nd crossbow dedicated to Explosive Shot.

**Sorcery Ward** — the defensive backbone post-campaign. Pairs with Ceremonial Ablution; scales to ~10k shield late-game from %evasion + %armour. Refills instantly 6 seconds after taking damage (or 6s after depletion).

**Flash Grenade** — engage/stun tool. With Bhatair's Vengeance + Freeze + Embitter it gives 23% extra-as-cold on small-mob kills (preferred over Ice Bite II for duration).

**Gas Grenade** — detonation primer. Drop in front of you, then Explosive Grenade to ignite. Has a ground limit — don't spam.`,
      },
      {
        id: 'main-mechanics',
        title: 'Main mechanics',
        body: `**Constricting Command (-4 required)** — makes grenades free to cast. Scale Surround area so it's effectively always active. The tree's surround nodes also give significant damage and stats.

**Sorcery Ward + Ceremonial Ablution** — generic damage shield from %evasion + %armour. Armour is the weaker layer — go all-in on evasion. Hyrri's Ire snapshots the shield; with High Alert and other tree nodes, 10k shield is realistic. At 80%+ evasion the refill is functionally instant.

**Deflection** — updated formula puts the high-end version close to Deflect Cap, primarily via Atziri's Step. Vaal-corrupted boots aren't required.

**Shotgunning** — AoE grenade explosions can shotgun, so additional projectiles are very strong. 2 generic from Cluster Bombs + Siege Crossbow base, 2 more chance from Run and Gun. Early game uses Multishot II until expensive supports are affordable.

**Explosive Shot loop** — Arjun's Medal + Ratha's Assault keep your bolt pool topped during clear. Dodge-rolling between packs naturally times the on-kill bolt loads.`,
      },
      {
        id: 'general-tips',
        title: 'General league-start tips',
        body: `- All skills go on Tree 1 (the Grenade Tree) except Explosive Shot. Auras on both trees.
- Play WASD — significantly easier with this build.
- Marathon, not sprint. Upgrade when weak; PoE2 doesn't reward brute-forcing skill checks the way PoE1 did.
- Campaign stats: enough Dex/Int to equip gear/gems, then everything into Strength for life.
- Mid-campaign clear pivots from Flash Grenade to Cluster Grenade / Explosive Shot as gems come online. Endgame is almost pure Explosive Shot for clear.
- If you die while sprinting, roll more as you encounter enemies.
- Pick up socketed/quality gear → scrap for quality currency.
- Pick up every rare. Disenchant or sell for gold — both fund crafting and gambling.
- Save Regals / Exalts / Essences for genuinely good bases. Don't slam thoughtlessly.
- Once you hit Act 4 and the Exchange, buy gear. Trade league exists to be used.`,
      },
      {
        id: 'act-1-tips',
        title: 'Act 1 — campaign tips',
        body: `**Gameplay shape** — Once you have Gas Grenade, clear with Flash Grenade if your damage is strong enough. Otherwise drop Gas Grenade in front of you and detonate with Explosive Grenade, leading enemies overtop. For bosses, alternate Gas → Explosive; throw Flash when nothing else is up. Gas Grenade has a ground limit — don't spam. Bosses that move frequently (Balbala especially) are hard to hit with this combo — stun first with Flash, then load up.

Bind suggestion (WASD): Gas Grenade on LMB, Explosive Grenade on RMB.

**Leaving Town** — Check vendors often. Upgrade priorities: resists, life, MS on boots, added damage on gloves, better weapons. Don't spend high currency until the Act 2 weapon craft. Phys or elemental damage are both fine early. Basic Shot beats Fragmentation Rounds for single target. Explosive Grenade is hard to aim early — throw in front of you and lead enemies overtop. Grab the extra gem from the camp outside the first zone and cut into Frost Bomb for early bosses. Pounce works as a mark and an escape; later drop for Voltaic Mark. Save your blank rune for the Act 2 weapon.

**Boss template** — Frost Bomb for Exposure → place Explosive Grenades in one spot and kite in a circle, keeping the boss in their range. Basic Bolts + Flash Grenade fill cooldowns. Frost Bomb stops working at L20 — drop it then, slot Oil Grenade later.

**The Rust King** — Kill Aregane in The Grellwood for 2× Flasks + a support gem (cut into Multishot I for Explosive Grenade). Grab a new crossbow from the Refined Arms in The Red Vale; Transmute / Augment until you hit damage. Grab the ring from one of the side graves in the Cemetery of the Eternals. Around now, with a decent weapon, Flash Grenade clear is online.

**Lachlann** — Same neighborhood — pick up the Cemetery ring if you skipped it, lean on Flash Grenade clear. (Source duplicates the Rust King notes here; treat as the same window.)`,
      },
      {
        id: 'act-2-tips',
        title: 'Act 2 — campaign tips',
        body: `**Weapon craft** — First job on entering Act 2 is a Varnished Crossbow, targeting 2-3 good damage prefixes. Process: white bases → Transmute / Augment for 1 good prefix. If you find or make a blue with 1 good prefix, Regal for a 2nd. If you hit a very good prefix + acceptable suffix (skill levels, attack speed), spend a damage essence. Once you have 2-3 good prefixes, socket 2 damage runes. This xbow carries you for a while.

**Quality currency** — Mawdun Quarry drops it regularly.

**Tree swap** — Around Explosive Shot + your first ascendancy, you'll have enough Weapon Skill Passives to drop the talisman (if you were using it for Pounce) and swap to Tree 2 for Explosive Shot. Unequip the talisman, right-click the lock icon above your weapon to use it on both trees. Small respec needed; gold should cover it. Grenadier comes online around now — major QoL bump.

**4-link priorities** — First 4-link goes on Flash Grenade (clear) or Explosive Grenade (single target) — whichever you want first. Second on the other. Then Explosive Shot. Then Gas Grenade.

**Other** — Grab the waypoint inside Lightless Passage (return later to clear the Abyss). Clear ALL Abysses going forward — bones make crafting easier. Kill Snake Men at Keth and Hyenas at the Bone Pits for their idols.

**Trial of the Sekhemas** — Do it as soon as it unlocks; the clear upgrade is substantial. Focus on avoiding bad room mods over maximizing water (only one floor). Endgame Sekhemas notes: gather max relics in 1st and 3rd ascendancy (4th is much harder). Relic priorities: Honour Resistance (#1, on every relic except 1), See Further Ahead on the Map (the one exception), Boss/Rare Damage, then anything else. Always gather Sacred Water for merchants — this is the overall goal of any run. Never take build-disabling mods (e.g. no evasion). Sekhemas is about choices, not gameplay.`,
      },
      {
        id: 'act-3-tips',
        title: 'Act 3 — campaign tips',
        body: `By now your kit should be: mostly Explosive Shot for clear, occasional Flash Grenades, Explosive Grenade for single target, Gas Grenade for the hardest enemies.

**Mark** — Use Voltaic Mark on bosses with Mark of Siphoning (mana leech). Once you have a level 4 support gem, cut Mark of Siphoning II as your first lvl 4 — adds life leech.

**Weapon** — Mid-act, upgrade to a Bombard Crossbow (same crafting flow as the Varnished). If you find a strong non-grenade xbow, slot it in your 2nd weapon set for Explosive Shot rather than locking your main weapon to both — grenade-base crossbows are a huge damage increase for grenade skills, so don't dilute the main slot.`,
      },
      {
        id: 'act-4-tips',
        title: 'Act 4 — campaign tips',
        body: `**Island order** — Doesn't matter much; source author runs left to right.

**Pearl** — Grab the Pearl in the Singing Caverns and give it to Rog → very good amulet most of the time.

**Quick vendor check** — Stop by Ngakanu early, after the shark fin, to scan their vendor for a crossbow.

**Sustain** — Find a source of physical life leech to stay topped while clearing. Rings, weapon, or gloves; buy it if you have to.

**Defenses kick in** — Act 4 is where resistances and life total start mattering. Enemies hit hard. Cap resists, max life/evasion/armour. With a good crossbow your damage is fine — focus tankiness.

**Tattoos** — Take resistances from the Tattoos.`,
      },
      {
        id: 'interludes-tips',
        title: 'Interludes — campaign tips',
        body: `**Cluster Grenade** unlocks around here — use it for very large packs.

**Charm** — Take Tabana's Boon for now. Swap to Akheli's for the endgame version of the build.

**Defenses + crossbow** — Keep upgrading. Resists drop off as you push interludes; don't let them slip.`,
      },
      {
        id: 'endgame-respec',
        title: 'Endgame — defensive respec',
        body: `Once you reach maps, swap into Sorcery Ward and let defenses carry you deeper. Priority order while spamming T1 blue maps:

1. **Instant Ultimate Life Flask** — pick up life flasks from the ground, Transmute / Augment them.
2. **Max Resistances** — salvage socketed items for rune currency; rune your gear; upgrade via trade vendor.
3. **Evasion / Armour** — mostly evasion (it's what feeds Sorcery Ward). Use Leather Bound Gauntlets on armour gloves.
4. **Life** — secondary, but enough to survive DoTs.
5. **Damage** — comes mostly from weapon, links, and gem levels. Elemental damage is easier to roll than phys; +gem levels is very strong.

Once these are in place, do your 3rd Ascendancy in the Trials of the Sekhemas — Sorcery Ward prevents honour loss, making the trial trivial.`,
      },
      {
        id: 'late-endgame',
        title: 'Late endgame — gear & uniques',
        body: `For players pushing high-end content:

- **Constricting Command** — swap to alternate version with increased Surround Effect for more uptime.
- **Hyrri's Ire** — double-corrupt looking for sockets, implicits, increased rolls.
- **Atziri's Step** — alternate with Increased Deflection Rating while Moving, plus as much raw evasion as possible.
- **Prism of Belief** — +3 Explosive Grenade is the goal; +2 may be the practical ceiling (price-wise).
- **Olroth's Resolve** — not required, but the best life flask in the game.
- **Rite of Passage** — usually absurdly expensive; substitute with a stone charm (Cat > Stag > Wolf).`,
      },
      {
        id: 'crafting-siege-xbow',
        title: 'Crafting recipe — Late endgame Siege Crossbow',
        kind: 'recipe',
        body: `Order of operations:

1. Obtain a base with T1 Added Lightning Damage fractured — bought or self-fractured.
2. Chaos Orbs → roll T1 Added Fire or Cold.
3. Add a suffix with exalt omens.
4. Omen of Dextral Crystallisation + Perfect Essence of Abrasion → % Gained as Phys.
5. Suffix with Exalt.
6. Omen of Dextral Crystallisation + Perfect Essence of Battle.
7. Suffix with Exalt.
8. Omen of Dextral Crystallisation + Perfect Essence of Haste. 50/50 chance to hit the wrong essence mod — continue applying Omens of Dextral Crystallisation and the other Perfect Essence until you have both.
9. Omen of Abyssal Echoes + Omen of the Liege + Preserved Jawbone → % Chance for grenades to explode twice. If it fails, Omen of Light and repeat.
10. Optional: Sanctify for the highest DPS — risky. You could also corrupt / double-corrupt but you may lose the crossbow.

NOTE: Crafting was stealth-nerfed in the updated patch notes — recipe steps may need updates as more info lands.`,
      },
      {
        id: 'crafting-solar-amulet',
        title: 'Crafting recipe — Late endgame Solar Amulet',
        kind: 'recipe',
        body: `Recommended starting piece for your resists/stats — other slots are more flexible.

1. Obtain a Solar Amulet with +3 to Level of All Projectile Skills fractured (bought or self-fractured).
2. Chaos Orbs → roll the highest spirit possible (need 60 total from implicit + mod).
3. Add a suffix with Exalt.
4. Omen of Dextral Crystallisation + Perfect Essence of Enhancement.
5. Omen of the Sovereign + Omen of Sinistral Necromancy + Omen of Abyssal Echoes → attempt to apply Gained % Evasion from Body Armour. If you fail, the cheapest fix is to yolo-annul the abyssal mod off. If the annul hits spirit, re-chaos the spirit and try again — significantly cheaper than Omens of Light.

From here, Omens of Catalyzing Exaltation give 2 rolls of resists / stats, or yolo-roll from scratch.`,
      },
      {
        id: 'crafting-breach-ring',
        title: 'Crafting recipe — Giga Breach Ring (optional, very expensive)',
        kind: 'recipe',
        body: `VERY hard and EXPENSIVE craft — probably not worth the cost. Cheaper alternative: another ring with double leech, a resist, whatever damage you can afford.

If you proceed: note the price of each elemental catalyst to estimate the best 2-mod setup. Highly recommended to fracture the most expensive catalyst.

1. Obtain a Breach Ring with T1 of any added elemental damage fractured.
2. Chaos Orbs → roll any other T1 added elemental damage.
3. Apply 40% quality of the missing element + Omen of Sinistral Exaltation + Omen of Catalyzing Exaltation → hope for the 3rd added. T2+ may be acceptable; re-chaos + 40% quality is extremely expensive if you push for T1.
4. Apply 40% attack quality + Omen of Greater Exaltation + Omen of Catalyzing Exaltation, slam, pray for 2 of: Life Leech, Mana Leech, Resist.
5. Repeat step 4 without Greater Exaltation for whatever you're missing. If you hit double res, put the other leech on the other ring.

Any miss requires Omens of Dextral Annulment — also very expensive.`,
      },
    ],
  },

  utility: null,

  buildSections: [
    {
      id: 'pre-launch',
      title: 'Pre-launch setup',
      position: 'before-route',
      intro: 'Do these once, before league start. Saves you minutes per day.',
      items: [
        { id: 'pre-loot-filter', label: 'Load a Mercenary/grenade loot filter (crossbows, grenade-base xbows, life/evasion)', scope: 'build' },
        { id: 'pre-stash', label: 'Pre-organize stash tabs in Standard (layout carries to the new league)' },
        { id: 'pre-wasd', label: 'Switch to WASD controls — significantly easier with this build', scope: 'build' },
        { id: 'pre-binds', label: 'Bind: Gas Grenade → LMB, Explosive Grenade → RMB (WASD recommended)', scope: 'build' },
        { id: 'pre-weapon-swap-binds', label: 'Bind weapon swap sets: Ctrl+Shift+LMB → set 1, Ctrl+Shift+RMB → set 2', scope: 'build' },
        { id: 'pre-quick-assign', label: 'Enable "Quick Assign" for attribute nodes in keybinds' },
        { id: 'pre-gem-restrictions', label: 'Settings → Game: remove gem-cutting and equipping restrictions' },
        { id: 'pre-tree-confirm', label: 'Confirm Ctrl auto-confirms passive tree allocations' },
      ],
    },

    {
      id: 'patch-briefing',
      title: '0.5 patch briefing',
      position: 'before-route',
      intro: 'Things that changed campaign-side. Internalize these before day 1.',
      items: [
        { id: 'patch-vanguard-removed', label: 'Dreadnought Vanguard is removed — fight Jamanra directly in The Dreadnought', icon: 'warning' },
        { id: 'patch-act3-reorder', label: 'Act 3 is reordered — do NOT rely on 0.4 memory; follow visual cues', icon: 'warning' },
        { id: 'patch-waterways-pads', label: 'Matlan Waterways: levers are walk-over pressure pads; final canal ships pre-drained' },
        { id: 'patch-density', label: 'Monster density reduced in second half of campaign (especially Interludes)' },
        { id: 'patch-vaal-core', label: 'Fate of the Vaal is core: 6 Ancient Beacons in Act 3 + 6 in Interludes opens Vaal Ruins' },
        { id: 'patch-verisium', label: 'Farrow quests unlock Verisium Runeforging — apply Runic Ward to armour for regenerating defence' },
        { id: 'patch-greater-orbs-a4', label: 'Greater Orbs of Trans/Aug can drop in Act 4 (min mod level 55 → 44) — fuels your Bombard upgrade', scope: 'build' },
      ],
    },

    {
      id: 'endgame-day1',
      title: 'Endgame — Day 1',
      intro: 'First night in Maps. Pivot from leveling shape to atlas shape.',
      items: [
        { id: 'end-fortress', label: 'First Tower → summon Fortress' },
        { id: 'end-atlas-master', label: 'Choose a Master of the Atlas (Doryani / Hilda / Jado)' },
        { id: 'end-atlas-points', label: 'Run Fortress maps for Atlas Passive Points' },
        { id: 'end-defensive-pivot', label: 'Begin Sorcery Ward defensive respec — Hyrri\'s Ire body + evasion stacking', scope: 'build', icon: 'warning' },
        { id: 'end-currency-exchange', label: 'Trade for build uniques: Arjun\'s Medal, Ratha\'s Assault, Bhatair\'s Vengeance, Atziri\'s Step', scope: 'build', icon: 'vendor' },
        { id: 'end-flask-instant', label: 'Roll Instant Ultimate Life Flask (Transmute/Augment ground flasks)' },
        { id: 'end-runic-ward', label: 'Verisium Runeforge all armour (apply Runic Ward) — unlocked via Farrow chain', icon: 'vendor' },
        { id: 'end-third-asc', label: '3rd Ascendancy at Trials of the Sekhemas — Sorcery Ward prevents honour loss, trivializing the trial', scope: 'build', icon: 'ascendancy' },
        { id: 'end-jewellers', label: "Greater Jeweller's Orbs → upgrade to a 4-socket Explosive Shot / Explosive Grenade", scope: 'build', icon: 'gem' },
      ],
    },

    {
      id: 'ascendancy',
      title: 'Witchhunter — Ascendancy order',
      intro: 'Source is light on specifics — picks marked [VERIFY] are educated guesses from community-standard Witchhunter leveling. Confirm against BigDucks\' Mobalytics tree before committing.',
      items: [
        { id: 'asc-t1-1', label: 'Trial 1 (Sekhemas L28), pick #1: Zealous Inquisition — AoE explosions on pack kills [VERIFY]', scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t1-2', label: 'Trial 1 (Sekhemas L28), pick #2: Pitiless Killer — Culling Strike at 5% boss HP [VERIFY]', scope: 'build', icon: 'ascendancy' },
        { id: 'asc-t2-1', label: 'Trial 2 (Chaos L33), pick #1: [VERIFY against source]', scope: 'build', icon: 'warning' },
        { id: 'asc-t2-2', label: 'Trial 2 (Chaos L33), pick #2: [VERIFY against source]', scope: 'build', icon: 'warning' },
        { id: 'asc-t3-1', label: 'Trial 3 (Sekhemas, mid-maps), pick #1: [VERIFY] — easy with Sorcery Ward online', scope: 'build', icon: 'warning' },
        { id: 'asc-t3-2', label: 'Trial 3 (Sekhemas, mid-maps), pick #2: [VERIFY]', scope: 'build', icon: 'warning' },
        { id: 'asc-t4', label: 'Trial 4 (~L70), final pick: [VERIFY]', scope: 'build', icon: 'warning' },
      ],
    },

    {
      id: 'skill-gems',
      title: 'Skill gem progression',
      intro: 'Upgrade Explosive Grenade first — gem levels scale it absurdly. Explosive Shot waits until Act 2.',
      items: [
        { id: 'gem-frag-rounds', label: 'Starting: Fragmentation Rounds (default) — replace clear with Basic Shot for single target early', scope: 'build', icon: 'gem' },
        { id: 'gem-explosive-grenade', label: 'L1: Explosive Grenade — main single-target through the whole campaign', scope: 'build', icon: 'gem' },
        { id: 'gem-frost-bomb', label: 'L1: Cut the extra Clearfell gem into Frost Bomb — Exposure for early bosses', scope: 'build', icon: 'gem' },
        { id: 'gem-pounce', label: 'L1-3: Pounce — early mark + escape; drop for Voltaic Mark in Act 3', scope: 'build', icon: 'gem' },
        { id: 'gem-flash-grenade', label: 'L5: Flash Grenade — engage/stun; later carries clear with Bhatair\'s Vengeance', scope: 'build', icon: 'gem' },
        { id: 'gem-gas-grenade', label: 'Act 2: Gas Grenade — detonation primer (has a ground limit, don\'t spam)', scope: 'build', icon: 'gem' },
        { id: 'gem-explosive-shot', label: 'Act 2 (around 1st ascendancy): Explosive Shot — slot on Tree 2 after weapon-swap', scope: 'build', icon: 'gem' },
        { id: 'gem-oil-grenade', label: 'L20+: Oil Grenade replaces Frost Bomb (which stops working at L20)', scope: 'build', icon: 'gem' },
        { id: 'gem-voltaic-mark', label: 'Act 3: Voltaic Mark replaces Pounce — mana leech on bosses with Mark of Siphoning', scope: 'build', icon: 'gem' },
        { id: 'gem-cluster-grenade', label: 'Interludes: Cluster Grenade — for very large packs', scope: 'build', icon: 'gem' },
        { id: 'gem-constricting-cmd', label: 'Endgame: Constricting Command (-4 required) — makes grenades free to cast', scope: 'build', icon: 'gem' },
        { id: 'gem-sorcery-ward', label: 'Endgame defensive pivot: Sorcery Ward + Ceremonial Ablution — 10k+ shield from evasion/armour', scope: 'build', icon: 'gem' },
      ],
    },

    {
      id: 'support-gems',
      title: 'Support gems — pickup order & sources',
      intro: 'Slot in priority order. Source-zone matches the JSON route where known.',
      items: [
        { id: 'sup-multishot-1', label: '1st: Multishot I (kill Areagne in The Grelwood) → Explosive Grenade', scope: 'build', icon: 'gem' },
        { id: 'sup-pierce', label: '2nd: Pierce I (Act 1 zone reward) → Explosive Grenade [VERIFY source]', scope: 'build', icon: 'gem' },
        { id: 'sup-multishot-2', label: 'Later: Multishot II → upgrade once available', scope: 'build', icon: 'gem' },
        { id: 'sup-mark-siphoning-2', label: 'Act 3 (first L4 cut): Mark of Siphoning II → Voltaic Mark for life leech on bosses', scope: 'build', icon: 'gem' },
        { id: 'sup-run-and-gun', label: 'Later: Run and Gun → Explosive Shot (additional projectile chance)', scope: 'build', icon: 'gem' },
        { id: 'sup-cluster-bombs', label: 'Endgame: Cluster Bombs → grenade scaling on Siege Crossbow', scope: 'build', icon: 'gem' },
        { id: 'sup-embitter', label: 'Endgame: Embitter → Flash Grenade (with Bhatair\'s Vengeance + Freeze)', scope: 'build', icon: 'gem' },
        { id: 'sup-freeze', label: 'Endgame: Freeze → Flash Grenade', scope: 'build', icon: 'gem' },
      ],
    },

    {
      id: 'gear',
      title: 'Gear priority + leveling uniques',
      intro: 'Crossbow is your single biggest lever. Spend currency at the breakpoints, not in between. Save high currency until the Act 2 Varnished Crossbow craft.',
      items: [
        { id: 'gear-early-xbow', label: 'L2-14: any phys or elemental crossbow — vendor checks every few zones', scope: 'build', icon: 'vendor' },
        { id: 'gear-greater-flask', label: 'Upgrade to Greater Life Flask at L10 — BEFORE Geonor', icon: 'vendor' },
        { id: 'gear-cemetery-ring', label: 'Cemetery of the Eternals: side-grave ring pickup', scope: 'build', icon: 'loot' },
        { id: 'gear-blank-rune', label: 'Save your blank rune for the Act 2 Varnished Crossbow', scope: 'build' },
        { id: 'gear-varnished-xbow', label: 'Act 2: craft Varnished Crossbow — target 2-3 damage prefixes, socket 2 damage runes', scope: 'build', icon: 'vendor' },
        { id: 'gear-bombard-xbow', label: 'Act 3 mid-act: craft Bombard Crossbow — same flow as Varnished', scope: 'build', icon: 'vendor' },
        { id: 'gear-tattoo-res', label: 'Act 4 Trial of Ancestors: take +5% Fire/Cold/Lightning Res tattoos', scope: 'build', icon: 'loot' },
        { id: 'gear-runic-ward', label: 'Apply Runic Wood / Runic Ward to all armour pieces (Verisium Runeforging)', icon: 'vendor' },
        { id: 'gear-leather-gloves', label: 'Armour gloves: use Leather Bound Gauntlets (evasion conversion)', scope: 'build', icon: 'loot' },
        { id: 'gear-stone-charm', label: 'Stone charm: Cat > Stag > Wolf (substitute for endgame Rite of Passage)', scope: 'build', icon: 'loot' },
        { id: 'gear-tabanas-boon', label: 'Interludes: take Tabana\'s Boon (swap to Akheli\'s at endgame)', scope: 'build', icon: 'loot' },

        // Endgame uniques to watch for / trade for
        { id: 'gear-arjuns-medal', label: 'Endgame: Arjun\'s Medal — 25% chance to load bolt on kill (enables Explosive Shot loop)', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-rathas-assault', label: 'Endgame: Ratha\'s Assault — 4 total bolts with Arjun\'s Medal', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-bhatairs-vengeance', label: 'Endgame: Bhatair\'s Vengeance — 23% extra-as-cold via Flash Grenade kills', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-hyrris-ire', label: 'Endgame: Hyrri\'s Ire — snapshots Sorcery Ward off evasion (defensive backbone)', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-atziris-step', label: 'Endgame: Atziri\'s Step — Deflection scaling (no need for vaal-corrupted variant)', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-prism-of-belief', label: 'Endgame: Prism of Belief — +3 Explosive Grenade (settle for +2 if price-prohibitive)', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-olroths', label: 'Endgame: Olroth\'s Resolve — best life flask in the game (not required)', scope: 'build', priority: 'optional', icon: 'loot' },
        { id: 'gear-siege-xbow', label: 'Endgame: craft Siege Crossbow with grenade base — recipe in BUILD tab', scope: 'build', priority: 'optional', icon: 'vendor' },
      ],
    },

    {
      id: 'boss-tips',
      title: 'Build-specific boss tips',
      intro: 'How Explosive Grenade + Flash + Gas handles each major fight. Sparse where the source is sparse.',
      items: [
        { id: 'boss-template', label: 'General template: Frost Bomb (Exposure, until L20) → Explosive Grenades in one spot → kite boss in a circle. Flash + Basic Bolts as filler.', scope: 'build', icon: 'boss' },
        { id: 'boss-crowbell', label: 'Crowbell (A1): kite slams; Flash to stun → Explosive Grenade load', scope: 'build', icon: 'boss' },
        { id: 'boss-executioner', label: 'The Executioner (A1): kite from range — Flash Grenade carries clear once weapon is decent', scope: 'build', icon: 'boss' },
        { id: 'boss-geonor', label: 'Geonor (A1): Frost Bomb chills him at Phase 2 start; place Explosive Grenades, kite in circle', scope: 'build', icon: 'boss' },
        { id: 'boss-balbala', label: 'Balbala (A2): moves too much for combo — Flash Grenade to stun FIRST, then load Gas + Explosive', scope: 'build', icon: 'boss' },
        { id: 'boss-jamanra', label: 'Jamanra (A2): starts armor-broken — Flash stun → Gas + Explosive load. Watch lightning fence phase', scope: 'build', icon: 'boss' },
        { id: 'boss-silverfist', label: 'Mighty Silverfist (A3): dodge SIDEWAYS, not backward — slam wave follows facing', scope: 'build', icon: 'boss' },
        { id: 'boss-xyclucian', label: 'Xyclucian (A3): kite the elemental phases at range — Explosive Shot clears adds', scope: 'build', icon: 'boss' },
        { id: 'boss-doryani', label: 'Doryani (A3): Phase 2 rage → fortifying buff — load Gas + Explosive at safe range before engage', scope: 'build', icon: 'boss' },
        { id: 'boss-magma-twins', label: 'Magma Twins (A4): Lightning first → Ruby Ring; Fire first → Topaz Ring — pick by missing res', scope: 'build', icon: 'boss' },
        { id: 'boss-sekhemas-relics', label: 'Trial of Sekhemas: Honour Resistance on every relic except 1 (which carries See Further Ahead). Always gather Sacred Water.', scope: 'build', icon: 'boss' },
      ],
    },
  ],

  routeOverlay: {
    // ---- Act 1 ----
    'act-1-z-clearfell-encampment': {
      annotate: {
        'act-1-z-clearfell-encampment-0': {
          buildNote: 'Take the Mercenary starter gem from Renly. Source recommends Permafrost Bolts here if available.',
          scope: 'build',
        },
      },
    },
    'act-1-z-clearfell': {
      annotate: {
        'act-1-z-clearfell-2': {
          buildNote: 'Cut into Frost Bomb — Exposure for early bosses (drop at L20 for Oil Grenade).',
          scope: 'build',
        },
      },
    },
    'act-1-z-grelwood': {
      annotate: {
        'act-1-z-grelwood-5': {
          buildNote: 'Areagne is the support-gem source: cut to Multishot I → Explosive Grenade. Frost Bomb makes the fight manageable.',
          scope: 'build',
        },
      },
    },
    'act-1-z-red-vale': {
      prepend: [
        { id: 'a1-wh-refined-arms', label: 'Grab a tier-2 crossbow from the Refined Arms — Transmute/Augment until damage rolls', scope: 'build', icon: 'vendor' },
      ],
    },
    'act-1-z-cemetery': {
      annotate: {
        'act-1-z-cemetery-1': {
          buildNote: 'Solid early ring — pair with res rolls for the Geonor approach.',
          scope: 'build',
        },
      },
    },
    'act-1-z-ogham-manor': {
      prepend: [
        { id: 'a1-wh-pre-geonor-audit', label: 'Audit before Geonor: L10+, Greater Life Flask, ~30% Cold Res, decent xbow', icon: 'audit' },
      ],
      annotate: {
        'act-1-z-ogham-manor-1': {
          buildNote: 'Frost Bomb at Phase 2 start chills him; place Explosive Grenades in one spot and kite in a circle.',
          scope: 'build',
        },
      },
    },

    // ---- Act 2 ----
    'act-2-z-caravan': {
      prepend: [
        { id: 'a2-wh-varnished-craft', label: 'First job: craft a Varnished Crossbow. Target 2-3 damage prefixes, socket 2 damage runes', scope: 'build', icon: 'vendor' },
      ],
    },
    'act-2-z-mawdun-quarry': {
      prepend: [
        { id: 'a2-wh-quality', label: 'Collect Quality currency here — drops regularly in Mawdun Quarry', scope: 'build', icon: 'vendor' },
      ],
    },
    'act-2-z-bone-pits': {
      annotate: {
        'act-2-z-bone-pits-0': {
          buildNote: 'Source also calls out farming hyenas for their idol — useful for crafting later.',
          scope: 'build',
        },
      },
    },
    'act-2-z-keth': {
      annotate: {
        'act-2-z-keth-0': {
          buildNote: 'Snake-man idol farm — useful for crafting.',
          scope: 'build',
        },
      },
    },
    'act-2-z-trial-of-sekhemas': {
      prepend: [
        { id: 'a2-wh-asc-zealous', label: 'Pick #1: Zealous Inquisition — AoE explosions on pack kills [VERIFY]', scope: 'build', icon: 'ascendancy' },
        { id: 'a2-wh-asc-pitiless', label: 'Pick #2: Pitiless Killer — Culling Strike at 5% boss HP [VERIFY]', scope: 'build', icon: 'ascendancy' },
        { id: 'a2-wh-sekhemas-relics', label: 'Relic priority: Honour Resistance on every relic except 1 (See Further Ahead). Always gather Sacred Water.', scope: 'build' },
      ],
    },
    'act-2-z-dreadnought': {
      prepend: [
        { id: 'a2-wh-audit', label: 'Audit: L29, ~70% Lightning Res, Greater → Grand Life Flask', icon: 'audit' },
        { id: 'a2-wh-treeswap', label: 'After 1st ascendancy: drop talisman, swap Tree 2 for Explosive Shot. Lock weapon to both trees.', scope: 'build' },
      ],
      annotate: {
        'act-2-z-dreadnought-1': {
          buildNote: 'Starts armor-broken. Flash Grenade stun → Gas + Explosive load — kite cleanly.',
          scope: 'build',
        },
      },
    },

    // ---- Act 3 ----
    'act-3-z-ziggurat': {
      prepend: [
        { id: 'a3-wh-voltaic-swap', label: 'Swap Pounce → Voltaic Mark for boss mana leech (Mark of Siphoning)', scope: 'build', icon: 'gem' },
        { id: 'a3-wh-l4-support', label: 'When your first L4 support cuts: take Mark of Siphoning II (adds life leech)', scope: 'build', icon: 'gem' },
        { id: 'a3-wh-bombard-craft', label: 'Mid-act: craft a Bombard Crossbow — same flow as Varnished. Slot a non-grenade xbow into Tree 2 for Explosive Shot if you find one.', scope: 'build', icon: 'vendor' },
      ],
    },
    'act-3-z-jungle-ruins': {
      annotate: {
        'act-3-z-jungle-ruins-0': {
          buildNote: 'Dodge SIDEWAYS, not backward — slam wave follows attack direction.',
          scope: 'build',
        },
      },
    },
    'act-3-z-trial-of-chaos': {
      prepend: [
        { id: 'a3-wh-asc-t2-1', label: 'Pick #1: [VERIFY against source]', scope: 'build', icon: 'warning' },
        { id: 'a3-wh-asc-t2-2', label: 'Pick #2: [VERIFY against source]', scope: 'build', icon: 'warning' },
      ],
    },
    'act-3-z-black-chambers': {
      prepend: [
        { id: 'a3-wh-audit', label: 'Audit (CRITICAL): 75/75/75 res, 1,500+ Life, decent evasion, 30%+ MS', icon: 'audit' },
      ],
      annotate: {
        'act-3-z-black-chambers-0': {
          buildNote: 'Phase 2 (Doryani\'s Triumph): rage → fortifying buff. Load Gas + Explosive at safe range before engaging.',
          scope: 'build',
        },
      },
    },

    // ---- Act 4 ----
    'act-4-z-kingsmarch': {
      prepend: [
        { id: 'a4-wh-exchange', label: 'Currency Exchange unlocked — start trading for Arjun\'s Medal, Ratha\'s Assault, Bhatair\'s Vengeance', scope: 'build', icon: 'vendor' },
        { id: 'a4-wh-leech', label: 'Find a phys life-leech source (rings, weapon, gloves — buy if you have to)', scope: 'build' },
        { id: 'a4-wh-defenses', label: 'Resists + life total start mattering — cap res, max evasion/armour. Damage is fine; focus tankier.', scope: 'build', icon: 'warning' },
      ],
    },
    'act-4-z-ngakanu': {
      prepend: [
        { id: 'a4-wh-ngakanu-vendor', label: 'After shark fin: scan Ngakanu vendor early for a crossbow upgrade', scope: 'build', icon: 'vendor' },
      ],
    },
    'act-4-z-singing-caverns': {
      annotate: {
        'act-4-z-singing-caverns-0': {
          buildNote: 'Pearl → Rog: very good amulet most of the time. Grab it.',
          scope: 'build',
        },
      },
    },
    'act-4-z-volcanic-warrens': {
      annotate: {
        'act-4-z-volcanic-warrens-0': {
          buildNote: 'Pick by what you\'re missing: Lightning first → Ruby Ring; Fire first → Topaz Ring.',
          scope: 'build',
        },
      },
    },
    'act-4-z-trial-of-ancestors': {
      annotate: {
        'act-4-z-trial-of-ancestors-1': {
          buildNote: 'Take +5% Fire/Cold/Lightning Res tattoo (whichever you\'re short on).',
          scope: 'build',
        },
      },
    },

    // ---- Interludes ----
    'interludes-z-interlude-51': {
      prepend: [
        { id: 'inter-wh-cluster', label: 'Cluster Grenade unlocks around here — use for very large packs', scope: 'build', icon: 'gem' },
        { id: 'inter-wh-tabanas', label: 'Take Tabana\'s Boon (swap to Akheli\'s at endgame)', scope: 'build', icon: 'loot' },
      ],
    },
    'interludes-z-interlude-53': {
      prepend: [
        { id: 'inter-wh-defenses', label: 'Keep upgrading defenses + crossbow — resists drop off as you push Interludes', scope: 'build', icon: 'warning' },
      ],
    },
    'interludes-z-completion': {
      prepend: [
        { id: 'inter-wh-respec-prep', label: 'Maps incoming: prep Sorcery Ward defensive respec (see Endgame — Day 1 + BUILD tab)', scope: 'build', icon: 'warning' },
      ],
    },
  },
};
