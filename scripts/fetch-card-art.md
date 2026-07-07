# Adding real card art (optional)

This site ships with styled card tiles instead of scanned card images — the
`data/archetypes/*.json` files were hand-authored from research, and the
sandbox this site was built in couldn't reach `ygoprodeck.com` or any other
card-image host to fetch/verify real scans (only `raw.githubusercontent.com`
was reachable, and the one card database found there was stale — no Chaos
Origins cards indexed at all).

If you want real card images, you can add them yourself from a machine
without that restriction. The rendering already supports it: `js/components/card-tile.js`
looks for `assets/cards/<slug>.jpg` for every card (the `slug` field in each
archetype JSON) and silently falls back to the text tile if the image 404s —
so dropping files into that folder is the entire integration step, no code
changes needed.

## Option A — YGOPRODeck API (simplest)

Free, no API key required. Per their fair-use terms: **download and store
images locally — do not hotlink `images.ygoprodeck.com` from a deployed
site.**

```bash
# Fetch card data + image URLs for one archetype:
curl -s "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blitzclique" -o blitzclique.json

# Or for the whole set:
curl -s "https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=Chaos%20Origins" -o cori.json
```

Each card object has a `card_images` array with `image_url_small` /
`image_url_cropped` fields. Download each one and save it as
`assets/cards/<slug>.jpg`, where `<slug>` matches the `slug` field already in
this repo's `data/archetypes/*.json` (e.g. `wisca-blitzclique.jpg`).

A short Python sketch:

```python
import json, re, urllib.request

with open("blitzclique.json") as f:
    cards = json.load(f)["data"]

for card in cards:
    slug = re.sub(r"[^a-z0-9]+", "-", card["name"].lower()).strip("-")
    url = card["card_images"][0]["image_url_small"]
    urllib.request.urlretrieve(url, f"assets/cards/{slug}.jpg")
```

Respect their rate limit (20 requests/sec, 1-hour IP ban if exceeded) — fine
for a one-time local run like this.

## Option B — community GitHub mirrors

The `yugioh-artworks` GitHub org hosts Konami-sourced artwork crops in
per-locale repos, reachable via `raw.githubusercontent.com` even in
network-restricted environments. Cross-reference a card's Konami database ID
(`dbID`) via a card database (e.g. `iconmaster5326/YGOJSON`'s
`aggregate/cards.json`) against `yugioh-artworks/artworks-index`'s
`manifest.json` to find the right path. Note: as of this site's initial
build, that database did not yet include Chaos Origins cards — check its
freshness before relying on it for brand-new cards.

## Verifying

After adding images, reload the site locally (`python3 -m http.server`) and
confirm the `<img>` now renders above the card's stats instead of being
silently removed by the `onerror` fallback.
