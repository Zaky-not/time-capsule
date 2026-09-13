import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Deterministic pseudo-random scatter so every reload looks the same.
const PHOTOS = [
  { src: '/src/assets/photos/scatter-1.jpg', from: 'left', top: 22, left: 18, rotate: -8 },
  { src: '/src/assets/photos/scatter-2.jpg', from: 'right', top: 15, left: 68, rotate: 6 },
  { src: '/src/assets/photos/scatter-3.jpg', from: 'top', top: 8, left: 42, rotate: -3 },
  { src: '/src/assets/photos/scatter-4.jpg', from: 'bottom', top: 62, left: 30, rotate: 9 },
  { src: '/src/assets/photos/scatter-5.jpg', from: 'left', top: 55, left: 72, rotate: -6 },
  { src: '/src/assets/photos/scatter-6.jpg', from: 'right', top: 40, left: 50, rotate: 4 },
  { src: '/src/assets/photos/scatter-7.jpg', from: 'bottom', top: 70, left: 58, rotate: -10 },
  { src: '/src/assets/photos/scatter-8.jpg', from: 'top', top: 30, left: 8, rotate: 7 },
  { src: '/src/assets/photos/scatter-9.jpg', from: 'right', top: 12, left: 25, rotate: -5 },
  { src: '/src/assets/photos/scatter-10.jpg', from: 'left', top: 48, left: 40, rotate: 3 },
];

const FROM_OFFSET = {
  left: { x: -600, y: 0 },
  right: { x: 600, y: 0 },
  top: { x: 0, y: -500 },
  bottom: { x: 0, y: 500 },
};

function Photo({ photo, scrollYProgress, index }) {
  const enterStart = 0.02 + index * 0.02;
  const enterEnd = enterStart + 0.14;
  const snapStart = 0.46;
  const snapEnd = 0.55;
  const fadeStart = 0.82;
  const fadeEnd = 0.95;

  const { x: fromX, y: fromY } = FROM_OFFSET[photo.from];

  const x = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, snapStart, snapEnd],
    [fromX, 0, 0, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, snapStart, snapEnd],
    [fromY, 0, 0, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, snapStart, snapEnd],
    [0.6, 1, 1, 0.42]
  );
  const rotate = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, snapEnd],
    [photo.rotate * 2, photo.rotate, 0]
  );
  const opacity = useTransform(
    scrollYProgress,
    [enterStart, enterStart + 0.03, fadeStart, fadeEnd],
    [0, 1, 1, index === 0 ? 1 : 0]
  );
  const top = useTransform(scrollYProgress, [snapStart, snapEnd], [`${photo.top}%`, '50%']);
  const left = useTransform(scrollYProgress, [snapStart, snapEnd], [`${photo.left}%`, '50%']);
  const finalScale = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0.42, index === 0 ? 6 : 0.3]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        x,
        y,
        rotate,
        opacity,
        scale: index === 0 ? finalScale : scale,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="h-40 w-32 shrink-0 overflow-hidden border border-line bg-surface shadow-2xl md:h-56 md:w-44"
    >
      <img src={photo.src} alt="" className="h-full w-full object-cover" loading="lazy" />
    </motion.div>
  );
}

export default function PhotoExplosion() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const collageTextOpacity = useTransform(scrollYProgress, [0.56, 0.62, 0.72, 0.78], [0, 1, 1, 0]);
  const storyTextOpacity = useTransform(scrollYProgress, [0.78, 0.84, 0.92, 0.98], [0, 1, 1, 0]);
  const dimOverlay = useTransform(scrollYProgress, [0.55, 0.6], [0, 0.55]);

  const photos = useMemo(() => PHOTOS, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {photos.map((photo, i) => (
          <Photo key={photo.src} photo={photo} index={i} scrollYProgress={scrollYProgress} />
        ))}

        <motion.div style={{ opacity: dimOverlay }} className="pointer-events-none absolute inset-0 bg-bg" />

        <motion.div
          style={{ opacity: collageTextOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center"
        >
          <p className="font-mono text-xs tracking-widest2 text-accent">40+ PEOPLE · COUNTLESS MEMORIES</p>
          <p className="font-display text-4xl text-text md:text-5xl">One story.</p>
        </motion.div>

        <motion.div
          style={{ opacity: storyTextOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center"
        >
          <p className="font-display text-4xl leading-tight text-text md:text-6xl">
            Every picture
            <br />
            has a story.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
