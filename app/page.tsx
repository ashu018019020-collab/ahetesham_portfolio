import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import LazySections from '@/components/LazySections'
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
        <LazySections />
      </main>
      <Footer />
    </>
  )
}
