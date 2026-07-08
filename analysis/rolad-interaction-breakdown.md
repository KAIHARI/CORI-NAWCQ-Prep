# RoLaD — "Light and Darkness Ritual" — Opponent's Interaction Breakdown

**Archetype id:** `rolad` · **Display name:** Light and Darkness Ritual · **Shorthand:** RoLaD
**Source:** `data/archetypes/rolad.json` (+ `data/banlist.json`, `data/event.json`, `analysis/meta-staples.json`)
**Run under:** `analysis/METHODOLOGY.md` — one archetype, no outside lookups, no recalled real-world meta.

> **Uncertainty flags (read first).** This is a *new CORI* archetype and the sample list's own label calls it
> "Community-documented… still not a tournament Top Cut list." Two engine cards have **no confirmed text**:
> - **Mind Shuffle** — `effectText` is a paraphrase, "Exact wording still being confirmed."
> - **Griffoh** — every stat is `null` and wording is "still being confirmed."
>
> **Magician of Dark Chaos – Black Chaos** also has a paraphrased effect ("Protects your Spells/Traps and can
> banish cards your opponent controls"), not exact text. Every conclusion that leans on these three is marked
> **[provisional]**. The confirmed spine of the deck (Skull Archfiend → Ritual of Light and Darkness → a boss)
> is fully worded and is where the high-confidence analysis lives.
>
> **Banlist/event context:** No CORI card is Forbidden/Limited/Semi on the 2026-05-18 list that governs NAWCQ
> 2026, so nothing in this engine is restricted; quantities in the list are legal as shown.

---

## Phase 1 — Card Inventory & Classification

### 1.1 Archetype-engine cards (present in `cards[]` with real text)

| Card | Type | Role(s) | Consumes | Produces | Hard OPT? |
|---|---|---|---|---|---|
| **Ritual of Light and Darkness** (RoLaD) | Ritual Spell | Payoff-enabler · Searcher/Recur · Recovery-Resilience | Tributes **and/or** banished GY monsters to meet Level 8 | Ritual Summons BLS **or** MoDC; **GY effect once/turn**: add this card + 1 card that mentions it from GY to hand | Yes — "**Once per turn**" on the GY self-recursion |
| **Black Luster Soldier – Soldier of Light and Darkness** (BLS) | Ritual/Effect · EARTH · Warrior · L8 · 3000/2500 | Payoff (offense) · Protection (self) | Must first be Ritual Summoned | Cannot be destroyed by battle; **unaffected by opponent's activated effects unless they target it**; on battle-destruction: **+1500 ATK and a second attack** | None stated |
| **Magician of Dark Chaos – Black Chaos** (MoDC) | Ritual/Effect · DARK · Spellcaster · L8 · 2800/2600 | Payoff (control) · Protection (your S/T) · Removal (banish) | Ritual Summon **or** shuffle 1 Spellcaster/Warrior Ritual Monster from hand/GY into Deck | Protects your Spells/Traps; banishes cards the opponent controls **[provisional wording]** | None stated (text unconfirmed) |
| **Skull Archfiend of Chaos** | Effect · DARK · Fiend · L6 · 2650/2450 | **Starter/Assembler** · Searcher/Tutor · Cost-Enabler (Ritual fodder) | Being **sent to the GY** | On send-to-GY: send RoLaD from **Deck** to GY, **then add** a Ritual Monster it can summon from **Deck** to hand | Trigger fires per send; deck runs 3, so effectively repeatable |
| **Mind Shuffle** | Normal Spell **[provisional]** | Recovery-Resilience · Grind payoff | Unconfirmed | Recycles Ritual pieces between hand/Deck/GY to swap the two bosses **[provisional]** | Unconfirmed |
| **Griffoh** | Monster **[provisional — all stats null]** | Enabler (accelerant) | Being **Set** | Lets Mind Shuffle be used the same turn it is Set **[provisional]** | Unconfirmed |

**Key clause reads (confirmed text):**
- **Skull Archfiend** does *two* Deck-touching things in one activation: **send from Deck to GY** *and* **add from Deck to hand**. Both are on Ash Blossom's negate list — one Ash kills the whole effect.
- **RoLaD's recursion is an add-from-*GY*, not from Deck** — this is why Ash Blossom / Droll do **not** touch the loop once it's running (they only hit Deck adds/sends).
- **BLS's protection is "unaffected *unless they target this card*."** This inverts the usual rule of thumb: **targeted** removal beats it, **non-targeting** board wipes/effect-negates whiff on it.

### 1.2 — Phase 1a: engine vs. generic split (cross-referenced against `sampleDecklist`)

**Engine core (in both `cards[]` and the list):** BLS ×1, MoDC ×1, Skull Archfiend ×3, Griffoh ×3, RoLaD ×3, Mind Shuffle ×3 — **14 of 40** are the actual engine (and 6 of those 14 are the two provisional cards). The remaining **26/40 are generic consistency + non-engine**, i.e. this is a light engine wrapped in a very heavy generic shell.

**Generic support (name-only in list — classified by broad category, no invented text):**

| Card | Qty | Broad category / note |
|---|---|---|
| Preparation of Rites | 2 | Generic **Ritual searcher**. ⚠️ Well-known baseline: it fetches a **Level ≤7** Ritual Monster — **both bosses are Level 8**, so it can only ever recur the Ritual **Spell** from GY here, not the monsters. List oddity — flag. |
| Terraforming | 1 | Generic **Field Spell searcher**. ⚠️ There is **no Field Spell** anywhere in the list — apparent dead/placeholder include in a theorycraft list. Flag. |
| Foolish Burial | 1 | Generic **Deck→GY mill (1 monster)** — the clean enabler that sends **Skull Archfiend** to trigger it. This is the deck's most important non-engine card. |
| Upstart Goblin | 1 | Generic draw / deck-thinning. |
| Pot of Prosperity | 1 | Generic draw/consistency (Extra-Deck banish + excavate). |
| Pot of Desires | 2 | Generic draw (banish 10 from top). ⚠️ Can **banish** engine pieces face-down — a Skull Archfiend hit by Desires is lost (banished, not "sent to GY," so it does **not** trigger). |
| Ash Blossom & Joyous Spring | 3 | Hand trap — negates Deck add/SS/send/draw. *(Their own copy — see protection package.)* |
| Nibiru, the Primal Being | 2 | Hand trap — 5-summon punish/board wipe. |
| Called by the Grave | 2 | Generic hand-trap counter / GY-banish-negate. *(Protection package — key.)* |
| Infinite Impermanence | 2 | Generic monster-effect negate + column lock. *(Protection package.)* |
| Dark Ruler No More | 1 | Generic board breaker (negate all opp monster effects, no response). |
| Solemn Judgment | 1 | Generic counter trap (negate summon/activation). *(Protection package.)* |
| Droll & Lock Bird | 2 | Hand trap — locks further Deck→hand adds. |
| Effect Veiler | 2 | Hand trap — negate one field monster's effects. |
| Triple Tactics Talent | 1 | Generic — turns **our** hand-trap-on-their-turn into their draw-2/steal. *(Protection package — punishes us.)* |
| Forbidden Droplet | 2 | Generic board breaker (targeted negate + ATK-halve). |

**Extra Deck (all generic bodies):**

| Card | Qty | Broad category |
|---|---|---|
| Baronne de Fleur | 1 | Generic L10 Synchro boss (negate/removal). ⚠️ No obvious Tuner in the confirmed engine — likely needs Griffoh to be a Tuner **[provisional]**. |
| I:P Masquerena | 1 | Generic opponent's-turn Link-2 enabler. |
| Underworld Goddess of the Closed World | 1 | Generic Link-5 boss (mass removal/steal). |
| Accesscode Talker | 1 | Generic Link-4 finisher (repeatable removal, high ATK). |
| Knightmare Unicorn | 1 | Generic Link-3 (non-target removal + recycle). |

**Opponent's own protection package (what they can point back at *our* interaction):** **Called by the Grave ×2**, Solemn Judgment ×1, Infinite Impermanence ×2, Effect Veiler ×2, Droll ×2, Ash ×3, **Triple Tactics Talent ×1**, plus Dark Ruler / Droplet as board breakers. The two that most change how we sequence: **Called by the Grave** (can negate our hand trap aimed at Skull Archfiend) and **Triple Tactics Talent** (rewards them if we interact on their turn). This sets the "bait" math in Phase 3/5.

---

## Phase 2 — Reconstruct the Whole (Gameplan Synthesis)

### 2.1 Primary opening line (confirmed spine)

| # | Trigger / effect | Cost paid | Output produced | Dependency |
|---|---|---|---|---|
| 1 | **Foolish Burial** sends **Skull Archfiend** from Deck to GY (or Normal-Summon it and use it as Ritual tribute) | 1 card (Foolish) | Skull Archfiend in GY, its trigger on the stack | **Hard** — nothing assembles without a Skull Archfiend hitting GY |
| 2 | **Skull Archfiend GY trigger** | — | **RoLaD sent Deck→GY** + **a boss tutored Deck→hand** | **Hard** — this is the whole assembly step |
| 3 | **RoLaD GY recursion** (once/turn): add RoLaD + 1 card that mentions it (e.g., another Skull Archfiend) from GY to hand | — | RoLaD back in hand, engine re-armed | **Soft** — you can also just draw/redraw RoLaD (×3); degraded, not dead |
| 4 | **Activate RoLaD**, Ritual Summon a boss | Tribute monsters **and/or banish GY monsters** for Level 8 | **BLS** (offense) or **MoDC** (control) on board | **Hard** — the payoff |
| 5 | **Griffoh Set → Mind Shuffle same turn** | — | Recycle/loop pieces; swap bosses turn to turn | **Soft [provisional]** — grind engine, not needed for the first board |

**Degraded/alternate openers:** (a) natural **RoLaD in hand** + Normal-Summon Skull Archfiend, tribute it for the Ritual → the tribute *sends it to GY* → its trigger loads a **second** RoLaD to GY and tutors the next boss (self-fueling). (b) **MoDC's alt-summon** — shuffle a Spellcaster/Warrior Ritual Monster (e.g., a used BLS in GY) into the Deck to Special Summon MoDC **without RoLaD at all**, a second, Ritual-Spell-independent route to a payoff **[MoDC wording provisional]**.

### 2.2 Redundancy / branch-point count (out of 40)

- **"Send Skull Archfiend to GY" (start the engine):** clean enablers are thin — **Foolish Burial ×1**, plus the Normal-Summon-and-tribute route (needs RoLaD already in hand) and the Mind Shuffle loop **[provisional]**. **Thin role.**
- **Skull Archfiend copies:** 3 — plenty once one is in GY.
- **RoLaD access:** 3 in Deck **+ built-in GY recursion** + Preparation of Rites can recover it from GY → **very redundant** once one copy has been used.
- **Payoff monsters:** **BLS ×1 and MoDC ×1 — singletons**, but tutored by Skull Archfiend, recurred by RoLaD's GY-banish cost, and recycled by MoDC's shuffle. Hard to strip permanently despite being one-ofs.

### 2.3 Keystone cards

1. **Skull Archfiend of Chaos (its GY trigger).** Removing this one activation denies *both* the RoLaD-to-GY load *and* the boss tutor in a single stroke — it is the assembly step and the highest-value single point in the deck.
2. **Ritual of Light and Darkness.** It is simultaneously the target of Skull Archfiend's search-half, the actual summon of the payoff, and the self-recurring loop. But its own GY recursion makes it very hard to keep down after the first activation.

### 2.4 Card pairs (explicit or mechanically linked)

| Pair | One-sentence mechanism |
|---|---|
| **Foolish Burial + Skull Archfiend** | Foolish sends Skull Archfiend to GY, firing the assembly trigger — the cleanest 1.5-card opener. |
| **Skull Archfiend + RoLaD** | Skull sends RoLaD to GY and tutors a boss; RoLaD then Ritual Summons that boss. |
| **RoLaD + (BLS / MoDC)** | The Ritual Spell converts tributes/GY-banish into a Level 8 boss. |
| **RoLaD (in GY) + "a card that mentions it"** | Its once/turn recursion adds RoLaD **plus** e.g. Skull Archfiend back from GY — re-arming the assembler and the loop. |
| **MoDC + a Ritual Monster in hand/GY** | MoDC's alt-summon shuffles a Spellcaster/Warrior Ritual into the Deck to come down without RoLaD, recycling used bosses back into the Deck. **[provisional]** |
| **Griffoh + Mind Shuffle** | Griffoh lets Mind Shuffle run the same turn it's Set, starting the grind a turn early. **[provisional]** |

---

## Phase 3 — Chokepoint & Timing Map

Ranked highest → lowest leverage (earliest/cheapest to stop, most downstream collapse, best trade).

### Chokepoint #1 — Skull Archfiend's GY trigger *(the assembly)* — **HIGHEST leverage**
- **Exact window:** in response to Skull Archfiend's "when sent to GY" trigger activating, **before it resolves**. (Or one link earlier: in response to **Foolish Burial's** send, since Ash negates Foolish too.)
- **Interaction that fits:** a hand trap that negates a **Deck-add / Deck-send** effect (Ash Blossom hits *both* clauses at once); or a GY-monster-banish-negate (Called by the Grave, banishing Skull Archfiend as its trigger goes on the stack).
- **Why the GY effects are hard to reach otherwise:** Skull Archfiend activates **in the GY**, so field-only negates — **Effect Veiler, Infinite Impermanence, Ghost Ogre, Songs of the Dominators** — cannot touch it. This window is specifically an Ash/Called window.
- **Single point of failure vs. replaceable:** early it's close to a single point — no RoLaD reaches GY, no recursion, no tutor. They can re-attempt only with a *second* Skull Archfiend **and** a second sender (and Foolish is ×1). Redundancy exists but is not free.
- **Trade efficiency:** **excellent.** One card (e.g. Ash) answers a 2-card investment (Foolish + Skull) and denies two effects' worth of value. Near-ideal 1-for-2.
- **Bait caveat:** they run **Called by the Grave ×2** — they can negate your Ash here. And any hand trap you fire on their turn can fuel their **Triple Tactics Talent ×1**. See Phase 5 sequencing.

### Chokepoint #2 — The Ritual Summon (RoLaD activation → boss hits the field) — **HIGH**
- **Exact window:** in response to **RoLaD's activation**, before the Ritual Summon resolves (counter trap / activation negate), **or** a "negate an effect that Special Summons" answer at the same window.
- **Interaction that fits:** Special-Summon-negate (Dominus Impulse), counter trap (their own Solemn is the mirror), or activation negate. **Note:** MoDC's **alt-summon** route can rebuild a payoff even if RoLaD is negated **[provisional]**, so this window is not a hard single point of failure.
- **Trade efficiency:** fine but *later* — they've already banked the Skull Archfiend search by now, so it's a worse trade than #1.

### Chokepoint #3 — Removing the boss after it lands *(reactive / going second)* — **MEDIUM**
- **Exact window:** your turn (or a quick-effect on theirs), targeting the resolved boss.
- **Critical constraint (BLS):** BLS is **unaffected by non-targeting activated effects** and **can't be destroyed by battle**. So the answers that work are **targeted**: targeted banish/bounce/destroy, or a **targeting** negate that also enables removal — **Forbidden Droplet, Infinite Impermanence, Effect Veiler, Dominus Spark** all *target*, so they get through; **Dark Ruler No More and non-targeting board wipes whiff on BLS.**
- **MoDC** has no "unaffected" clause, so it's easier to remove, but it protects your **S/T** and can be rebuilt via its shuffle-summon.
- **Trade efficiency:** worst of the three — you're spending after they've completed a board, and BLS specifically taxes you into premium *targeted* removal.

### Chokepoint #4 — RoLaD's GY recursion & the Mind Shuffle grind — **LOW**
- **Exact window:** effectively uninteractable by common hand traps — the recursion is an **add-from-GY** (not Deck), so Ash/Droll miss it, and Mind Shuffle's text is unconfirmed **[provisional]**.
- **What chips at it:** **GY banishing** — Bystial Magnamhut / Called by the Grave banishing a boss (removing Ritual-banish fodder and MoDC shuffle-fuel) or D.D.-style GY exile. This is grind-denial, not a turn-ender.
- **Trade efficiency:** low per-piece; only matters across a long game.

**Macro-timing summary:**
- **Preemptive (on the draw):** the whole game is decided at **Chokepoint #1**. A single Deck-add/send negate on Skull Archfiend (baiting Called first if you can) is the cheapest, highest-collapse play. Field-monster negates are near-dead preemptively because the assembly happens in the GY.
- **Reactive (going second / letting it resolve):** you are forced into **targeted** removal for BLS and into breaking a grind that recurs itself — a structurally worse position, which is exactly why #1 is worth prioritizing.

---

## Phase 4 — Weakness Audit

**Structural**
- **GY-reliant assembly.** The entire opener routes through **Skull Archfiend *in the GY*** and **RoLaD *in the GY***. **GY hate** (banish-on-send, Bystial-style GY banish, D.D. exile) is disproportionately strong: banishing Skull Archfiend as it tries to trigger, or exiling a boss from GY, attacks the loop at its source.
- **Depends on a "send Skull Archfiend to GY" enabler that is thin** — Foolish Burial ×1 is the only clean dedicated sender; the alternatives need RoLaD already in hand or the unconfirmed Mind Shuffle loop.
- **BLS demands *targeted* removal.** Good for them vs. Dark Ruler / mass non-targeting wipes; but it means anyone holding *targeted* banish/bounce/negate (Droplet, Imperm, Called-adjacent) cleanly answers the marquee threat. It is **not** immune — it's immune to the *wrong* removal.
- **Singleton payoff monsters (BLS ×1, MoDC ×1).** Resilient via tutor/recur, but a well-timed GY-banish of the one relevant boss thins access more than a ×3 line would.
- **Attribute/type spread:** engine monsters are **DARK** (Skull Archfiend, MoDC) and **EARTH** (BLS) — relevant to attribute-locking answers only as it affects the *user* of those answers, not RoLaD (see Phase 6). DARK bodies in GY make it a legal target for **Bystial**-style LIGHT/DARK GY banish.
- **Provisional load-bearing cards:** ~6/14 engine slots (Mind Shuffle ×3, Griffoh ×3) have unconfirmed text — a large fraction of the "engine" is unverified, so the grind ceiling is genuinely uncertain.

**Sequencing**
- The confirmed line is fairly **strict**: send Skull Archfiend → resolve its trigger → recur/activate RoLaD → Ritual Summon. A disruption at the **trigger** (step 2) can't be resequenced around in the same turn without a second Skull Archfiend *and* a second sender.
- Once past step 2, though, the deck is *hard* to re-disrupt: RoLaD's GY recursion and MoDC's alt-summon give it two independent routes back to a payoff, so late interaction is low-value.

**Redundancy**
- **Thin:** the dedicated "send-to-GY" enabler (Foolish ×1) and the payoff monsters (×1/×1).
- **Off-theme consistency includes:** **Preparation of Rites ×2** can't fetch the Level-8 bosses (fetches ≤L7) and **Terraforming ×1** has no Field Spell to fetch — in this list those ~3 slots look like theorycraft filler rather than functional tutors, which quietly weakens the deck's real consistency below its 26/40 generic count.
- **Redundant:** RoLaD access (×3 + recursion + Prep's spell-recovery half) and Skull Archfiend (×3) — attacking *these* directly is low-value because the deck expects to see them repeatedly.

---

## Phase 5 — Ranked Interaction Breakdown (deliverable)

| Card / target | Role | Why it matters | Best interaction timing | What breaks if stopped | Tier | Related pair(s) |
|---|---|---|---|---|---|---|
| **Skull Archfiend of Chaos** (GY trigger) | Starter/Assembler | One activation loads RoLaD to GY **and** tutors a boss | In response to its send-to-GY trigger (or to Foolish Burial one link earlier), before resolution — Ash/Called window | RoLaD never reaches GY → no recursion, no tutored boss → turn's assembly collapses | **S** | Foolish + Skull; Skull + RoLaD |
| **Foolish Burial** (when it's the enabler) | Enabler | Only clean dedicated "send Skull Archfiend to GY" (×1) | In response to Foolish's Deck→GY send | Skull Archfiend never enters GY; if it was their only sender this turn, whole line stalls | **A** | Foolish + Skull |
| **Ritual of Light and Darkness** (activation → Ritual Summon) | Payoff-enabler | Turns fodder into a Level 8 boss; also the recur loop | In response to RoLaD's activation (counter/SS-negate) | This particular boss doesn't land — but MoDC's alt-summon may rebuild **[prov.]** | **A** | RoLaD + boss |
| **Black Luster Soldier** (resolved boss) | Payoff/Protection | 3000 unaffected-unless-targeted, 2nd attack snowball | Your turn / quick-effect — must be **targeted** removal or a **targeting** negate | Removes their offensive threat; they recur via GY-banish later | **B** | RoLaD + BLS |
| **Magician of Dark Chaos** (resolved boss) | Payoff/Control | Protects their S/T; banish removal **[prov.]** | On its on-field effect activation, or targeted removal | Frees your S/T; shuffle-summon can rebuild it | **B** | MoDC + Ritual Monster |
| **RoLaD GY recursion / Mind Shuffle grind** | Recovery/Grind | Re-arms engine each turn | GY-banish the fuel; add-from-GY dodges Ash/Droll | Slows the grind only; no single-turn collapse | **C** | RoLaD + mentioning card; Griffoh + Mind Shuffle **[prov.]** |
| **Preparation of Rites / Terraforming** | (non-functional here) | Can't fetch L8 bosses / no Field Spell to grab | — | Nothing — don't spend on these | **C** | — |

### One-piece verdict
**If you only get ONE piece of interaction, spend it on Skull Archfiend of Chaos at the moment its GY trigger is activated (in response to it being sent to the GY — or a link earlier on Foolish Burial's Deck→GY send), using a hand trap that negates a Deck-add / Deck-to-GY-send effect (Ash Blossom is the textbook fit — it negates *both* of Skull Archfiend's clauses in one shot).** That single activation is the deck's whole assembly step: it loads Ritual of Light and Darkness into the GY (which enables the once-per-turn recursion loop) **and** tutors the boss. Deny it and there is no RoLaD in the GY to recur and no boss in hand to Ritual Summon, so the turn stalls to a Normal Summon. It's also the best *trade* — one card answering their Foolish + Skull two-card investment — and it's the only window where the key effect is reachable at all, because everything downstream happens from the GY or from a Ritual Spell where field-monster negates (Veiler/Imperm/Ghost Ogre) can't reach.

### Two-piece sequencing note
They pack **Called by the Grave ×2** (can negate your Ash on Skull Archfiend) and **Triple Tactics Talent ×1** (your on-their-turn hand trap can hand them a draw-2/steal). So with two pieces: **bait first, kill second.** Lead with the *more expendable* disruption — e.g. a Deck-add negate on their **Foolish Burial** or an early searcher, or a Droll on a Preparation of Rites — to draw out a Called by the Grave (accept that this may feed TTT). **Then** land your real answer (a Deck-send/add negate, or a GY-banish like Called of your own) on the **Skull Archfiend GY trigger** once their protection has been spent. If you *only* have removal (no negates), sequence around BLS's clause: use one **targeting** negate (Infinite Impermanence / Forbidden Droplet) to strip its "unaffected," then remove the now-vulnerable 3000 body. Do **not** open into Called-territory with your one premium negate unprotected.

### "Don't bother" list
- **Preparation of Rites ×2 / Terraforming ×1** — non-functional in this list (Prep can't grab the L8 bosses; there's no Field Spell). Negating them accomplishes nothing.
- **RoLaD's GY recursion loop** — it's an add-from-*GY*; Ash, Droll, and Deck-hate all miss it. Chasing the loop instead of the assembly is wasted interaction.
- **Nibiru-style summon-count punishes** — the deck is a grindy 1–2-summons-per-turn midrange; it rarely reaches 5 summons off the core line.
- **Non-targeting board wipes / Dark Ruler No More vs. BLS** — BLS is unaffected by non-targeting activated effects; these bounce off the marquee threat.
- **Late field-monster negates (Veiler/Imperm) aimed at the *combo*** — the assembly is a GY trigger, so these can't stop it; save them to *neutralize the finished boss* instead.

---

## Phase 6 — Popular Non-Engine Card Rating

Rated against RoLaD's specific steps. Reminder on the attribute locks: on the **Dominus** traps and Songs, the "can't use these Attributes' effects for the rest of the Duel" penalty falls on **whoever activates the card from hand — i.e. *you*, the interacting player** — so it collides with *your* deck's colors, not RoLaD's; RoLaD's own DARK/EARTH bodies matter only for whether *its* board presents the trigger condition and for GY-banish targeting.

| Card | Tier | What it hits + when | Condition / lock that limits it |
|---|---|---|---|
| **Ash Blossom & Joyous Spring** | **S** | Negates **both** of Skull Archfiend's GY clauses (Deck→GY send *and* Deck→hand add) at Chokepoint #1; also negates **Foolish Burial** (Deck→GY) and Prep/Terra adds. The single cleanest, highest-collapse answer. | Their **Called by the Grave ×2** can negate it — bait first. OPT. |
| **Called by the Grave** | **A** | Banish + negate **Skull Archfiend in the GY** as its trigger goes up (Chokepoint #1), or pre-banish a boss from GY to deny Ritual-banish/shuffle fuel (Chokepoint #4). Reaches the GY step that field negates can't. | Needs a target in their GY; 1-turn effect window. |
| **Infinite Impermanence** | **A** | **Targets** the resolved boss → gets **past BLS's "unaffected unless targeted"** to negate it (Chokepoint #3); column-lock is minor here. Best generic *boss* answer. | Can't touch the GY assembly; "control no cards" for hand-activation; set ahead for preemptive use. |
| **Forbidden Droplet** | **A** | **Targets** → beats BLS's protection, negates + halves it (3000→1500) so it dies to battle/removal (Chokepoint #3); also neuters MoDC. | Costs cards to fuel; targets Effect Monsters only. |
| **Effect Veiler** | **B** | **Targets** a field monster → can neuter a resolved boss (BLS/MoDC) on their turn (Chokepoint #3). Whiffs entirely on the GY assembly. | Field monsters only; no removal rider; doesn't stop the combo, only the finished body. |
| **Bystial Magnamhut** | **B** | Banishes a **DARK** monster from RoLaD's GY (Skull Archfiend / MoDC) to disrupt the recursion loop and drop a 2500 beater (Chokepoint #4). | Needs a LIGHT/DARK in GY; doesn't stop the initial assembly; grind-denial not turn-ender. |
| **Mulcharmy Purulia** | **B** | Bosses are **Ritual-Summoned from the *hand*** and Skull/Griffoh are Normal Summoned — Purulia draws on each **from-hand** summon (mild card-advantage punish). | "Control no cards"; RoLaD makes few summons/turn, so 1–2 draws; punishes, doesn't stop. |
| **Ghost Ogre & Snow Rabbit** | **C** | Only lives if a boss activates an on-field effect (can hit **MoDC**, not BLS which is unaffected by non-targeting destroy); can't reach the GY assembly or a Ritual Spell activating from hand. | Field activations only; whiffs on BLS and on every GY step. |
| **Dark Ruler No More** | **C** | Negates MoDC's on-field effects to push a board — but **whiffs on BLS** (non-targeting → BLS unaffected) and can't remove either body. | Non-targeting → dead vs. the marquee threat; no removal. |
| **Mulcharmy Fuwalos** | **C** | Triggers on SS **from Deck/Extra** — RoLaD summons bosses from the **hand**, so it only fires off their generic Extra-Deck plays (I:P/link lines), not the core loop. | "Control no cards"; mostly idle vs. the Ritual spine. |
| **Nibiru, the Primal Being** | **Dead** | Needs 5 opponent summons in a turn; the grindy 1–2-summon core line rarely gets there. | Only live if they detour into a big Extra-Deck combo. |
| **Dominus Impulse** | **A** | "Negate an effect that Special Summons" → hits **RoLaD's Ritual Summon** (and MoDC's SS effect) at Chokepoint #2; live because RoLaD controls a card. | If hand-activated, **you** lose LIGHT/EARTH/WIND monster effects the rest of the Duel — collides with *your* colors, not theirs. |
| **Dominus Purge** | **A** | "Negate an effect that adds from Deck to hand" → negates **Skull Archfiend's tutor half** (and Prep/Terra) at Chokepoint #1; live from hand since they control a card. | If hand-activated, **you** lose DARK/WATER/FIRE effects rest of Duel; misses RoLaD's add-from-**GY** recursion. |
| **Dominus Spark** | **A** | Enabled precisely because **Skull Archfiend activates a monster effect in the GY**; then **targets** and banishes a monster → beats BLS's "unaffected unless targeted" (Chokepoint #3). | If hand-activated, **you** lose EARTH/WATER/FIRE/WIND effects rest of Duel; gives them a small SS if you have no Trap in GY. |
| **Songs of the Dominators** | **C** | Only negates a monster effect activated **on the field** — Skull Archfiend fires in the **GY** and RoLaD is a Spell, so it whiffs on the assembly; at best negates a resolved boss's field effect. | "No monsters in your GY" to hand-activate + brutal self-lock (no hand/GY/banish monster effects until end of next turn). |

> Note: the meta-staples list contains **15 cards** here (the 12-card watchlist plus the three **Dominus** traps and **Songs of the Dominators** already present in the file); all are rated above. **Fydraulis Harmonia** and **The Fallen & The Virtuous** from the file are Synchro/Branded-engine cards, not generic answers, and don't meaningfully interact with RoLaD's spine (Fydraulis negates a *field* monster effect → same GY-blind spot as Veiler, tier **C**; The Fallen & The Virtuous is a Branded/Dogmatika Extra-Deck tool with no clean line into this deck → **Dead**).

**Phase 6 summary:** The single best generic answer to RoLaD is **Ash Blossom & Joyous Spring (S)** — it negates *both* halves of Skull Archfiend's GY assembly (and Foolish Burial) at the one window that matters — with **Called by the Grave, Infinite Impermanence, Forbidden Droplet, and the three Dominus traps** as strong **A** backups (the first two/Droplet because they *target* and so beat BLS's "unaffected-unless-targeted" body; the Dominus traps because RoLaD's own board and its GY monster-effect activation switch them on). **Dead / near-dead draws:** **Nibiru** (grind deck rarely hits 5 summons) and **Mulcharmy Fuwalos** (RoLaD summons from the *hand*, not Deck/Extra), with **Songs of the Dominators, Dark Ruler No More, and Ghost Ogre** only marginally better since RoLaD's key activations happen in the GY where field-only negates can't reach.
