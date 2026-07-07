// Bootstraps the app: registers the service worker, then mounts the router.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js", { scope: "./" }).catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Router.init();
});
