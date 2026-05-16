sketches.anarmonyBgTag = function(p) {
  s1.initImage('https://i.imgur.com/oNgaigG.png', { mag: 'linear', min: 'linear' });

  window.x   = 0;
  window.y   = 0;
  window.scl = 0.5;

  blur(o0)
    .wrap()
    .amp([0, 1, 1, 1, 1, 1])
    .amp(.95).luma(.3)
    .scrollY(0, .01)
    .modulate(o1, .01)
    .scale(.75)
    .add(srcRelMask(s1).scale(() => scl).scroll(() => x, () => y))
    .out();

  solid(1, .5, .1)
    .layer(src(o0).r().color(.9, 1.5, 1.5), 1)
    .sub(srcRelMask(s1).scale(() => scl).scroll(() => x, () => y), 2)
    .out(o1);

  render(o1);

  window.fps        = 90;
  window.frameCount = 0;
  window.update = function(dt) {
    if (frameCount % 30 === 0) {
      x = Math.random() - 0.5; x *= 0.8;
      y = Math.random() - 0.5; y *= 0.8;
      scl = Math.random() * 0.5 + 0.3;
    }
    frameCount++;
  };
};
