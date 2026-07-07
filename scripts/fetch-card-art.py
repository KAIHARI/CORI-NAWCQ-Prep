#!/usr/bin/env python3
"""Fetch real card images for every card referenced in data/archetypes/*.json.

Pipeline (both hops are GitHub-hosted, so this works even from network
sandboxes that block ygoprodeck.com / yugipedia.com / most image CDNs but
allow raw.githubusercontent.com):

  1. DawnbrandBots/yaml-yugi (branch "aggregate", file cards.json) maps an
     English card name -> Konami database ID (konami_id).
  2. yugioh-artworks/artworks-index (branch "main", file manifest.json) maps
     a konami_id -> an image path on one of the yugioh-artworks/artworks-*
     repos, fetchable via raw.githubusercontent.com.

Brand-new cards (anything not yet indexed by yaml-yugi's daily job) simply
won't resolve — the site's rendering already falls back gracefully to a
styled text tile when assets/cards/<slug>.png is missing, so this is safe
to re-run at any time as those upstream databases catch up.

Usage: python3 scripts/fetch-card-art.py
"""
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CACHE_DIR = REPO_ROOT / ".cache"
ARCHETYPES_DIR = REPO_ROOT / "data" / "archetypes"
OUT_DIR = REPO_ROOT / "assets" / "cards"

YAML_YUGI_URL = "https://raw.githubusercontent.com/DawnbrandBots/yaml-yugi/aggregate/cards.json"
MANIFEST_URL = "https://raw.githubusercontent.com/yugioh-artworks/artworks-index/main/manifest.json"

LANG_PRIORITY = ["en"]
SOURCE_PRIORITY = ["neuron_high", "database"]


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def normalize(name):
    return re.sub(r"[^a-z0-9]", "", name.lower())


def download(url, dest, label):
    if dest.exists():
        return
    print(f"Downloading {label}...", file=sys.stderr)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        dest.write_bytes(resp.read())


def load_yaml_yugi_index():
    dest = CACHE_DIR / "yaml-yugi-cards.json"
    download(YAML_YUGI_URL, dest, "yaml-yugi card database (~95MB, one-time)")
    with open(dest) as f:
        cards = json.load(f)
    index = {}
    for c in cards:
        en_name = c.get("name", {}).get("en")
        if en_name:
            index[normalize(en_name)] = c
    return index


def load_manifest():
    dest = CACHE_DIR / "artworks-manifest.json"
    download(MANIFEST_URL, dest, "yugioh-artworks manifest (~20MB, one-time)")
    with open(dest) as f:
        return json.load(f)["cards"]


def best_image_path(manifest_entry):
    print_keys = sorted(manifest_entry.keys(), key=lambda k: int(k) if k.isdigit() else 999)
    for pk in print_keys:
        p = manifest_entry[pk]
        for lang in LANG_PRIORITY:
            entries = p.get("idx", {}).get(lang)
            if not entries:
                continue
            for src in SOURCE_PRIORITY:
                for e in entries:
                    if e.get("source") == src:
                        return e["path"]
            return entries[0]["path"]
        if p.get("bestTCG"):
            return p["bestTCG"]
        if p.get("bestArt"):
            return p["bestArt"]
    return None


def github_url_for_path(path):
    m = re.match(r"^//([a-z0-9-]+)\.ygoresources\.com(/.+)$", path)
    if not m:
        return None
    repo, filepath = m.group(1), m.group(2)
    return f"https://raw.githubusercontent.com/yugioh-artworks/{repo}/main{filepath}"


def collect_card_names():
    names = {}
    for jf in sorted(ARCHETYPES_DIR.glob("*.json")):
        data = json.loads(jf.read_text())
        for c in data.get("cards", []):
            slug = c.get("slug") or slugify(c["name"])
            names[slug] = c["name"]
        deck = data.get("sampleDecklist") or {}
        for section in ("main", "extra"):
            for item in deck.get(section, []):
                names[slugify(item["name"])] = item["name"]
    return names


def fetch_image(url, dest, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=20) as resp:
                dest.write_bytes(resp.read())
                return True
        except Exception as e:
            if attempt == retries - 1:
                print(f"    FAILED: {url} -> {e}", file=sys.stderr)
                return False
            time.sleep(1)
    return False


def main():
    CACHE_DIR.mkdir(exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    yy_index = load_yaml_yugi_index()
    manifest = load_manifest()
    names = collect_card_names()
    print(f"{len(names)} unique cards referenced across archetype JSON.\n", file=sys.stderr)

    hits, misses, skipped = [], [], []
    for slug, name in sorted(names.items()):
        dest = OUT_DIR / f"{slug}.png"
        if dest.exists():
            skipped.append(name)
            continue

        entry = yy_index.get(normalize(name))
        konami_id = entry.get("konami_id") if entry else None
        manifest_entry = manifest.get(str(konami_id)) if konami_id is not None else None
        path = best_image_path(manifest_entry) if manifest_entry else None
        url = github_url_for_path(path) if path else None

        if not url:
            misses.append(name)
            continue

        if fetch_image(url, dest):
            hits.append(name)
            print(f"  OK  {name}", file=sys.stderr)
        else:
            misses.append(name)

    print("\n===== SUMMARY =====", file=sys.stderr)
    print(f"Already had: {len(skipped)}", file=sys.stderr)
    print(f"Downloaded:  {len(hits)}", file=sys.stderr)
    print(f"No image available yet: {len(misses)}", file=sys.stderr)
    if misses:
        print("\n(these fall back to the styled text tile — re-run this script", file=sys.stderr)
        print(" later as new cards get indexed upstream)", file=sys.stderr)
        for name in misses:
            print(f"  {name}", file=sys.stderr)


if __name__ == "__main__":
    main()
