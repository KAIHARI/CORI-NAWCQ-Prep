// Global search/filter over an in-memory index of every card across every
// archetype. Fully client-side, works offline.
const Search = {
  _index: null,

  async buildIndex() {
    if (this._index) return this._index;
    const archetypes = await DataStore.getAllArchetypes();
    this._index = [];
    archetypes.forEach((arche) => {
      (arche.cards || []).forEach((card) => {
        this._index.push({ card, archetypeId: arche.id, archetypeName: arche.displayName, accentColor: arche.accentColor });
      });
    });
    return this._index;
  },

  async query(term) {
    const index = await this.buildIndex();
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return index.filter(
      (entry) =>
        entry.card.name.toLowerCase().includes(q) ||
        (entry.card.effectText || "").toLowerCase().includes(q) ||
        entry.archetypeName.toLowerCase().includes(q)
    );
  },

  mount(container) {
    container.classList.add("searchbox");
    container.innerHTML = `
      <input type="text" placeholder="Search every card across all archetypes…" data-search-input />
      <div data-search-results></div>
    `;
    const input = container.querySelector("[data-search-input]");
    const results = container.querySelector("[data-search-results]");

    input.addEventListener("input", async () => {
      const matches = await this.query(input.value);
      if (!input.value.trim()) {
        results.innerHTML = "";
        return;
      }
      if (matches.length === 0) {
        results.innerHTML = `<p class="empty-state">No cards match “${escapeHtml(input.value)}.”</p>`;
        return;
      }
      const shown = matches.slice(0, 30);
      results.innerHTML = shown
        .map(
          (m) => `
            <a class="searchresult" href="#/archetype/${m.archetypeId}">
              <div class="searchresult__arche">${escapeHtml(m.archetypeName)}</div>
              <div>${escapeHtml(m.card.name)}</div>
            </a>
          `
        )
        .join("") +
        (matches.length > shown.length
          ? `<p class="empty-state">Showing ${shown.length} of ${matches.length} matches — keep typing to narrow down.</p>`
          : "");
    });
  },
};
