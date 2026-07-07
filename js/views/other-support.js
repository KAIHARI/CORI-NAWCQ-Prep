const OtherSupportView = {
  async render(container) {
    const items = await DataStore.getOtherSupport();

    container.innerHTML = `
      <section class="section">
        <a href="#/archetypes" class="eyebrow">&larr; All Archetypes</a>
        <h1 style="margin-top:0.4rem">Other Chaos Origins Support</h1>
        <p>Lighter reference — archetypes that got new cards in Chaos Origins without being a primary focus of this guide.</p>
      </section>

      <hr class="rule" />

      ${items
        .map(
          (item) => `
          <div class="list-item">
            <strong>${escapeHtml(item.archetype)}</strong> — ${escapeHtml(item.note)}
          </div>
        `
        )
        .join("")}
    `;
  },
};
