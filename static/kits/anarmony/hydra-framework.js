/*
  hydra-framework.js
  Minimal Hydra + p5 framework (no visuals).
  - Loads Hydra extension scripts from HYPER and EXTRASH
  - Initializes Hydra on a full-window canvas (#hydra-bg)
  - Helpers to register a p5 instance (instance mode) as a Hydra source (s0)
  - Keyboard helpers for Alt+Key combos

  Usage snippet (see hydra-framework-usage.txt for details):
    await HydraFramework.loadExtensions();
    HydraFramework.initHydra();
    createHiddenP5Instance(); // from p5-instance.js
    HydraFramework.registerP5AsSource('s0');
    HydraFramework.setupKeyboard();
*/
(function(window){
  'use strict';

  const HYPER = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/";
  const EXTRASH = "https://metagrowing.org/extra-shaders-for-hydra/";

  const App = {
    canvas: null,
    hydra: null,
    loadedExtensions: [],
    altKeyHandlers: new Map(),
  };

  function loadScript(url, { async = false } = {}){
    return new Promise((resolve, reject) => {
      if(document.querySelector('script[src="' + url + '"]')){ resolve(url); return; }
      const s = document.createElement('script');
      s.src = url;
      s.async = async;
      s.onload = () => resolve(url);
      s.onerror = () => reject(new Error('Failed to load ' + url));
      document.head.appendChild(s);
    });
  }

  async function loadExtensions(list){
    const defaults = [
      EXTRASH + 'lib-noise.js',
      HYPER + 'hydra-convolutions.js',
      HYPER + 'hydra-fractals.js',
      HYPER + 'hydra-src.js',
      HYPER + 'hydra-canvas.js',
      HYPER + 'hydra-arithmetics.js',
      HYPER + 'hydra-outputs.js',
      HYPER + 'hydra-wrap.js',
      HYPER + 'hydra-arrays.js',
      HYPER + 'hydra-blend.js',
      HYPER + 'hydra-mouse.js',
      HYPER + 'hydra-colorspaces.js',
    ];
    const toLoad = list || defaults;
    for(const url of toLoad){
      try{
        await loadScript(url, { async: false });
        App.loadedExtensions.push(url);
        console.log('[HydraFramework] loaded', url);
      }catch(err){
        console.warn('[HydraFramework] failed to load', url, err);
      }
    }
    return App.loadedExtensions;
  }

  function initHydra({ canvasId = 'hydra-bg', detectAudio = false, enableStreamCapture = false } = {}){
    const canvas = document.getElementById(canvasId);
    if(!canvas) throw new Error('[HydraFramework] canvas #' + canvasId + ' not found');
    App.canvas = canvas;

    try{
      window.hydra = new Hydra({ canvas, detectAudio, enableStreamCapture });
      App.hydra = window.hydra;
    }catch(e){
      console.error('[HydraFramework] failed to init Hydra:', e);
      throw e;
    }

    function resize(){
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if(typeof setResolution === 'function'){
        try{ setResolution(canvas.width, canvas.height); }catch(e){ console.warn(e); }
      }
    }

    window.addEventListener('resize', resize);
    resize();

    return App.hydra;
  }

  function registerP5AsSource(sourceName = 's0', p5instance = window.p1){
    if(!p5instance || !p5instance.canvas){ console.warn('[HydraFramework] p5 instance not ready'); return false; }
    const src = window[sourceName];
    if(src && typeof src.init === 'function'){
      src.init({ src: p5instance.canvas });
      console.log('[HydraFramework] registered p5 canvas as', sourceName);
      return true;
    }
    console.warn('[HydraFramework] hydra source', sourceName, 'not found');
    return false;
  }

  function onAltKey(code, handler){ App.altKeyHandlers.set(code, handler); }

  function setupKeyboard(){
    window.addEventListener('keydown', (e) =>{
      if(!e.altKey) return;
      const h = App.altKeyHandlers.get(e.code);
      if(h){ e.preventDefault(); try{ h(e); }catch(err){ console.error(err); } }
    });
  }

  function addRotate3DCoord(){
    if(typeof setFunction !== 'function'){ console.warn('[HydraFramework] setFunction not available'); return; }
    setFunction({
      name: 'rotate3D',
      type: 'coord',
      inputs: [
        { name: 'angleX', type: 'float', default: 0.0 },
        { name: 'angleY', type: 'float', default: 0.0 },
        { name: 'angleZ', type: 'float', default: 0.0 }
      ],
      glsl: `
        vec2 st = _st - 0.5;
        float z = 0.0;
        st.x *= resolution.x / resolution.y;
        vec3 uv = vec3(st, z);
        uv.yz = vec2(
            uv.y*cos(angleX) - uv.z*sin(angleX),
            uv.y*sin(angleX) + uv.z*cos(angleX)
        );
        uv.xz = vec2(
            uv.x*cos(angleY) + uv.z*sin(angleY),
            uv.x*sin(angleY) - uv.z*cos(angleY)
        );
        uv.xy = vec2(
            uv.x*cos(angleZ) - uv.y*sin(angleZ),
            uv.x*sin(angleZ) + uv.y*cos(angleZ)
        );
        vec2 stPersp = uv.xy / (uv.z + 1.0);
        vec2 result = vec2(stPersp.x, stPersp.y);
        result.x /= resolution.x / resolution.y;
        return result + 0.5;
      `
    });
  }

  function rand(min, max){ return Math.random() * (max - min) + min; }
  function intrand(min, max){ return Math.floor(Math.random() * (max - min)) + min; }

  window.HydraFramework = {
    HYPER,
    EXTRASH,
    App,
    loadScript,
    loadExtensions,
    initHydra,
    registerP5AsSource,
    onAltKey,
    setupKeyboard,
    addRotate3DCoord,
    rand,
    intrand,
  };

})(window);
