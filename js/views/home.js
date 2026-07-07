const HomeView = {
  async render(container) {
    const event = await DataStore.getEvent();

    container.innerHTML = `
      <section class="section">
        <span class="eyebrow">${escapeHtml(event.setName)} (${escapeHtml(event.setCode)}) — Released ${escapeHtml(event.setReleaseDate)}</span>
        <h1>${escapeHtml(event.eventName)}</h1>
        <p>${escapeHtml(event.location)} — ${escapeHtml(event.format)}</p>
      </section>

      <section class="section">
        <div id="deadline-countdown"></div>
        <div id="event-countdown"></div>
      </section>

      <section class="section">
        <span class="eyebrow">Find a card</span>
        <div id="home-search"></div>
      </section>

      <hr class="rule" />

      <section class="section">
        <span class="eyebrow">Jump to</span>
        <div class="navgrid">
          <a class="navcard" href="#/archetypes" style="--accent: var(--red)">
            <div class="navcard__title">Archetype Guides</div>
            <div class="navcard__desc">Blitzclique, Light and Darkness Ritual, Elfnote, Angelechy, Sacred Beasts — card images, combo lines, sample decklists.</div>
          </a>
          <a class="navcard" href="#/other-support">
            <div class="navcard__title">Other Chaos Origins Support</div>
            <div class="navcard__desc">Everything else the set touches — Phantom Knights, Invoked, Rank-Up-Magic, and more.</div>
          </a>
        </div>
      </section>
    `;

    Countdown.mount(document.getElementById("deadline-countdown"), {
      label: "Deck List Due",
      targetISO: event.deckListDue,
      subLabel: event.deckListNote,
      urgent: true,
    });

    Countdown.mount(document.getElementById("event-countdown"), {
      label: `${event.eventName} Starts`,
      targetISO: event.eventStart,
      subLabel: `Runs through ${new Date(event.eventEnd).toLocaleDateString(undefined, { month: "long", day: "numeric" })}.`,
    });

    Search.mount(document.getElementById("home-search"));
  },
};
