import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Description from './components/Description'
import Services from './components/Services'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ConsultationPage from './pages/ConsultationPage'
import Investigation from './components/Investigation'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Home Page Component
const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Description />
        <Services />
        <Process />
        <Testimonials />
      </main>
      <Investigation />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Consultation Page Route */}
          <Route path="/consultation" element={<ConsultationPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App