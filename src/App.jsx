import { useEffect, useRef, useState, useCallback } from 'react';
import Intro from './components/Intro.jsx';
import Identity from './components/Identity.jsx';
import PhotoExplosion from './components/PhotoExplosion.jsx';
import Gallery from './components/Gallery.jsx';
import Members from './components/Members.jsx';
import ClassVideo from './components/ClassVideo.jsx';
import MemoryWall from './components/MemoryWall.jsx';
import Goodbye from './components/Goodbye.jsx';
import DeveloperCredit from './components/DeveloperCredit.jsx';
import ProgressIndicator, { STEPS } from './components/ProgressIndicator.jsx';
import AudioController from './components/AudioController.jsx';
import CustomCursor from './components/CustomCursor.jsx';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeId, setActiveId] = useState(STEPS[0].id);
  const audioRef = useRef(null);
  const sectionRefs = useRef({});

  const handleEnter = useCallback(() => {
    setEntered(true);
    // First user gesture — safe to start soft ambient sound here.
    audioRef.current?.startAmbient();
  }, []);

  const handleWallEnter = useCallback(() => {
    audioRef.current?.startMainSong();
  }, []);

  // Track which section is centered in the viewport to drive the
  // progress indicator, and fade the main song out once Goodbye appears.
  useEffect(() => {
    if (!entered) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            if (entry.target.id === 'goodbye') {
              audioRef.current?.fadeOutMainSong(4000);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    STEPS.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) {
        sectionRefs.current[step.id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [entered]);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-bg">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <CustomCursor />
      <AudioController ref={audioRef} />

      {!entered && <Intro onEnter={handleEnter} />}

      {entered && (
        <>
          <ProgressIndicator activeId={activeId} onNavigate={handleNavigate} />
          <main>
            <Identity />
            <PhotoExplosion />
            <Gallery />
            <Members />
            <ClassVideo />
            <MemoryWall onEnterWall={handleWallEnter} />
            <Goodbye />
          </main>
          <DeveloperCredit />
        </>
      )}
    </div>
  );
}
