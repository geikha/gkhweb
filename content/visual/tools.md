---
title: Tools
weight: 25
---

<style>
.tool-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.tool-buttons a {
  padding: 0.5rem 1rem;
  border: 1px solid currentColor;
  text-decoration: none;
}
</style>


# Tools

## DatamoshLive

[![](https://datamosh.geikha.xyz/dml-demo-img.jpg)](https://datamosh.geikha.xyz)

{{< multilang >}}
{{% en %}}
**WebCodecs-based real-time video glitching.**

A livecodeable library for video codec glitching. Video codecs save space by storing only the differences between frames - drop a frame and those differences break, creating smear. Corrupt the data of each frame for block artifacts and color shifts. Hold frames to freeze then glitch on release. Control effect intensity, bitrate, codec choice (VP8/VP9/H.264/AV1), and auto-sync-recovery.
{{% /en %}}
{{% es %}}
**Glitch de video en tiempo real con WebCodecs.**

Una librería de livecoding para datamosh. Los codecs ahorran espacio guardando solo las diferencias entre fotogramas - descartá uno y esas diferencias se rompen, rompiendo la imagen. Corrompé los datos de cada fotograma para que aparezcan artefactos y desvíos de color. Congelá la imagen y dejá que se rompa al reanudar. Controlá la intensidad del efecto, el bitrate y el codec (VP8/VP9/H.264/AV1).
{{% /es %}}
{{< /multilang >}}

<div class="tool-buttons">
  <a href="https://datamosh.geikha.xyz">Demo</a>
  <a href="https://github.com/geikha/datamoshlive">GitHub</a>
  <a href="https://www.npmjs.com/package/datamoshlive">npm</a>
</div>

---

## DCTLive

[![](https://dctlive.geikha.xyz/DCT-DEMO-IMG.jpg)](https://dctlive.geikha.xyz)

{{< multilang >}}
{{% en %}}
**WebGL Discrete Cosine Transform for real-time JPEG-style compression.**

Use and break the same math done by JPEG compression. Transform images into frequency blocks, then adjust block size, quantization (luminance/chrominance), and harmonic content to compress, distort, or glitch.
{{% /en %}}
{{% es %}}
**DCT en WebGL - compresión JPEG en tiempo real.**

Usá y rompé la misma matemática que usa la compresión JPEG. Transformá imágenes en bloques de frecuencia y ajustá el tamaño de bloque, la cuantización (luminancia/crominancia) y el contenido armónico para comprimir, distorsionar o glitchear.
{{% /es %}}
{{< /multilang >}}

<div class="tool-buttons">
  <a href="https://dctlive.geikha.xyz">Demo</a>
  <a href="https://github.com/geikha/dctlive">GitHub</a>
  <a href="https://www.npmjs.com/package/dctlive">npm</a>
</div>

---