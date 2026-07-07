// CACHE_VERSION is rewritten to the commit SHA by the deploy workflow, so every
// deploy produces a byte-different service worker: browsers install the new
// cache and the activate handler drops the old one. Without this, cache-first
// clients would be pinned to their first-ever deploy forever.
const CACHE_VERSION = "dev";
const CACHE_NAME = `cori-prep-${CACHE_VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/app.js",
  "./js/router.js",
  "./js/storage.js",
  "./js/data.js",
  "./js/components/card-tile.js",
  "./js/components/countdown.js",
  "./js/components/search.js",
  "./js/views/home.js",
  "./js/views/archetypes-list.js",
  "./js/views/archetype.js",
  "./js/views/banlist.js",
  "./js/views/other-support.js",
  "./js/views/notes.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./data/event.json",
  "./data/banlist.json",
  "./data/other-support.json",
  "./data/archetypes/blitzclique.json",
  "./data/archetypes/rolad.json",
  "./data/archetypes/elfnote.json",
  "./data/archetypes/angelechy.json",
  "./data/archetypes/sacred-beasts.json",
  "./assets/cards/abyss-of-the-sacred-beasts.jpg",
  "./assets/cards/angelechy-bastion.jpg",
  "./assets/cards/angelechy-destrier.jpg",
  "./assets/cards/angelechy-disturbance.jpg",
  "./assets/cards/angelechy-enlisted.jpg",
  "./assets/cards/angelechy-opening-to-e4.jpg",
  "./assets/cards/angelechy-problem.jpg",
  "./assets/cards/angelechy-shatranga.jpg",
  "./assets/cards/black-chaos.jpg",
  "./assets/cards/black-luster-soldier-soldier-of-light-and-darkness.jpg",
  "./assets/cards/blitzclique-alternator.jpg",
  "./assets/cards/blitzclique-breakaway.jpg",
  "./assets/cards/blitzclique-return-stroke.jpg",
  "./assets/cards/blitzclique-steppleader.jpg",
  "./assets/cards/calamity-of-the-sacred-beasts-hamon-lord-of-striking-thunder.jpg",
  "./assets/cards/celtic-mystic.jpg",
  "./assets/cards/chaos-magical-hats.jpg",
  "./assets/cards/chaos-mystic-box.jpg",
  "./assets/cards/crackle-blitzclique.jpg",
  "./assets/cards/elfnote-fortuna.jpg",
  "./assets/cards/elfnote-june-pride.jpg",
  "./assets/cards/elfnote-power-patron.jpg",
  "./assets/cards/elfnote-regina.jpg",
  "./assets/cards/elfnotes-quatrain-of-succession.jpg",
  "./assets/cards/elfnotes-rhapsodia-of-madness.jpg",
  "./assets/cards/emi-blitzclique.jpg",
  "./assets/cards/fallen-paradise-of-the-sacred-beasts.jpg",
  "./assets/cards/grain-blitzclique.jpg",
  "./assets/cards/griffoh.jpg",
  "./assets/cards/hideout-in-the-sky-coulomb.jpg",
  "./assets/cards/inferno-of-the-sacred-beasts-uria-lord-of-searing-flames.jpg",
  "./assets/cards/infinity-of-the-sacred-beasts-raviel-lord-of-phantasms.jpg",
  "./assets/cards/light-and-darkness-ritual.jpg",
  "./assets/cards/magician-of-dark-chaos-black-chaos.jpg",
  "./assets/cards/martyr-of-the-sacred-beasts.jpg",
  "./assets/cards/medius-the-pure.jpg",
  "./assets/cards/mind-shuffle.jpg",
  "./assets/cards/ragged-records-of-rites.jpg",
  "./assets/cards/sacred-beasts-combined-assault.jpg",
  "./assets/cards/sacred-beasts-released.jpg",
  "./assets/cards/sacred-beasts-thunderclap.jpg",
  "./assets/cards/skull-archfiend-of-chaos.jpg",
  "./assets/cards/summoner-of-the-sacred-beasts.jpg",
  "./assets/cards/surge-blitzclique.jpg",
  "./assets/cards/the-chaotic-phantasmal-sacred-beasts.jpg",
  "./assets/cards/whisker-blitzclique.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isData = url.pathname.includes("/data/");
  const isCardArt = url.pathname.includes("/assets/cards/");

  if (isData) {
    // Stale-while-revalidate: serve cache instantly, refresh in background.
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        const networkFetch = fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  if (isCardArt) {
    // Runtime cache-on-first-fetch for any card art added after this deploy.
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const res = await fetch(req);
          if (res.ok) cache.put(req, res.clone());
          return res;
        } catch (err) {
          return cached || Response.error();
        }
      })
    );
    return;
  }

  // App shell: cache-first. Safe because CACHE_NAME rotates every deploy.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
