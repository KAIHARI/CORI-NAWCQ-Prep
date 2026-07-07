const ArchetypesListView = {
  async render(container) {
    const archetypes = await DataStore.getAllArchetypes();

    container.innerHTML = `
      <section class="section">
        <span class="eyebrow">Chaos Origins</span>
        <h1>Archetype Guides</h1>
        <p>Five archetypes worth knowing for NAWCQ 2026. Tap one for full card list, combo lines, and a sample decklist.</p>
      </section>

      <div class="navgrid">
        ${archetypes
          .map(
            (a) => `
              <a class="navcard" href="#/archetype/${a.id}" style="--accent: ${a.accentColor}">
                <div class="navcard__title">${escapeHtml(a.displayName)}${a.shorthand ? ` <span class="navcard__badge">(${escapeHtml(a.shorthand)})</span>` : ""}</div>
                <div class="navcard__badge">${escapeHtml(a.statusLabel)}</div>
                <div class="navcard__desc">${escapeHtml(a.summary)}</div>
              </a>
            `
          )
          .join("")}
      </div>

      <hr class="rule" />

      <a class="navcard" href="#/other-support">
        <div class="navcard__title">Other Chaos Origins Support</div>
        <div class="navcard__desc">Archfiend, Artmage/DoomZ, Black Luster Soldier/Chaos, Clown Crew, Invoked/Aleister, Melffy, Phantom Knights, Possessed, Power Patron, Rank-Up-Magic/Xyz Dragon, S-Force, Trap Hole, Konami Arcade Games.</div>
      </a>
    `;
  },
};
