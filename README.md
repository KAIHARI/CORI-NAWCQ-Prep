# CORI Prep — NAWCQ 2026

A mobile-first, installable PWA for prepping Yu-Gi-Oh! TCG's **NAWCQ 2026**
(North America World Championship Qualifier, July 10–12, Minneapolis) around
the new **Chaos Origins (CORI)** set. Archetype guides with real card images,
sample decklists, and live countdowns to the deck-list deadline and event
start — all cached for offline use on the convention floor.

## What's inside

- **Home** — live countdowns (deck list due, event start), quick nav, global card search.
- **Archetype guides** for Blitzclique, Light and Darkness Ritual ("RoLaD"),
  Elfnote, Angelechy, and Sacred Beasts — card-by-card breakdowns with real
  card images where available, combo lines, and a sample decklist per
  archetype (also with card images — see `js/components/card-tile.js`'s
  `renderDeckCard`).
- **Other Chaos Origins support** — a lighter one-line-per-archetype reference
  for everything else the set touches, plus a meta-watch note on Kewl Tune,
  the OCG's actual #1 deck this season (not CORI-native, so not covered as a
  full guide here).

## Content accuracy note

Chaos Origins TCG-released July 2, 2026. Card text/stats in
`data/archetypes/*.json` and each archetype's sample decklist were compiled
via web research (see below) and carry per-card and per-decklist provenance
notes — confidence ranges from "confirmed against multiple independent
sources" to "pattern-matched, not independently verified" to "no real
tournament list found, theorycraft shell." Read each archetype page's
decklist label and any ⚠ combo-line callouts (e.g. Angelechy's documented
FTK lines, Sacred Beasts' OCG-forbidden tech card) before finalizing a real
NAWCQ deck list — and always double-check exact card wording and the current
TCG Forbidden & Limited List against Konami's official sources.

## Card images

`js/components/card-tile.js` looks for `assets/cards/<slug>.png` for every
card referenced anywhere in `data/archetypes/*.json` (both the per-card
breakdowns and the sample decklists) and falls back to a styled text
tile/chip if the image is missing — no code changes needed either way.

Run `python3 scripts/fetch-card-art.py` to (re-)populate `assets/cards/`.
It resolves each card name to a real image via a two-hop, GitHub-only
pipeline that works even from network sandboxes that block ygoprodeck.com,
yugipedia.com, and most image CDNs:

1. [`DawnbrandBots/yaml-yugi`](https://github.com/DawnbrandBots/yaml-yugi)
   (branch `aggregate`, `cards.json`) maps an English card name to a Konami
   database ID.
2. [`yugioh-artworks/artworks-index`](https://github.com/yugioh-artworks/artworks-index)
   (`manifest.json`) maps that ID to an image path on one of the
   `yugioh-artworks/artworks-*` repos, fetched via `raw.githubusercontent.com`.

Brand-new archetype cards (anything not yet indexed by yaml-yugi's daily
job) won't resolve yet — as of this writing that's essentially every
Chaos-Origins-original card in Blitzclique, RoLaD, Angelechy, and the new
Elfnote/Sacred-Beasts members, while older support/staple cards in the
sample decklists resolve at a high rate. Re-run the script periodically as
upstream databases catch up; it's a no-op for cards you already have.

## Running locally

No build step — plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Use your browser's device toolbar to
check mobile layout, and DevTools → Application to inspect the manifest and
service worker.

## Deployment

This repo deploys via `.github/workflows/deploy.yml` (GitHub Actions,
`actions/deploy-pages`) whenever `main` is updated. One-time setup: in the
repo's **Settings → Pages**, set **Source = "GitHub Actions"**. GitHub Pages
on the free tier requires a public repository.

Served at the custom domain **labrynth.info** (see the `CNAME` file at the
repo root — required so the domain sticks across Actions-based deploys) with
DNS managed at Cloudflare. `manifest.json`'s `start_url`/`scope` are set to
`/` accordingly, since a custom domain serves from the root rather than a
`/<repo-name>/` subpath. If the custom domain is ever removed, restore the
`/CORI-NAWCQ-Prep/` subpath in `manifest.json` and delete the `CNAME` file.
