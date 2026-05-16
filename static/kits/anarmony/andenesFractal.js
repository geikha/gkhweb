sketches.andenesFractal = function(p) {
  s1.initImage('https://i.imgur.com/RwBZM9r.png', { mag: 'linear', min: 'linear' });

  src(o0)
    .color(.9, .42, .12)
    .blend(blur(o0).yiq(1.4, 1, 1))
    .mirrorWrap()
    .sub(voronoi(250, .1).thresh(.8), .3)
    .brightness([-.05, 0, .01].smooth(.1).fast(.05))
    .scroll(0, 0, .03, .01)
    .rotateRel(.4)
    .mirrorX([0, .5].fast(.2))
    .sub(srcRelMask(s1).a().scale(.92), .8)
    .layer(srcRelMask(s1).pm().scale(.9))
    .modulateScale(noise(1.2), .2)
    .out();
};
