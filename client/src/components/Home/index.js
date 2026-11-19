import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faPython, faSwift, faNodeJs, faJs, faGithub, faLinkedin, faGitAlt } from '@fortawesome/free-brands-svg-icons';
import AsciiBunny from './AsciiBunny';
import CreativeScenes from './CreativeScenes';
import detectorImage from '../../assets/images/image_detector.png';
import optimizerImage from '../../assets/images/portfolio_optimizer_kelly.png';
import headshot from '../../assets/images/kelly-headshot-2026.webp';
import './index.scss';

const RESUME_URL = `${process.env.PUBLIC_URL || ''}/TRUONG_KELLY.pdf`;

const education = [
  'Columbia University · B.S. Computer Science',
  'Expected May 2027',
];

// Resume + repository-backed case studies. Planned Scrap improvements are
// explicitly separated from features already checked off in its README.
const projectIcon = {
  React: faReact, Python: faPython, Swift: faSwift, 'Node.js': faNodeJs,
  JavaScript: faJs, Git: faGitAlt,
};

function TechTag({ name }) {
  const icon = projectIcon[name];
  return <span className="tech-tag">{icon && <FontAwesomeIcon icon={icon} aria-hidden="true" className="tech-tag-icon" />}<span>{name}</span></span>;
}

const studioIdeas = [
  {
    no: '01', state: 'NEXT ITERATION', category: 'PRODUCT DESIGN · IOS',
    title: 'Scrap, the next chapter', mark: '✿', tone: 'warm',
    copy: 'Next for Scrap: editing, persistent memories, multi-photo stories, and optional music. Planned, not yet shipped.',
    tags: ['UX flows', 'Swift', 'Prototyping'],
    link: 'https://github.com/superrrk/ios101-capstone', linkLabel: 'see the current app',
  },
  {
    no: '02', state: 'EXPERIMENTING', category: 'INTERACTION · CREATIVE CODE',
    title: 'Tiny interfaces', mark: '✳', tone: 'sage',
    copy: 'Small experiments in code and motion, including this ASCII bunny and its little worlds.',
    tags: ['Canvas', 'Motion', 'Human–computer interaction'],
    link: '#playground', linkLabel: 'try a little experiment',
  },
];

const projects = [
  {
    no: '01', status: 'BUILT + TESTED', title: 'AI-Generated Image Detector', type: 'MACHINE LEARNING / FULL STACK',
    description: 'A full-stack tool for checking whether face images are AI-generated. I trained a custom PyTorch CNN, exposed predictions through Flask, and built an interactive React interface with model confidence and saliency maps.',
    highlight: '87% accuracy on a 1,000+ image dataset',
    skills: ['Python', 'PyTorch', 'Flask', 'React', 'AWS S3'],
    github: 'https://github.com/superrrk/image-detector',
    image: detectorImage,
    alt: 'Screenshot of the AI-generated image detector interface',
    visual: 'image-visual',
    note: 'Deep learning · deployed application',
  },
  {
    no: '02', status: 'IOS CAPSTONE', title: 'Scrap', type: 'IOS DEVELOPMENT / PRODUCT DESIGN',
    description: 'An iOS memory scrapbook for couples and friends. Built in Swift and UIKit, it lets people capture a photo, date and caption, choose a background color, browse a memory feed, and open individual memory pages.',
    highlight: 'Native iOS experience · photo-based memory cards',
    skills: ['Swift', 'UIKit', 'Xcode', 'iOS'],
    github: 'https://github.com/superrrk/ios101-capstone',
    visual: 'scrap-visual',
    note: 'CodePath iOS101 · capstone',
    roadmap: ['Strengthen on-device persistence', 'Edit and delete existing memories', 'Optional song links and multi-photo entries'],
  },
  {
    no: '03', status: 'COLLABORATIVE BUILD', title: 'Markowitz Portfolio Optimizer', type: 'FINTECH / DATA VISUALIZATION',
    description: 'A collaborative web application exploring Modern Portfolio Theory. I implemented risk-return analytics including Sharpe ratio and portfolio variance with NumPy and visualized the efficient frontier using interactive charts.',
    highlight: 'Interactive efficient frontier and portfolio analytics',
    skills: ['Python', 'Flask', 'NumPy', 'Chart.js', 'Git'],
    github: 'https://github.com/superrrk/portfolio-optimizer',
    image: optimizerImage,
    alt: 'Screenshot of the Markowitz portfolio optimizer visualization',
    visual: 'optimizer-visual',
    note: 'Collaborative project · optimization',
  },
  {
    no: '04', status: 'LIVE CREATIVE CODE', title: 'ASCII Daydream', type: 'CREATIVE CODING / FRONTEND',
    description: 'This portfolio is a small creative coding experiment: a custom Canvas ASCII bunny with autonomous hopping, flowing glyphs, and a generative flower garden.',
    highlight: 'Custom Canvas animation · responsive, accessible interactions',
    skills: ['React', 'JavaScript', 'Canvas', 'SVG', 'SCSS'],
    github: 'https://github.com/superrrk/portfolio-kelly',
    visual: 'daydream-visual',
    note: 'You are exploring it right now',
    internal: '#playground',
  },
];

function ScrapArt() {
  return <div className="scrap-illustration" role="img" aria-label="Illustration of the Scrap iOS memory journal concept; not a screenshot">
    <span className="scrap-scribble" aria-hidden="true">a little collection of moments ♡</span>
    <div className="scrap-polaroid"><span className="scrap-polaroid-photo"><span aria-hidden="true">✳</span></span><span>slow afternoons, saved forever</span></div>
    <div className="scrap-phone"><div className="scrap-notch"/><p className="scrap-phone-name">scrap <span>✿</span></p><span className="scrap-phone-kicker">our little memories</span><div className="scrap-memory-card"><span className="scrap-memory-flower">✳</span><span className="scrap-memory-date">11.14 · saturday</span><strong>a little day worth saving</strong><span className="scrap-memory-note">photos, dates & tiny stories</span></div><div className="scrap-phone-footer"><span>memories</span><span>＋</span></div></div>
    <span className="scrap-asterisk" aria-hidden="true">✧</span>
    <span className="project-illustration-disclaimer">UI CONCEPT · NOT AN APP SCREENSHOT</span>
  </div>;
}

function DaydreamArt() {
  return <div className="daydream-illustration" role="img" aria-label="An illustration of characters that form a rabbit, reflecting the live Canvas animation in this portfolio">
    <span className="daydream-mini-label">CREATIVE COMPUTING / 004</span>
    <pre aria-hidden="true">{`      /\\     __
     / +\\ __/  \\
    /.:. / + +  \\
   ( .  (  o  o  )
    \\ +  \\  ᴗ  /
     \\::  '---'
       \\  |  /
       (___|__)`}</pre>
    <span className="daydream-mini-footer">the little bunny who lives on this page ✳</span>
  </div>;
}

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
            <a onClick={closeMenu} href="#work">work</a><a onClick={closeMenu} href="#experience">experience</a><a onClick={closeMenu} href="#studio">the studio</a><a onClick={closeMenu} href="#about">about</a><a onClick={closeMenu} href="#playground">play</a><a onClick={closeMenu} className="resume-nav" href={RESUME_URL} target="_blank" rel="noopener noreferrer">résumé ↗</a>
          </nav>
        </div>
      </header>
      <main>
        <section className="site-container hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="kicker"><span className="kicker-dot"/> SOFTWARE ENGINEER / CURIOUS MAKER</div>
            <h1 id="hero-title">hi, i'm <em>kelly.</em></h1>
            <h2>i make complex things<br/><i>feel a little more human.</i></h2>
            <p>I'm a Columbia computer science student who builds across AI infrastructure, full-stack systems, and thoughtful iOS experiences — with a soft spot for design.</p>
            <div className="hero-ctas"><a className="btn btn-dark" href="#work">explore my work <span aria-hidden="true">↗</span></a><a className="btn btn-light" href={RESUME_URL} target="_blank" rel="noopener noreferrer">view résumé ↗</a><span className="social-icon-pair" aria-label="Social profiles"><a className="social-icon-link" href="https://www.linkedin.com/in/kellybtruong/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} aria-hidden="true" /></a><a className="social-icon-link" href="https://github.com/superrrk" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><FontAwesomeIcon icon={faGithub} aria-hidden="true" /></a></span></div>
            <div className="hero-side-note"><span>NEW YORK, NY</span><span>EXPECTED GRADUATION · MAY 2027</span></div>
          </div>
          <AsciiBunny />
        </section>
        <div className="site-container fineprint-strip"><span>001 / A LITTLE CURIOSITY</span><span>IBM + BP ✳ AI AGENTS ✳ IOS ✳ CREATIVE COMPUTING</span><span>SCROLL TO WANDER ↓</span></div>
        <section className="site-container section-pad" id="work" aria-labelledby="work-title">
          <div className="section-header fade-up"><div><div className="eyebrow">01 / SELECTED WORK</div><h2 id="work-title" className="section-heading">things i've <em>built.</em></h2></div><p>Selected technical work with real implementation details. The playful experiments have their own space below.</p></div>
          <article className="work-feature fade-up">
            <AgentDiagram />
            <div className="work-feature-copy"><div className="eyebrow">FEATURED EXPERIENCE / IBM · 2026</div><h3>Building for<br/><em>AI agents.</em></h3><p>At IBM, I worked on human-in-the-loop workflows, stateful LangGraph execution, Node.js support in the Agent Development Kit, and file-message handling across the full stack.</p><div className="tag-row">{["LangGraph", "Node.js", "TypeScript", "Python"].map(name => <TechTag key={name} name={name} />)}</div><a href="#experience" className="inline-link">read about my experience <span>↗</span></a></div>
          </article>
          <div className="project-grid">
            {projects.map(p => <article className="project-card fade-up" key={p.no}>
              <div className={`project-image-wrap ${p.visual}`}>
                <div className="project-image-index">{p.no} / PROJECT STUDY</div>
                {p.image ? <img loading="lazy" src={p.image} alt={p.alt} /> : p.visual === 'scrap-visual' ? <ScrapArt /> : <DaydreamArt />}
              </div>
              <div className="project-card-meta"><span>{p.type}</span><span className="project-status">{p.status}</span></div>
              <h3>{p.title}</h3>
              <span className="project-context">{p.note}</span>
              <p>{p.description}</p>
              <p className="project-highlight"><span aria-hidden="true">✳</span>{p.highlight}</p>
              <div className="tag-row">{p.skills.map(name => <TechTag key={name} name={name}/>)}</div>
              {p.roadmap && <details className="project-roadmap"><summary>what i'm building next <span aria-hidden="true">↗</span></summary><ul>{p.roadmap.map(item=><li key={item}>{item}</li>)}</ul><small>Planned improvements, not released features.</small></details>}
              <div className="project-actions"><a className="inline-link" href={p.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="project-link-icon" aria-hidden="true"/> view source <span>↗</span></a>{p.internal && <a href={p.internal} className="inline-link">try the experiment <span>↗</span></a>}</div>
            </article>)}
          </div>
        </section>
        <div className="site-container"><ThreadDivider /></div>
        <section className="site-container section-pad experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-header experience-intro-block fade-up"><div><div className="eyebrow">02 / THE REAL-WORLD BITS</div><h2 id="experience-title" className="section-heading">a bit of <em>experience.</em></h2></div><p>A few places where I've gotten to turn ideas into working systems.</p></div>
          <div className="experience-list fade-up">
            <article className="experience-item">
              <div className="experience-date"><span className="experience-index">01 / INDUSTRY</span><time>MAY — AUG 2026</time><span>AUSTIN, TX</span></div>
              <div className="experience-main"><div className="experience-heading"><h3>IBM <span className="experience-hairline" aria-hidden="true"/> <small>Software Engineering Intern</small></h3><span className="experience-chip">Agent infrastructure</span></div>
                <p className="experience-subtitle">watsonx Orchestrate · Agent Development Kit · LangGraph</p>
                <ul>
                  <li><strong>Enabled concurrent human–agent workflows</strong> by implementing checkpoint-backed interrupt messaging across UI, APIs, and runtime, with per-task execution state and correct correlation of user responses to paused LangGraph runs.</li>
                  <li><strong>Extended the ADK to JavaScript and TypeScript</strong> through Node.js agent support, bringing feature parity with Python-based agents for stateful execution.</li>
                  <li><strong>Connected documents to agent workflows</strong> by building full-stack file-message handling for uploads and generated artifacts across the UI, APIs, and agent execution.</li>
                </ul>
                <div className="experience-tools">{['TypeScript','Node.js','Python','LangGraph'].map(name=><TechTag name={name} key={name}/>)}</div>
              </div>
              <span className="experience-ornament" aria-hidden="true">✳</span>
            </article>
            <article className="experience-item">
              <div className="experience-date"><span className="experience-index">02 / INDUSTRY</span><time>MAY — AUG 2024</time><span>HOUSTON, TX</span></div>
              <div className="experience-main"><div className="experience-heading"><h3>bp <span className="experience-hairline" aria-hidden="true"/> <small>Software Engineering Intern</small></h3><span className="experience-chip">Optimization & quantum</span></div>
                <p className="experience-subtitle">Mixed Integer Programming · QUBO · Qiskit</p>
                
                <ul>
                  <li><strong>Built benchmarking pipelines</strong> comparing quantum, hybrid, and classical MIP solvers, mitigating constraint violations in <strong>95% of test cases</strong>.</li>
                  <li><strong>Improved QUBO transformations</strong> with Python and Qiskit, <strong>increasing solver throughput by 80%</strong>.</li>
                  <li><strong>Presented technical results to 40+ stakeholders</strong>, making solver performance and business tradeoffs understandable to mixed audiences.</li>
                </ul>
                <div className="experience-tools">{['Python','Qiskit','Optimization'].map(name=><TechTag name={name} key={name}/>)}</div>
              </div>
              <span className="experience-ornament" aria-hidden="true">✧</span>
            </article>
          </div>
          <div className="education-card fade-up"><div className="eyebrow">EDUCATION & COMMUNITY</div><strong>{education[0]}</strong><span>{education[1]}</span><p>QuestBridge National Match Scholar · Gates Scholar · Dell Scholar</p><p>CodePath · iOS Development Honors Certificate (iOS101) · Technical Interview Prep (TIP102)</p><p>Columbia Vietnamese Students Association · VP / Marketing Chair · Columbia Esports Gaming · Treasurer / Marketing</p></div>
          <div className="skills-area fade-up"><div className="eyebrow">A FEW TOOLS I REACH FOR</div><div className="skills-grid"><div><strong>languages</strong><p>Python · Java · Swift · C · JavaScript · TypeScript · SQL</p></div><div><strong>frameworks & libraries</strong><p>React · Flask · Node.js · LangGraph · PyTorch · NumPy · Chart.js</p></div><div><strong>tools & cloud</strong><p>Git · GitHub Actions · AWS S3 · AWS CLI · Netlify · Xcode · VS Code</p></div></div></div>
        </section>
        <section className="studio-section" id="studio" aria-labelledby="studio-title">
          <div className="site-container">
            <div className="studio-header fade-up">
              <div><div className="eyebrow">03 / THE CREATIVE STUDIO</div><h2 id="studio-title" className="section-heading">in the <em>oven.</em></h2></div>
              <div className="studio-intro"><p>Not every idea begins as a finished product. This is where iOS design and small interactive experiments keep evolving.</p><span>WORK IN PROGRESS / IDEAS ARE NOT SHIPPED FEATURES</span></div>
            </div>
            <div className="studio-grid">
              {studioIdeas.map(item=><article className={`studio-card studio-${item.tone} fade-up`} key={item.no}>
                <div className="studio-card-top"><span>{item.no} / {item.category}</span><span className="studio-state"><span aria-hidden="true" className="studio-state-dot" />{item.state}</span></div>
                <div className="studio-art" aria-hidden="true"><span className="studio-line"/><span className="studio-mark">{item.mark}</span><span className="studio-mark-mini">✧</span></div>
                <h3>{item.title}</h3><p>{item.copy}</p>
                <div className="studio-tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
                <div className="studio-card-bottom">{item.link?<a href={item.link} className="inline-link" target={item.link.startsWith('https')?'_blank':undefined} rel={item.link.startsWith('https')?'noopener noreferrer':undefined}>{item.linkLabel} <span>↗</span></a>:<span className="studio-pending">artwork will live here as it grows ↗</span>}</div>
              </article>)}
            </div>
          </div>
        </section>
        <section className="about-section" id="about" aria-labelledby="about-title"><div className="site-container about-grid">
          <div className="about-photo-wrap fade-up"><div className="about-photo-frame"><img loading="lazy" decoding="async" src={headshot} alt="Portrait of Kelly Truong smiling in a white top" /></div><span className="about-doodle doodle-one">✳</span><span className="about-doodle doodle-two">hello, from the other side of the screen ↗</span></div>
          <div className="about-copy fade-up"><div className="eyebrow">04 / BEHIND THE CODE</div><h2 id="about-title" className="section-heading">a curious mind,<br/><em>busy hands.</em></h2><p>I'm Kelly, a computer science student at Columbia University who likes building at the intersection of systems, design, and the way people actually use technology.</p><p>I also love how software and visual design influence one another. I'm learning crochet, making matcha, and making space for drawing, product thinking, and new iOS ideas.</p><div className="little-things"><span>✳ learning crochet</span><span>♡ little bunnies</span><span>🍵 matcha breaks</span></div><a className="inline-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">the more official version ↗</a></div>
        </div></section>
        <section className="playground-section" id="playground" aria-labelledby="playground-title"><div className="site-container playground-grid">
          <div className="playground-copy fade-up"><div className="eyebrow">05 / LITTLE WORLDS</div><h2 id="playground-title" className="section-heading">a little<br/><em>wonder.</em></h2><p>Three tiny scenes. Pick one, then play.</p></div><CreativeScenes />
        </div></section>
      </main>
      <footer className="site-container daydream-footer" id="contact"><div className="eyebrow">06 / SAY HELLO</div><h2>have a little <em>idea?</em></h2><p>Whether it's a collaboration, an engineering challenge, or a curious question, I'd love to hear about it.</p><div className="footer-actions"><a className="btn btn-dark" href="mailto:truong.kelly17@gmail.com">send me a note ↗</a><span className="social-icon-pair" aria-label="Social profiles"><a className="social-icon-link" href="https://github.com/superrrk" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><FontAwesomeIcon icon={faGithub} aria-hidden="true" /></a><a className="social-icon-link" href="https://www.linkedin.com/in/kellybtruong/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} aria-hidden="true" /></a></span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} KELLY TRUONG</span><span>MADE WITH CODE, CURIOSITY & A LITTLE YARN ✳</span><a href="#top">back to top ↑</a></div></footer>
    </div>
  );
}
