/* PORTFOLIO_SIMPLE_FIVE_SECTIONS_2026 */
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faPython, faSwift, faNodeJs, faJs, faGithub, faLinkedin, faGitAlt } from '@fortawesome/free-brands-svg-icons';
import AsciiBunny from './AsciiBunny';
import CreativeScenes from './CreativeScenes';
import CrochetGallery from './CrochetGallery';
import detectorImage from '../../assets/images/image_forensics_ai_or_not_preview.webp';
import buildplayCover from '../../assets/images/buildplay-cover.webp';
import optimizerImage from '../../assets/images/portfolio_optimizer_kelly.png';
import headshot from '../../assets/images/kelly-headshot-2026.webp';
import './index.scss';

const RESUME_URL = `${process.env.PUBLIC_URL || ''}/TRUONG_KELLY.pdf`;
const IOS_RESUME_URL = `${process.env.PUBLIC_URL || ''}/TRUONG_KELLY_iOS.pdf`;

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
    // image-forensics-case-study-v1: documented pilot results; not a universal authenticity verdict.
    no: '01', status: 'LIVE · EXPERIMENTAL', title: 'Image Forensics Lab', type: 'COMPUTER VISION / FULL-STACK ENGINEERING',
    description: 'An interactive image-forensics lab, built end-to-end: upload, drag-and-drop or paste JPEG/PNG/WEBP images; inspect EXIF, sharpness, entropy and recompression differences; and run an experimental PyTorch ResNet18 classifier through a Flask API. Deployed as a Docker container on Google Cloud Run.',
    shortDescription: 'A live image-inspection app combining forensic signals and PyTorch ResNet18 inference through Flask, deployed on Google Cloud Run.',
    highlight: '88.3% held-out pilot accuracy · 1.7% false-positive rate (n=120)',
    skills: ['Python', 'PyTorch', 'Flask', 'Docker', 'Google Cloud Run'],
    site: 'https://image-forensics-lab-b2kau74dlq-ue.a.run.app',
    github: 'https://github.com/superrrk/image-detector',
    image: detectorImage,
    alt: 'Illustrative AI or Not portfolio preview featuring a fictional pastel landscape and an AI-like example verdict, not a live prediction',
    visual: 'forensics-visual',
    note: 'ResNet18-v2 · ELSA_D3 pilot · validation-selected threshold',
    forensics: true,
  },
  {
    no: '02', status: 'PLAY ONLINE · IOS IN TESTFLIGHT', title: 'BuildPlay', type: 'CASUAL MULTIPLAYER GAMES / COLUMBIA',
    description: 'A collaborative class project created with my teammates for Casual Multiplayer Games at Columbia University. The web experience is available to play now; the companion iOS app is currently in TestFlight as our team prepares for a public release.',
    shortDescription: 'A multiplayer games platform built with classmates at Columbia. Play on the web; the iOS companion is being tested through TestFlight.',
    highlight: 'Playable web experience · companion iOS app in testing',
    skills: ['Multiplayer', 'Web', 'iOS', 'Team Project'],
    site: 'https://buildplay.fun/',
    github: 'https://github.com/yoav-zibin/course',
    sourceLabel: 'course source code',
    image: buildplayCover,
    alt: 'Pastel BuildPlay project artwork featuring a collaborative tabletop game; concept art, not gameplay footage',
    visual: 'buildplay-visual',
    note: 'Columbia University · Casual Multiplayer Games · team project',
    playWeb: true,
  },
  {
    no: '03', status: 'IOS CAPSTONE', title: 'Scrap', type: 'IOS DEVELOPMENT / PRODUCT DESIGN',
    description: 'An iOS memory scrapbook for couples and friends. Built in Swift and UIKit, it lets people capture a photo, date and caption, choose a background color, browse a memory feed, and open individual memory pages.',
    shortDescription: 'A native Swift and UIKit scrapbook for saving photos, dates, and memories, with a customizable feed and detail views.',
    highlight: 'Native iOS experience · photo-based memory cards',
    skills: ['Swift', 'UIKit', 'Xcode', 'iOS'],
    github: 'https://github.com/superrrk/ios101-capstone',
    visual: 'scrap-visual',
    note: 'CodePath iOS101 · capstone',
    roadmap: ['Strengthen on-device persistence', 'Edit and delete existing memories', 'Optional song links and multi-photo entries'],
  },
  {
    no: '04', status: 'TEAM UI PROJECT', title: 'Study Buddy', type: 'USER INTERFACE DESIGN / COLUMBIA',
    description: 'Explore the Figma design for our interface work.',
    highlight: 'Collaborative UI design · semester project',
    skills: ['Figma', 'UI Design', 'Team Project'],
    figma: 'https://www.figma.com/design/sSTbOr0Uc0K6kS1FGANxi8/UI-Semester-Project?t=nm4ZH2jNAE0C46gY-1',
    visual: 'studybuddy-visual',
    note: 'Columbia University · team-based course project',
  },
  {
    no: '05', status: 'COLLABORATIVE BUILD', title: 'Markowitz Portfolio Optimizer', type: 'FINTECH / DATA VISUALIZATION',
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
    no: '06', status: 'LIVE CREATIVE CODE', title: 'ASCII Daydream', type: 'CREATIVE CODING / FRONTEND',
    description: 'This portfolio is a small creative coding experiment: a custom Canvas ASCII bunny with autonomous hopping, flowing glyphs, and a generative flower garden.',
    highlight: 'Custom Canvas animation · responsive, accessible interactions',
    skills: ['React', 'JavaScript', 'Canvas', 'SVG', 'SCSS'],
    github: 'https://github.com/superrrk/portfolio-kelly',
    visual: 'daydream-visual',
    note: 'You are exploring it right now',
    internal: '#playground',
  },
];

function ForensicsArt() {
  return <div className="forensics-illustration" role="img" aria-label="Editorial preview of Image Forensics Lab showing an image upload and measured image signals; this is an illustration, not a model prediction">
    <div className="forensics-illustration-head"><span>image<span className="forensics-slash">/</span>forensics<span className="forensics-period">.</span></span><span>LIVE LAB ↗</span></div>
    <div className="forensics-preview-columns">
      <div className="forensics-preview-upload"><span className="forensics-preview-label">01 / YOUR IMAGE</span><span className="forensics-preview-glyph" aria-hidden="true">✳</span><span>drop · paste · upload</span></div>
      <div className="forensics-preview-signals"><span className="forensics-preview-label">02 / INSPECTION</span><strong>Look closer.</strong><div><i/><i/><i/></div><span className="forensics-preview-hint">signals ≠ proof</span></div>
    </div>
    <span className="forensics-preview-footer">PYTORCH / FLASK / CLOUD RUN <span>↗</span></span>
  </div>;
}

function BuildPlayArt() {
  return <div className="buildplay-art" role="img" aria-label="Decorative, abstract card for the BuildPlay multiplayer game project; not a gameplay screenshot">
    <div className="buildplay-art-header"><span>buildplay<span aria-hidden="true">✳</span></span><span>web / ios</span></div>
    <div className="buildplay-art-stage" aria-hidden="true">
      <span className="buildplay-art-piece one">✳</span>
      <span className="buildplay-art-piece two">●</span>
      <span className="buildplay-art-piece three">✦</span>
      <span className="buildplay-art-piece four">◆</span>
      <div className="buildplay-art-orbit orbit-one"/><div className="buildplay-art-orbit orbit-two"/>
    </div>
    <div className="buildplay-art-bottom"><span>little games, better together.</span><span>PLAY ↗</span></div>
    <span className="buildplay-art-disclaimer">ILLUSTRATIVE CARD · NOT GAMEPLAY</span>
  </div>;
}

function StudyBuddyArt() {
  return <div className="studybuddy-illustration" role="img" aria-label="Abstract editorial illustration for the team Study Buddy UI design project; not a screenshot of the Figma prototype">
    <span className="studybuddy-kicker">UI DESIGN / COLLABORATION</span>
    <div className="studybuddy-window">
      <div className="studybuddy-window-top"><span>study buddy<span className="studybuddy-flower"> ✳</span></span><span className="studybuddy-dots">···</span></div>
      <div className="studybuddy-skeleton"><span className="studybuddy-avatar">✿</span><div className="studybuddy-lines"><i/><i/></div><span className="studybuddy-check">✓</span></div>
      <div className="studybuddy-skeleton alt"><span className="studybuddy-avatar">✧</span><div className="studybuddy-lines"><i/><i/></div><span className="studybuddy-check">↗</span></div>
      <div className="studybuddy-tags"><span>design</span><span>together</span><span>learn</span></div>
    </div>
    <span className="studybuddy-visual-note">CONCEPT ART · NOT A FIGMA SCREENSHOT</span>
  </div>;
}

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

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [crochetOpen,setCrochetOpen] = useState(false);
  const [creativeOpen,setCreativeOpen] = useState(false);
  useEffect(()=>{
    if(!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})},{threshold:.07});
    document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));
    return ()=>observer.disconnect();
  },[creativeOpen]);
  const closeMenu=()=>setMenuOpen(false);
  return (
    <div className="daydream-site" id="top">
      <a className="skip-link" href="#experience">Skip to experience</a>
      <header className="daydream-header">
        <div className="site-container header-inner">
          <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Kelly Truong, back to top">kelly.truong <span>✳</span></a>
          <button className="mobile-menu-toggle" onClick={()=>setMenuOpen(o=>!o)} aria-label={menuOpen?'Close menu':'Open menu'} aria-controls="daydream-nav" aria-expanded={menuOpen}>{menuOpen?'close ×':'menu +'}</button>
          <nav id="daydream-nav" className={`header-links ${menuOpen?'is-open':''}`} aria-label="Main navigation">
            <a onClick={closeMenu} href="#work">work</a><a onClick={closeMenu} href="#experience">experience</a><a onClick={closeMenu} href="#about">about</a><a onClick={closeMenu} href="#contact">contact</a><a onClick={closeMenu} className="resume-nav" href={RESUME_URL} target="_blank" rel="noopener noreferrer">résumé ↗</a>
          </nav>
        </div>
      </header>
      <main>
        <section className="site-container hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="kicker"><span className="kicker-dot"/> SOFTWARE ENGINEER / AI SYSTEMS + PRODUCT</div>
            <h1 id="hero-title">hi, i'm <em>kelly.</em></h1>
            <h2>i make complex things<br/><i>feel a little more human.</i></h2>
            <p>I’m a Columbia CS student and software engineer building useful, human-centered software. Previously at IBM and bp.</p>
            <div className="hero-ctas"><a className="btn btn-dark" href="#work">explore my projects <span aria-hidden="true">↗</span></a><a className="btn btn-light" href={RESUME_URL} target="_blank" rel="noopener noreferrer">view résumé ↗</a><span className="social-icon-pair" aria-label="Social profiles"><a className="social-icon-link" href="https://www.linkedin.com/in/kellybtruong/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} aria-hidden="true" /></a><a className="social-icon-link" href="https://github.com/superrrk" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><FontAwesomeIcon icon={faGithub} aria-hidden="true" /></a></span></div>
            <div className="hero-side-note"><span>COLUMBIA UNIVERSITY · COMPUTER SCIENCE</span><span>CLASS OF 2027 · NEW YORK</span></div>
          </div>
          <AsciiBunny />
        </section>
        <div className="site-container fineprint-strip"><span>COLUMBIA CS · CLASS OF 2027</span><span>IBM &amp; BP · SOFTWARE ENGINEERING</span><span>BUILT WITH CARE ✳</span></div>
        <section className="site-container section-pad" id="work" aria-labelledby="work-title">
          <div className="section-header fade-up"><div><div className="eyebrow">01 / SELECTED WORK</div><h2 id="work-title" className="section-heading">things i've <em>built.</em></h2></div><p>A few things I have made, with links to explore or try them.</p></div>
          <div className="project-grid">
            {projects.slice(0, 3).map(p => <article className="project-card fade-up" key={p.no}>
              <div className={`project-image-wrap ${p.visual}`}>
                <div className="project-image-index">{p.no} / PROJECT STUDY</div>
                {p.forensics && p.image ? <img loading="lazy" src={p.image} alt={p.alt} /> : p.image ? <img loading="lazy" src={p.image} alt={p.alt} /> : p.visual === 'forensics-visual' ? <ForensicsArt /> : p.visual === 'scrap-visual' ? <ScrapArt /> : p.visual === 'studybuddy-visual' ? <StudyBuddyArt /> : p.visual === 'buildplay-visual' ? <BuildPlayArt /> : <DaydreamArt />}
              </div>
              <div className="project-card-meta"><span>{p.type}</span><span className="project-status">{p.status}</span></div>
              <h3>{p.title}</h3>
              <span className="project-context">{p.note}</span>
              <p>{p.shortDescription || p.description}</p>
              <p className="project-highlight"><span aria-hidden="true">✳</span>{p.highlight}</p>
              <div className="tag-row">{p.skills.map(name => <TechTag key={name} name={name}/>)}</div>
              {p.forensics && <details className="forensics-case-study"><summary>engineering notes &amp; model evaluation <span aria-hidden="true">↗</span></summary>
                <div className="forensics-case-body">
                  <p><strong>What I built.</strong> A responsive, single-view inspection UI with drag-and-drop, clipboard paste, replace-image flow, descriptive image signals and a Flask inference endpoint. Packaged CPU inference in Docker and deployed to Google Cloud Run with a scale-to-zero configuration and readiness checks.</p>
                  <div className="forensics-metrics" aria-label="Held-out ELSA D3 image generator zero pilot results"><div><strong>88.3%</strong><span>test accuracy</span></div><div><strong>78.3%</strong><span>AI-image recall</span></div><div><strong>1 / 60</strong><span>real images flagged</span></div><div><strong>0.966</strong><span>ROC AUC</span></div></div>
                  <p><strong>ML workflow.</strong> Built a source-paired manifest with 594 matched real/AI pairs and group-aware train/validation/test splits (475 / 59 / 60 pairs). Trained a pretrained ResNet18 on 950 training images, chose the 79.6% raw-score threshold using validation data, and evaluated once on 120 held-out images.</p>
                  <p><strong>What didn't work.</strong> Added 1,128 eligible multi-generator training images and excluded 318 held-out examples. The experimental v3 checkpoint scored 75.0% on the original test set versus v2's 88.3%, so I retained v2 instead of shipping the regression.</p>
                  <p className="forensics-caution"><strong>Important limitation:</strong> these are small, source-specific pilot results, not real-world detection guarantees. The raw output is not a calibrated probability; illustration-heavy and unfamiliar-generator images can be misclassified. Metadata and recompression artifacts are descriptive clues, not proof of authenticity.</p>
                </div>
              </details>}
              {p.roadmap && <details className="project-roadmap"><summary>what i'm building next <span aria-hidden="true">↗</span></summary><ul>{p.roadmap.map(item=><li key={item}>{item}</li>)}</ul><small>Planned improvements, not released features.</small></details>}
              <div className="project-actions">{p.github && <a className="inline-link" href={p.github} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="project-link-icon" aria-hidden="true"/> {p.sourceLabel || 'view source'} <span>↗</span></a>}{p.site && <a className="inline-link" href={p.site} target="_blank" rel="noopener noreferrer">{p.forensics ? 'try live detector' : p.playWeb ? 'play on the web' : 'project site'} <span>↗</span></a>}{p.figma && <a className="inline-link" href={p.figma} target="_blank" rel="noopener noreferrer">Figma design <span>↗</span></a>}{p.internal && <a href={p.internal} className="inline-link">try the experiment <span>↗</span></a>}</div>
            </article>)}
          </div>
          <details className="more-projects">
            <summary>More projects <span aria-hidden="true">＋</span></summary>
            <div className="more-projects-grid">
              <article className="more-project-item">
                <span>FULL-STACK · TEAM PROJECT</span>
                <h3>VSA Social Media App</h3>
                <p>React, Express, and Supabase social platform for a Columbia student organization.</p>
                <a href="https://github.com/tvytran/VSAWebsite" target="_blank" rel="noopener noreferrer">shared source code ↗</a>
              </article>
              {projects.slice(3).map(p => <article className="more-project-item" key={p.no}>
                <span>{p.type}</span>
                <h3>{p.title}</h3>
                <p>{p.highlight}</p>
                {p.github ? <a href={p.github} target="_blank" rel="noopener noreferrer">view source ↗</a> : p.figma ? <a href={p.figma} target="_blank" rel="noopener noreferrer">view design ↗</a> : null}
              </article>)}
            </div>
          </details>
        </section>
        <section className="site-container section-pad experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-header experience-intro-block fade-up"><div><div className="eyebrow">02 / EXPERIENCE</div><h2 id="experience-title" className="section-heading">engineering <em>impact.</em></h2></div><p>What I have worked on with engineering teams.</p></div>
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

          <details className="earlier-work-toggle"><summary>Earlier work &amp; research <span aria-hidden="true">＋</span></summary>
          <section className="earlier-work fade-up" aria-label="Earlier engineering and research experience">
            <div className="earlier-work-intro">
              <span className="eyebrow">MORE EXPERIENCE / 2024</span>
              <h3>from games to <em>safer streets.</em></h3>
            </div>
            <div className="earlier-work-grid">
              <article className="earlier-work-card">
                <div className="earlier-work-top"><span>GAME DEVELOPMENT · NEW YORK</span><span>2024</span></div>
                <h4>Lunchbox Entertainment</h4>
                <p className="earlier-work-role">Game Development Intern</p>
                <p>Tested <strong>Sirocco</strong> during beta, identifying bugs and contributing gameplay feedback and fixes as the team refined the experience.</p>
                <div className="earlier-work-tags"><span>Game testing</span><span>Debugging</span><span>Playtesting</span></div>
                <a href="https://www.lunchboxentertainment.com/" target="_blank" rel="noopener noreferrer">studio / Sirocco <span aria-hidden="true">↗</span></a>
              </article>
              <article className="earlier-work-card">
                <div className="earlier-work-top"><span>RESEARCH & DEVELOPMENT · COLUMBIA</span><span>2024</span></div>
                <h4>DitecT Lab</h4>
                <p className="earlier-work-role">Software Developer / Research Assistant</p>
                <p>Worked with a <strong>10-person research team</strong> on an Apple Watch pedestrian-safety prototype, using camera-sourced traffic data and MQTT messaging to support approaching-traffic warnings.</p>
                <div className="earlier-work-tags"><span>Swift / Xcode</span><span>MQTT</span><span>Wearables</span></div>
                <a href="https://ditectlab.civil.columbia.edu/safety-warning/" target="_blank" rel="noopener noreferrer">explore the research <span aria-hidden="true">↗</span></a>
              </article>
            </div>
          </section>
          </details>
        </section>
        <section className="about-section" id="about" aria-labelledby="about-title"><div className="site-container about-grid">
          <div className="about-photo-wrap fade-up"><div className="about-photo-frame"><img loading="lazy" decoding="async" src={headshot} alt="Portrait of Kelly Truong smiling in a white top" /></div><span className="about-doodle doodle-one">✳</span><span className="about-doodle doodle-two">hello, from the other side of the screen ↗</span></div>
          <div className="about-copy fade-up"><div className="eyebrow">03 / ABOUT ME</div><h2 id="about-title" className="section-heading">a curious mind,<br/><em>busy hands.</em></h2><p>I like building at the intersection of engineering, design, and the everyday experiences people care about.</p><p>Outside of code: sketches, crochet, and a good matcha.</p><button className="crochet-about-link" type="button" onClick={()=>setCrochetOpen(true)}>little stitches ↗</button><a className="inline-link" href={IOS_RESUME_URL} target="_blank" rel="noopener noreferrer">iOS-focused résumé ↗</a>
            <div className="about-education" id="education" aria-label="Education and training">
              <div className="eyebrow">EDUCATION · MAY 2027</div>
              <h3>Columbia University</h3>
              <p><strong>B.S. Computer Science</strong> · Fu Foundation School of Engineering and Applied Science</p>
              <p>QuestBridge National Match Scholar · Gates Scholar · Dell Scholar</p>
              <p><strong>CodePath:</strong> iOS Development Honors Certificate and Technical Interview Preparation.</p>
            </div></div>
        </div></section>
        <section className="creative-peek" id="creative" aria-label="Creative corner">
          <div className="site-container creative-peek-inner">
            <div><span className="eyebrow">04 / OFF THE CLOCK</span><h2>the <em>playful side.</em></h2><p>Little experiments in iOS, motion, and design.</p></div>
            <button type="button" className="creative-toggle" onClick={() => setCreativeOpen(o => !o)} aria-expanded={creativeOpen} aria-controls="creative-content">{creativeOpen ? 'close little worlds −' : 'explore a little ↗'}</button>
          </div>
          {creativeOpen && <div id="creative-content">
        <section className="studio-section" id="studio" aria-labelledby="studio-title">
          <div className="site-container">
            <div className="studio-header fade-up">
              <div><div className="eyebrow">04 / CREATIVE CORNER</div><h2 id="studio-title" className="section-heading">in the <em>oven.</em></h2></div>
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
        <section className="playground-section" id="playground" aria-labelledby="playground-title"><div className="site-container playground-grid">
          <div className="playground-copy fade-up"><div className="eyebrow">LITTLE WORLDS</div><h2 id="playground-title" className="section-heading">a little<br/><em>wonder.</em></h2><p>Three tiny scenes. Pick one, then play.</p></div><CreativeScenes />
        </div></section>
          </div>}
        </section>
      </main>
      <footer className="site-container daydream-footer" id="contact"><div className="eyebrow">05 / SAY HELLO</div><h2>have a little <em>idea?</em></h2><p>Whether it's a collaboration, an engineering challenge, or a curious question, I'd love to hear about it.</p><div className="footer-actions"><a className="btn btn-dark" href="mailto:truong.kelly17@gmail.com">send me a note ↗</a><span className="social-icon-pair" aria-label="Social profiles"><a className="social-icon-link" href="https://github.com/superrrk" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><FontAwesomeIcon icon={faGithub} aria-hidden="true" /></a><a className="social-icon-link" href="https://www.linkedin.com/in/kellybtruong/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} aria-hidden="true" /></a></span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} KELLY TRUONG</span><span>MADE WITH CODE, CURIOSITY & A LITTLE YARN ✳</span><a href="#top">back to top ↑</a></div></footer>
      {crochetOpen && <CrochetGallery onClose={()=>setCrochetOpen(false)}/>}
    </div>
  );
}
