import { useEffect, useRef, useState } from 'react';

// An original glyph-drawn character. Every glyph springs toward its own
// position and the face follows the pointer. No GIF or third-party animation library.
const W = 500;
const H = 540;
const TAU = Math.PI * 2;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

export default function AsciiBunny() {
  const ref = useRef(null);
  const [message, setMessage] = useState('say hello to the little daydream ✳');
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || typeof Path2D === 'undefined') return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const paths = {
      body: new Path2D('M220 342 C174 342 154 380 169 432 C176 468 208 485 250 486 C294 487 326 464 332 432 C340 387 320 352 283 339 Z'),
      leftEar: new Path2D('M190 210 C167 168 124 75 142 40 C149 21 169 22 182 39 C207 75 218 142 222 200 Z'),
      rightEar: new Path2D('M285 200 C297 159 336 93 365 88 C389 85 402 110 392 131 C378 161 342 161 315 213 Z'),
      head: new Path2D('M160 255 C159 203 187 176 222 169 C255 158 292 174 315 191 C346 211 358 242 351 278 C343 325 312 355 255 363 C208 369 171 346 162 311 C155 286 157 273 160 255 Z'),
      leftFoot: new Path2D('M214 471 C180 465 161 487 170 500 C181 513 225 510 239 487 Z'),
      rightFoot: new Path2D('M280 471 C305 467 333 487 324 500 C312 513 271 509 260 488 Z'),
      tail: new Path2D('M322 412 C349 398 362 421 350 441 C338 456 322 440 320 427 Z'),
    };
    const outlineOrder = ['leftEar','rightEar','tail','body','leftFoot','rightFoot','head'];
    const mask = document.createElement('canvas');
    mask.width = W; mask.height = H;
    const maskContext = mask.getContext('2d');
    maskContext.fillStyle = '#000';
    outlineOrder.forEach(key => maskContext.fill(paths[key]));
    const maskPixels = maskContext.getImageData(0, 0, W, H).data;
    let seed = 41;
    const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const glyphChars = ['+', '·', '.', ':', '*', 'o', '✳', '+', '+', '·'];
    const glyphs = [];
    for (let y=28; y<H-27; y+=12) for (let x=100; x<412; x+=12) {
      if (maskPixels[((y*W+x)*4)+3] > 0 && rand() > .075) {
        const dx = (rand()-.5)*4;
        const dy = (rand()-.5)*4;
        glyphs.push({x:x+dx,y:y+dy,homeX:x+dx,homeY:y+dy,vx:0,vy:0,
          character:glyphChars[Math.floor(rand()*glyphChars.length)], color:rand(), size:9+rand()*2.3});
      }
    }
    const pointer = {x:-1000,y:-1000,active:false};
    let frame = 0, observer, alive = true, blinkAt = 2000, blinkUntil = 0, burst = 0, excitedUntil = 0;
    const position = e => {
      const bounds=canvas.getBoundingClientRect();
      return {x: (e.clientX-bounds.left)/bounds.width*W, y: (e.clientY-bounds.top)/bounds.height*H};
    };
    const move = e => Object.assign(pointer,position(e),{active:true});
    const leave = () => { pointer.active=false; };
    const surprise = () => { excitedUntil=performance.now()+1600; burst=1; setMessage('the bunny says hi! ♡'); };
    const key = e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();surprise();} };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('click', surprise);
    canvas.addEventListener('keydown', key);

    function resize() {
      const bounds=canvas.getBoundingClientRect();
      const ratio=Math.min(window.devicePixelRatio || 1,2);
      canvas.width=Math.max(1,Math.round(bounds.width*ratio));
      canvas.height=Math.max(1,Math.round(bounds.height*ratio));
      draw(performance.now());
    }
    function stroke(path, opacity) { ctx.strokeStyle=`rgba(105,133,110,${opacity})`; ctx.lineWidth=1.5; ctx.stroke(path); }
    function draw(now) {
      if (!alive || !canvas.width || !canvas.height) return;
      const time=now/1000, excited=now<excitedUntil;
      ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);
      ctx.clearRect(0,0,W,H);
      ctx.save();
      const bob=reduced?0:Math.sin(time*1.28)*2.1;
      ctx.translate(0,bob);
      ctx.translate(250,276);
      ctx.rotate(reduced?0:excited?Math.sin(time*11)*.027:Math.sin(time*.65)*.008);
      ctx.translate(-250,-276);
      ctx.fillStyle='#f4f6ef';ctx.globalAlpha=.75;
      outlineOrder.forEach(k=>ctx.fill(paths[k]));ctx.globalAlpha=1;
      ctx.fillStyle='#e8d2ce';
      ctx.beginPath();ctx.moveTo(172,145);ctx.bezierCurveTo(157,96,152,62,161,57);ctx.bezierCurveTo(177,45,195,120,196,158);ctx.closePath();ctx.fill();
      ctx.beginPath();ctx.moveTo(315,163);ctx.bezierCurveTo(342,116,369,100,375,109);ctx.bezierCurveTo(381,127,346,145,315,176);ctx.closePath();ctx.fill();
      for (const p of glyphs) {
        let fx=0,fy=0;
        if(pointer.active&&!reduced){const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);
          if(dist<88&&dist>.01){const push=(1-dist/88)*7;fx+=dx/dist*push;fy+=dy/dist*push;}}
        if(burst>.05){const dx=p.homeX-250,dy=p.homeY-270,n=Math.max(1,Math.hypot(dx,dy));fx+=dx/n*burst*19;fy+=dy/n*burst*19;}
        if(reduced){p.x=p.homeX;p.y=p.homeY;}
        else {p.vx+=(p.homeX+fx-p.x)*.075;p.vy+=(p.homeY+fy-p.y)*.075;p.vx*=.75;p.vy*=.75;p.x+=p.vx;p.y+=p.vy;}
        ctx.fillStyle=p.color>.89?'#bda6a1':p.color>.6?'#819b87':'#91ab96';
        ctx.globalAlpha=.63+p.color*.33;
        ctx.font=`${p.size}px monospace`;ctx.fillText(p.character,p.x,p.y);
      }
      ctx.globalAlpha=1;
      outlineOrder.forEach(k=>stroke(paths[k],k==='head'?.57:.36));
      ctx.fillStyle='#d8b8b0';ctx.globalAlpha=.47;ctx.beginPath();ctx.ellipse(200,292,13,5,0,0,TAU);ctx.ellipse(310,287,13,5,0,0,TAU);ctx.fill();ctx.globalAlpha=1;
      const blink=!reduced&&now<blinkUntil;
      const lookX=pointer.active?Math.max(-3.5,Math.min(3.5,(pointer.x-250)/72)):Math.sin(time*.42)*.8;
      const lookY=pointer.active?Math.max(-2,Math.min(2,(pointer.y-268)/90)):0;
      ctx.strokeStyle='#536956';ctx.fillStyle='#4d6353';ctx.lineWidth=2.2;ctx.lineCap='round';
      if(blink||excited){ctx.beginPath();ctx.moveTo(210,266);ctx.quadraticCurveTo(220,273,231,266);ctx.moveTo(274,262);ctx.quadraticCurveTo(286,269,297,261);ctx.stroke();}
      else{ctx.beginPath();ctx.ellipse(221+lookX,267+lookY,3.4,4.8,0,0,TAU);ctx.ellipse(285+lookX,263+lookY,3.4,4.8,0,0,TAU);ctx.fill();}
      ctx.strokeStyle='#a47e7a';ctx.lineWidth=1.7;ctx.beginPath();ctx.moveTo(251,283);ctx.quadraticCurveTo(256,288,261,282);ctx.stroke();
      ctx.beginPath();ctx.moveTo(256,288);if(excited)ctx.quadraticCurveTo(265,299,273,286);else ctx.quadraticCurveTo(261,293,266,287);ctx.stroke();
      ctx.strokeStyle='#bd9a96';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(220,348);ctx.quadraticCurveTo(253,362,292,346);ctx.stroke();
      ctx.fillStyle='#d4b7b3';ctx.beginPath();ctx.moveTo(258,352);ctx.quadraticCurveTo(237,362,246,372);ctx.quadraticCurveTo(251,378,262,357);ctx.quadraticCurveTo(280,378,285,370);ctx.quadraticCurveTo(291,360,258,352);ctx.fill();
      ctx.fillStyle='#b89c96';ctx.beginPath();ctx.arc(261,356,4,0,TAU);ctx.fill();
      ctx.save();ctx.translate(361,443);ctx.strokeStyle='#baa29a';ctx.fillStyle='#e8d4ca';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,32,0,TAU);ctx.fill();ctx.stroke();ctx.strokeStyle='#f8eee6';ctx.lineWidth=3;
      for(let i=-2;i<3;i++){ctx.beginPath();ctx.moveTo(-23,-9+i*7);ctx.quadraticCurveTo(0,-22+i*9,24,9+i*3);ctx.stroke();}ctx.restore();
      ctx.beginPath();ctx.strokeStyle='#bba69d';ctx.lineWidth=1.5;ctx.moveTo(388,458);ctx.bezierCurveTo(425,487,380,506,346,492);ctx.bezierCurveTo(310,479,304,509,266,512);ctx.stroke();
      if(excited){ctx.fillStyle='#c39c94';ctx.font='29px Georgia';ctx.fillText('✳',360,180);ctx.fillText('✧',105,300);}
      ctx.restore();burst*=.83;
      if(now>blinkAt&&!blink){blinkUntil=now+140;blinkAt=now+3000+Math.random()*3300;}
    }
    const loop=now=>{if(!alive)return;draw(now);if(!reduced)frame=requestAnimationFrame(loop);};
    observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
    if(observer)observer.observe(canvas);else window.addEventListener('resize',resize);
    resize();if(!reduced)frame=requestAnimationFrame(loop);
    return ()=>{alive=false;cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('resize',resize);
      canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('click',surprise);canvas.removeEventListener('keydown',key);};
  },[reduced]);

  return (
    <div className="bunny-composition">
      <span className="hand-note" aria-hidden="true">psst… say hello ↙</span>
      <div className="bunny-window">
        <span className="bunny-star first" aria-hidden="true">✳</span>
        <span className="bunny-star second" aria-hidden="true">✧</span>
        <canvas ref={ref} width={500} height={540} role="button" tabIndex={0} aria-label="Greet the interactive ASCII bunny" />
      </div>
      <div className="bunny-caption"><span>INTERACTIVE ASCII STUDY / 001</span><span aria-live="polite">{message}</span></div>
    </div>
  );
}
