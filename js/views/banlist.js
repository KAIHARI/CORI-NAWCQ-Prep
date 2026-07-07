const BanlistView = {
  async render(container) {
    const bl = await DataStore.getBanlist();

    const group = (title, items) =>
      items && items.length
        ? `
        <div class="banlist-group">
          <h3>${escapeHtml(title)}</h3>
          ${items.map((item) => `<div class="banlist-item">${escapeHtml(item)}</div>`).join("")}
        </div>
      `
        : "";

    container.innerHTML = `
      <section class="section">
        <span class="eyebrow">Effective ${escapeHtml(bl.effectiveDate)}</span>
        <h1>Banlist</h1>
        <p>${escapeHtml(bl.summaryNote)}</p>
      </section>

      <hr class="rule" />

      ${group("Newly Forbidden", bl.forbidden)}
      ${group("Newly Limited", bl.limited)}
      ${group("Newly Semi-Limited", bl.semiLimited)}

      <hr class="rule" />
      <p class="empty-state">${escapeHtml(bl.otherFormatsNote)}</p>
    `;
  },
};
