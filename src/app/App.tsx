import { BackToTop } from '../components/layout/BackToTop';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { About } from '../sections/About';
import { Approach } from '../sections/Approach';
import { Contact } from '../sections/Contact';
import { Education } from '../sections/Education';
import { Experience } from '../sections/Experience';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/projects/Projects';
import { Skills } from '../sections/Skills';

export function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Approach />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
