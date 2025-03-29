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
import { faHome, faUser, faEnvelope, faCode } from '@fortawesome/free-solid-svg-icons'
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
      title: "Portfolio Website",
      description: "A comprehensive full-stack application that demonstrates modern web development practices and clean architecture.",
      image: require('../../assets/images/portfolio_kelly.png'),
      techStack: ["React", "JavaScript", "SCSS", "HTML"],
      demoLink: "https://demo.project1.com",
      githubLink: "https://github.com/superrrk/portfolio-kelly"
    },
    {
      title: "Project 2",
      description: "An innovative mobile-first web application that solves real-world problems with elegant solutions.",
      image: "https://placehold.co/600x400",
      techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
      demoLink: "https://demo.project2.com",
      githubLink: "https://github.com/yourusername/project2"
    },
    {
      title: "Project 3",
      description: "A performant and scalable backend service that handles complex data processing and real-time updates.",
      image: "https://placehold.co/600x400",
      techStack: ["Python", "Django", "PostgreSQL", "Redis"],
      demoLink: "https://demo.project3.com",
      githubLink: "https://github.com/yourusername/project3"
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
            <nav className="nav-icons">
              <div className="icon-link" onClick={() => scrollToSection('home')}>
                <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
              </div>
              <div className="icon-link" onClick={() => scrollToSection('about')}>
                <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
              </div>
              <div className="icon-link" onClick={() => scrollToSection('projects')}>
                <FontAwesomeIcon icon={faCode} color="#4d4d4e" />
              </div>
              <div className="icon-link" onClick={() => scrollToSection('contact')}>
                <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
              </div>
            </nav>
          </div>
        </section>

        <section id="about" className="about-section">
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

        <section id="projects" className="projects-section">
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