import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Projects from './Pages/Projects'
import Skills from './Pages/Skills'
import Experience from './Pages/Experience'
import Home from './Pages/Home'
import { Routes,Route } from 'react-router-dom'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      // <Projects />
      // <Skills />
      // <Experience />
      // 
      <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
      <Footer />
      </>
    
  )
}

export default App
