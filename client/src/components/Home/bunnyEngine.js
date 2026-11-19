/*
 * ASCII Daydream / kinetic rabbit study (original artwork)
 * Every visible part of the rabbit (including its tiny ear flower) is drawn as moving text glyphs.
 * No painted body, cartoon outlines, eyebrows, collar, or yarn-ball prop.
 * This same engine drives both the React portfolio and the standalone preview.
 */
export function mountAsciiBunny(canvas, options = {}) {
  if (!canvas || typeof Path2D === 'undefined') return () => {};
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return () => {};
  const W = 500, H = 540, TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const ease = x => { const t = clamp(x, 0, 1); return t*t*(3-2*t); };
  let seed = 12873;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const path = d => new Path2D(d);

  // An original side-profile rabbit with clean anatomy: two expressive ears,
  // one small eye, paws outside the body, a plump silhouette, and a tiny raised tail.
  // The shapes are invisible: used only to determine where glyphs belong.
  const shapes = [
    { name: 'tail', pivot: [121,352], d: 'M119 346 C107 330 89 334 86 346 C81 358 92 376 107 375 C122 379 133 366 132 356 Z' },
    { name: 'farEar', pivot: [309,216], d: 'M304 220 C286 189 271 148 264 111 C258 79 265 62 277 68 C293 73 308 117 316 149 C323 178 326 201 324 224 Z' },
    { name: 'nearEar', pivot: [325,218], d: 'M316 215 C324 175 338 117 355 87 C367 66 380 67 384 80 C392 101 368 166 351 214 C348 223 331 232 316 215 Z' },
    { name: 'backFoot', pivot: [180,431], d: 'M173 419 C162 439 147 458 147 472 C147 488 168 492 194 489 C207 489 220 481 223 471 C224 461 203 443 201 428 Z' },
    { name: 'body', pivot: [236,386], d: 'M170 315 C130 317 107 350 110 395 C112 446 149 473 218 478 C285 482 327 451 331 410 C342 363 316 327 275 315 C246 303 207 301 170 315 Z' },
    { name: 'neck', pivot: [304,324], d: 'M276 293 C277 314 282 335 294 353 C306 364 326 352 331 335 L329 304 Z' },
    { name: 'farPaw', pivot: [292,355], d: 'M289 353 C296 350 310 358 311 372 L315 405 C314 417 307 424 297 421 C288 419 287 412 289 403 L282 372 Z' },
    { name: 'nearPaw', pivot: [317,359], d: 'M312 353 C324 351 333 362 334 377 L342 407 C343 417 337 423 329 421 C320 420 317 413 318 403 L307 374 Z' },
    { name: 'frontFoot', pivot: [294,438], d: 'M273 435 C286 435 306 448 323 457 C337 466 348 481 340 488 C331 496 293 492 276 485 C263 480 260 464 273 435 Z' },
    { name: 'head', pivot: [308,277], d: 'M269 218 C287 197 320 196 341 209 C356 219 361 229 360 242 C375 245 391 251 395 264 C400 279 385 291 370 294 C356 318 334 331 305 331 C272 331 251 307 252 276 C251 251 254 231 269 218 Z' }
  ].map(s => ({ ...s, shape: path(s.d) }));

  const sampler = document.createElement('canvas');
  sampler.width = W; sampler.height = H;
  const maskCtx = sampler.getContext('2d');
  if (!maskCtx) return () => {};
  const particles = [];
  const alphabet = ['@', '%', '#', '*', '+', '=', ':', '·', '.', '+', '*', ':', '.'];
  const edgeColors = ['#4f6756', '#59725f', '#617a68', '#6e8a74', '#78917f'];
  // Density is higher than the earlier scattered '+' texture. Every character
  // belongs to a body part, so the body can physically articulate while hopping.
  for (let y = 59; y < 500; y += 7.9) {
    for (let x = 106; x < 409; x += 7.9) {
      const s = [...shapes].reverse().find(q => maskCtx.isPointInPath(q.shape, x, y));
      if (!s || random() < .025) continue;
      const homeX = x + (random() - .5) * 2.8;
      const homeY = y + (random() - .5) * 2.8;
      // One tiny dark eye and a subtle mouth remain visible over the text;
      // keep the face clear by leaving a narrow negative-space area.
      if (s.name === 'head' && Math.hypot((homeX - 345) / 2.5, (homeY - 263) / 4.5) < 1) continue;
      particles.push({ part: s.name, hx: homeX, hy: homeY,
        x: 250 + (random()-.5) * 330, y: 265 + (random()-.5) * 300,
        vx: 0, vy: 0, ch: alphabet[Math.floor(random() * alphabet.length)],
        size: 8.2 + random() * 1.3, phase: random() * TAU,
        tone: edgeColors[Math.floor(random()*edgeColors.length)],
        alpha: .70 + random() * .29 });
    }
  }

  // A little five-petal bloom tucked into the base of the forward ear.
  // It is *also* made of type particles, not an image, SVG sticker or outline.
  // Its local coordinates follow the same ear articulation as the rabbit.
  const flower = [];
  const flowerCenter = { x: 343, y: 211 };
  for (let petal = 0; petal < 5; petal++) {
    const a = -Math.PI / 2 + petal * TAU / 5;
    for (let k = 0; k < 16; k++) {
      const r = Math.sqrt(random());
      const theta = random() * TAU;
      const outward = r * Math.cos(theta) * 7.6;
      const sideways = r * Math.sin(theta) * 5.3;
      const x = flowerCenter.x + Math.cos(a) * (10.6 + outward) - Math.sin(a) * sideways;
      const y = flowerCenter.y + Math.sin(a) * (10.6 + outward) + Math.cos(a) * sideways;
      flower.push({ hx: x, hy: y, x: x + (random()-.5)*25, y: y + (random()-.5)*25,
        vx: 0, vy: 0, phase: random()*TAU, ch: ['·', '+', '*', 'o'][Math.floor(random()*4)],
        tone: ['#b98991', '#c59ba0', '#d0a9af', '#b67e88'][petal%4],
        size: 6.2 + random()*1.8, alpha: .80+random()*.18 });
    }
  }
  // The warm center is punctuation too, not an illustrated flower disk.
  flower.push({ hx: flowerCenter.x, hy: flowerCenter.y, x: flowerCenter.x, y: flowerCenter.y,
    vx: 0, vy: 0, phase: 0, ch: '@', tone: '#b59a68', size: 10.6, alpha: 1 });

  const pointer = { x: -1e4, y: -1e4, active: false };
  const state = {
    drift: 0, hop: null, hops: 0, nextHop: performance.now() + 1450,
    nextBlink: performance.now() + 2100, blinkTo: 0,
    scatter: 0, helloTo: 0
  };
  const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let reducedMotion = Boolean(media?.matches);
  let raf = 0, alive = true, visible = true, hasAppeared = false;

  function startHop(now) {
    const goHome = state.hops % 4 === 3;
    const distance = goHome ? -state.drift : (random() > .5 ? 1 : -1) * (22 + random() * 17);
    state.hop = { t0: now, duration: 970 + random() * 170,
      from: state.drift, to: clamp(state.drift + distance, -46, 46),
      height: 39 + random() * 19 };
    state.hops += 1;
    state.nextHop = now + state.hop.duration + 1850 + random() * 1900;
    canvas.dataset.bunnyState = 'hopping';
    canvas.dataset.hopCount = String(state.hops);
  }
  function pose(now) {
    const p = { x: state.drift, lift: 0, sx: 1, sy: 1, aerial: 0, land: 0, crouch: 0 };
    if (reducedMotion) return p;
    if (!state.hop && now >= state.nextHop) startHop(now);
    if (!state.hop) return p;
    const h = state.hop;
    const u = clamp((now - h.t0) / h.duration, 0, 1);
    if (u >= 1) {
      state.drift = h.to; state.hop = null;
      canvas.dataset.bunnyState = 'resting';
      p.x = state.drift; return p;
    }
    if (u < .18) {
      const q = ease(u / .18);
      p.crouch = q; p.sy = 1 - .12*q; p.sx = 1 + .06*q;
    } else if (u < .81) {
      const q = (u - .18) / .63;
      p.x = h.from + (h.to-h.from)*ease(q);
      p.lift = h.height * Math.sin(Math.PI*q);
      p.aerial = Math.sin(Math.PI*q);
      p.sy = 1 + .045*p.aerial; p.sx = 1 - .025*p.aerial;
    } else if (u < .93) {
      const q = (u-.81)/.12;
      p.x = h.to; p.land = 1-q;
      p.sy = .86 + .14*ease(q); p.sx = 1.10 - .10*ease(q);
    } else {
      p.x = h.to; p.lift = 3.8 * Math.sin(Math.PI*(u-.93)/.07);
    }
    return p;
  }

  function partTransform(x, y, part, p, time) {
    let angle = 0, px = 250, py = 390, dx = 0, dy = 0;
    const airborne = p.aerial, breathe = Math.sin(time*1.12)*.8;
    switch (part) {
      case 'farEar': angle = -.028 + Math.sin(time*1.45)*.026 - airborne*.13;
        px=309;py=216;dy=-airborne*1.5;break;
      case 'nearEar': angle = .027 + Math.sin(time*1.23+.7)*.034 + airborne*.19;
        px=325;py=218;break;
      case 'head': angle = Math.sin(time*.75)*.018 + airborne*.028;
        px=308;py=277;dy=breathe;break;
      case 'nearPaw': angle = -.03 + airborne*.19 + Math.sin(time*1.6)*.013;
        px=317;py=359;break;
      case 'farPaw': angle = -.035-airborne*.09;
        px=292;py=355;break;
      case 'frontFoot': angle = airborne*.16;px=294;py=438;break;
      case 'backFoot': angle = -airborne*.15;px=180;py=431;break;
      case 'tail': angle = Math.sin(time*2.0)*.06;px=121;py=352;break;
      default: dy=breathe;break;
    }
    const sn = Math.sin(angle), cs = Math.cos(angle);
    let xx = px + (x-px)*cs - (y-py)*sn + dx;
    let yy = py + (x-px)*sn + (y-py)*cs + dy;
    // Whole-body deformation around the feet is kept small and natural.
    xx = 250 + (xx - 250)*p.sx + p.x;
    yy = 486 + (yy - 486)*p.sy - p.lift;
    return [xx, yy];
  }

  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = (e.clientX - rect.left) / rect.width * W;
    pointer.y = (e.clientY - rect.top) / rect.height * H;
    pointer.active = true;
  }
  function onPointerLeave() { pointer.active = false; }
  function greet() {
    const now = performance.now();
    state.scatter = 1.45;
    state.helloTo = now + 950;
    if (!reducedMotion && !state.hop) startHop(now);
    options.onGreet?.('a little hop, just for you ✳');
    if (reducedMotion) draw(now);
  }
  function onKey(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); greet(); }
  }
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('click', greet);
  canvas.addEventListener('keydown', onKey);

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(r.width*dpr));
    const height = Math.max(1, Math.round(r.height*dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width; canvas.height = height;
    }
    if (reducedMotion) draw(performance.now());
  }

  function face(now, p, t) {
    // Exactly ONE eye and ONE tiny expression line; NO eyebrows or collar.
    // Minimal features are also glyphs so the rabbit remains text art.
    const closed = !reducedMotion && now < state.blinkTo;
    const [eyeX, eyeY] = partTransform(341, 261, 'head', p, t);
    const [mouthX, mouthY] = partTransform(370, 278, 'head', p, t);
    ctx.globalAlpha = .96;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#415849';
    ctx.font = 'bold 15px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(closed ? '–' : '●', eyeX, eyeY);
    ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText('⌣', mouthX, mouthY);
    ctx.globalAlpha = 1;
  }

  function draw(now) {
    if (!alive || !canvas.width || !canvas.height) return;
    const t = now/1000, p = pose(now);
    ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);
    ctx.clearRect(0,0,W,H);
    ctx.textAlign='left';ctx.textBaseline='alphabetic';

    // A whisper of grounding. No illustration outline, body fill, or prop.
    ctx.fillStyle=`rgba(91,113,95,${Math.max(.04,.13-p.lift/1000)})`;
    ctx.beginPath();ctx.ellipse(247+p.x,500,74-p.lift*.32,5-p.lift*.012,0,0,TAU);ctx.fill();

    const reveal = reducedMotion ? 1 : ease((now - mountAt) / 1500);
    const waveStrength = reducedMotion ? 0 : .95;
    for (const g of particles) {
      const [bx, by] = partTransform(g.hx, g.hy, g.part, p, t);
      // Continual spatial flow: glyphs roll gently through a moving shape,
      // rather than a stationary illustration translating up and down.
      const flowX = waveStrength*(Math.sin(t*1.65 + g.hy*.024+g.phase)*1.12 + Math.cos(t*.73+g.hy*.032)*.7);
      const flowY = waveStrength*Math.cos(t*1.3 + g.hx*.025+g.phase)*.95;
      let tx = bx + flowX, ty = by + flowY;
      if (pointer.active && !reducedMotion) {
        const dx=g.x-pointer.x,dy=g.y-pointer.y,dist=Math.hypot(dx,dy);
        if (dist < 78 && dist>.01) {
          const push=(1-dist/78)**2*28;
          tx += dx/dist*push;ty += dy/dist*push;
        }
      }
      if (state.scatter > .01 && !reducedMotion) {
        const dx = g.hx - 255, dy=g.hy-284;
        const d=Math.max(1,Math.hypot(dx,dy));
        tx += dx/d*state.scatter*19;ty += dy/d*state.scatter*19;
      }
      if (!hasAppeared && !reducedMotion) {
        // First frame starts loose; springs gather into silhouette naturally.
        g.x += (tx-g.x)*.028;g.y += (ty-g.y)*.028;
      }
      if (reducedMotion) {g.x=bx;g.y=by;}
      else {
        g.vx = (g.vx + (tx-g.x)*.085)*.73;
        g.vy = (g.vy + (ty-g.y)*.085)*.73;
        g.x += g.vx;g.y += g.vy;
      }
      ctx.font=`${g.size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.fillStyle=g.tone;
      ctx.globalAlpha=g.alpha * (reducedMotion ? 1 : .30+.70*reveal);
      ctx.fillText(g.ch, g.x, g.y);
    }
    ctx.globalAlpha=1;

    // The flower is a cluster of rose and golden ASCII glyphs bound to the ear.
    // The delicate, slightly delayed spring movement preserves the flowing-text feel.
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const g of flower) {
      const [bx, by] = partTransform(g.hx, g.hy, 'nearEar', p, t);
      const tx = bx + (reducedMotion ? 0 : Math.sin(t*1.45 + g.phase)*.65);
      const ty = by + (reducedMotion ? 0 : Math.cos(t*1.28 + g.phase)*.65);
      if (reducedMotion) { g.x=tx;g.y=ty; }
      else {
        g.vx = (g.vx + (tx-g.x)*.12)*.68;
        g.vy = (g.vy + (ty-g.y)*.12)*.68;
        g.x+=g.vx;g.y+=g.vy;
      }
      ctx.globalAlpha = g.alpha * (reducedMotion ? 1 : .35 + .65*reveal);
      ctx.fillStyle = g.tone;
      ctx.font = `${g.size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.fillText(g.ch,g.x,g.y);
    }
    ctx.globalAlpha=1;
    // Tiny moving punctuation in the wake of a jump (not a balloon or object).
    if (!reducedMotion && p.lift>5) {
      ctx.fillStyle='#99ad9d';ctx.font='11px ui-monospace, monospace';
      for (let i=0;i<7;i++) {
        const a = i*2.4+t*.9;
        const px=184+p.x+Math.sin(a)*20;
        const py=455+Math.cos(a)*13-p.lift*.42;
        ctx.globalAlpha=.17+.20*Math.sin(Math.PI*clamp(p.lift/60,0,1));
        ctx.fillText(i%2?'·':'.',px,py);
      }
      ctx.globalAlpha=1;
    }
    face(now,p,t);
    state.scatter *= .91;
    if (!reducedMotion && now>state.nextBlink) {
      state.blinkTo=now+115;
      state.nextBlink=now+2400+random()*3100;
    }
    hasAppeared=true;
  }

  function loop(now) {
    if (!alive) return;
    if (!document.hidden && visible) draw(now);
    raf=requestAnimationFrame(loop);
  }
  const mountAt=performance.now();
  const obs = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => { visible=entries[0]?.isIntersecting ?? true; },{threshold:.01}) : null;
  const onReduced=() => { reducedMotion=Boolean(media?.matches);if(reducedMotion)draw(performance.now());};
  media?.addEventListener?.('change',onReduced);
  obs?.observe(canvas);io?.observe(canvas);
  if (!obs) window.addEventListener('resize',resize);
  canvas.dataset.bunnyState='resting';canvas.dataset.hopCount='0';
  resize();draw(performance.now());
  if (!reducedMotion) raf=requestAnimationFrame(loop);
  return () => {
    alive=false;cancelAnimationFrame(raf);
    obs?.disconnect();io?.disconnect();media?.removeEventListener?.('change',onReduced);
    window.removeEventListener('resize',resize);
    canvas.removeEventListener('pointermove',onPointerMove);
    canvas.removeEventListener('pointerleave',onPointerLeave);
    canvas.removeEventListener('click',greet);
    canvas.removeEventListener('keydown',onKey);
  };
}
