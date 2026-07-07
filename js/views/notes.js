const NotesView = {
  render(container) {
    const notes = Storage.get("notes", []);

    container.innerHTML = `
      <section class="section">
        <h1>My Notes</h1>
        <p>Matchup notes, reminders, sideboard plans — saved only on this device, works fully offline.</p>
      </section>

      <hr class="rule" />

      <form class="note-form" id="note-form">
        <input type="text" id="note-title" placeholder="Title (e.g. vs. Sacred Beasts)" required />
        <textarea id="note-body" placeholder="Notes…" required></textarea>
        <button type="submit">Save Note</button>
      </form>

      <div id="note-list"></div>
    `;

    const listEl = container.querySelector("#note-list");

    const renderList = () => {
      const current = Storage.get("notes", []);
      if (current.length === 0) {
        listEl.innerHTML = `<p class="empty-state">No notes yet.</p>`;
        return;
      }
      listEl.innerHTML = current
        .slice()
        .reverse()
        .map(
          (note) => `
            <div class="note-entry" data-id="${note.id}">
              <div class="note-entry__meta">${escapeHtml(note.title)} — ${new Date(note.createdAt).toLocaleString()}</div>
              <div class="note-entry__body">${escapeHtml(note.body)}</div>
              <button type="button" class="secondary" data-delete="${note.id}" style="margin-top:0.5rem">Delete</button>
            </div>
          `
        )
        .join("");
    };

    renderList();

    container.querySelector("#note-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const titleEl = container.querySelector("#note-title");
      const bodyEl = container.querySelector("#note-body");
      const notesNow = Storage.get("notes", []);
      notesNow.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: titleEl.value.trim(),
        body: bodyEl.value.trim(),
        createdAt: new Date().toISOString(),
      });
      Storage.set("notes", notesNow);
      titleEl.value = "";
      bodyEl.value = "";
      renderList();
    });

    listEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-delete]");
      if (!btn) return;
      const id = btn.dataset.delete;
      const remaining = Storage.get("notes", []).filter((n) => n.id !== id);
      Storage.set("notes", remaining);
      renderList();
    });
  },
};
