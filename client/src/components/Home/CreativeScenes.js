import { useRef, useState } from 'react';
import './CreativeScenes.scss';

const sceneOptions = [
  { id: 'meadow', title: 'meadow', glyph: '✿', action: 'plant a flower', verb: 'planted' },
  { id: 'pond', title: 'pond', glyph: '◌', action: 'invite a duck', verb: 'ducks' },
  { id: 'night', title: 'night', glyph: '✧', action: 'make a wish', verb: 'wishes' },
];
const MAX_ON_SCREEN = { meadow: 17, pond: 6, night: 25 };
const petalColors = ['#DA9FA8', '#F2D2A0', '#B8ACCE', '#F7E7D3', '#E7AFA4', '#D8C6DB'];
const starterFlowers = [
  { id: -3, x: 19, height: 116, color: '#D9A8AF', type: 0 },
  { id: -2, x: 48, height: 143, color: '#F3D5A3', type: 2 },
  { id: -1, x: 78, height: 118, color: '#C3B8DC', type: 1 },
];
const starterDucks = [
  { id: -2, x: 30, y: 65, left: false, tiny: false },
  { id: -1, x: 73, y: 73, left: true, tiny: true },
];
const between = (n, low, high) => Math.max(low, Math.min(high, n));
// Deterministic, so the sky stays stable between rerenders and in screenshots.
const stars = Array.from({ length: 56 }, (_, i) => ({
  id: i,
  x: 6 + ((i * 47.31 + Math.sin(i * 19.7) * 28 + 300) % 89),
  y: 7 + ((i * 29.57 + Math.cos(i * 8.2) * 17 + 300) % 64),
  radius: 1 + (i % 4) * .42,
  delay: `${(i % 13) * -.42}s`,
  duration: `${2.8 + (i % 7) * .48}s`,
}));

function WorldDuck({ duck }) {
  return <div className={`world-duck ${duck.left ? 'duck-left' : ''} ${duck.tiny ? 'duck-tiny' : ''}`}
    style={{ left: `${duck.x}%`, top: `${duck.y}%`, '--duck-time': `${4.4 + Math.abs(duck.id % 4) * .55}s`, '--duck-phase': `${(duck.id % 3) * -.9}s` }} aria-hidden="true">
    <svg viewBox="0 0 112 78" className="world-duck-svg" focusable="false">
      <ellipse cx="57" cy="67" rx="35" ry="5.2" fill="#a1c2bd" opacity=".43" />
      <path d="M17 50 Q12 44 13 33 Q28 37 40 37 Q58 31 79 41 Q95 47 91 57 Q81 66 53 65 Q26 65 17 50Z" fill="#fff9e9" stroke="#bdcbb7" strokeWidth="1.5" />
      <path d="M45 47 Q58 37 72 47 Q65 56 49 56" fill="#eee2cb" stroke="#d6ceb5" strokeWidth="1" />
      <path d="M71 41 Q77 34 74 26 C70 17 72 9 83 9 C95 9 100 20 96 31 Q93 40 84 42" fill="#fff9e9" stroke="#bdcbb7" strokeWidth="1.5" />
      <circle cx="88" cy="22.8" r="1.9" fill="#4d6455" />
      <path d="M96 28 L108 31 L96 35Z" fill="#d9aa75" />
      <path d="M36 69 q17 6 32 0 M53 73 q14 4 27 -1" stroke="#82b5ad" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity=".74" />
    </svg>
  </div>;
}

function buildBotanicalFlower(mark) {
  // Flat storybook shapes rather than shaded botanical illustrations.
  const type = ((mark.type ?? Math.abs(mark.id) % 4) + 4) % 4;
  const colors = ['#E6AEB6', '#C5B6DF', '#F0D69F', '#E8BFC9'];
  const fill = colors[type];
  const petalCount = [5, 6, 0, 4][type];
  const petals = petalCount ? Array.from({ length: petalCount }, (_, i) => {
    const angle = i * 360 / petalCount;
    const rx = type === 0 ? 10.7 : (type === 1 ? 7.7 : 11);
    const ry = type === 0 ? 12.2 : (type === 1 ? 14 : 12.2);
    return `<ellipse cx="0" cy="-13.3" rx="${rx}" ry="${ry}" transform="rotate(${angle})" fill="${fill}" stroke="#FAF9F3" stroke-width="1"/>`;
  }).join('') : '';
  const head = type === 2
    ? `<path d="M-15 8 Q-21 -4 -17 -19 Q-9 -24 -4 -13 Q0 -29 7 -24 Q14 -22 15 -12 Q21 -21 22 -7 Q20 10 8 15 Q-5 19 -15 8Z" fill="${fill}" stroke="#FAF9F3" stroke-width="1.3"/>`
    : `${petals}<circle r="${type === 1 ? 7.1 : 7.7}" fill="#F9E7AF" stroke="#F4D79C" stroke-width=".7"/>`;
  const face = type !== 2 ? `<circle cx="-2.8" cy="-1" r=".8" fill="#8A806E"/><circle cx="2.8" cy="-1" r=".8" fill="#8A806E"/><path d="M-2 2 Q0 4 2 2" stroke="#8A806E" stroke-width=".75" fill="none" stroke-linecap="round"/>` : '';
  return `<path d="M41 157 Q36 133 42 108 Q48 85 41 59" fill="none" stroke="#769D7C" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M41 120 Q27 106 19 110 Q15 120 23 126 Q31 128 41 123Z" fill="#ACC9A5"/>
    <path d="M42 101 Q55 88 63 92 Q69 105 57 109 Q50 109 42 106Z" fill="#BCD4B3"/>
    <g transform="translate(41 54) rotate(${(Math.abs(mark.id) % 5 - 2) * 2})">${head}${face}</g>`;
}
function WorldFlower({ mark }) {
  const scale = Math.min(1.14, Math.max(.72, (mark.height || 120) / 126));
  return <svg className="world-flower" viewBox="0 0 82 160" preserveAspectRatio="xMidYMid meet"
    style={{left: `${mark.x}%`, '--flower-size': scale, '--flower-delay': `${Math.abs(mark.id % 5) * -.43}s`, zIndex: Math.round(mark.height)}}
    aria-hidden="true" dangerouslySetInnerHTML={{__html: buildBotanicalFlower(mark)}}/>;
}

const MEADOW_BACKDROP = `<rect width="720" height="380" fill="#F3F6EF"/>
 <circle cx="575" cy="75" r="27" fill="#FFF2C9"/>
 <g fill="#FFFCF4" opacity=".9">
   <path d="M82 94 Q88 78 104 82 Q114 67 131 75 Q143 71 153 87 Q163 86 169 96Z"/>
   <path d="M280 67 Q288 56 303 61 Q314 47 332 60 Q347 55 352 69Z"/>
 </g>
 <path d="M0 227 Q105 188 208 217 T425 207 T720 216 V380 H0Z" fill="#E5EEE2"/>
 <path d="M0 279 Q105 246 207 257 Q314 227 420 254 T720 242 V380 H0Z" fill="#D5E6D2"/>
 <path d="M0 315 Q126 292 226 314 Q325 284 445 308 T720 292 V380 H0Z" fill="#BED5BC"/>
 <g fill="none" stroke="#92B49A" stroke-width="1.65" stroke-linecap="round" opacity=".68">
   <path d="M26 341 l-4 -10 m4 10 l6 -9 M84 323 l-3 -9 m3 9 l7 -9 M128 340 l-4 -9 m4 9 l8 -11 M255 335 l-5 -10 m5 10 l6 -8 M393 334 l-4 -9 m4 9 l7 -10 M557 335 l-4 -10 m4 10 l8 -10 M675 337 l-4 -8 m4 8 l7 -11"/>
   <path d="M58 266 q-4 -13 0 -21 m0 14 q-7 -7 -11 -6 m11 -5 q6 -7 10 -5 M634 266 q-4 -16 1 -25 m0 17 q-9 -8 -12 -8 m12 -5 q6 -8 9 -8"/>
 </g>
 <g fill="#E9BCC7"><circle cx="94" cy="290" r="2"/><circle cx="587" cy="304" r="2"/></g>
 <g fill="#F7E6AB"><circle cx="219" cy="282" r="2"/><circle cx="660" cy="266" r="2.2"/></g>
 <g fill="#E5D1ED"><circle cx="310" cy="297" r="1.7"/><circle cx="478" cy="280" r="1.7"/></g>
 <g fill="none" stroke="#B5C7B0" stroke-width="1.2" stroke-linecap="round"><path d="M190 130 q6 -5 12 0 q6 -5 12 0"/><path d="M258 149 q4 -4 8 0 q4 -4 8 0"/></g>`;

function WorldBackdrop({ scene }) {
  if (scene === 'meadow') return <svg className="world-backdrop-art" viewBox="0 0 720 380" preserveAspectRatio="none" aria-hidden="true" dangerouslySetInnerHTML={{__html: MEADOW_BACKDROP}}/>;
  if (scene === 'pond') return (<svg className="world-backdrop-art" viewBox="0 0 720 380" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 166 Q120 128 212 161 T420 152 T720 148 L720 204 L0 204 Z" fill="#D7E5D8" opacity=".9" />
    <path d="M0 181 Q160 171 290 183 T720 169" fill="none" stroke="#A9C8B6" strokeWidth="1.4" opacity=".8" />
    <g fill="none" stroke="#A7C8BF" strokeWidth="1.2" strokeLinecap="round" opacity=".75"><path d="M83 231 q24 -8 46 0 M226 260 q28 -9 55 0 M400 245 q24 -7 45 0 M568 291 q32 -8 60 0 M330 313 q16 -5 29 0" /><path d="M594 182 q2 -18 9 -31 M611 188 q5 -23 10 -32 M624 186 q9 -17 13 -21" stroke="#8DAE95"/></g>
    <path d="M52 153 q11 -16 23 0 q12 -16 24 0" fill="none" stroke="#A3BAB0" strokeWidth="1.4" strokeLinecap="round" opacity=".65" />
  </svg>);
  return (<svg className="world-backdrop-art" viewBox="0 0 720 380" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 262 L118 211 L208 243 L292 183 L397 260 L501 215 L622 258 L720 198 L720 370 L0 370Z" fill="#3E5A5C" opacity=".42" />
    <path d="M0 302 L133 257 L223 285 L310 249 L419 293 L510 255 L620 280 L720 247 L720 380 L0 380Z" fill="#304C50" opacity=".72" />
    <g fill="none" stroke="#B5C6B7" strokeWidth=".9" strokeLinecap="round" opacity=".5"><path d="M93 119 L156 79 L214 114 L256 91"/><path d="M156 79 L165 48"/></g>
    <g fill="#E8EDDC" opacity=".8"><circle cx="93" cy="119" r="1.8"/><circle cx="156" cy="79" r="2.2"/><circle cx="214" cy="114" r="1.7"/><circle cx="256" cy="91" r="1.8"/><circle cx="165" cy="48" r="1.9"/></g>
    <g fill="#294747" opacity=".66"><path d="M69 324 l20 -71 20 71Z M106 326 l25 -83 25 83Z M617 324 l23 -77 23 77Z M665 329 l15 -60 16 60Z"/></g>
  </svg>);
}

export default function CreativeScenes() {
  const [scene, setScene] = useState('meadow');
  const [marks, setMarks] = useState({ meadow: starterFlowers, pond: starterDucks, night: [] });
  const [counts, setCounts] = useState({ meadow: 3, pond: starterDucks.length, night: 0 });
  const serial = useRef(0);
  const active = sceneOptions.find(item => item.id === scene);

  function addMark(e) {
    const id = ++serial.current;
    const bounds = e?.currentTarget?.getBoundingClientRect?.();
    const fromPointer = Boolean(bounds && e?.detail !== 0 && Number.isFinite(e?.clientX));
    const x = fromPointer ? (e.clientX - bounds.left) / bounds.width * 100 : 12 + ((id * 61.8) % 76);
    const y = fromPointer ? (e.clientY - bounds.top) / bounds.height * 100 : 17 + ((id * 29.4) % 50);
    const item = {
      id, x: between(x, 7, 93),
      y: scene === 'pond' ? between(y, 58, 80) : between(y, 12, 72),
      left: id % 2 === 0, tiny: id % 3 === 0,
      color: petalColors[id % petalColors.length],
      height: 105 + (id * 17) % 43,
      type: id % 4,
      size: 14 + id % 4 * 3,
    };
    setMarks(prev => ({ ...prev, [scene]: [...prev[scene], item].slice(-MAX_ON_SCREEN[scene]) }));
    setCounts(prev => ({ ...prev, [scene]: prev[scene] + 1 }));
  }

  function clearScene() {
    setMarks(prev => ({ ...prev, [scene]: scene === 'pond' ? starterDucks : [] }));
    setCounts(prev => ({ ...prev, [scene]: scene === 'pond' ? starterDucks.length : 0 }));
  }

  return <div className="little-worlds" aria-label="Three little interactive worlds">
    <div className="world-tabs" role="group" aria-label="Choose a scene">
      {sceneOptions.map(item => <button key={item.id} type="button" className={`world-tab ${scene === item.id ? 'is-active' : ''}`}
        aria-pressed={scene === item.id} onClick={() => setScene(item.id)}><span aria-hidden="true">{item.glyph}</span> {item.title}</button>)}
    </div>
    <div key={scene} className={`world-stage world-${scene}`} role="button" tabIndex={0}
      aria-label={`${active.action}. Press Enter or Space, or tap the scene.`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addMark({ detail: 0 }); } }} onClick={addMark}>
      <WorldBackdrop scene={scene}/>
      <span className="world-scene-name">{active.glyph} &nbsp; {active.title}</span>
      <span className="world-total" aria-live="polite">{String(counts[scene]).padStart(2, '0')} {active.verb}</span>
      {scene === 'meadow' && <>
        <div className="world-cloud cloud-left"/><div className="world-cloud cloud-right"/>
        <div className="world-meadow-hill hill-back"/><div className="world-meadow-hill hill-front"/>
        <div className="world-ground-line"/>
        {marks.meadow.map(mark => <WorldFlower key={mark.id} mark={mark}/>)}
      </>}
      {scene === 'pond' && <>
        <div className="world-pond-horizon"/><div className="world-pond-water"/>
        <div className="world-lilypad pad-one"><span>✿</span></div>
        <div className="world-lilypad pad-two"><span>·</span></div>
        <div className="world-reeds">╱╲<br/>╱ │ ╲</div>
        {marks.pond.map(duck => <WorldDuck key={duck.id} duck={duck}/>)}
      </>}
      {scene === 'night' && <>
        <div className="world-night-haze"/><div className="world-moon-glow"/><div className="world-moon"/>
        <div className="world-night-cloud night-cloud-a"/><div className="world-night-cloud night-cloud-b"/>
        <div className="world-night-hill"/>
        {stars.map(star => <span key={star.id} className="world-stardust" aria-hidden="true"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.radius * 2}px`, height: `${star.radius * 2}px`, '--star-delay': star.delay, '--star-duration': star.duration }}/>)}
        <div className="world-shooting-star" aria-hidden="true"/>
        {marks.night.map(mark => <span key={mark.id} className="world-star" aria-hidden="true"
          style={{ left: `${mark.x}%`, top: `${mark.y}%`, fontSize: `${mark.size}px` }}>✧</span>)}
      </>}
      <span className="world-tap-note">tap anywhere ✳</span>
    </div>
    <div className="world-actions">
      <button className="world-action-primary" type="button" onClick={() => addMark({ detail: 0 })}>＋ {active.action}</button>
      <button className="world-action-reset" type="button" onClick={clearScene}>start fresh ↺</button>
    </div>
  </div>;
}
