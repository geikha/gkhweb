/**
 * keyboard.js — livecoding keyboard extension
 * works on any website with vanilla JS + browser APIs
 * no dependencies, no build step, just drop it in
 */

(function (global) {
  "use strict";

  // ─── internal state ────────────────────────────────────────────────────────

  /**
   * shortcut map: normalized key string → { id, listener }
   * e.g. "Shift+A" → { id: "my-action", listener: fn }
   */
  const _shortcuts = new Map();

  /**
   * id map: event id → normalized key string (for replacement/removal by id)
   */
  const _idIndex = new Map();

  // ─── normalization ─────────────────────────────────────────────────────────

  /**
   * normalize a key combo string into a canonical form.
   * accepts things like "ShiftA", "Shift+A", "ctrl+b", "CtrlB", "alt-f", "4", "ArrowUp"
   * returns e.g. "Shift+A", "Ctrl+B", "Alt+F", "4", "ArrowUp"
   */
  function _normalize(combo) {
    if (!combo || typeof combo !== "string") throw new Error("key combo must be a non-empty string");

    // split on explicit separators first
    let parts = combo.split(/[+\-_]/);

    // if no separator was found and it's longer than one char,
    // try to split CamelCase modifiers off the front: "ShiftA" → ["Shift","A"]
    if (parts.length === 1 && combo.length > 1) {
      const modMatch = combo.match(/^(Shift|Ctrl|Control|Alt|Meta|Cmd|Command)(.*)/i);
      if (modMatch) {
        parts = [modMatch[1], modMatch[2]];
      }
    }

    const modOrder = ["Ctrl", "Alt", "Shift", "Meta"];
    const modAliases = {
      control: "Ctrl",
      ctrl: "Ctrl",
      alt: "Alt",
      shift: "Shift",
      meta: "Meta",
      cmd: "Meta",
      command: "Meta",
    };

    const mods = [];
    let key = null;

    for (const part of parts) {
      const lower = part.toLowerCase();
      if (modAliases[lower]) {
        const canonical = modAliases[lower];
        if (!mods.includes(canonical)) mods.push(canonical);
      } else if (part) {
        // preserve special keys (ArrowUp, Enter, Escape, F1…) as-is, uppercase single chars
        key = part.length === 1 ? part.toUpperCase() : part;
      }
    }

    if (!key) throw new Error(`no key found in combo: "${combo}"`);

    // canonical order: Ctrl+Alt+Shift+Meta+Key
    const orderedMods = modOrder.filter((m) => mods.includes(m));
    return orderedMods.length ? `${orderedMods.join("+")}+${key}` : key;
  }

  /**
   * build a normalized key string from a KeyboardEvent
   */
  function _eventKey(e) {
    const mods = [];
    if (e.ctrlKey) mods.push("Ctrl");
    if (e.altKey) mods.push("Alt");
    if (e.shiftKey) mods.push("Shift");
    if (e.metaKey) mods.push("Meta");

    // normalize the key: single printable chars → uppercase, rest → as-is
    let key = e.key;
    if (key.length === 1) key = key.toUpperCase();

    return mods.length ? `${mods.join("+")}+${key}` : key;
  }

  // ─── core handler ──────────────────────────────────────────────────────────

  function _handleKeydown(e) {
    const combo = _eventKey(e);
    const entry = _shortcuts.get(combo);
    if (entry) {
      e.preventDefault();
      try {
        entry.listener(e, combo, entry.id);
      } catch (err) {
        console.error(`[keyboard] error in listener for "${combo}" (id: ${entry.id}):`, err);
      }
    }
  }

  // attach once
  window.addEventListener("keydown", _handleKeydown, true); // capture phase → fires before site handlers

  // ─── registration helpers ──────────────────────────────────────────────────

  /**
   * register a shortcut.
   * @param {string} combo   - key combo string (e.g. "Ctrl+S", "ShiftA", "4")
   * @param {function} listener - (event, combo, id) => void
   * @param {string} [id]    - optional stable id; auto-generated if omitted
   * @returns {string} the id
   */
  function _register(combo, listener, id) {
    if (typeof listener !== "function") throw new Error("listener must be a function");
    const key = _normalize(combo);
    id = id || `__kb_${Math.random().toString(36).slice(2)}`;

    // if this id already owned another key, remove it first
    if (_idIndex.has(id)) {
      _shortcuts.delete(_idIndex.get(id));
    }

    _shortcuts.set(key, { id, listener });
    _idIndex.set(id, key);
    return id;
  }

  // ─── public API ───────────────────────────────────────────────────────────

  const KB = {
    /**
     * register any key combo with full control
     * @param {string} combo    - e.g. "Ctrl+S", "ShiftA", "ArrowUp", "4"
     * @param {function} listener
     * @param {string} [id]
     * @returns {string} id
     */
    on(combo, listener, id) {
      return _register(combo, listener, id);
    },

    /**
     * register a plain (no-modifier) key
     * @param {string} key      - single char or key name, e.g. "a", "ArrowUp", "Enter"
     * @param {function} listener
     * @param {string} [id]
     * @returns {string} id
     */
    onKey(key, listener, id) {
      return _register(key, listener, id);
    },

    /**
     * register Shift + key
     */
    onShiftKey(key, listener, id) {
      return _register(`Shift+${key}`, listener, id);
    },

    /**
     * register Ctrl + key
     */
    onCtrlKey(key, listener, id) {
      return _register(`Ctrl+${key}`, listener, id);
    },

    /**
     * register Alt + key
     */
    onAltKey(key, listener, id) {
      return _register(`Alt+${key}`, listener, id);
    },

    /**
     * register Meta (Cmd on mac) + key
     */
    onMetaKey(key, listener, id) {
      return _register(`Meta+${key}`, listener, id);
    },

    /**
     * register Ctrl+Shift + key
     */
    onCtrlShiftKey(key, listener, id) {
      return _register(`Ctrl+Shift+${key}`, listener, id);
    },

    /**
     * register Alt+Shift + key
     */
    onAltShiftKey(key, listener, id) {
      return _register(`Alt+Shift+${key}`, listener, id);
    },

    /**
     * replace the listener for an existing id (keeps the same key binding)
     * @param {string} id
     * @param {function} newListener
     * @returns {boolean} true if found and replaced
     */
    replace(id, newListener) {
      if (typeof newListener !== "function") throw new Error("listener must be a function");
      if (!_idIndex.has(id)) return false;
      const key = _idIndex.get(id);
      _shortcuts.get(key).listener = newListener;
      return true;
    },

    /**
     * remove a shortcut by id
     * @param {string} id
     * @returns {boolean} true if found and removed
     */
    remove(id) {
      if (!_idIndex.has(id)) return false;
      _shortcuts.delete(_idIndex.get(id));
      _idIndex.delete(id);
      return true;
    },

    /**
     * remove a shortcut by combo string
     * @param {string} combo
     * @returns {boolean}
     */
    removeCombo(combo) {
      const key = _normalize(combo);
      if (!_shortcuts.has(key)) return false;
      const { id } = _shortcuts.get(key);
      _shortcuts.delete(key);
      _idIndex.delete(id);
      return true;
    },

    /**
     * remove all registered shortcuts
     */
    clear() {
      _shortcuts.clear();
      _idIndex.clear();
    },

    /**
     * list all current shortcuts (for debugging / livecoding introspection)
     * @returns {Array<{combo, id}>}
     */
    list() {
      return Array.from(_shortcuts.entries()).map(([combo, { id }]) => ({ combo, id }));
    },

    /**
     * check whether a combo or id is registered
     * @param {string} comboOrId
     * @returns {boolean}
     */
    has(comboOrId) {
      try {
        return _shortcuts.has(_normalize(comboOrId));
      } catch {
        return _idIndex.has(comboOrId);
      }
    },

    /**
     * convenience: bind many shortcuts at once from a map
     * @param {Object} map - { [combo]: { listener, id? } | function }
     * @returns {Object} map of combo → id
     */
    bind(map) {
      const ids = {};
      for (const [combo, value] of Object.entries(map)) {
        if (typeof value === "function") {
          ids[combo] = _register(combo, value);
        } else {
          ids[combo] = _register(combo, value.listener, value.id);
        }
      }
      return ids;
    },

    // expose normalize for debugging
    normalize: _normalize,
  };

  // ─── export ────────────────────────────────────────────────────────────────

  // CommonJS
  if (typeof module !== "undefined" && module.exports) {
    module.exports = KB;
  }

  // global (browser / hydra / livecoding envs)
  global.KB = KB;

  // also expose as `keyboard` alias
  global.keyboard = KB;
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);