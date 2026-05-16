sketches.trains = function(p) {
  s1.initImage('https://i.imgur.com/wyqNiZF.png', { mag: 'linear', min: 'linear' });

  solid(.95, .52, .1)
    .add(noise(1), .2)
    .add(edgeLuma(o0, 20).wrap().scale(.5, 1, 1, .5, 0), .04)
    .add(whitenoise(1, 1), .1)
    .blend(src(o0).kaleid(4).saturate(), .2)
    .scrollY(0, .1)
    .layer(srcRelMask(s1).pm().repeat(1, 1).scale(6).scrollY(-.21).scrollX(0, .3).saturate(.5))
    .out();

  src(o0)
    .scale(.75, 1, -1, .5, 0)
    .modulateScrollX(noise(2), .1)
    .mirrorY()
    .blend(o1, .4)
    .posterize(8)
    .amp(1.3)
    .out(o1);

  render(o1);
};
