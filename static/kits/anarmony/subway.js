sketches.subway = function(p) {

  // ---- settings -------------------------------------------------------
  const FPS          = 20;   // low = chunkier stepping feel
  const ANIM_SPEED   = 22;   // px drawn per frame
  const LINE_WEIGHT  = 20;   // boldness of subway lines
  const CIRCLE_SIZE  = 36;   // diameter of stop circles
  const CIRCLE_STROKE = 6;   // stroke weight of circles
  const STOP_MIN_LEN = 90;   // min px between stops
  const STOP_MAX_LEN = 240;  // max px between stops
  const DIAG_PROB    = 0.30; // chance of a diagonal at each stop
  const DIAG_STEP    = 100;  // y-shift per diagonal
  const LINE_COUNT   = 6;
  // ---------------------------------------------------------------------

  const BG = [251, 110, 31];

  class SubwayLine {
    constructor(baseY) {
      this.baseY = baseY;
      this._init();
    }

    _init() {
      this.done      = false;
      this.waypoints = [];
      this.stops     = [];   // { idx, fill: 'bg' | 'black' }
      this.wpIdx     = 1;
      this.t         = 0;
      this._generate();
    }

    reset() { this._init(); }

    _generate() {
      const dir  = p.random() < 0.5 ? 1 : -1;
      const endX = dir === 1 ? p.width + 140 : -140;
      let x = dir === 1 ? -140 : p.width + 140;
      let y = p.constrain(this.baseY + p.random(-25, 25), 70, p.height - 70);

      this.waypoints.push({ x, y });

      let guard = 0;
      while ((dir === 1 ? x < endX : x > endX) && ++guard < 400) {

        // optional diagonal: short horizontal → 45° diagonal → continue
        if (p.random() < DIAG_PROB) {
          const pre   = p.random(20, 55);
          const midX  = x + pre * dir;
          this.waypoints.push({ x: midX, y });

          const dy    = (p.random() < 0.5 ? 1 : -1) * DIAG_STEP;
          const newY  = p.constrain(y + dy, 70, p.height - 70);
          const dEndX = midX + Math.abs(newY - y) * dir; // 45° → dx == |dy|
          this.waypoints.push({ x: dEndX, y: newY });
          x = dEndX;
          y = newY;
        }

        // horizontal stop segment
        const nextX = x + p.random(STOP_MIN_LEN, STOP_MAX_LEN) * dir;
        const past  = dir === 1 ? nextX >= endX : nextX <= endX;

        if (past) {
          this.waypoints.push({ x: endX, y });
          break;
        }

        this.waypoints.push({ x: nextX, y });
        this.stops.push({ idx: this.waypoints.length - 1, fill: p.random() < 0.5 ? 'bg' : 'black' });
        x = nextX;
      }

      // guarantee the line exits the frame
      const last = this.waypoints[this.waypoints.length - 1];
      if (dir === 1 ? last.x < endX : last.x > endX) {
        this.waypoints.push({ x: endX, y });
      }
    }

    update() {
      if (this.done) return;
      if (this.wpIdx >= this.waypoints.length) { this.done = true; return; }
      const from = this.waypoints[this.wpIdx - 1];
      const to   = this.waypoints[this.wpIdx];
      if (!from || !to) { this.done = true; return; }
      const len  = Math.max(p.dist(from.x, from.y, to.x, to.y), 1);
      this.t    += ANIM_SPEED / len;
      if (this.t >= 1) {
        this.wpIdx++;
        this.t = 0;
        if (this.wpIdx >= this.waypoints.length) this.done = true;
      }
    }

    draw() {
      const drawn = this.wpIdx;

      // line segments
      p.noFill();
      p.stroke(255);
      p.strokeWeight(LINE_WEIGHT);
      p.strokeCap(p.ROUND);

      for (let i = 1; i < drawn; i++) {
        const a = this.waypoints[i - 1], b = this.waypoints[i];
        p.line(a.x, a.y, b.x, b.y);
      }
      if (!this.done && drawn < this.waypoints.length) {
        const a = this.waypoints[drawn - 1], b = this.waypoints[drawn];
        p.line(a.x, a.y, p.lerp(a.x, b.x, this.t), p.lerp(a.y, b.y, this.t));
      }

      // stop circles
      for (const stop of this.stops) {
        if (stop.idx < drawn) {
          const wp = this.waypoints[stop.idx];
          p.strokeWeight(CIRCLE_STROKE);
          p.stroke(255);
          p.fill(stop.fill === 'bg' ? p.color(BG[0], BG[1], BG[2]) : p.color(0));
          p.ellipse(wp.x, wp.y, CIRCLE_SIZE, CIRCLE_SIZE);
        }
      }
    }
  }

  // 4 lines spread evenly across screen height
  const lines = [];
  for (let i = 0; i < LINE_COUNT; i++) {
    const y = p.map(i, 0, LINE_COUNT - 1, p.height * 0.15, p.height * 0.85);
    lines.push(new SubwayLine(y));
  }

  p.frameRate(FPS);

  p.draw = function() {
    p.background(BG[0], BG[1], BG[2]);

    for (const ln of lines) {
      ln.update();
      ln.draw();
    }

    if (lines.every(ln => ln.done)) {
      for (const ln of lines) ln.reset();
    }
  };
};
