import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { EASE_OUT } from '@/lib/motion';

import { Preloader } from '@/components/Preloader';
import { Navigation } from '@/components/Navigation';
import { Atmosphere } from '@/components/ui/Atmosphere';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Cursor } from '@/components/ui/Cursor';

import { Hero } from '@/sections/Hero';
import { Credentials } from '@/sections/Credentials';
import { About } from '@/sections/About';
import { Expertise } from '@/sections/Expertise';
import { Testimonials } from '@/sections/Testimonials';
import { Clinic } from '@/sections/Clinic';
import { Process } from '@/sections/Process';
import { Achievements } from '@/sections/Achievements';
import { Faq } from '@/sections/Faq';
import { Appointment } from '@/sections/Appointment';
import { Footer } from '@/sections/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  // Smooth scrolling starts only once the preloader has lifted, so the two
  // never fight over the scroll position on first paint.
  useSmoothScroll(ready);

  return (
    <>
      <AnimatePresence>{!ready && <Preloader key="preloader" onDone={() => setReady(true)} />}</AnimatePresence>

      <Atmosphere />
      <ScrollProgress />
      <Cursor />
      <Navigation />

      {/* The page fades up behind the lifting preloader panel rather than
          appearing after it — the two movements overlap by design. */}
      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="relative"
      >
        <Hero />
        <Credentials />
        <About />
        <Expertise />
        <Testimonials />
        <Clinic />
        <Process />
        <Achievements />
        <Faq />
        <Appointment />
      </motion.main>

      <Footer />
    </>
  );
}
