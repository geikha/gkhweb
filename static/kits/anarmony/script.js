'use strict';

// Sketch files (subway.js, etc.) register here.
// Each sketch is a function: sketches.name = function(p) { ... }
const sketches = {};

// ---- config -----------------------------------------------------------------

const defaultSketch = 'subway';

const keyMap = {
  '1': 'subway',
  '2': 'andenesFractal',
  '3': 'anarmonyTag',
  '4': 'trains',
  '5': 'anarmonyBgTag',
  '6': 'andenesGrit',
};

// ---- engine -----------------------------------------------------------------

function loadSketch(name) {
  const sk = sketches[name];
  if (!sk) { console.warn('[sketches] unknown sketch:', name); return; }

  const p = window.p1;
  if (!p) { console.warn('[sketches] p5 instance not ready'); return; }

  if (p.canvas) HydraFramework.registerP5AsSource('s0', p);

  // reset hydra state from previous sketch
  window.update = null;
  try { render(o0); } catch(e) {}

  p.noLoop();
  p.hideOverlay();
  p.draw = null;

  try { sk(p); } catch (e) { console.warn('[sketches] error in sketch:', name, e); }

  if (p.draw) {
    p.showOverlay({ pointerEvents: false, zIndex: 2 });
    p.loop();
  }

  console.log('[sketches] loaded:', name);
}

window.addEventListener('keydown', function(e) {
  const name = keyMap[e.key];
  if (name) loadSketch(name);
});

window.startDemo = function() { loadSketch(defaultSketch); };
