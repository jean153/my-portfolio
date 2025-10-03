import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Contact from './contact.jsx'
import Chatbot from './chatbot.jsx'
import About from './about.jsx'
import Projects from './projects.jsx'
import HeroSection from './herosection.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="relative">
      {/* Your main sections */}
      <HeroSection />
      <About />
      <Projects />
      <Contact />
      <Chatbot />

      {/* Easter egg cross */}
      <span
        className="fixed bottom-4 left-4 cursor-pointer text-gray-400 hover:text-purple-500 z-50"
        onClick={() => alert("Everything I do is for Christ")}
      >
        ✝️
      </span>
       <footer className="bg-gray-800 text-white text-center py-4">
      <p className="text-sm">&copy; 2025 Jean Powell. All rights reserved.</p>
    </footer>
    </div>
    
  
     
    
  )
}

export default App
