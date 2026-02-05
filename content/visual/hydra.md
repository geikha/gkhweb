---
title: Hydra
weight: 13
description: A gallery running some of my best Hydra visual pieces. All code is available.
---

# Hydra Patches

{{< center >}}
[{{< badge style="danger" title="License" value="CC BY-NC-SA 4.0" >}}](https://creativecommons.org/licenses/by-nc-sa/4.0/)
{{< /center >}}

## interespacios gamma

{{< hydra-preview >}}
// interespacios gamma
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

await loadScript(hyper+"hydra-convolutions.js")
await loadScript(hyper+"hydra-outputs.js")
await loadScript(hyper+"hydra-colorspaces.js")
await loadScript(extrash+"lib-noise.js")

o0.setLinear()
o1.setLinear()

sharpenOnY(o1, .45, [1,2])
	.scale(1.024)
	.color(1.16, 1, 1)
	.contrast(1.25)
	.saturate(1.2)
  	.yiq(1, 1, -1.85)
	.hsv.hOffsetFrom(osc(4,.12).rotate(0, .1), -.4)
	.hue(-.3)
	.add(colornoise(1,1).sub(solid(.595).r()).color(2.2,2,2,2), .32)
	.blend(o0, .3)
	.out(o0)
blur(o0)
	.scale(.995)
	.out(o1)
solid()
  	.add(src(o0).luma(.11,.05))
	.hue(-.42)
	.out(o3)
render(o3)
{{< /hydra-preview >}}

{{< imagefoot >}}
***interespacios gamma.*** Geikha. (2025)<br>
Feedback stimulated with chromatic noise.<br>
Takes advantage of a period-doubling bifurcation thanks to Hydra's renderpass desync.
{{< /imagefoot >}}

---

## nature's inside-outs

{{< hydra-preview >}}
// nature's inside-outs
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

await loadScript(hyper+"hydra-colorspaces.js")
await loadScript(hyper+"hydra-arithmetics.js")
await loadScript(hyper+"hydra-outputs.js")
await loadScript(hyper+"hydra-fractals.js")
await loadScript(hyper+"hydra-convolutions.js")
await loadScript(extrash+"lib-noise.js")

oS.setLinear()

isEmbedded = Boolean(window.Torus)

if(isEmbedded) setResolution(720,720)

zw = isEmbedded ? 1.4 : 1
blur(o1,1).hue(.01)
	.yuv(1.02,.83,.94)
	.modulateScale(src(o0).bipolar(),-.015)
	.scale(1.02,1,1.02)
	.modulateRotate(osc(8).bipolar(),.01)
	.mirrorX()
	//.scrollY(.004)
	.blend(o0,.3)
	.add(whitenoise(1,1).bipolar(),.004)
	.blend(o0,0).blend(o0,0)
  	.out()
sharpen(o0,.16,3)
	.colorama(.025)
	.saturate(1.01)
	.yiq(1,1.3,-.3)
	.hue(-.017)
	.blend(o0,.37)
	//.contrast(1.01)
	.out(o1)
sharpen(o0,.2,2)
    .scale(1,zw)
	.hsv.hMult(.6).hsv.hOffset(.56)
	.out(o2)
render(o2)
{{< /hydra-preview >}}

{{< imagefoot >}}
***nature's inside-outs.*** Geikha. (2023)<br>
Feedback stimulated with chromatic noise.<br>
Takes advantage of period-doubling bifurcation thanks to Hydra's renderpass desync.
{{< /imagefoot >}}


---

## corrupted screensaver

{{< hydra-preview >}}
// corrupted screensaver
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// licensed with CC BY-NC-SA 4.0

window.oS ? o0.setNearest() : 0 // hydra-output's check

voronoi(300,0.2)
  	.modulateScale(osc(8).rotate(Math.sin(time)),.5)
  	.thresh(.81)
	.modulateRotate(osc(7),.4)
	.thresh(.7)
  	.diff(src(o0).scale(1.8))
	.modulateScale(osc(2).modulateRotate(o0,.74))
	.diff(src(o0).rotate([-.012,.01,-.002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.02,-.17].smooth().fast(.5))
	.out()
render(o0)
{{< /hydra-preview >}}

{{< imagefoot >}}
***corrupter screensaver.*** Geikha. (2019)<br>
Voronoi dots inside a cascaded negative feedback system using absolute difference.<br>
Nearest-neighbor coordinate system.
{{< /imagefoot >}}

---

## black hole [1]

{{< hydra-preview width="1080" height="1350" >}}
// black hole [1]
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// originally comissioned for MDN @markdenardo
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

await loadScript(hyper+"hydra-outputs.js")
await loadScript(hyper+"hydra-arithmetics.js")
await loadScript(hyper+"hydra-fractals.js")
await loadScript(hyper+"hydra-wrap.js")
await loadScript(hyper+"hydra-convolutions.js")
await loadScript(extrash+"lib-noise.js")

setFunction({
    name: "rotate3D",
      type: "coord",
      inputs: [{ name: "angleX", type: "float", default: 0.0 },
             { name: "angleY", type: "float", default: 0.0 },
             { name: "angleZ", type: "float", default: 0.0 }
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
})
setFunction({
    name: "layer2",
    type: "combine",
    inputs: [{type: "float",name: "amount",default: 1}],
    glsl: 'return _c1+(_c0*(1.0-_c1.a));',
});

setResolution(1080,1350)

o0.setLinear()
hydraWrap.setMirror()

rotatePlane = (x) => x.rotate3D([-.55,.2].smooth(),[-.1,.4,.8].smooth(),-.3)
stars = ()=> voronoi(50,.1)
  				.mirrorWrap()
  				.scrollY(.9,-.01)
  				.thresh(.81,.09)
  				.amp(()=>(time/speed+10)%30>1?1:0)
rotatePlane(sharpenOnY(o0,.2,4).wrap())
	.scrollY(-.012+.0058)
  	.rotate(9.99)
  	.mirrorX2(.26)
	.amp(1.1)
	.sub(src(o0).colorama(-.2),.34)
	.layer2(stars().r())	
	.blend(o0,.4)
	.out()
rotatePlane(
  		blur(o0,1).amp(.9)
  			.add(sharpenOnY(o0,1,2).sub(src(o0),2))
  			.wrap()
    		.modulateScale(shape(64,0,.9).invert(),.9)
	)
  	.scale(.6,-1).scroll(-.1,.05)
	.thresh(.48,.4)
	.out(o1)
solid(0,0,0).add(src(o1)).out(o2)
render(o2)

fps = 60
speed = .0025
_hydra.synth.time = 5.34
{{< /hydra-preview >}}

{{< imagefoot >}}
***black hole [1].*** Geikha. (2023)<br>
Discontinuous negative feedback stimulated by voronoi dots.<br>
Emergent symmetry from rotations and mirrors.<br>
3D-like rotations in both feedback and final output.<br>
*originally comissioned for MDN*
{{< /imagefoot >}}

---

## black hole [2]

{{< hydra-preview width="1080" height="1350" >}}
// black hole [2]
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// originally comissioned for MDN @markdenardo
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

await loadScript(hyper+"hydra-outputs.js")
await loadScript(hyper+"hydra-arithmetics.js")
await loadScript(hyper+"hydra-fractals.js")
await loadScript(hyper+"hydra-wrap.js")
await loadScript(hyper+"hydra-convolutions.js")
await loadScript(extrash+"lib-noise.js")

setFunction({
    name: "rotate3D",
      type: "coord",
      inputs: [{ name: "angleX", type: "float", default: 0.0 },
             { name: "angleY", type: "float", default: 0.0 },
             { name: "angleZ", type: "float", default: 0.0 }
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
})
setFunction({
    name: "layer2",
    type: "combine",
    inputs: [{type: "float",name: "amount",default: 1}],
    glsl: 'return _c1+(_c0*(1.0-_c1.a));',
});

setResolution(1080,1350)

o0.setLinear()
hydraWrap.setMirror()

rotatePlane = (x) => x.rotate3D([-.55,.2].smooth(),[-.1,.4,.8].smooth(),-.3)
stars = ()=> voronoi(50,.1)
  				.mirrorWrap()
  				.scrollY(.9,-.01)
  				.thresh(.81,.09)
  				.amp(()=>(time/speed+10)%30>1?1:0)
rstars = () => rotatePlane(stars())
rotatePlane(sharpenOnY(o0, .2, 4).wrap())
	.scrollY(-.012 + .0058)
	.rotate(9.99)
	.amp(1.1)
	.sub(src(o0).colorama(-.4), .2)
	.layer2(stars().r())
	.blend(o0, .35)
	.out()
rotatePlane(
		blur(o0, 2)
		.amp(.9)
		.add(sharpenOnY(o0, 1, 1).sub(src(o0), 2)
             .modulateScale(o0,-.2), 1)
		.modulateScale(shape(64, 0, 3)
			.invert(1)
			.bipolar()
			.add(1), 1.3)
	)
	.scale(.6, -1)
	.scroll(-.1, .05)
	.out(o1)
solid(0, 0, 0).add(o1).out(o2)
render(o2)
fps = 50
speed = .01
_hydra.synth.time = 3.9
{{< /hydra-preview >}}

{{< imagefoot >}}
***black hole [2].*** Geikha. (2023)<br>
Discontinuous negative feedback stimulated by voronoi dots.<br>
Emergent symmetry from rotations.<br>
3D-like rotations in both feedback and final output.<br>
*originally comissioned for MDN*
{{< /imagefoot >}}

---

## latent clouds

{{< hydra-preview >}}
// latent clouds
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

await loadScript(hyper+"hydra-convolutions.js")
await loadScript(hyper+"hydra-src.js")
await loadScript(hyper+"hydra-arithmetics.js")
await loadScript(hyper+"hydra-outputs.js")
await loadScript(hyper+"hydra-fractals.js")
await loadScript(hyper+"hydra-colorspaces.js")
await loadScript(extrash+"lib-noise.js")

o0.setLinear()
o1.setLinear()

sharpenOnY(o0,.1,1).mirrorWrap().invert(1)
    .contrast(1.2)
    .modulate(src(o0).bipolar(),-.01)
    .yuv(1,1,-1).hue(-.8)
    .scale(5/3)
    .rotateRel(Math.PI/2)
    .add(colornoise(1,1).bipolar(),.075)
    .blend(o0,.7)
  .out(o0)
sharpen(o0,.1,2)
    .hsv.hMult(0)
	.hsv.hOffsetFrom(src(o0).hsv.v(),-1.1)
	.saturate(-1.4).hue(.6)
	.blend(blur(o1).scale(1.005),.4)
  .out(o1)
render(o1)  
{{< /hydra-preview >}}

{{< imagefoot >}}
***latent clouds.*** Geikha. (2023)<br>
Feedback stimulated with chromatic noise.<br>
Emergent symmetry from 90° rotations.
{{< /imagefoot >}}

---

## polar feedback

{{< hydra-preview >}}
// polar feedback
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

await loadScript(hyper+"hydra-outputs.js")
await loadScript(hyper+"hydra-arithmetics.js")
await loadScript(hyper+"hydra-colorspaces.js")
await loadScript(hyper+"hydra-convolutions.js")
await loadScript(extrash+"lib-noise.js")

setResolution(512,512)
o0.setLinear()

setFunction({
    name: 'yuv709',
    type: 'color',
    inputs: [
      {name: 'y', type: 'float', default: 1},
      {name: 'u', type: 'float', default: 1},
      {name: 'v', type: 'float', default: 1}
            ],
    glsl: `
          vec3 yuv = mat3(
              0.299,   0.587,   0.114,
             -0.14713, -0.28886, 0.436,
              0.615,  -0.51499, -0.10001
          ) * _c0.rgb;
          yuv.x *= y; yuv.y *= u; yuv.z *= v;
          vec3 rgb = mat3(
              1, 0,       1.13983,
              1, -0.39465, -0.58060,
              1, 2.03211,  0
          ) * yuv;
          return vec4(rgb, _c0.a);`
})

window.gS = osc().constructor.prototype
gS.tvglass = function(amp=.2){
  	return this.modulateScale(shape(64,0,2.25).amp(.6),amp)
}
sharpen(o0,.31,1).luma(.16,.01)
	.yuv709(.75,1.1,1.079).invert(1).contrast(.96).amp(.94)
	.rotate(Math.PI/2)
	.scale(1.005)
	.blend(o0,.49)
  	.modulate(src(o0),-.001)
	.modulateHue(o0,-1.2)
	.tvglass(.02)
	.add(colornoise(1,1).bipolar().color(1,1,1.2),.034)
	.rotate(-.005)
	.out()

{{< /hydra-preview >}}

{{< imagefoot >}}
***polar feedback.*** Geikha. (2022)<br>
Feedback stimulated by chromatic noise.<br>
Emergent symmetry from 90° rotations.
Colors from YUV 709 manipulation.
{{< /imagefoot >}}

---

## hand-drawn galaxies

{{< hydra-preview >}}
// hand-drawn galaxies
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"

await loadScript(hyper+"hydra-mouse.js")

window.oS ? o0.setNearest() : 0 // hydra-output's check

shape(3, 0.1, 0.3)
	.repeat(1,1).scrollY(1, 0.1)
	.modulateKaleid(noise(2.2)
		.rotate(1, 0.1)
		.pixelate(128, 128)
		.thresh(0.2)
		.contrast(1.5), () => Math.sin(time / 6) * 0.5)
	.diff(src(o0)
		.scale([0.96, 0.97, 0.99].fast(0.5), 1, () => 1 + mouse.posy * 0.4)
		.brightness(0.012)
		.rotate(() => mouse.posx*Math.PI/4))
	.out()
render(o0)
{{< /hydra-preview >}}

{{< center >}}
{{< badge style="info" title="Interactive" value="Mouse" >}}
{{< /center >}}

{{< imagefoot >}}
***hand-drawn galaxies.*** Geikha. (2019)<br>
Kaleidoscopic rotating shapes with a negative feedback loop.
Nearest-neighbor coordinate system.
{{< /imagefoot >}}

---

## fractal explorer [3 branches]

{{< hydra-preview >}}
// a fractal explorer using rotations
// by GEIKHA
// instagram.com/geikha_ | geikha.xyz
// licensed with CC BY-NC-SA 4.0

hyper = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

await loadScript(hyper+"hydra-colorspaces.js")
await loadScript(hyper+"hydra-arithmetics.js")
await loadScript(hyper+"hydra-outputs.js")
await loadScript(hyper+"hydra-fractals.js")
await loadScript(hyper+"hydra-mouse.js")
await loadScript(hyper+"hydra-convolutions.js")
await loadScript(extrash+"lib-noise.js")

setResolution(512,512)

const BRANCHES = 3
const MASK = shape(99,.8,.1)
//
input = ()=> src(o0).mask(MASK).rgb.aKey(.22,.1)
dist = ()=> mouse.posy
scale = ()=> 0.5-(mouse.posx/2)
feedback = ()=> input().scale(scale,1,1,.5,0).scrollY(dist)
feedbacks = (n=3)=> {
  	tex = solid(0,0,0,0)
	for(a=0; a <= Math.PI*2; a+=Math.PI*2/n)
      tex.layer(feedback().rotate(a))
  	return tex;
}
//
feedbacks(BRANCHES).mirrorY().rotate(0,.1).modulateScale(noise(2),-.12)
  	.brightness(-.01)
	.luma(.03,.1)
	.add(colornoise(1,.1),.1)
	.hue(.03).color(.92,.99,1.01)//.mult(gradient(),.1)
  	.saturate(1.1)
	.blend(o0,.3)
	.out()
render(o0)

speed = 1
{{< /hydra-preview >}}

{{< center >}}
{{< badge style="info" title="Interactive" value="Mouse" >}}
{{< /center >}}

{{< imagefoot >}}
***fractal explorer [3 branches].*** Geikha. (2023)<br>
3 rotating feedback circles stimulated by chromatic noise.<br>
Mouse Y position controls distance from the center.<br>
Mouse X position controls scaling.<br>
{{< /imagefoot >}}

---