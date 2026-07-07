// Thin localStorage wrapper — namespaced, JSON-safe, never throws.
const Storage = {
  _key(key) {
    return `cori-prep:${key}`;
  },
  get(key, fallback) {
    try {
      const raw = window.localStorage.getItem(this._key(key));
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(this._key(key), JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(this._key(key));
    } catch (err) {
      /* no-op */
    }
  },
};
