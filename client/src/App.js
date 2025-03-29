import './App.scss'
import Home from './components/Home'
import { useEffect, useRef } from 'react'

function App() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
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
