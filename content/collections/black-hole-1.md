---
title: "black hole [1] - prints"
---

# black hole [1] - prints

{{% hint info %}}
**Nota**<br>
Estas visuales fueron originalmente creadas para PC, puede que se vean algo distintas desde un dispositivo móbil.
{{% /hint %}}

## #0

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

if(location.href.includes("hydra.ojack.xyz")){
	_hydra.canvas.style.height = "100%";
  	_hydra.canvas.style.width = "auto";
}

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
Feedback negativo y discontinuo estimulado por puntos voronoi.<br>
Simetría emergente por rotaciones y espejizaciones.<br>
Rotación estilo 3D sobre el feedback.<br>
{{< /imagefoot >}}

## #1

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(1)
{{< /hydra-preview >}}

## #2

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(2)
{{< /hydra-preview >}}

## #3

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(3)
{{< /hydra-preview >}}

## #4

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(4)
{{< /hydra-preview >}}

## #5

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(5)
{{< /hydra-preview >}}

## #6

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(6)
{{< /hydra-preview >}}

## #7

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(7)
{{< /hydra-preview >}}

## #8

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(8)
{{< /hydra-preview >}}

## #9

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(9)
{{< /hydra-preview >}}

## #10

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(10)
{{< /hydra-preview >}}

## #11

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(11)
{{< /hydra-preview >}}

## #12

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(12)
{{< /hydra-preview >}}

## #13

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(13)
{{< /hydra-preview >}}

## #14

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(14)
{{< /hydra-preview >}}

## #15

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(15)
{{< /hydra-preview >}}

## #16

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(16)
{{< /hydra-preview >}}

## #17

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(17)
{{< /hydra-preview >}}

## #18

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(18)
{{< /hydra-preview >}}

## #19

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(19)
{{< /hydra-preview >}}

## #20

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(20)
{{< /hydra-preview >}}

## #21

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(21)
{{< /hydra-preview >}}

## #22

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(22)
{{< /hydra-preview >}}

## #23

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(23)
{{< /hydra-preview >}}

## #24

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(24)
{{< /hydra-preview >}}

## #25

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(25)
{{< /hydra-preview >}}

## #26

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(26)
{{< /hydra-preview >}}

## #27

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(27)
{{< /hydra-preview >}}

## #28

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(28)
{{< /hydra-preview >}}

## #29

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(29)
{{< /hydra-preview >}}

## #30

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(30)
{{< /hydra-preview >}}

## #31

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(31)
{{< /hydra-preview >}}

## #32

{{< hydra-preview width="1080" height="1350">}}
// black hole [1] - PRINT
// by GEIKHA
// @geikha_ | geikha.xyz
// CC BY-NC-SA 4.0

hy = "https://cdn.jsdelivr.net/gh/geikha/hyper-hydra@latest/"
extrash = "https://metagrowing.org/extra-shaders-for-hydra/"

lS = loadScript
await lS(hy+"hydra-outputs.js")
await lS(hy+"hydra-arithmetics.js")
await lS(hy+"hydra-fractals.js")
await lS(hy+"hydra-wrap.js")
await lS(hy+"hydra-convolutions.js")
await lS(extrash+"lib-noise.js")
await lS("//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js")
await lS("//geikha.xyz/collections/black-hole-1/bh1.js")

bh1_run()
bh1_generate(32)
{{< /hydra-preview >}}