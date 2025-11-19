import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Description from './components/Description'
import Services from './components/Services'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Investigation from './components/Investigation'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="app">
      <Header openModal={openModal} />
      <main>
        <Hero openModal={openModal} />
        <Stats />
        <About />
        <Description />
        <Services />
        <Process />
        <Testimonials />
      </main>
      <Investigation/>
      <Footer />
    </div>
  )
}

export default App