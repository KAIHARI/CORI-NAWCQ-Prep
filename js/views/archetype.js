const ArchetypeView = {
  async render(container, id) {
    let arche;
    try {
      arche = await DataStore.getArchetype(id);
    } catch (err) {
      container.innerHTML = `<p class="empty-state">Couldn't load that archetype.</p>`;
      return;
    }

    const sumQty = (list) => (list || []).reduce((total, item) => total + item.qty, 0);
    const deck = arche.sampleDecklist;

    container.innerHTML = `
      <section class="section">
        <a href="#/archetypes" class="eyebrow">&larr; All Archetypes</a>
        <h1 style="margin-top:0.4rem">${escapeHtml(arche.displayName)}</h1>
        ${arche.shorthand ? `<p class="eyebrow" style="margin-top:0.2rem">${escapeHtml(arche.shorthand)}</p>` : ""}
        <span class="badge" style="border-color:${arche.accentColor}">${escapeHtml(arche.statusLabel)}</span>
        <p>${escapeHtml(arche.summary)}</p>
      </section>

      <hr class="rule" />

      <section class="section">
        <h2>Cards</h2>
        ${(arche.cards || []).map((c) => CardTile.render(c, arche.accentColor)).join("")}
      </section>

      ${
        arche.comboLines && arche.comboLines.length
          ? `
        <hr class="rule" />
        <section class="section">
          <h2>Combo Lines</h2>
          ${arche.comboLines
            .map(
              (combo) => `
              <details class="combo">
                <summary>${escapeHtml(combo.title)}</summary>
                <p>${escapeHtml(combo.body)}</p>
              </details>
            `
            )
            .join("")}
        </section>
      `
          : ""
      }

      ${
        deck
          ? `
        <hr class="rule" />
        <section class="section">
          <h2>Sample Decklist</h2>
          <div class="decklabel">${escapeHtml(deck.label)}</div>

          <h3>Main Deck</h3>
          <div class="deckgrid">
            ${deck.main.map((c) => CardTile.renderDeckCard(c.name, c.qty)).join("")}
          </div>
          <div class="decktotal">${sumQty(deck.main)} Cards</div>

          <h3>Extra Deck</h3>
          <div class="deckgrid">
            ${deck.extra.map((c) => CardTile.renderDeckCard(c.name, c.qty)).join("")}
          </div>
          <div class="decktotal">${sumQty(deck.extra)} Cards</div>
        </section>
      `
          : ""
      }
    `;
  },
};
