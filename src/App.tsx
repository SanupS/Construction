import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import HomePlans from './components/HomePlans'
import Gallery from './components/Gallery'
import ReviewsAndFeedback from './components/ReviewsAndFeedback'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

export default function App() {
  const hash = useHashRoute()

  if (hash === '#admin') {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <HomePlans />
        <Gallery />
        <ReviewsAndFeedback />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
