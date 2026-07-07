// Minimal hash router. No build step, no history-API rewrites needed —
// works unmodified under a GitHub Pages project-page subpath.
const Router = {
  _routes: [
    { pattern: /^\/$/, view: () => HomeView, tab: "/" },
    { pattern: /^\/archetypes$/, view: () => ArchetypesListView, tab: "/archetypes" },
    { pattern: /^\/archetype\/([a-z-]+)$/, view: () => ArchetypeView, tab: "/archetypes" },
    { pattern: /^\/other-support$/, view: () => OtherSupportView, tab: "/archetypes" },
  ],

  init() {
    window.addEventListener("hashchange", () => this._dispatch());
    this._dispatch();
  },

  _currentPath() {
    const hash = window.location.hash || "#/";
    return hash.slice(1) || "/";
  },

  async _dispatch() {
    Countdown.unmountAll();
    const path = this._currentPath();
    const container = document.getElementById("app");

    for (const route of this._routes) {
      const match = path.match(route.pattern);
      if (match) {
        this._setActiveTab(route.tab);
        const view = route.view();
        if (!view) {
          container.innerHTML = `<p class="empty-state">View failed to load.</p>`;
          return;
        }
        try {
          await view.render(container, match[1]);
        } catch (err) {
          console.error(err);
          container.innerHTML = `<p class="empty-state">Something went wrong loading this page.</p>`;
        }
        window.scrollTo(0, 0);
        return;
      }
    }

    container.innerHTML = `<p class="empty-state">Page not found.</p>`;
  },

  _setActiveTab(tabRoute) {
    document.querySelectorAll(".tabbar__item").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.route === tabRoute);
    });
  },
};
