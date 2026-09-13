import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COUNT_SEQUENCE = [3, 2, 1];
const HOLD_MS = 700;
const GAP_MS = 350;

export default function Intro({ onEnter }) {
  const [phase, setPhase] = useState('count'); // count -> text -> done
  const [countIndex, setCountIndex] = useState(0);
  const [showNumber, setShowNumber] = useState(true);

  useEffect(() => {
    if (phase !== 'count') return undefined;

    if (countIndex >= COUNT_SEQUENCE.length) {
      const t = setTimeout(() => setPhase('text'), 500);
      return () => clearTimeout(t);
    }

    setShowNumber(true);
    const holdTimer = setTimeout(() => setShowNumber(false), HOLD_MS);
    const nextTimer = setTimeout(() => {
      setCountIndex((i) => i + 1);
    }, HOLD_MS + GAP_MS);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(nextTimer);
    };
  }, [phase, countIndex]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg">
      <AnimatePresence mode="wait">
        {phase === 'count' && countIndex < COUNT_SEQUENCE.length && showNumber && (
          <motion.span
            key={COUNT_SEQUENCE[countIndex]}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
            animate={{ opacity: 0.9, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[22vw] font-light leading-none text-text md:text-[14vw]"
          >
            {COUNT_SEQUENCE[countIndex]}
          </motion.span>
        )}

        {phase === 'text' && (
          <motion.div
            key="intro-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
              className="font-display text-[9vw] font-light leading-[1.05] tracking-tight text-text md:text-6xl"
            >
              Let&rsquo;s go back
              <br />
              for a while.
            </motion.p>

            <motion.button
              type="button"
              data-cursor="OPEN"
              onClick={onEnter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.6 }}
              className="mt-14 border border-line px-8 py-3 font-mono text-[11px] tracking-widest2 text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              ENTER MEMORY
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
