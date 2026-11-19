import { useRef, useState } from 'react';
import './CreativeScenes.scss';

const sceneOptions = [
  { id: 'meadow', title: 'meadow', glyph: '✿', action: 'plant a flower', verb: 'planted' },
  { id: 'pond', title: 'pond', glyph: '◌', action: 'invite a duck', verb: 'ducks' },
  { id: 'night', title: 'night', glyph: '✧', action: 'wish on a star', verb: 'wishes' },
];
const MAX_ON_SCREEN = { meadow: 14, pond: 6, night: 22 };
const petalColors = ['#D2ACA9', '#E1C789', '#C5B9CF', '#B9CDBB', '#E6BEB1'];
const starterFlowers = [
  { id: -3, x: 23, y: 50, height: 105, color: '#D2ACA9' },
  { id: -2, x: 52, y: 50, height: 137, color: '#E1C789' },
  { id: -1, x: 79, y: 50, height: 96, color: '#C5B9CF' },
];
const between = (value, min, max) => Math.max(min, Math.min(max, value));
const starterDucks = [
  { id: -2, x: 30, y: 65, left: false, tiny: false },
  { id: -1, x: 73, y: 73, left: true, tiny: true },
];

// A few clean shapes, one dot eye, and no outlines competing with the artwork.
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


function WorldFlower({ mark }) {
  return (
    <svg className="world-flower" viewBox="0 0 58 145" preserveAspectRatio="none"
      style={{ left: `${mark.x}%`, height: `${mark.height}px`, zIndex: Math.round(mark.height) }} aria-hidden="true">
      <path d="M29 142 Q34 104 28 39" fill="none" stroke="#8DAD92" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M29 103 Q9 81 5 98 Q15 116 29 111 M29 119 Q50 90 54 111 Q42 127 29 127"
        fill="#BFD4BC" stroke="#92B49A" strokeWidth="1" />
      <g transform="translate(28 34)" fill={mark.color} stroke="#B5A6A0" strokeWidth=".65">
        {[0, 60, 120, 180, 240, 300].map(a => <ellipse key={a} transform={`rotate(${a})`} cx="0" cy="-14" rx="8" ry="16" />)}
        <circle r="7.6" fill="#EDD69E" stroke="none" />
      </g>
    </svg>
  );
}

function WorldBackdrop({ scene }) {
  if (scene === 'meadow') return (<svg className="world-backdrop-art" viewBox="0 0 720 380" preserveAspectRatio="none" aria-hidden="true">
  <circle cx="575" cy="84" r="37" fill="#FFFAE9" opacity=".9" />
  <path d="M0 226 C110 192 174 237 260 216 S444 202 530 219 S645 210 720 188 L720 286 L0 286Z" fill="#E6EEE2" />
  <g fill="none" stroke="#B4CBAE" strokeWidth="1.6" strokeLinecap="round" opacity=".7">
    <path d="M64 238 v-15 m0 5 l-9 -8 m9 10 l9 -7 M114 244 v-21 m0 8 l-11 -8 M605 235 v-13 m0 7 l10 -9 M656 229 v-17 m0 7 l-9 -8" />
  </g>
  <g fill="#C5D7BD" opacity=".65"><circle cx="55" cy="222" r="3"/><circle cx="106" cy="221" r="2.5"/><circle cx="650" cy="209" r="3"/></g>
</svg>);
  if (scene === 'pond') return (<svg className="world-backdrop-art" viewBox="0 0 720 380" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 166 Q120 128 212 161 T420 152 T720 148 L720 204 L0 204 Z" fill="#D7E5D8" opacity=".9" />
  <path d="M0 181 Q160 171 290 183 T720 169" fill="none" stroke="#A9C8B6" strokeWidth="1.4" opacity=".8" />
  <g fill="none" stroke="#A7C8BF" strokeWidth="1.2" strokeLinecap="round" opacity=".75">
    <path d="M83 231 q24 -8 46 0 M226 260 q28 -9 55 0 M400 245 q24 -7 45 0 M568 291 q32 -8 60 0 M330 313 q16 -5 29 0" />
    <path d="M594 182 q2 -18 9 -31 M611 188 q5 -23 10 -32 M624 186 q9 -17 13 -21" stroke="#8DAE95"/>
  </g>
  <path d="M52 153 q11 -16 23 0 q12 -16 24 0" fill="none" stroke="#A3BAB0" strokeWidth="1.4" strokeLinecap="round" opacity=".65" />
</svg>);
  return (<svg className="world-backdrop-art" viewBox="0 0 720 380" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 257 L116 191 L181 232 L276 169 L393 251 L488 198 L591 247 L720 180 L720 350 L0 350Z" fill="#3A5358" opacity=".62" />
  <path d="M0 292 L112 252 L198 267 L281 232 L375 275 L473 247 L568 271 L720 237 L720 370 L0 370Z" fill="#344F51" opacity=".65" />
  <g fill="none" stroke="#A9B9B1" strokeWidth="1" strokeLinecap="round" opacity=".5">
    <path d="M97 105 L150 72 L207 109 L255 84"/><path d="M150 72 L165 32"/>
  </g>
  <g fill="#DDE7D9" opacity=".67"><circle cx="97" cy="105" r="2"/><circle cx="150" cy="72" r="2"/><circle cx="207" cy="109" r="2"/><circle cx="255" cy="84" r="2"/><circle cx="165" cy="32" r="2"/></g>
  <g fill="#294747" opacity=".68"><path d="M69 324 l20 -71 20 71Z M106 326 l25 -83 25 83Z M617 324 l23 -77 23 77Z M665 329 l15 -60 16 60Z"/></g>
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
    const x = fromPointer ? (e.clientX - bounds.left) / bounds.width * 100 : 10 + ((id * 61.8) % 80);
    const y = fromPointer ? (e.clientY - bounds.top) / bounds.height * 100 : 27 + ((id * 29.4) % 43);
    const item = {
      id,
      x: between(x, 9, 91),
      y: scene === 'pond' ? between(y, 58, 80) : between(y, 18, 77),
      left: id % 2 === 0, tiny: id % 3 === 0,
      color: petalColors[id % petalColors.length],
      height: 86 + (id * 19) % 62,
      size: 13 + id % 4 * 2,
    };
    setMarks(prev => ({
      ...prev,
      // A scene stays uncluttered, but planting never stops. Older flowers
      // give way to new ones while the lifetime count keeps increasing.
      [scene]: [...prev[scene], item].slice(-MAX_ON_SCREEN[scene]),
    }));
    setCounts(prev => ({ ...prev, [scene]: prev[scene] + 1 }));
  }

  function clearScene() {
    setMarks(prev => ({ ...prev, [scene]: scene === 'pond' ? starterDucks : [] }));
    setCounts(prev => ({ ...prev, [scene]: scene === 'pond' ? starterDucks.length : 0 }));
  }

  function onStageKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addMark({ detail: 0 });
    }
  }

  return (
    <div className="little-worlds" aria-label="Three little interactive worlds">
      <div className="world-tabs" role="group" aria-label="Choose a scene">
        {sceneOptions.map(item => (
          <button key={item.id} type="button" className={`world-tab ${scene === item.id ? 'is-active' : ''}`}
            aria-pressed={scene === item.id} onClick={() => setScene(item.id)}>
            <span aria-hidden="true">{item.glyph}</span> {item.title}
          </button>
        ))}
      </div>
      <div key={scene} className={`world-stage world-${scene}`} role="button" tabIndex={0}
        aria-label={`${active.action}. Press Enter or Space, or tap the scene.`}
        onKeyDown={onStageKey} onClick={addMark}>
        <WorldBackdrop scene={scene} />
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
          <div className="world-moon"/><div className="world-night-hill"/>
          <span className="world-fixed-star star-a">✦</span>
          <span className="world-fixed-star star-b">✧</span>
          <span className="world-fixed-star star-c">·</span>
          {marks.night.map(mark => <span key={mark.id} className="world-star" aria-hidden="true"
            style={{ left: `${mark.x}%`, top: `${mark.y}%`, fontSize: `${mark.size}px` }}>✧</span>)}
        </>}
        <span className="world-tap-note">tap anywhere ✳</span>
      </div>
      <div className="world-actions">
        <button className="world-action-primary" type="button" onClick={() => addMark({ detail: 0 })}>
          <span aria-hidden="true">＋</span> {active.action}
        </button>
        <button className="world-action-reset" type="button" onClick={clearScene}>start fresh ↺</button>
      </div>
    </div>
  );
}
