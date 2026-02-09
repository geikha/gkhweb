// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

// hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
// extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

// lS = loadScript
// await lS(hy+"hydra-outputs.js")
// await lS(hy+"hydra-arithmetics.js")
// await lS(hy+"hydra-fractals.js")
// await lS(hy+"hydra-wrap.js")
// await lS(hy+"hydra-convolutions.js")
// await lS(extrash+"lib-noise.js")
// await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")

if(location.href.includes("hydra.ojack.xyz")){
	_hydra.canvas.style.height = "100%";
  	_hydra.canvas.style.width = "auto";
}

setFunction({
    name: "rotate3D",
      type: "coord",
      inputs: [{ name: "aX", type: "float", default: 0.0 },
             { name: "aY", type: "float", default: 0.0 },
             { name: "aZ", type: "float", default: 0.0 }
            ],
      glsl: 'vec2 st=_st-.5;float z=.0;st.x*=resolution.x/resolution.y;vec3 uv=vec3(st,z);uv.yz=vec2(uv.y*cos(aX)-uv.z*sin(aX),uv.y*sin(aX)+uv.z*cos(aX));uv.xz=vec2(uv.x*cos(aY)+uv.z*sin(aY),uv.x*sin(aY)-uv.z*cos(aY));uv.xy=vec2(uv.x*cos(aZ)-uv.y*sin(aZ),uv.x*sin(aZ)+uv.y*cos(aZ));vec2 stP=uv.xy/(uv.z+1.);vec2 re=vec2(stP.x,stP.y);re.x/=resolution.x/resolution.y;return re+.5;'
})
setFunction({
    name: "layer2",
    type: "combine",
    inputs: [],
    glsl: 'return _c1+(_c0*(1.0-_c1.a));',
});

window.bh1_run = function() {
  setResolution(1080,1350)
  o0.setLinear()
  o1.setLinear()
  hydraWrap.setMirror()
  rotatePlane = (x) => x.rotate3D([-.55,.2].smooth(),[-.1,.4,.8].smooth(),-.3)
  stars = ()=> voronoi(50,.1)
                  .mirrorWrap()
                  .scrollY(.9,-.01)
                  .thresh(.81,.09)
  pxm = 1
  rotatePlane(sharpenOnY(o0,.2,4*pxm).wrap())
      .scrollY(-.012+.0058)
      .rotate(9.99)
      .mirrorX2(.26)
      .amp(1.1)
      .sub(src(o0).colorama(-.2),.34)
      .layer2(stars().r())	
      .blend(src(o0),.4)
      .out()
  rotatePlane(
          blur(o0,pxm).amp(.9)
              .add(sharpenOnY(o0,1,2*pxm).sub(src(o0),2))
              .wrap()
              .modulateScale(shape(64,0,.9).invert(),.9)
      )
      .scale(.6,-1).scroll(-.1,.05)
      .thresh(.4,.38)
      .out(o1)
  solid().add(o1).out(o2)
  render(o2)
}
window.bh1_generate = function(N){
    srand = new Math.seedrandom('black hole [1] - #+'+N);
    rrand = function (min, max) { return srand() * (max - min) + min; }
  	N += N==8 || N==16 || N==17 || N==31 ? 0.5 : 0;
    solid(0,0,0)
        .add(
            src(o1)
                .add(blur5(o2),.4)
                .color(rrand(0.8,1.9),rrand(0.9,1.3),rrand(0.8,1.8))
            )
        .saturate(rrand(0.9,1.4))
        .out(o2)
    fps = 0
    speed = .0012
    _hydra.synth.time = 5.34 * (1+(N*2)) - (rrand(0,0.1))}