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

Chaos Origins released July 2, 2026 — 5 days before this site was built. Real
scanned card images and a live, verified card database for the new cards
weren't reachable from the environment this was built in (see
`scripts/fetch-card-art.md` for why, and how to add real art later). Card
text, stats, and sample decklists in `data/archetypes/*.json` were hand-
compiled from set-preview research and early community/theorycraft content —
**not** official tournament Top Cut lists. Each archetype page's decklist
carries its own provenance label (e.g. Sacred Beasts and RoLaD have more
developed/dated sample lists; Blitzclique, Elfnote, and Angelechy are earlier
theorycraft). Double-check exact card wording and the full banlist against
Konami's official sources before finalizing your NAWCQ deck list.

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
`actions/deploy-pages`) whenever `main` is updated. One-time setup after
merging: in the repo's **Settings → Pages**, set **Source = "GitHub
Actions"**.

If the repo is ever renamed, update `start_url`/`scope` in `manifest.json` to
match the new path.
