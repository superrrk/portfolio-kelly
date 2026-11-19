import { useEffect, useState } from 'react';
import AsciiBunny from './AsciiBunny';
import detectorImage from '../../assets/images/image_detector.png';
import optimizerImage from '../../assets/images/portfolio_optimizer_kelly.png';
import headshot from '../../assets/images/kelly-headshot-2026.webp';
import './index.scss';

const RESUME_URL = `${process.env.PUBLIC_URL || ''}/TRUONG_KELLY.pdf`;

const education = [
  'Columbia University · B.S. Computer Science',
  'Expected May 2027',
];

const projects = [
  {
    no: '01', title: 'AI-Generated Image Detector', type: 'MACHINE LEARNING · FULL STACK',
    description: 'A full-stack image verification tool combining a PyTorch CNN, Flask API, and React frontend. Achieved 87% accuracy classifying AI-generated versus real faces on a dataset of more than 1,000 images.',
    skills: ['Python', 'React', 'PyTorch', 'Flask', 'AWS S3'],
    github: 'https://github.com/superrrk/image-detector',
    image: detectorImage,
    alt: 'Screenshot from the AI-Generated Image Detector project',
    visual: 'image-visual',
  },
  {
    no: '02', title: 'Markowitz Portfolio Optimizer', type: 'DATA ANALYTICS · FULL STACK',
    description: 'A collaborative financial analysis application that calculates Sharpe ratio and portfolio variance with NumPy, then brings the results to life in interactive Chart.js visualizations.',
    skills: ['Python', 'Flask', 'React', 'NumPy', 'Chart.js'],
    github: 'https://github.com/superrrk/portfolio-optimizer',
    image: optimizerImage,
    alt: 'Screenshot from the Markowitz Portfolio Optimizer project',
    visual: 'optimizer-visual',
  },
];

function AgentDiagram() {
  const points = [[45,82],[133,35],[221,82],[133,132],[307,46],[307,123]];
  return (
    <div className="agent-art" aria-label="Abstract system diagram connecting agents and workflows" role="img">
      <span className="agent-art-label">AGENT SYSTEMS / FIELD NOTES</span>
      <svg viewBox="0 0 350 175" aria-hidden="true">
        <path d="M45 82L133 35L221 82L133 132Z M133 35V132 M45 82H221 M221 82L307 46 M221 82L307 123" fill="none" stroke="#8ca999" strokeWidth="1.25" />
        {points.map(([x,y],index)=><g key={index}><circle cx={x} cy={y} r={index===2?14:8} fill={index===2?'#adc5b1':'#eef4ed'} stroke="#7f9f8a" strokeWidth="1.4"/><circle cx={x} cy={y} r="2.5" fill="#82a58b" /></g>)}
        <text x="133" y="161" textAnchor="middle" fill="#718b77" fontSize="9" fontFamily="monospace">state · tools · people</text>
      </svg>
      <span className="agent-art-stamp">made of many little moving parts ✳</span>
    </div>
  );
}

function ThreadDivider() {
  return <svg className="daydream-thread" viewBox="0 0 1200 140" preserveAspectRatio="none" aria-hidden="true"><path d="M0 98 C134 140 236 13 345 84 S552 153 637 76 S803 14 852 81 S1053 118 1200 36" /></svg>;
}

function Garden() {
  const [flowers, setFlowers] = useState([]);
  const colors = ['#d5ada6', '#e9cf8a', '#bdcdb8', '#c6b8d1', '#e1bdb6'];
  const add = () => setFlowers(items => {
    if(items.length >= 14) return items;
    const i=items.length;
    return [...items,{id:i,left:12+((i*47.3)%75),height:68+((i*29)%74),color:colors[i%colors.length]}];
  });
  return (
    <div className="garden-panel" role="group" aria-label="A little flower garden that you can grow">
      <div className="garden-actions"><button type="button" className="btn btn-dark" onClick={add}>plant a flower ✳</button><button type="button" className="btn btn-quiet" onClick={()=>setFlowers([])}>start fresh ↺</button></div>
      <div className="garden-canvas" onClick={add} role="button" tabIndex={0} aria-label="Plant a flower" onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();add();}}}>
        <span className="garden-small-title">AN EXPERIMENT IN GROWING THINGS</span>
        <span className="garden-count">{String(flowers.length).padStart(2,'0')} / 14</span>
        <span className="garden-placeholder">{flowers.length===0?'a tiny garden is waiting for you…':''}</span>
        <span className="garden-ground" aria-hidden="true" />
        {flowers.map(f=><svg key={f.id} className="garden-flower" style={{left:`${f.left}%`,height:`${f.height}px`}} viewBox="0 0 64 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M32 157 Q28 118 32 43" stroke="#8ca98e" strokeWidth="2.5" fill="none" />
          <path d="M32 109Q10 80 4 94Q8 119 32 123 M30 92Q46 64 59 79Q58 102 30 110" fill="#bed0b9" stroke="#97b09a" strokeWidth="1.2" />
          <g transform="translate(32 38)" fill={f.color} stroke="#aa9f9a" strokeWidth=".7">
            {[0,60,120,180,240,300].map(a=><ellipse key={a} transform={`rotate(${a})`} cx="0" cy="-15" rx="9" ry="17"/>)}
            <circle r="9" fill="#e6c68b" stroke="none"/>
          </g>
        </svg>)}
      </div>
      <p className="garden-caption">Tiny generative garden · built with React and SVG</p>
    </div>
  );
}

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  useEffect(()=>{
    if(!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})},{threshold:.07});
    document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[]);
  const closeMenu=()=>setMenuOpen(false);
  return (
    <div className="daydream-site" id="top">
      <a className="skip-link" href="#work">Skip to work</a>
      <header className="daydream-header">
        <div className="site-container header-inner">
          <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Kelly Truong, back to top">kelly.truong <span>✳</span></a>
          <button className="mobile-menu-toggle" onClick={()=>setMenuOpen(o=>!o)} aria-label={menuOpen?'Close menu':'Open menu'} aria-controls="daydream-nav" aria-expanded={menuOpen}>{menuOpen?'close ×':'menu +'}</button>
          <nav id="daydream-nav" className={`header-links ${menuOpen?'is-open':''}`} aria-label="Main navigation">
            <a onClick={closeMenu} href="#work">work</a><a onClick={closeMenu} href="#experience">experience</a><a onClick={closeMenu} href="#about">about</a><a onClick={closeMenu} href="#playground">playground</a><a onClick={closeMenu} className="resume-nav" href={RESUME_URL} target="_blank" rel="noopener noreferrer">résumé ↗</a>
          </nav>
        </div>
      </header>
      <main>
        <section className="site-container hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="kicker"><span className="kicker-dot"/> SOFTWARE ENGINEER / CURIOUS MAKER</div>
            <h1 id="hero-title">hi, i'm <em>kelly.</em></h1>
            <h2>i make complex things<br/><i>feel a little more human.</i></h2>
            <p>I'm a Columbia computer science student building AI systems, thoughtful interfaces, and the occasional little daydream.</p>
            <div className="hero-ctas"><a className="btn btn-dark" href="#work">explore my work <span aria-hidden="true">↗</span></a><a className="btn btn-light" href={RESUME_URL} target="_blank" rel="noopener noreferrer">view résumé ↗</a></div>
            <div className="hero-side-note"><span>NEW YORK, NY</span><span>EXPECTED GRADUATION · MAY 2027</span></div>
          </div>
          <AsciiBunny />
        </section>
        <div className="site-container fineprint-strip"><span>001 / A LITTLE CURIOSITY</span><span>AI SYSTEMS ✳ HUMAN-CENTERED SOFTWARE ✳ CREATIVE COMPUTING</span><span>SCROLL TO WANDER ↓</span></div>
        <section className="site-container section-pad" id="work" aria-labelledby="work-title">
          <div className="section-header fade-up"><div><div className="eyebrow">01 / SELECTED WORK</div><h2 id="work-title" className="section-heading">things i've <em>built.</em></h2></div><p>Interfaces, models, and systems — made to solve problems and make new things possible.</p></div>
          <article className="work-feature fade-up">
            <AgentDiagram />
            <div className="work-feature-copy"><div className="eyebrow">FEATURED EXPERIENCE / IBM · 2026</div><h3>Building for<br/><em>AI agents.</em></h3><p>At IBM, I worked on human-in-the-loop workflows, stateful LangGraph execution, Node.js support in the Agent Development Kit, and file-message handling across the full stack.</p><div className="tag-row"><span>LangGraph</span><span>Node.js</span><span>TypeScript</span><span>Python</span></div><a href="#experience" className="inline-link">read about my experience <span>↗</span></a></div>
          </article>
          <div className="project-grid">
            {projects.map(p=><article className="project-card fade-up" key={p.no}>
              <div className={`project-image-wrap ${p.visual}`}><div className="project-image-index">{p.no} / PROJECT STUDY</div><img loading="lazy" src={p.image} alt={p.alt}/></div>
              <div className="project-card-meta">{p.type}</div><h3>{p.title}</h3><p>{p.description}</p><div className="tag-row">{p.skills.map(s=><span key={s}>{s}</span>)}</div><a className="inline-link" href={p.github} target="_blank" rel="noopener noreferrer">view source on GitHub <span>↗</span></a>
            </article>)}
          </div>
        </section>
        <div className="site-container"><ThreadDivider /></div>
        <section className="site-container section-pad experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-header fade-up"><div><div className="eyebrow">02 / THE REAL-WORLD BITS</div><h2 id="experience-title" className="section-heading">a bit of <em>experience.</em></h2></div><p>A few places where I've gotten to turn ideas into working systems.</p></div>
          <div className="experience-list fade-up">
            <div className="experience-item"><div className="experience-date">MAY — AUG 2026</div><div><h3>Software Engineering Intern <span>· IBM</span></h3><p>Austin, TX · watsonx Orchestrate / Agent Development Kit</p><ul><li>Implemented checkpoint-backed interrupt messaging across the UI, APIs, and agent runtime, persisting per-task execution state and correlating user responses with the correct paused LangGraph run. This enabled isolated, concurrent human–agent workflows.</li><li>Extended the Agent Development Kit with Node.js support for JavaScript and TypeScript agents, bringing feature parity with Python agents across stateful execution workflows.</li><li>Built end-to-end file-message handling across the UI, APIs, and agent execution boundaries so uploaded documents could enter LangGraph workflows and generated artifacts could return to users.</li></ul></div><span className="experience-ornament">✳</span></div>
            <div className="experience-item"><div className="experience-date">MAY — AUG 2024</div><div><h3>Software Engineering Intern <span>· bp</span></h3><p>Houston, TX · Optimization / Quantum Computing</p><ul><li>Built benchmarking pipelines comparing quantum, hybrid, and classical solvers for mixed-integer programming (MIP) problems, mitigating constraint violations in 95% of test cases.</li><li>Improved and integrated QUBO transformation algorithms using Python and Qiskit, increasing solver throughput by 80%.</li><li>Presented results to more than 40 stakeholders, connecting technical performance measurements to business impact.</li></ul></div><span className="experience-ornament">✧</span></div>
          </div>
          <div className="education-card fade-up"><div className="eyebrow">EDUCATION & COMMUNITY</div><strong>{education[0]}</strong><span>{education[1]}</span><p>QuestBridge National Match Scholar · Gates Scholar · Dell Scholar</p><p>CodePath · iOS Development Honors Certificate (iOS101) · Technical Interview Prep (TIP102)</p><p>Columbia Vietnamese Students Association · VP / Marketing Chair · Columbia Esports Gaming · Treasurer / Marketing</p></div>
          <div className="skills-area fade-up"><div className="eyebrow">A FEW TOOLS I REACH FOR</div><div className="skills-grid"><div><strong>languages</strong><p>Python · Java · Swift · C · JavaScript · TypeScript · SQL</p></div><div><strong>frameworks & libraries</strong><p>React · Flask · Node.js · LangGraph · PyTorch · NumPy · Chart.js</p></div><div><strong>tools & cloud</strong><p>Git · GitHub Actions · AWS S3 · AWS CLI · Netlify · Xcode · VS Code</p></div></div></div>
        </section>
        <section className="about-section" id="about" aria-labelledby="about-title"><div className="site-container about-grid">
          <div className="about-photo-wrap fade-up"><div className="about-photo-frame"><img loading="lazy" decoding="async" src={headshot} alt="Portrait of Kelly Truong smiling in a white top" /></div><span className="about-doodle doodle-one">✳</span><span className="about-doodle doodle-two">hello, from the other side of the screen ↗</span></div>
          <div className="about-copy fade-up"><div className="eyebrow">03 / BEHIND THE CODE</div><h2 id="about-title" className="section-heading">a curious mind,<br/><em>busy hands.</em></h2><p>I'm Kelly, a computer science student at Columbia University who likes building at the intersection of systems, design, and the way people actually use technology.</p><p>When I'm away from my keyboard, I'm usually learning a crochet stitch, making matcha, or finding a small creative project to obsess over.</p><div className="little-things"><span>✳ learning crochet</span><span>♡ little bunnies</span><span>🍵 matcha breaks</span></div><a className="inline-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">the more official version ↗</a></div>
        </div></section>
        <section className="playground-section" id="playground" aria-labelledby="playground-title"><div className="site-container playground-grid">
          <div className="playground-copy fade-up"><div className="eyebrow">04 / A LITTLE PLAY</div><h2 id="playground-title" className="section-heading">things made<br/><em>just because.</em></h2><p>I like interfaces that invite you to explore. This little interactive garden is one of those things — tap to leave a flower behind.</p><p className="playground-note">✧ a small experiment, no login required</p></div><Garden />
        </div></section>
      </main>
      <footer className="site-container daydream-footer" id="contact"><div className="eyebrow">05 / SAY HELLO</div><h2>have a little <em>idea?</em></h2><p>Whether it's a collaboration, an engineering challenge, or a curious question, I'd love to hear about it.</p><div className="footer-actions"><a className="btn btn-dark" href="mailto:truong.kelly17@gmail.com">send me a note ↗</a><a className="btn btn-light" href="https://github.com/superrrk" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a className="btn btn-light" href="https://linkedin.com/in/kellybtruong" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} KELLY TRUONG</span><span>MADE WITH CODE, CURIOSITY & A LITTLE YARN ✳</span><a href="#top">back to top ↑</a></div></footer>
    </div>
  );
}
