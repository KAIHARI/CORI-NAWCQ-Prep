# RoLaD (Light and Darkness Ritual) — Archetype Interaction Breakdown

> **Methodology:** Archetype Interaction Methodology, Phases 1–5.
> The referenced `analysis/METHODOLOGY.md` was not present in the repo at the time
> of writing, so the five phases were executed exactly as specified in the task
> brief (Card inventory & 1a engine/generic split → Gameplan → Chokepoint & timing
> map → Weakness audit → Ranked interaction breakdown).
>
> **Sources:** `data/archetypes/rolad.json` (every card's `effectText`, the single
> combo line, and the full sample decklist), `data/banlist.json`, `data/event.json`,
> and general Yu-Gi-Oh! rules-engine logic only. No external/meta data used.
>
> **Lens:** "Interaction" = how an *opponent* at NAWCQ 2026 should attack this deck —
> where the chokepoints are, which single piece of disruption pays off most, the best
> two-card sequence, and which staples are wasted against it.
>
> **Confidence flags:** `Mind Shuffle` and `Griffoh` carry explicit "exact wording
> still being confirmed" notes in the JSON; conclusions that lean on them are marked
> **[uncertain]**. Generic staples that appear only in the decklist (no `effectText`)
> are classified by broad function only, per Phase 1a — their precise wording is not
> asserted, and where a conclusion would depend on it, that dependence is flagged.

---

## Phase 1 — Card Inventory & Classification

### 1a. Engine vs. generic split

**Engine cards** (archetype-defining; full `effectText` present in the JSON):

| Card | Type | Role | Key text (from JSON) |
|---|---|---|---|
| **Ritual of Light and Darkness** ×3 | Ritual Spell | Summon enabler + recurring engine | Ritual Summons either boss by **tributing monsters and/or banishing from GY** to meet Level 8. **Once/turn: add itself + 1 card that mentions it** from GY to hand. |
| **Black Luster Soldier – Soldier of Light and Darkness** ×1 | Ritual/Effect, EARTH Warrior L8 3000/2500 | Offense boss | Must be Ritual Summoned. **Cannot be destroyed by battle.** **Unaffected by opponent's activated effects unless they target it.** On battle-destroying a monster: **+1500 ATK and a second attack.** |
| **Magician of Dark Chaos – Black Chaos** ×1 | Ritual/Effect, DARK Spellcaster L8 2800/2600 | Control boss | Can also be **Special Summoned (not Ritual) by shuffling 1 Spellcaster/Warrior Ritual Monster from hand or GY into the Deck.** Protects your Spells/Traps; can **banish** opponent's cards. |
| **Skull Archfiend of Chaos** ×3 | Effect, DARK Fiend L6 2650/2450 | Ignition / searcher | **When sent to GY:** send `Ritual of Light and Darkness` from Deck to GY, **then add a Ritual Monster it can Ritual Summon from Deck to hand.** |
| **Mind Shuffle** ×3 | Normal Spell | Grind loop **[uncertain]** | "Core resource-loop … shuffles/recycles Ritual pieces between hand, Deck, GY." Exact wording unconfirmed. |
| **Griffoh** ×3 | Effect monster **[uncertain]** | Loop accelerant | "Lets you use `Mind Shuffle` the same turn it's Set." Stats/wording unconfirmed. |

**Generic staples** (decklist-only, no `effectText`; classified by broad function):

| Function | Cards |
|---|---|
| Ritual-specific tutor | Preparation of Rites ×2 |
| Field-Spell tutor | Terraforming ×1 |
| Deck→GY loader | Foolish Burial ×1 |
| Draw / deck-thinning | Upstart Goblin ×1, Pot of Prosperity ×1, Pot of Desires ×2 |
| Hand-trap disruption | Ash Blossom & Joyous Spring ×3, Nibiru ×2, Droll & Lock Bird ×2, Effect Veiler ×2 |
| Trap / spot disruption | Infinite Impermanence ×2, Called by the Grave ×2, Solemn Judgment ×1 |
| Board-breaker | Dark Ruler No More ×1, Forbidden Droplet ×2 |
| Consistency / advantage | Triple Tactics Talent ×1 |
| Extra Deck (generic toolbox) | Baronne de Fleur, I:P Masquerena, Underworld Goddess of the Closed World, Accesscode Talker, Knightmare Unicorn |

**Read of the split:** the whole engine is six cards, and only **three** of them do real work on ignition turns — `Skull Archfiend`, `Ritual of Light and Darkness`, and one boss. Everything else in the 40 is either a hand-trap wall, a draw spell, or a boss the deck runs as a **singleton**. That concentration is the single most important fact for an opponent (see Phases 3–5).

---

## Phase 2 — Gameplan Reconstruction

### The core sequence

1. **Load `Skull Archfiend of Chaos` into the GY** (Foolish Burial; or by using it as tribute/banish fuel; or it being milled/discarded). Its **"when sent to GY"** trigger fires: **mill `Ritual of Light and Darkness` from Deck to GY** *and* **search a boss** (`BLS` or `MoDC`) to hand. One card now supplies *both* the Ritual Spell (in GY) and the Ritual Monster (in hand).
2. **Recur the Ritual Spell.** `Ritual of Light and Darkness`'s once-per-turn effect **adds itself back from GY + one card that "mentions it."** `Skull Archfiend` mentions it, so the natural retrieve is Spell-back-to-hand **+ a second Skull** — reloading both halves of the engine every turn.
3. **Ritual Summon a boss.** With the Spell in hand + a boss in hand, pay the Level-8 cost by **tributing field monsters and/or banishing monsters from the GY.** Early, the GY is the fuel tank: `Skull` (L6) plus another body, or field tributes (`Griffoh`, spare `Skull`).
4. **Pick the boss for the board state:**
   - **`BLS`** for offense — 3000 that can't die in battle, is immune to non-targeting effects, and **snowballs to 4500 with a second attack** the moment it destroys something.
   - **`MoDC`** for control — protects your Spells/Traps and banishes the opponent's cards; and can be **cheated out without a Ritual Spell** by shuffling `BLS` (a Warrior Ritual Monster) from hand/GY back into the Deck.
5. **Grind with `Mind Shuffle`** — recycle pieces and **swap between the two bosses** turn over turn. **`Griffoh` Set** turns the loop on a turn earlier. **[uncertain]**

### Hard vs. soft dependencies

- **Hard (needed for a boss at all):** a live `Ritual of Light and Darkness` **in hand** + a boss **in hand** + **Level-8 of tribute/banish material.** `Skull Archfiend` collapses the first two into one card (mill the Spell, search the boss), and `RoLaD`'s recursion converts the milled Spell back to hand — so the *practical* hard requirement is **"resolve one `Skull Archfiend` GY-trigger and have material."**
- **Soft (grind, not required for the first boss):** `Mind Shuffle`, `Griffoh`, and the draw suite. These extend a game the deck is already playing; they don't gate the opening boss.

### Keystone cards

- **`Skull Archfiend of Chaos` — the ignition.** Only card that produces the Spell *and* the boss in one motion. The gameplan is "get Skull to the GY."
- **`Ritual of Light and Darkness` — the recurring engine.** Self-returns from GY every turn, so the deck can't be ground out of Ritual Spells; also the only in-archetype way to pay the summon by **banishing GY.**
- **A boss (singleton each)** — the payoff, but only one copy of each exists; the deck leans entirely on tutor + recursion density to see them.

### Card pairs (two-card interactions worth naming)

- **Foolish Burial + any in-hand boss/Spell** → dump `Skull` → full engine setup (Spell in GY to recur, boss searched). The cheapest "one-and-a-half card" ignition.
- **`Skull Archfiend` + `Ritual of Light and Darkness`** → welded together: Skull mills the Spell, the Spell recurs Skull. Self-sustaining.
- **`BLS` (in hand/GY) + `MoDC`** → shuffle `BLS` into the Deck to Special Summon `MoDC` with **no Ritual Spell and no material** — a pivot that dodges Ritual-Spell negation.
- **`Griffoh` (Set) + `Mind Shuffle`** → turns the grind loop on a turn early. **[uncertain]**

---

## Phase 3 — Chokepoint & Timing Map

### Micro-sequencing (where a single answer stops the turn), ranked by leverage

| # | Chokepoint | What it gates | Best answer | Trade / leverage |
|---|---|---|---|---|
| **CP-1** | **`Skull Archfiend` "sent to GY" trigger** | The *entire* ignition — mills the Ritual Spell **and** searches the boss in one effect | **Ash Blossom** (negates send-from-Deck **and** add-from-Deck) | **1-for-2** — one card denies both engine halves; hit *before* any BLS/GY resilience exists |
| **CP-2** | **`Ritual of Light and Darkness` GY recursion** (Spell-back + a mentioning card) | The grind that refuels every turn; also stocks banish-material | **Banish the Spell from GY** (D.D. Crow / any "banish 1 GY card"), or **Dimension Shifter** to deny GY entirely | High **long-game** leverage; **Ash and Droll do *not* reach it** (GY-add, not Deck-add) |
| **CP-3** | **The Ritual Summon / Spell activation** | The boss hitting the board | **Solemn Judgment / summon-negate** | 1-for-1 at cost; **does not** stop `MoDC`'s shuffle-Special-Summon route |
| **CP-4** | **Ritual-cost material** (GY banish or field tribute) | Whether a searched boss can actually be paid for | Keep their GY empty / **Dimension Shifter**; remove field tributes | Situational; strongest on the *first* boss when the GY is thin |
| **CP-5** | **`Griffoh` Set → `Mind Shuffle`** | Turning the grind loop on early | Face-down removal / pre-empt | Low; **[uncertain]** wording, low ceiling |

**The one asymmetry that governs everything:** the ignition (`Skull`, Foolish Burial, the deck-searches) is **Deck-facing**, so it dies to `Ash`/`Droll`. The grind (`RoLaD` recursion) is **GY-facing**, so it *ignores* `Ash`/`Droll` and only dies to GY-hate. **No single card covers both halves** — that is the entire two-piece story in Phase 5.

### Macro timing — preemptive vs. reactive

- **Preemptive (hold for their turn / their setup):** `Ash Blossom` is a **held** answer aimed at CP-1 — you want it on the `Skull` trigger, not fired blind. GY-hate is likewise held for the moment `RoLaD` lands in the GY.
- **Reactive (after the board exists):** targeting negation (`Infinite Impermanence`, `Effect Veiler`) is best **saved for the boss** — see the BLS immunity note below. Counter-traps (`Solemn Judgment`) sit on the Ritual Summon.
- **The grind caveat:** RoLaD is a **resource deck.** Any *single* answer buys a turn — it does **not** kill the deck, because `RoLaD` recurs and the bosses are recycled. Dismantling requires hitting **both** the Deck half and the GY half (Phase 5, two-piece note).

---

## Phase 4 — Weakness Audit

### Structural

- **Both Ritual Monsters are Level 8, and the deck runs a Ritual tutor and a Field-Spell tutor whose live targets are thin.** `Preparation of Rites` is a Ritual-Monster tutor, but the *only* Ritual Monsters in this list are the two **Level-8** bosses; standard tutors of that category are level-capped, so its ability to fetch a boss here is **questionable** (dependence on unlisted generic wording flagged per Phase 1a). `Terraforming` is a Field-Spell tutor, but **there is no Field Spell in the list** — it is very likely a dead/placeholder slot. Net: the consistency shell is **shallower than 40 cards implies**, which pushes even more weight onto the `Skull Archfiend` ignition.
- **Both bosses are singletons.** One `BLS`, one `MoDC`. The deck survives this only through tutor + recursion density — so **banishing a boss out of the GY** (before it can be shuffle-summoned/recycled) removes a large slice of the win condition with one card.
- **Extra Deck is under-supported.** The main deck fields roughly **eight** board-presence monsters. `I:P Masquerena` / `Underworld Goddess` need 2+ bodies; `Accesscode`/`Knightmare Unicorn` need a Link chain; **`Baronne de Fleur` needs a Synchro line the main deck doesn't obviously provide** (no clear Tuner engine — `Griffoh`'s type is unconfirmed **[uncertain]**). Much of the Extra Deck is aspirational and only online on developed boards.

### Sequencing

- **The whole opening funnels through one trigger (CP-1).** Because the shell's redundant routes to a boss are questionable (above), the deck **usually has to resolve a `Skull Archfiend` GY-trigger** to function — a narrow, well-telegraphed window for `Ash`.
- **First-boss material fragility.** Turn 1 the GY is thin, so paying the Level-8 Ritual cost leans on field tributes or on banishing the very `Skull` you just used — a real tension (banishing `Skull` for cost removes it from the loop). GY-denial compounds this.
- **`MoDC`'s shuffle-summon consumes `BLS`.** The Ritual-Spell-free pivot to `MoDC` costs you the offense boss (shuffled into the Deck), narrowing your subsequent kill options.

### Redundancy

- **Good** where it's cheap to print: 3× `Skull`, 3× `Griffoh`, 3× `RoLaD`, 3× `Mind Shuffle` — the *engine* is hard to grind out.
- **Poor** where it matters most: **one** of each boss, and a consistency package (`Preparation`, `Terraforming`) whose targets in *this* list are shaky. The redundancy is concentrated on the loop, not on the payoff — so pressure on the **payoff** (the boss, in hand or GY) or on the **GY loop** hurts far more than pressure on the plentiful `Skull`/`Griffoh` bodies.

---

## Phase 5 — Ranked Interaction Breakdown

### Ranked table (most to least effective vs. RoLaD)

| Rank | Interaction | Target & timing | Effect on RoLaD | Leverage / trade |
|---|---|---|---|---|
| **1** | **Ash Blossom & Joyous Spring** | Hold for the **`Skull Archfiend` GY-trigger** (or the Foolish Burial that feeds it) | Denies the Ritual-Spell mill **and** the boss search in one negate — the turn collapses to the raw hand | **Best trade (1-for-2).** Turn-denial only; does nothing to the GY recursion or an existing board |
| **2** | **GY-banish / GY-shutoff** (D.D. Crow, "banish 1 GY card"; **Dimension Shifter** best-in-slot) | The **`Ritual of Light and Darkness` in the GY** before it recurs; Shifter pre-empts the whole GY | Kills the recurring engine and **starves the banish-for-cost material** — the only answer to the Ash-proof grind | High **long-game** leverage; Shifter is a near-lock if drawn early |
| **3** | **Solemn Judgment / summon-negate** | The **Ritual Summon** or the Ritual Spell activation | Stops the boss cold | 1-for-1 at half LP; **misses** `MoDC`'s shuffle-Special-Summon |
| **4** | **Targeting negation** (Infinite Impermanence, Effect Veiler) | The **boss on board** | Works on **`BLS` *because it targets*** (BLS is immune only to *non-*targeting effects); shuts off the double-attack snowball | Medium; best saved for the boss, not spent early |
| **5** | **Targeting/material removal** (targeting banish or bounce; Kaiju-style target-tribute; **Underworld Goddess** using BLS as material) | **`BLS`** specifically | The clean way through a battle-**and** non-targeting-immune body | Situational; needs setup, but the *correct* out to BLS |
| **6** | **Droll & Lock Bird** | Their combo turn | Caps *secondary* Deck-searches (`Preparation`/`Terraforming`/2nd `Skull` search) | Low — **does not** stop the first boss search or the GY grind |
| **7** | **Nibiru, the Primal Being** | Their Main Phase | Turns on only if they Normal/Special Summon **5+** in a turn | Very low — RoLaD Ritual-Summons ~1 boss; rarely triggers |

### One-piece verdict

**`Ash Blossom & Joyous Spring`, held for `Skull Archfiend of Chaos`'s "sent to GY" trigger.** It is the cheapest, highest-trade answer in the format against this deck: one negate erases **both** the `Ritual of Light and Darkness` mill and the boss search, and it lands **before** any of RoLaD's resilience (BLS's immunity, the GY recursion, MoDC's Spell-free pivot) can come online. Given the shell's redundant boss-routes are questionable (Phase 4), the deck usually *has* to walk through this trigger — so the window is reliable. **Caveat:** `Ash` is a **tempo** answer, not a kill — it does nothing to the GY recursion or an established board, so against a resource deck one `Ash` buys a turn, it doesn't win the game.

### Two-piece sequencing note

RoLaD's engine is split across two zones that **no single card covers**: the ignition is Deck-facing (dies to `Ash`), the grind is GY-facing (immune to `Ash`/`Droll`, dies only to GY-hate). The canonical dismantle is therefore **`Ash` on the `Skull` trigger + a GY-banisher (D.D. Crow / Dimension Shifter) on the `Ritual of Light and Darkness` that lands in the GY.** Sequence:

- **On the play / when they combo:** `Ash` the `Skull` trigger first (deny setup), then **bank** the GY-hate for the `RoLaD` that reaches the GY anyway (from a mill you couldn't stop, or a second `Skull`) so they can't just rebuild next turn.
- **On the draw / into an established grind:** lead with the **GY-banish on the recurring `RoLaD`**, then hold **targeting negation** for whichever boss resolves.
- **Do not** pair two *non-targeting* board-breakers against a `BLS` board — they both whiff (below).

### "Don't bother" list

- **Nibiru** — the deck doesn't make 5+ summons in a turn; it Ritual-Summons about one boss. Effectively dead unless they attempt a rare Link-spam turn.
- **Dark Ruler No More & other non-targeting mass negation** — **`BLS` is unaffected by non-targeting opponent effects.** DRNM whiffs on the primary boss (works only if the board is `MoDC`-only).
- **Forbidden Droplet *into `BLS`*** — its negate and its ATK-halve are both non-targeting → both whiff on `BLS`. Save it for `MoDC`, or don't fire it.
- **`Ash Blossom` on the `RoLaD` GY-recursion** — `Ash` hits Deck-adds, not GY-adds. Its only correct targets here are the `Skull` trigger or a Deck-mill (Foolish Burial). Firing it at the grind does nothing.
- **`Droll & Lock Bird` as a turn-1 boss-stopper** — it neither undoes the first `Skull` search nor touches the GY loop; at best it trims extra deck-searches.
- **`Effect Veiler` on `Skull`'s trigger or on the Ritual Spell** — `Skull` fires from the **GY** (not a face-up monster to target), and `Veiler` doesn't stop a Spell. Wrong tool; save `Veiler` for the boss on board.
- **`Called by the Grave` aimed at the recurring `RoLaD`** — it targets **monsters** in the GY, and `Ritual of Light and Darkness` is a **Spell**. Use `Called by` on a **boss/`Skull` in their GY** (deny shuffle-summon/banish-material) or as anti-hand-trap insurance — not on the Spell loop.
