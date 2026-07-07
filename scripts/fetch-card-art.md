# Card art pipeline

All 46 cards shown in the archetype guides ship with real art in
`assets/cards/<slug>.jpg` (JPEG-converted crops from the `yugioh-artworks`
GitHub mirrors of Konami's official card database). The renderer in
`js/components/card-tile.js` looks up `assets/cards/<slug>.jpg` per card (the
`slug` field in each archetype JSON) and silently falls back to the styled
text tile if an image is missing — so adding art for a new card is just
dropping a file in that folder, no code changes needed.

Slug rule: lowercase the card name and replace every non-alphanumeric run
with `-` (e.g. `Blitzclique - Breakaway` → `blitzclique-breakaway`).

**Remember:** new art files only reach offline users if they're also added to
the `APP_SHELL` list in `service-worker.js` (files under `assets/cards/` are
otherwise runtime-cached on first view).

## How to fetch art for new cards

The pipeline used to populate `assets/cards/` (works even from
network-restricted environments, since everything lives on
`raw.githubusercontent.com`):

1. **Passcode → Konami dbID + verified TCG name**: clone
   [`DawnbrandBots/yaml-yugi`](https://github.com/DawnbrandBots/yaml-yugi)
   (sparse checkout of `data/cards/`; updated by bot daily). Each
   `data/cards/<passcode>.yaml` has `konami_id` and `name.en`.
2. **dbID → artwork path**: fetch
   `https://raw.githubusercontent.com/yugioh-artworks/artworks-index/main/manifest.json`.
   `manifest.cards[<konami_id>]["1"].bestTCG` gives a URL like
   `//artworks-en-n.ygoresources.com/<path>`; rewrite it to
   `https://raw.githubusercontent.com/yugioh-artworks/artworks-en-n/main/<path>`.
3. **Download + convert**: the mirrored files are PNG; convert to JPEG
   (quality ~82) and save as `assets/cards/<slug>.jpg`.

If you have unrestricted network access, the
[YGOPRODeck API](https://db.ygoprodeck.com/api/v7/cardinfo.php) is a simpler
one-stop alternative — per their fair-use terms, download and store images
locally rather than hotlinking. Respect their rate limit (20 req/s).

## Card data sources

Names, stats, and effect text were verified against
[`ProjectIgnis/BabelCDB`](https://github.com/ProjectIgnis/BabelCDB)
(`cards.cdb` plus the `release-cori.cdb` / `prerelease-cori-en.cdb` set
databases) and cross-checked with yaml-yugi's official `name.en` fields.
Decklist legality was checked against
[`ProjectIgnis/LFLists`](https://github.com/ProjectIgnis/LFLists)
`0TCG.lflist.conf` (the 2026.05 TCG Forbidden & Limited List).
