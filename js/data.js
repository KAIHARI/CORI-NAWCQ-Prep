// Central data loader — fetches each JSON file once and caches the promise.
const ARCHETYPE_IDS = ["blitzclique", "rolad", "elfnote", "angelechy", "sacred-beasts"];

const DataStore = {
  _cache: {},

  _load(path) {
    if (!this._cache[path]) {
      this._cache[path] = fetch(path).then((res) => res.json());
    }
    return this._cache[path];
  },

  getEvent() {
    return this._load("data/event.json");
  },

  getOtherSupport() {
    return this._load("data/other-support.json");
  },

  getArchetype(id) {
    return this._load(`data/archetypes/${id}.json`);
  },

  async getAllArchetypes() {
    return Promise.all(ARCHETYPE_IDS.map((id) => this.getArchetype(id)));
  },
};
