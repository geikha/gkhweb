/* global Torus jdom css */
/* global Hydra */
/* global CodeMirror */

// Configuration
const RENDER_TRIGGER_DELAY = 200; // ms to wait before rendering when canvas comes into view

// Global state
let globalPendingTimeout = null; // Shared timeout - ensures only the last intersected canvas triggers
let activeCanvas = null; // Track which canvas is currently active
const loadedScripts = new Set(); // Track loaded scripts to avoid re-loading

// Helper functions

function resetHydraState() {
  window.hydraWrap ? hydraWrap.setWrap() : 0;
  hush();
  bpm = 30;
  fps = undefined;
  speed = 1;
  render(o0);
}

function resizeHydra(size) {
  hydraApp.canvas.width = size;
  hydraApp.canvas.height = size;
  hydraApp.hydra.setResolution(size, size);
}

function isElementStillVisible(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const centerY = viewportHeight / 2;
  const elementCenterY = rect.top + rect.height / 2;
  return Math.abs(centerY - elementCenterY) < viewportHeight * 0.5;
}

/**
 * Creates a debounced intersection observer for canvas triggering
 * @param {HTMLElement} element - The element to observe
 * @param {Function} onTrigger - Callback when element should trigger
 */
function createCanvasObserver(element, onTrigger) {
  return new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting === true) {
        // Clear any existing global timeout (from any canvas)
        if (globalPendingTimeout) {
          clearTimeout(globalPendingTimeout);
        }
        
        // Wait before triggering to avoid rapid scrolling issues
        globalPendingTimeout = setTimeout(() => {
          if (!isElementStillVisible(element)) return;
          onTrigger();
        }, RENDER_TRIGGER_DELAY);
      }
    },
    { rootMargin: "-50% 0% -50% 0%", threshold: [0] }
  );
}

function clearGlobalTimeout() {
  if (globalPendingTimeout) {
    clearTimeout(globalPendingTimeout);
    globalPendingTimeout = null;
  }
}

async function evalCodeAsync(code) {
  const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
  const asyncEval = new AsyncFunction(code);
  return await asyncEval();
}

function openInHydraEditor(code) {
  window.open(`https://hydra.ojack.xyz/?code=${btoa(encodeURIComponent(code))}`);
}

window.loadScript = function(url = "") {
  if (loadedScripts.has(url)) {
    console.log(`script already loaded: ${url}`);
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.onload = () => {
      console.log(`loaded script ${url}`);
      loadedScripts.add(url);
      resolve();
    };
    script.onerror = () => {
      console.log(`error loading script ${url}`, "log-error");
      resolve();
    };
    script.src = url;
    document.head.appendChild(script);
  });
};

// Hydra app - shared canvas instance

class HydraApp extends Torus.StyledComponent {
  init() {
    this.canvas = document.createElement("CANVAS");
    this.canvas.width = 360;
    this.canvas.height = 360;
    this.hydra = new Hydra({
      canvas: this.canvas,
      detectAudio: false,
      enableStreamCapture: false,
      width: 360,
      height: 360,
    });
  }
  
  styles() {
    return css`
      position: relative;
    `;
  }
  
  compose() {
    return jdom`<div>${this.canvas}</div>`;
  }
}

const hydraApp = new HydraApp();

// CodeMirror app - code editor component

class CodeMirrorApp extends Torus.StyledComponent {
  init(app) {
    this.app = app;
    this.el = document.createElement("TEXTAREA");
    this.console = "";
    this.consoleClass = "";
    this.lastCode = "";
    this.originalCode = "";

    this.commands = {
      evalAll: () => {
        const code = this.cm.getValue();
        this.flashCode();
        this.evalCode(code);
      },
      toggleEditor: () => {
        this.showEditor = !this.showEditor;
        this.render();
      },
      evalLine: () => {
        const code = this.getLine();
        this.evalCode(code);
      },
      toggleComment: () => {
        this.cm.toggleComment();
      },
      evalBlock: () => {
        const code = this.getCurrentBlock();
        this.evalCode(code);
      }
    };
  }

  // https://github.com/ojack/hydra/blob/3dcbf85c22b9f30c45b29ac63066e4bbb00cf225/hydra-server/app/src/editor.js
  flashCode(l0, l1) {
    if (l0 === undefined) l0 = this.cm.firstLine();
    if (l1 === undefined) l1 = this.cm.lastLine() + 1;
    for (let l = l0; l < l1; l++) {
      const start = { line: l, ch: 0 };
      const end = { line: l + 1, ch: 0 };
      const marker = this.cm.markText(start, end, {
        css: "background-color: rgba(105, 27, 27, 1);"
      });
      setTimeout(() => marker.clear(), 200);
    }
  }

  getLine() {
    const c = this.cm.getCursor();
    const s = this.cm.getLine(c.line);
    this.flashCode(c.line, c.line + 1);
    return s;
  }

  // thanks to graham wakefield + gibber
  getCurrentBlock() {
    const pos = this.cm.getCursor();
    let startline = pos.line;
    let endline = pos.line;
    
    while (startline > 0 && this.cm.getLine(startline) !== "") {
      startline--;
    }
    while (endline < this.cm.lineCount() && this.cm.getLine(endline) !== "") {
      endline++;
    }
    
    const str = this.cm.getRange(
      { line: startline, ch: 0 },
      { line: endline, ch: 0 }
    );
    this.flashCode(startline, endline);
    return str;
  }

  async evalCode(code) {
    try {
      let result = await evalCodeAsync(code);
      if (result === undefined) result = "";
      this.console = result;
      this.consoleClass = "normal";
      this.lastCode = code;
    } catch (e) {
      console.log(e);
      if (code === this.originalCode) {
        this.app.notSupportedInEmbeddedEditor();
      }
      this.console = e + "";
      this.consoleClass = "error";
    }
    this.render();
  }

  setCode(code) {
    this.cm.setValue(code);
    if (this.lastCode.length === 0) {
      this.lastCode = code;
      this.originalCode = code;
    }
  }

  getLastCode() {
    return this.lastCode;
  }

  resetCode() {
    this.cm.setValue(this.originalCode);
    this.commands.evalAll();
  }

  loaded(code) {
    if (this.cm === undefined) {
      this.cm = CodeMirror.fromTextArea(this.el, {
        theme: "geikha",
        value: "a",
        mode: { name: "javascript", globalVars: true },
        lineWrapping: true,
        styleSelectedText: true
      });

      this.cm.addKeyMap({
        "Ctrl-Enter": () => this.commands.evalAll()
      });

      this.setCode(code);
    }
    this.cm.refresh();
  }

  styles() {
    return css`
      position: relative;
      background-color: #333;
      width: 100%;
      height: 360px;
      max-width: 100%;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      
      @media only screen and (max-width: 1000px) {
        position: relative;
        height: 10em;
        max-width: 360px;
      }
      
      .editor-menu {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        align-content: stretch;
      }
      
      .editor-container {
        font-family: monospace;
        position: relative;
        flex: 1;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        z-index: 1;
        width: 100%;
        background-color: black;
        overflow-x: auto;
        overflow-y: hidden;
      }
      
      .CodeMirror {
        white-space: pre !important;
      }
      
      .editor-console {
        position: relative;
        font-family: monospace;
        font-variant-ligatures: no-common-ligatures;
        color: white;
        z-index: 1;
        padding: 0.5rem;
        background-color: #1a1a1a;
        border-top: 1px solid #444;
        min-height: 1.5em;
      }
      
      .editor-console > * {
        display: inline;
      }
      
      .error {
        color: #f22;
      }
    `;
  }

  compose() {
    return jdom`
      <div>
        <div class="editor-menu">
          <button class="editor-button" title="run" onclick=${() => this.commands.evalAll()}>></button>
          <button class="editor-button" title="reset code" onclick=${() => this.resetCode()}>x</button>
          <button class="editor-button" title="open in editor" onclick=${() => openInHydraEditor(this.getLastCode())}>h</button>
        </div>
        <div class="editor-container">
          ${this.el}
        </div>
        <div class="editor-console">
          >> <div class="${this.consoleClass}">${this.console}</div>
        </div>
      </div>
    `;
  }
}

// CodeApp - full editor with canvas (360x360)

class CodeApp extends Torus.StyledComponent {
  init() {
    this.showNotSupportedInEmbeddedEditor = false;
    this.cmApp = new CodeMirrorApp(this);
    this.placeholder = document.createElement("div");
    this.placeholder.className = "placeholder";

    // Click to trigger canvas immediately
    this.placeholder.addEventListener("click", () => this.triggerCanvas());

    // Auto-trigger on scroll intersection
    const observer = createCanvasObserver(this.placeholder, () => this.triggerCanvas());
    observer.observe(this.placeholder);
  }

  triggerCanvas() {
    if (activeCanvas === this) return; // Already active
    activeCanvas = this;
    
    clearGlobalTimeout();
    resizeHydra(360);
    resetHydraState();
    setTimeout(() => this.cmApp.commands.evalAll(), 60);
    this.placeholder.appendChild(hydraApp.node);
  }

  notSupportedInEmbeddedEditor() {
    this.showNotSupportedInEmbeddedEditor = true;
    this.render();
  }

  styles() {
    return css`
      box-sizing: border-box;
      position: relative;
      width: 100%;
      margin: 30px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: stretch;
      
      @media only screen and (max-width: 1000px) {
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
      }
      
      .placeholder {
        position: relative;
        min-width: 360px;
        width: 360px;
        height: 360px;
        cursor: pointer;
        overflow: hidden;
      }
      
      .placeholder canvas {
        max-width: 100% !important;
        max-height: 100% !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: contain;
      }
      
      .not-supported-message {
        background-color: black;
        color: white;
        font-size: 1.25em;
        width: 100%;
        max-width: 360px;
      }
    `;
  }

  compose() {
    let placeholder = this.placeholder;
    if (this.showNotSupportedInEmbeddedEditor) {
      placeholder = jdom`
        <div class="placeholder">
          <div class="not-supported-message">
            Sorry, this example is not supported here. Please press "open in editor" below to try it in the original editor!
          </div>
        </div>
      `;
    }
    return jdom`
      <div>
        ${placeholder}
        ${this.cmApp.node}
      </div>
    `;
  }
}

// PreviewApp - canvas only, no editor (512x512)

class PreviewApp extends Torus.StyledComponent {
  init() {
    this.code = "";
    this.placeholder = document.createElement("div");
    this.placeholder.className = "preview-placeholder";

    // Click to trigger canvas immediately
    this.placeholder.addEventListener("click", () => this.triggerCanvas());

    // Auto-trigger on scroll intersection
    const observer = createCanvasObserver(this.placeholder, () => this.triggerCanvas());
    observer.observe(this.placeholder);
  }

  triggerCanvas() {
    if (activeCanvas === this) return; // Already active
    activeCanvas = this;
    
    clearGlobalTimeout();
    
    // Calculate optimal size based on container width
    const containerWidth = this.placeholder.parentElement?.offsetWidth || 512;
    const size = Math.min(512, containerWidth);
    
    resizeHydra(size);
    resetHydraState();
    setTimeout(() => this.evalCode(), 60);
    this.placeholder.appendChild(hydraApp.node);
  }

  setCode(code) {
    this.code = code;
  }

  async evalCode() {
    try {
      await evalCodeAsync(this.code);
    } catch (e) {
      console.log("Preview eval error:", e);
    }
  }

  styles() {
    return css`
      box-sizing: border-box;
      position: relative;
      width: 100%;
      margin: 30px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .preview-header {
        width: 512px;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0;
      }
      
      .preview-placeholder {
        position: relative;
        min-width: 512px;
        width: 512px;
        height: 512px;
      }
      
      @media only screen and (max-width: 560px) {
        .preview-header {
          width: 100%;
          max-width: 512px;
        }
        .preview-placeholder {
          min-width: 100%;
          width: 100%;
          max-width: 512px;
          height: auto;
          aspect-ratio: 1 / 1;
        }
      }
    `;
  }

  compose() {
    return jdom`
      <div>
        <div class="preview-header">
          <button class="editor-button" title="open in hydra" onclick=${() => openInHydraEditor(this.code)}>
            open in hydra
          </button>
        </div>
        ${this.placeholder}
      </div>
    `;
  }
}

// Global exports
window._hydra = hydraApp.hydra;
window.hydraSynth = hydraApp.hydra;
