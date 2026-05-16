sketches.anarmonyTag = function(p) {
  s1.initImage('https://i.imgur.com/oNgaigG.png', { mag: 'linear', min: 'linear' });

  // initialize globals so the arrow functions below don't get undefined on frame 0
  window.x   = 0;
  window.y   = 0;
  window.scl = 0.5;

  src(o0)
    .amp(.95)
    .modulateScrollY(blur(o0), -.005)
    .add(srcRelMask(s1).scale(() => scl).scroll(() => x, () => y))
    .out();

  blur(o0)
    .invert()
    .mod(.95).amp(1.5)
    .invert()
    .sub(noise(200, 2).thresh(.8), 1)
    .layer(srcRelMask(s1).r().color(1, .5, .2).scale(() => scl).scroll(() => x, () => y))
    .out(o1);

  render(o1);

  window.fps        = 70;
  window.frameCount = 0;
  window.update = function(dt) {
    if (frameCount % 40 === 0) {
      x   = Math.random() - 0.5;
      y   = Math.random() - 0.5;
      scl = Math.random() * 0.5 + 0.3;
    }
    frameCount++;
  };
};
