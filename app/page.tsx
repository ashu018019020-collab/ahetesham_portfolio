import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import SoftSkills from '@/components/SoftSkills'
import CareerFocus from '@/components/CareerFocus'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BackgroundOrbs from '@/components/BackgroundOrbs'
import FloatingElements from '@/components/FloatingElements'

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <FloatingElements />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <SoftSkills />
        <CareerFocus />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
