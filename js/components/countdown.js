// Live-ticking countdown. Renders into a container and updates every second.
const Countdown = {
  _timers: new Map(),

  mount(container, { label, targetISO, subLabel, urgent }) {
    const target = new Date(targetISO).getTime();
    container.classList.add("countdown");
    if (urgent) container.classList.add("countdown--urgent");

    container.innerHTML = `
      <span class="countdown__label">${escapeHtml(label)}</span>
      <div class="countdown__digits">
        <div class="countdown__unit"><div class="countdown__value" data-unit="d">--</div><div class="countdown__unitlabel">Days</div></div>
        <div class="countdown__unit"><div class="countdown__value" data-unit="h">--</div><div class="countdown__unitlabel">Hrs</div></div>
        <div class="countdown__unit"><div class="countdown__value" data-unit="m">--</div><div class="countdown__unitlabel">Min</div></div>
        <div class="countdown__unit"><div class="countdown__value" data-unit="s">--</div><div class="countdown__unitlabel">Sec</div></div>
      </div>
      ${subLabel ? `<div class="countdown__sub">${escapeHtml(subLabel)}</div>` : ""}
    `;

    const dEl = container.querySelector('[data-unit="d"]');
    const hEl = container.querySelector('[data-unit="h"]');
    const mEl = container.querySelector('[data-unit="m"]');
    const sEl = container.querySelector('[data-unit="s"]');

    const tick = () => {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000);
      diff -= d * 86400000;
      const h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      diff -= m * 60000;
      const s = Math.floor(diff / 1000);

      dEl.textContent = String(d).padStart(2, "0");
      hEl.textContent = String(h).padStart(2, "0");
      mEl.textContent = String(m).padStart(2, "0");
      sEl.textContent = String(s).padStart(2, "0");

      if (target - now <= 0) {
        container.querySelector(".countdown__sub") &&
          (container.querySelector(".countdown__sub").textContent = "This has passed.");
        this.unmount(container);
      }
    };

    tick();
    const intervalId = setInterval(tick, 1000);
    this._timers.set(container, intervalId);
  },

  unmount(container) {
    const id = this._timers.get(container);
    if (id) {
      clearInterval(id);
      this._timers.delete(container);
    }
  },

  unmountAll() {
    this._timers.forEach((id) => clearInterval(id));
    this._timers.clear();
  },
};
