sketches.andenesGrit = function(p) {
  s1.initImage('https://i.imgur.com/KecUzI8.png', { mag: 'linear', min: 'linear' });

  blur(o0)
    .mirrorWrap()
    .scrollY(0, .1)
    .modulate(whitenoise(1, 1).bipolar(), .01)
    .layer(srcRelMask(s1).pm().scale(.75).repeat(1, 1).scrollX(0, .1))
    .modulateRotate(noise(.5, .2), .2)
    .out();

  src(o0).color(1, .5, 0)
    .brightness(.1)
    .layer(src(o0).luma(.8).color(.5, .8, 1))
    .sub(whitenoise(1, 1), .02)
    .out(o1);

  sharpenOnY(o1, .4, 3)
    .contrast(1.1)
    .out(o2);

  render(o2);
};
