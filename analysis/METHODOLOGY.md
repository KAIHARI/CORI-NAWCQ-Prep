# Archetype Interaction Methodology

A repeatable, first-principles process for reading one archetype's card pool from this repo's `data/archetypes/*.json` and producing an **opponent's interaction guide**: which cards are worth spending limited interaction on, at what exact point in the sequence, which cards are safe to ignore, where the deck structurally breaks, and which cards pair up as two-card combos.

Run this **one archetype per session/reply**. The copy-paste prompt is at the bottom of this file.

---

## Ground rules (apply every run)

1. **One archetype per run.** Never analyze more than one `data/archetypes/*.json` file in a single pass.
2. **No outside lookups, no recalled meta.** Do not use WebSearch/WebFetch or any tool that reaches outside this repo. Do not recall this archetype's real-world tournament results, tier placement, "known" optimal decklists, or community tech from training data. The only legal inputs are:
   - The named archetype's JSON file (`cards`, `comboLines`, `sampleDecklist`)
   - `data/banlist.json` and `data/event.json`
   - General Yu-Gi-Oh! rules-engine knowledge (turn structure, priority, chain resolution, summoning procedures, once-per-turn semantics, cost-vs-effect, targeting rules) — i.e. the *rules of the game*, which is a tool of logic, not a fact about this archetype.
   - Baseline knowledge of well-known **generic, archetype-agnostic staples** (hand traps, generic board breakers, generic Extra Deck bosses) *only* to classify their broad functional category when they appear in `sampleDecklist` by name with no effect text in `cards[]` (see Phase 1a). Never use this to infer anything specific about the archetype itself.
3. **Show the reasoning, not just the verdict.** Every ranking must trace back to a specific effect clause and a specific point in the sequence — cite the clause.
4. **Flag uncertainty.** Several early-CORI entries have stats/wording marked unconfirmed, or a `sampleDecklist.label` that says "theorycraft." Say so explicitly, and mark any conclusion built on that card as provisional.
5. **Describe interaction functionally, not by card name.** We don't know what the user will actually be holding in a given game. Describe the answer by *category and timing window* ("a hand trap that stops a card from being Special Summoned, used in response to the Special Summon before it resolves") rather than naming a specific meta staple — unless the same named staple already appears in the archetype's own `sampleDecklist`, in which case it's fair to name it since it's part of this exact package.
6. **`analysis/meta-staples.json` is a documented exception to rule 2.** It's pre-verified reference data — its definitions were sourced via live web lookup at authoring time (noted in its own `sourceNote` field), not derived from this archetype's JSON. Reading and using it for Phase 6 does not violate the no-outside-lookups rule, which exists specifically to keep the archetype's *own* gameplan analysis (Phases 1–5) free of outside research and recalled meta. Do not add new lookups beyond what's already in that file — if a 13th card needs adding later, that's a separate, explicit request.

---

## Phase 1 — Card Inventory & Classification

Read every entry in `cards[]` in full — the whole `effectText`, not a summary.

For each card, extract:
- Every discrete effect clause (ignition / trigger / quick-effect / continuous / condition / cost), and any hard restriction ("once per turn," "once per duel," a named once-per-turn).
- Functional role(s): **Starter** (opens the turn from hand alone) / **Extender** (continues the line using an existing resource) / **Cost-Enabler** (fuel — discard, tribute, banish fodder) / **Payoff** (the turn's end-goal piece) / **Protection** (negation, unaffected-by, indestructible grant) / **Recovery-Resilience** (recurs itself or another piece from GY/banished) / **Searcher/Tutor** / **Non-engine** (doesn't touch the main line).
- What it **consumes** (Normal Summon, a GY resource, a discard, LP, another card as material) vs. what it **produces** (board presence, another effect chained off it, a resource banked for later).

**Output:** a per-card table — `Card | Type | Role(s) | Consumes | Produces | Hard OPT?`.

### Phase 1a — Separate archetype-engine cards from generic support

Cross-reference `sampleDecklist.main`/`extra` against `cards[]`:
- Cards present in **both** are archetype-specific and already fully detailed — classify per Phase 1.
- Cards present **only in `sampleDecklist`** (name + qty, no `effectText`) are generic, archetype-agnostic support (hand traps, generic removal, generic searchers, generic Extra Deck bosses). Tag each with a broad functional category only (e.g. "hand trap — likely stops a summon or effect," "generic non-targeted removal," "generic flexible Extra Deck body") based on well-known baseline game knowledge, and note the quantity run. **Do not** invent specific new text for these; their exact text is out of scope.
- This split matters for two reasons: (1) it tells you how much of the 40 is *actually* the combo engine vs. filler/support, which sharpens the redundancy count in Phase 4; (2) the generic copies are the **opponent's own protection package** — cards they can use *against your interaction* (e.g., a hand trap that protects their combo from your hand trap, a generic negate that stops your removal). Note how many protection-category copies are in the list; that number sets the "bait" consideration in Phase 3.

---

## Phase 2 — Reconstruct the Whole (Gameplan Synthesis)

Using `comboLines` + `sampleDecklist` + the Phase-1 role table, rebuild the primary sequence as an ordered chain of steps: `trigger card/effect → cost paid → output produced`, for as many turn-1 (or key-turn) lines as the data supports.

For each step, tag it:
- **Hard dependency** — the line breaks outright without this step.
- **Soft dependency** — the line continues in a degraded form without it (fewer resources banked, a weaker board, but still a board).

Then derive:
- **Branch points / redundancy** — are there alternate routes to the same output? How many cards in the 40 can fill the same critical role (count them)?
- **Keystone card(s)** — the 1–2 cards whose removal from the line collapses the most downstream steps. These are the default highest-priority interaction targets *in principle*, before timing/efficiency is factored in.
- **Card pairs** — explicit two-card combos named in `comboLines`, or inferable because Card A's cost/output directly feeds Card B's cost/condition (e.g., A sends B to GY, C retrieves/uses B from GY). List each pair and the one-sentence mechanism linking them.

---

## Phase 3 — Chokepoint & Timing Map

This is the core "when do I spend my interaction" output. For each critical step identified in Phase 2:

- **Exact window** — the precise chain-link/game-state moment interaction would land (e.g. "in response to the search effect's activation, before it resolves" vs. "on/after resolution of the Special Summon, once it's already on the field" vs. "before their first Normal Summon of the turn" vs. "in response to chain link 1 of the extender's effect, before the rest of the chain builds").
- **Single point of failure vs. replaceable** — does the deck have a backup route around this window (per the Phase 2 redundancy check), or is this genuinely their one way through?
- **Interaction category that fits the window** — described functionally (a same-timing hand trap, a floodgate already active before their turn starts, a targeted/non-targeted removal effect used on the right target at the right time, a counter trap at activation).
- **Trade efficiency** — if the interaction lands, does it cost you more or less than it cost them to reach that point? (E.g., stopping a 1-card starter before it does anything is a near-free trade; stopping the 4th link of a chain after they've already banked three effects' worth of value is a worse trade even if it still denies the payoff.)

Split the map into two scales:
- **Micro-sequencing** — which link within *one* combo chain is the highest-leverage moment to interact.
- **Macro-timing** — **preemptive** (stopping it during their turn before the board completes — only available if you're on the draw and holding something live on their turn) vs. **reactive** (letting the board finish and answering it on your own turn / in response to attacks with a board breaker or removal).

Rank all identified chokepoints from **highest leverage** (earliest/cheapest to stop, most downstream collapse, best trade) to **lowest leverage**.

---

## Phase 4 — Weakness Audit

- **Structural weaknesses** — reliance on a single Normal Summon; GY-dependency (vulnerable to GY hate); attribute/type-locked engine pieces; LP-cost or hand-size-cost reliance; targeted-removal vulnerability vs. non-targeted-removal vulnerability; susceptibility to floodgates that match whichever Extra Deck mechanic (Ritual/Synchro/Xyz/Link/Fusion) the deck actually leans on.
- **Sequencing weaknesses** — does the line require one strict order with no way to resequence around a disruption landing at the "wrong" beat?
- **Redundancy weaknesses** — from Phase 1a/2's counts: which critical roles are filled by only 1–2 copies across the 40? Thin roles are a standing weakness even with zero interaction from the opponent.

---

## Phase 5 — Ranked Interaction Breakdown (deliverable)

Produce:

1. **Table:** `Card | Role | Why it matters | Best interaction timing | What breaks if stopped | Priority Tier (S/A/B/C) | Related pair(s)`
   - **S** = stopping this is a clean or favorable trade that collapses the turn.
   - **A** = strong, not always turn-ending; still clearly worth it.
   - **B** = situational — worth it only if free/redundant, or only slows them down.
   - **C** = don't bother; even a clean answer doesn't meaningfully set them back.
2. **One-paragraph verdict:** "If you only get ONE piece of interaction, use it on ___ at ___, because ___."
3. **Secondary note:** "If you have TWO pieces, sequence them as ___ then ___" (accounting for the opponent's own protection package from Phase 1a — do you need to bait first?).
4. **"Don't bother" list:** low-value targets and why, so the reader doesn't waste interaction there.

### Output convention

Save the completed analysis to `analysis/<archetype-id>-interaction-breakdown.md` (this folder already exists), then still answer in chat with the Phase 5 verdict directly — don't just say "see file."

---

## Phase 6 — Popular Non-Engine Card Rating

A fixed, cross-archetype watchlist lives in `analysis/meta-staples.json` — 12 popular real-world non-engine cards (hand traps and generic Trap/Spell answers) with verified definitions. Read every entry's `effectText` in full, then rate **each of the 12, one line per card**, against the archetype just analyzed in Phases 1–5.

For each card:
- Trace its effect to the *specific* archetype card/step it would hit (cite the clause from Phase 1/2, not a vague "stops their combo").
- Reuse the S/A/B/C tier scale from Phase 5, plus a **Dead** tier for a card that has nothing to interact with in this deck (e.g., a Special-Summon-negate against a deck whose whole line runs through Ritual/Normal Summons instead).
- Note the timing window it must be used in (tie back to the Phase 3 chokepoint map where the card's category matches an identified window) and any attribute-lock or hand-activation condition that limits when it's live (several of the 12 only work "if you control no cards" or lock out activating certain Attributes for the rest of the duel if hand-activated — call out when that condition collides with this archetype's own colors, e.g. a LIGHT/EARTH/WIND-locking card used against a deck whose own follow-up plays need those attributes).

**Output:** one row per card — `Card | Tier (S/A/B/C/Dead) | What it hits + when | Condition/lock that limits it` — appended to the same `analysis/<archetype-id>-interaction-breakdown.md` file, plus a one-line summary in chat: which of the 12 is the single best generic answer to this specific archetype, and which are dead draws against it.

---

## The copy-paste prompt (reusable, one archetype per run)

```
Archetype: rolad

Run the Archetype Interaction Methodology (analysis/METHODOLOGY.md in this repo) on the one archetype named above, whose id is used consistently for both its data file and its output file below.

Read data/archetypes/<that archetype's id>.json in full — every card's effectText, all comboLines, and the sampleDecklist (main + extra). Do not use WebSearch, WebFetch, or any outside source; do not recall this archetype's real-world meta, tier placement, or known decklists from training — work only from the JSON file's text, data/banlist.json, data/event.json, and general Yu-Gi-Oh! rules-engine logic. For generic staples that appear only in sampleDecklist (no effectText in cards[]), classify them by broad functional category only per Phase 1a — don't invent specific text for them.

Also read analysis/meta-staples.json in full — this is pre-verified reference data (not an outside lookup by you; see Ground Rule 6) covering 12 popular non-engine cards.

Follow all 6 phases exactly as defined in analysis/METHODOLOGY.md:
1. Card inventory & classification (incl. Phase 1a engine-vs-generic split)
2. Reconstruct the whole gameplan (sequence, hard/soft dependencies, keystone cards, card pairs)
3. Chokepoint & timing map (micro-sequencing + macro preemptive/reactive timing, ranked by leverage and trade efficiency)
4. Weakness audit (structural, sequencing, redundancy)
5. Ranked interaction breakdown (table + one-piece verdict + two-piece sequencing note + "don't bother" list)
6. Popular non-engine card rating (one line per card from analysis/meta-staples.json, tiered S/A/B/C/Dead, tied to a specific step and timing window)

Save the result to analysis/<that archetype's id>-interaction-breakdown.md, then give me the Phase 5 verdict and the Phase 6 summary line directly in your reply.
```

Just edit the one line — `Archetype: rolad` — to any of: `blitzclique`, `rolad`, `elfnote`, `angelechy`, `sacred-beasts`. Everything else in the prompt derives from that single name.
