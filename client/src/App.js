import './App.scss'
import Home from './components/Home'
import { useEffect, useRef } from 'react'

function App() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    let mouseX = 0
    let mouseY = 0
    let rafId

    const updateCursor = () => {
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
      rafId = null
    }

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor)
      }
    }

    const growCursor = () => {
      cursor.classList.add('cursor-grow')
    }

    const shrinkCursor = () => {
      cursor.classList.remove('cursor-grow')
    }

    // Add event listeners
    document.addEventListener('mousemove', moveCursor)
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', growCursor)
      el.addEventListener('mouseleave', shrinkCursor)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', growCursor)
        el.removeEventListener('mouseleave', shrinkCursor)
      })
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="custom-cursor" ref={cursorRef}></div>
      <Home />
    </>
  )
}

export default App
