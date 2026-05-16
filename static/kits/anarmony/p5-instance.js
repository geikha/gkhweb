/*
  p5-instance.js
  Helper to create a p5 instance (instance mode) and keep its canvas hidden.
  Exposes createHiddenP5Instance() and sets window.p1 to the instance.

  Example:
    createHiddenP5Instance();
    // then: HydraFramework.registerP5AsSource('s0');
*/
(function(window){
  'use strict';

  function createHiddenP5Instance({ containerId = 'p5-container', hideCanvas = true, noLoop = true } = {}){
    if(typeof p5 === 'undefined'){
      console.warn('[p5-bridge] p5 library not found');
      return null;
    }

    let container = document.getElementById(containerId);
    if(!container){
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);
    }

    const sketch = function(p){
      p.setup = function(){
        p.createCanvas(window.innerWidth, window.innerHeight);
        if(hideCanvas && p.canvas){
          p.canvas.style.position = 'absolute';
          p.canvas.style.left = '-9999px';
          p.canvas.style.width = '1px';
          p.canvas.style.height = '1px';
        }
        if(noLoop) p.noLoop();
      };
      p.draw = function(){};
      p.windowResized = function(){ p.resizeCanvas(window.innerWidth, window.innerHeight); };
    };

    const inst = new p5(sketch, container);
    // helpers attached to the instance for overlay handling and resizing
    inst.updateSize = function(){ try{ inst.resizeCanvas(window.innerWidth, window.innerHeight); }catch(e){} if(inst.canvas){ inst.canvas.style.width = '100%'; inst.canvas.style.height = '100%'; } };
    inst.showOverlay = function({ pointerEvents = false, zIndex = 1 } = {}){
      if(!inst.canvas) return;
      inst.canvas.style.position = 'fixed';
      inst.canvas.style.left = '0px';
      inst.canvas.style.top = '0px';
      inst.canvas.style.width = '100%';
      inst.canvas.style.height = '100%';
      inst.canvas.style.zIndex = String(zIndex);
      inst.canvas.style.pointerEvents = pointerEvents ? 'auto' : 'none';
      inst.canvas.style.background = 'transparent';
      inst.updateSize();
      window.addEventListener('resize', inst.updateSize);
    };
    inst.hideOverlay = function(){
      if(!inst.canvas) return;
      inst.canvas.style.position = 'absolute';
      inst.canvas.style.left = '-9999px';
      inst.canvas.style.width = '1px';
      inst.canvas.style.height = '1px';
      window.removeEventListener('resize', inst.updateSize);
    };
    window.p1 = inst;
    return inst;
  }

  window.createHiddenP5Instance = createHiddenP5Instance;

})(window);
