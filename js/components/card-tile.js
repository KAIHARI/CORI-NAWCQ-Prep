// Generic renderer for a single card object, shared by every archetype view.
// Prefers a real image at assets/cards/<slug>.png if one has been fetched;
// falls back silently to the styled text tile when no image exists yet.
const CardTile = {
  slugify(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },

  render(card, accentColor) {
    const metaBits = [];
    if (card.cardType === "monster") {
      metaBits.push(card.monsterType || "Monster");
      if (card.attribute) metaBits.push(card.attribute);
      if (card.race) metaBits.push(card.race);
    } else if (card.cardType === "spell") {
      metaBits.push(`Spell${card.spellTrapSubtype ? " — " + card.spellTrapSubtype : ""}`);
    } else if (card.cardType === "trap") {
      metaBits.push(`Trap${card.spellTrapSubtype ? " — " + card.spellTrapSubtype : ""}`);
    }

    const statsBits = [];
    if (card.level !== undefined && card.level !== null) {
      const label = card.monsterType && card.monsterType.includes("Synchro") ? "LV" : "LV";
      statsBits.push(`${label} ${card.level}`);
    }
    if (card.atk !== undefined && card.atk !== null) statsBits.push(`ATK <span>${card.atk}</span>`);
    if (card.def !== undefined && card.def !== null) statsBits.push(`DEF <span>${card.def}</span>`);

    const imgSrc = card.slug ? `assets/cards/${card.slug}.png` : null;

    return `
      <article class="cardtile" style="--accent:${accentColor || "var(--ink)"}">
        <div class="cardtile__head">
          <span class="cardtile__name">${escapeHtml(card.name)}</span>
          <span class="cardtile__meta">${escapeHtml(metaBits.join(" · "))}</span>
        </div>
        ${imgSrc ? `<img class="cardtile__art" src="${imgSrc}" alt="${escapeHtml(card.name)}" loading="lazy" onerror="this.remove()" />` : ""}
        ${statsBits.length ? `<div class="cardtile__stats">${statsBits.join("&nbsp;&nbsp;&nbsp;")}</div>` : ""}
        <p class="cardtile__effect">${escapeHtml(card.effectText || "")}</p>
      </article>
    `;
  },

  // Compact image tile for decklist grids — falls back to a text-only chip
  // (name + qty) when no image has been fetched for this card yet.
  renderDeckCard(name, qty) {
    const slug = this.slugify(name);
    const imgSrc = `assets/cards/${slug}.png`;
    return `
      <figure class="deckcard" data-name="${escapeHtml(name)}">
        <div class="deckcard__frame">
          <img class="deckcard__img" src="${imgSrc}" alt="${escapeHtml(name)}" loading="lazy" onerror="this.closest('.deckcard').classList.add('deckcard--noart')" />
          <span class="deckcard__fallback">${escapeHtml(name)}</span>
          <span class="deckcard__qty">&times;${qty}</span>
        </div>
        <figcaption class="deckcard__name">${escapeHtml(name)}</figcaption>
      </figure>
    `;
  },
};

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
