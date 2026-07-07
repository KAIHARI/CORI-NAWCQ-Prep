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
        <div class="navcard__desc">Archfiend, Artmage, Black Luster Soldier/Chaos, Clown Crew, DoomZ, Invoked, Melffy, Phantom Knights, Possessed, Power Patron, Rank-Up-Magic, S-Force, Trap Hole, Xyz Dragon, Konami Arcade Games.</div>
      </a>

      <hr class="rule" />

      <section class="section">
        <span class="eyebrow">Meta watch</span>
        <p>None of these 5 is actually the #1 deck in the OCG right now — that's <strong>Kewl Tune</strong>, an all-Tuner Synchro archetype from the pre-CORI set Blazing Dominion (253 of 1,084 tracked Top-cut decks in the Apr–Jun 2026 season, more than double the next-best CORI-relevant deck). It's not covered here since it doesn't run new Chaos Origins cards, but it commonly hybridizes with Elfnote — see that page's combo notes — so be ready to see it across the table at NAWCQ.</p>
      </section>
    `;
  },
};
