import './index.scss'
import { useEffect, useState, useRef } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import {
  faHtml5,
  faJsSquare,
  faReact,
  faGithub,
  faLinkedin,
  faSwift,
  faPython,
  faJava,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import emailjs from '@emailjs/browser'
const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [loading, setLoading] = useState(true)
  const form = useRef()

  useEffect(() => {
    // Initial loading delay
    const loadingTimer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    // Letter animation delay - increased to 5 seconds to ensure all letters are animated
    const letterTimer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 5000)

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(letterTimer)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 80; // Adjust this value based on your header height
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Add scroll performance optimization
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Your scroll handling code here if needed
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Portfolio Optimizer",
      description: "An interactive portfolio optimizer based off the Markowitz model.",
      image: require("../../assets/images/portfolio_optimizer_kelly.png"),
      techStack: ["HTML", "CSS", "Python", "Pandas", "NumPy"],
      demoLink: "https://portfolio-optimizer-app-15a8bb2b8ecf.herokuapp.com/",
      githubLink: "https://github.com/superrrk/portfolio-optimizer"
    },
    {
      title: "Image Detector",
      description: "A full-stack web app that detects AI generated vs. real images via a custom trained Convolutional Neural Network (CNN).",
      image: require("../../assets/images/image_detector.png"),
      techStack: ["Python", "React", "HTML", "SCSS"],
      demoLink: "https://demo.project3.com",
      githubLink: "https://github.com/superrrk/image-detector"
    },
    {
      title: "Portfolio Website",
      description: "A comprehensive full-stack application that demonstrates modern web development practices and clean architecture.",
      image: require('../../assets/images/portfolio_kelly.png'),
      techStack: ["React", "JavaScript", "SCSS", "HTML"],
      demoLink: "https://demo.project1.com",
      githubLink: "https://github.com/superrrk/portfolio-kelly"
    },
    {
      title: "VSnap",
      description: "A social platform for VSA members to share family photos and track participation points. Features include photo submissions, point counting, and family leaderboards.",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop&blur=20&q=10",
      techStack: ["React", "Node.js", "MongoDB", "AWS S3"],
      demoLink: "https://vsnap-demo.com",
      githubLink: "https://github.com/superrrk/vsnap"
    },
    {
      title: "QuickSeat",
      description: "An innovative solution to the reservation bot problem, making it easier for genuine customers to secure their desired dining spots.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&blur=20&q=10",
      techStack: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      demoLink: "https://quickseat-demo.com",
      githubLink: "https://github.com/superrrk/quickseat"
    },
    {
      title: "Coming Soon...",
      description: "Something exciting is in the works. Stay tuned for updates on my next project!",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&blur=20&q=10",
      techStack: ["Coming Soon"],
      demoLink: "#",
      githubLink: "#"
    }
  ];

  const sendEmail = (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    emailjs
      .sendForm(
        'service_4ett30f',
        'template_840pcyv',
        form.current,
        'J3gvU42uIYaCZmTu_'
      )
      .then(() => {
        alert('Message successfully sent!')
        setLoading(false)
        window.location.reload(false)
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        alert('Failed to send message, please try again.')
        setLoading(false)
      })
  }

  return (
    <>
      <div className={`main-container ${loading ? 'loading' : 'loaded'}`}>
        <section id="home" className="home-section">
          {/* Sparkles for hero section */}
          <span className="sparkle sparkle-hero-top-left">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2 L10 7 L16 9 L10 11 L9 16 L8 11 L2 9 L8 7 Z" fill="white" fillOpacity="0.5"/>
            </svg>
          </span>
          <span className="sparkle sparkle-hero-bottom-right">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1 L8 5 L13 7 L8 9 L7 13 L6 9 L1 7 L6 5 Z" fill="white" fillOpacity="0.4"/>
            </svg>
          </span>
          <div className="text-zone">
            <h1>
              <span className={letterClass}>h</span>
              <span className={`${letterClass} _12`}>i</span>
              <span className={`${letterClass} _13`}>,</span>
              <br />
              <span className={`${letterClass} _14`}>i</span>
              <span className={`${letterClass} _15`}>'</span>
              <span className={`${letterClass} _16`}>m</span>
              <span className={`${letterClass} _17`}> </span>
              <span className={`${letterClass} _18 highlight`}>k</span>
              <span className={`${letterClass} _19 highlight`}>e</span>
              <span className={`${letterClass} _20 highlight`}>l</span>
              <span className={`${letterClass} _21 highlight`}>l</span>
              <span className={`${letterClass} _22 highlight`}>y</span>
              <span className={`${letterClass} _23`}>,</span>
              <br />
              <span className={`${letterClass} _24`}>a</span>
              <span className={`${letterClass} _25`}> </span>
              <span className={`${letterClass} _26`}>s</span>
              <span className={`${letterClass} _27`}>t</span>
              <span className={`${letterClass} _28`}>u</span>
              <span className={`${letterClass} _29`}>d</span>
              <span className={`${letterClass} _30`}>e</span>
              <span className={`${letterClass} _31`}>n</span>
              <span className={`${letterClass} _32`}>t</span>
              <span className={`${letterClass} _33`}> </span>
              <span className={`${letterClass} _34`}>d</span>
              <span className={`${letterClass} _35`}>e</span>
              <span className={`${letterClass} _36`}>v</span>
              <span className={`${letterClass} _37`}>e</span>
              <span className={`${letterClass} _38`}>l</span>
              <span className={`${letterClass} _39`}>o</span>
              <span className={`${letterClass} _40`}>p</span>
              <span className={`${letterClass} _41`}>e</span>
              <span className={`${letterClass} _42`}>r</span>
              <span className={`${letterClass} _43`}>.</span>
            </h1>
            <h2>Student / Developer</h2>
            <div className="social-icons-landing">
              <a
                href="https://github.com/superrrk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} color="#CBF7ED" />
              </a>
              <a
                href="https://linkedin.com/in/kellybtruong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} color="#CBF7ED" />
              </a>
            </div>
            <div className="button-container">
              <button onClick={() => scrollToSection('projects')} className='flat-button'>
                VIEW PROJECTS
              </button>
              <button onClick={() => scrollToSection('contact')} className='flat-button'>
                CONTACT ME
              </button>
            </div>
          </div>
          <div className="stage-cube-cont">
            <div className="cubespinner">
              <div className="face1">
                <FontAwesomeIcon icon={faSwift} color="#DD0031" />
              </div>
              <div className="face2">
                <FontAwesomeIcon icon={faHtml5} color="#F06529" />
              </div>
              <div className="face3">
                <FontAwesomeIcon icon={faJava} color="#28A4D9" />
              </div>
              <div className="face4">
                <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
              </div>
              <div className="face5">
                <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
              </div>
              <div className="face6">
                <FontAwesomeIcon icon={faPython} color="#EC4D28" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          {/* Sparkles for about section */}
          <span className="sparkle sparkle-about-top-right">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1 L8 5 L13 7 L8 9 L7 13 L6 9 L1 7 L6 5 Z" fill="white" fillOpacity="0.4"/>
            </svg>
          </span>
          <span className="sparkle sparkle-about-bottom-left">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1 L5.5 4 L9 5 L5.5 6 L5 9 L4.5 6 L1 5 L4.5 4 Z" fill="white" fillOpacity="0.3"/>
            </svg>
          </span>
          <div className="text-zone">
            <h1>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={['a', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
                idx={15}
              />
            </h1>
            <h2>
              <p>based in <b>New York, NY</b></p>
              <br></br>
              <p><b>Computer Science</b></p>
              <p><b>Sophomore at Columbia University 2027</b></p>
            </h2>
            <br>
            </br>
            <p>Interested in AI, ML, and full-stack development. </p>
            <p>Experienced in Python, Java, and C. </p>
          </div>
          <div className="button-container">
              <button onClick={() => window.open('/TRUONG_KELLY.pdf', '_blank')} className='resume-button'>
                VIEW RESUME
              </button>
          </div>
          <div className="about-image">
            <img src={require('../../assets/images/headshot.jpeg')} alt="Kelly" />
          </div>
        </section>

        <section id="experience" className="experience-section">
          {/* Sparkles for experience section */}
          <span className="sparkle sparkle-experience-top-left">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="white" fillOpacity="0.8"/>
            </svg>
          </span>
          <span className="sparkle sparkle-experience-bottom-right">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2 L14 9 L22 12 L14 15 L12 22 L10 15 L2 12 L10 9 Z" fill="white" fillOpacity="0.7"/>
            </svg>
          </span>
          <span className="sparkle sparkle-experience-mid-left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2 L9 6 L14 8 L9 10 L8 14 L7 10 L2 8 L7 6 Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </span>
          <span className="sparkle sparkle-experience-mid-right">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1 L8 5 L13 7 L8 9 L7 13 L6 9 L1 7 L6 5 Z" fill="white" fillOpacity="0.5"/>
            </svg>
          </span>
          <span className="sparkle sparkle-experience-timeline">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2 L10 7 L16 9 L10 11 L9 16 L8 11 L2 9 L8 7 Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </span>
          {/* New sparkles close to cards */}
          <span className="sparkle sparkle-experience-card1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1 L8 5 L13 7 L8 9 L7 13 L6 9 L1 7 L6 5 Z" fill="white" fillOpacity="0.7"/>
            </svg>
          </span>
          <span className="sparkle sparkle-experience-card2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1 L7 4 L11 6 L7 8 L6 11 L5 8 L1 6 L5 4 Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </span>
          <span className="sparkle sparkle-experience-card3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2 L9 6 L14 8 L9 10 L8 14 L7 10 L2 8 L7 6 Z" fill="white" fillOpacity="0.8"/>
            </svg>
          </span>
          <span className="sparkle sparkle-experience-card4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="white" fillOpacity="0.7"/>
            </svg>
          </span>
          <h2>experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">Summer 2025</div>
                <h3>Quantum Computing Intern</h3>
                <h4>bp</h4>
                <ul>
                  <li>Optimized Mixed Integer Programming (MIP) problems by benchmarking quantum, hybrid, and classical solvers,
                  mitigated constraint violations in 95% of test cases</li>
                  <li>Integrated novel QUBO transformation algorithms, improving solver throughput by 80%</li>
                  <li>Presented results to CTO and Head of Global Sourcing, garnering further funding for quantum computing research</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">2024 - 2025</div>
                <h3>Research Assistant</h3>
                <h4>DiTect Lab @Columbia University</h4>
                <ul>
                  <li>Developed an IOS application to increase pedestrian safety by alerting the user of incoming traffic via an Apple
Watch application in XCode, React.js, and Swift alongside the MQTT Protocol</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-date">Summer 2023</div>
                <h3>Consultant Intern</h3>
                <h4>Accenture</h4>
                <ul>
                  <li>Produced an MVP (Minimum Viable Product) and a pitch deck addressing efficient and active studying methods
                  within an all-in-one hub-style app as a personal project</li>
                  <li>Trained professional storytelling, data analysis, and branding skills to present a group project to 200+ industry
                  professionals within the Accenture network</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          {/* Sparkles for projects section */}
          <span className="sparkle sparkle-projects-top-left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2 L9 6 L14 8 L9 10 L8 14 L7 10 L2 8 L7 6 Z" fill="white" fillOpacity="0.4"/>
            </svg>
          </span>
          <span className="sparkle sparkle-projects-bottom-right">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1 L7 4 L11 6 L7 8 L6 11 L5 8 L1 6 L5 4 Z" fill="white" fillOpacity="0.35"/>
            </svg>
          </span>
          <h2>projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                className="project-card" 
                key={index} 
                style={{'--index': index}}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          {/* Decorative sparkles */}
          <span className="sparkle sparkle-left"></span>
          <span className="sparkle sparkle-right"></span>
          <span className="sparkle sparkle-bottom-left"></span>
          {/* New sparkles closer to the form */}
          <span className="sparkle sparkle-top-left">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2 L10 7 L16 9 L10 11 L9 16 L8 11 L2 9 L8 7 Z" fill="white" fillOpacity="0.5"/>
            </svg>
          </span>
          <span className="sparkle sparkle-top-right">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1 L8 5 L13 7 L8 9 L7 13 L6 9 L1 7 L6 5 Z" fill="white" fillOpacity="0.4"/>
            </svg>
          </span>
          <span className="sparkle sparkle-mid-left">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1 L5.5 4 L9 5 L5.5 6 L5 9 L4.5 6 L1 5 L4.5 4 Z" fill="white" fillOpacity="0.3"/>
            </svg>
          </span>
          <span className="sparkle sparkle-mid-right">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1 L7 4 L11 6 L7 8 L6 11 L5 8 L1 6 L5 4 Z" fill="white" fillOpacity="0.35"/>
            </svg>
          </span>
          {/* End sparkles */}
          <div className="text-zone">
            <h1>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={['c', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
                idx={15}
              />
            </h1>
            <div className="contact-form">
              <form ref={form} onSubmit={sendEmail}>
                <ul>
                  <li className="half">
                    <input type="text" name="name" placeholder="Name" required />
                  </li>
                  <li className="half">
                    <input type="email" name="email" placeholder="Email" required />
                  </li>
                  <li>
                    <input
                      placeholder="Subject"
                      type="text"
                      name="subject"
                      required
                    />
                  </li>
                  <li>
                    <textarea
                      placeholder="Message"
                      name="message"
                      required
                    ></textarea>
                  </li>
                  <li>
                    <input type="submit" className="flat-button" value="SEND" />
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </section>

        {/* Social Media Icons */}
        <div className="social-icons">
          <a
            href="https://github.com/superrrk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} color="#4d4d4e" />
          </a>
          <a
            href="https://linkedin.com/in/kellybtruong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" />
          </a>
        </div>
      </div>
    </>
  )
}

export default Home