# CORI Prep — NAWCQ 2026

A mobile-first, installable PWA for prepping Yu-Gi-Oh! TCG's **NAWCQ 2026**
(North America World Championship Qualifier, July 10–12, Minneapolis) around
the new **Chaos Origins (CORI)** set. Archetype guides, sample decklists, a
banlist reference, and live countdowns to the deck-list deadline and event
start — all cached for offline use on the convention floor.

## What's inside

- **Home** — live countdowns (deck list due, event start), quick nav, global card search.
- **Archetype guides** for Blitzclique, Light and Darkness Ritual ("RoLaD"),
  Elfnote, Angelechy, and Sacred Beasts — card-by-card breakdowns, combo
  lines, and a sample decklist per archetype.
- **Other Chaos Origins support** — a lighter one-line-per-archetype reference
  for everything else the set touches.
- **Banlist** — the current TCG Forbidden & Limited List that governs the
  NAWCQ main event.
- **Notes** — a personal matchup/notes tracker, saved to `localStorage` on
  your device only.

## Content accuracy note

Card names, stats, and effect text in `data/archetypes/*.json` are verified
against community card databases (ProjectIgnis BabelCDB and yaml-yugi) that
track the released Chaos Origins set, and card art in `assets/cards/` comes
from the yugioh-artworks mirrors of Konami's official database. Every sample
decklist has been checked against the **May 18, 2026 TCG Forbidden & Limited
List** (no Forbidden cards, no over-limit quantities), and `data/banlist.json`
lists the actual changes from that update. The decklists themselves are still
early community/theorycraft builds — **not** official tournament Top Cut
lists — so treat them as starting points, and always cross-check the full
official Konami banlist before finalizing your NAWCQ deck list.

## Running locally

No build step — plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Use your browser's device toolbar to
check mobile layout, and DevTools → Application to inspect the manifest and
service worker.

## Adding real card art later

See [`scripts/fetch-card-art.md`](scripts/fetch-card-art.md) — the card
renderer already looks for `assets/cards/<slug>.jpg` per card and falls back
to the styled text tile if it's missing, so dropping images in is the whole
integration step.

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
