const CACHE_NAME = "cori-prep-v2";

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
  "./js/views/other-support.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./data/event.json",
  "./data/other-support.json",
  "./data/archetypes/blitzclique.json",
  "./data/archetypes/rolad.json",
  "./data/archetypes/elfnote.json",
  "./data/archetypes/angelechy.json",
  "./data/archetypes/sacred-beasts.json"
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
    // Runtime cache-on-first-fetch for any real card art dropped in later.
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

  // App shell: cache-first.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
