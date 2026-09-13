import { useEffect, useMemo, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import poto1  from '../assets/photos/poto1.jpg';
import poto2  from '../assets/photos/poto2.jpg';
import poto3  from '../assets/photos/poto3.jpg';
import poto4  from '../assets/photos/poto4.jpg';
import poto5  from '../assets/photos/poto5.jpg';
import poto6  from '../assets/photos/poto61.jpg';
import poto7  from '../assets/photos/poto7.jpg';
import poto8  from '../assets/photos/poto8.jpg';
import poto9  from '../assets/photos/poto9.jpg';
import poto10 from '../assets/photos/poto10.jpg';

const PHOTOS = [
  {
    src: poto1,
    from: 'left',
    top: 22,
    left: 18,
    rotate: -8,
  },
  {
    src: poto2,
    from: 'right',
    top: 15,
    left: 68,
    rotate: 6,
  },
  {
    src: poto3,
    from: 'top',
    top: 8,
    left: 42,
    rotate: -3,
  },
  {
    src: poto4,
    from: 'bottom',
    top: 62,
    left: 30,
    rotate: 9,
  },
  {
    src: poto5,
    from: 'left',
    top: 55,
    left: 72,
    rotate: -6,
  },
  {
    src: poto6,
    from: 'right',
    top: 40,
    left: 50,
    rotate: 4,
  },
  {
    src: poto7,
    from: 'bottom',
    top: 70,
    left: 58,
    rotate: -10,
  },
  {
    src: poto8,
    from: 'top',
    top: 30,
    left: 8,
    rotate: 7,
  },
  {
    src: poto9,
    from: 'right',
    top: 12,
    left: 25,
    rotate: -5,
  },
  {
    src: poto10,
    from: 'left',
    top: 48,
    left: 40,
    rotate: 3,
  },
];

const FROM_OFFSET = {
  left: {
    x: -600,
    y: 0,
  },

  right: {
    x: 600,
    y: 0,
  },

  top: {
    x: 0,
    y: -500,
  },

  bottom: {
    x: 0,
    y: 500,
  },
};

// =========================================
// PHOTO
// =========================================

function Photo({
  photo,
  scrollYProgress,
  index,
}) {
  const enterStart =
    0.02 + index * 0.02;

  const enterEnd =
    enterStart + 0.14;

  const snapStart = 0.46;
  const snapEnd = 0.55;

  const fadeStart = 0.82;
  const fadeEnd = 0.95;

  const {
    x: fromX,
    y: fromY,
  } = FROM_OFFSET[photo.from];

  const x = useTransform(
    scrollYProgress,
    [
      enterStart,
      enterEnd,
      snapStart,
      snapEnd,
    ],
    [
      fromX,
      0,
      0,
      0,
    ]
  );

  const y = useTransform(
    scrollYProgress,
    [
      enterStart,
      enterEnd,
      snapStart,
      snapEnd,
    ],
    [
      fromY,
      0,
      0,
      0,
    ]
  );

  const scale = useTransform(
    scrollYProgress,
    [
      enterStart,
      enterEnd,
      snapStart,
      snapEnd,
    ],
    [
      0.6,
      1,
      1,
      0.42,
    ]
  );

  const rotate = useTransform(
    scrollYProgress,
    [
      enterStart,
      enterEnd,
      snapEnd,
    ],
    [
      photo.rotate * 2,
      photo.rotate,
      0,
    ]
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      enterStart,
      enterStart + 0.03,
      fadeStart,
      fadeEnd,
    ],
    [
      0,
      1,
      1,
      index === 0 ? 1 : 0,
    ]
  );

  const top = useTransform(
    scrollYProgress,
    [snapStart, snapEnd],
    [
      `${photo.top}%`,
      '50%',
    ]
  );

  const left = useTransform(
    scrollYProgress,
    [snapStart, snapEnd],
    [
      `${photo.left}%`,
      '50%',
    ]
  );

  const finalScale = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd],
    [
      0.42,
      index === 0 ? 6 : 0.3,
    ]
  );

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
        scale:
          index === 0
            ? finalScale
            : scale,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="
        h-40
        w-32
        shrink-0
        overflow-hidden
        border
        border-line
        bg-surface
        shadow-2xl
        md:h-56
        md:w-44
      "
    >
      <img
        src={photo.src}
        alt=""
        className="
          h-full
          w-full
          object-cover
        "
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}

// =========================================
// MAIN COMPONENT
// =========================================

export default function PhotoExplosion({
  audioControllerRef,
}) {
  const containerRef = useRef(null);

  // Supaya shutter cuma dimainkan sekali
  const shutterPlayedRef =
    useRef(false);

  const {
    scrollYProgress,
  } = useScroll({
    target: containerRef,
    offset: [
      'start start',
      'end end',
    ],
  });

  // =========================================
  // SHUTTER TRIGGER
  // =========================================

  useEffect(() => {
    const unsubscribe =
      scrollYProgress.on(
        'change',
        (progress) => {
          // Begitu Photo Explosion mulai,
          // mainkan shutter satu kali.
          if (
            progress >= 0.01 &&
            !shutterPlayedRef.current
          ) {
            shutterPlayedRef.current =
              true;

            audioControllerRef?.current?.playShutter();
          }
        }
      );

    return () => unsubscribe();
  }, [
    scrollYProgress,
    audioControllerRef,
  ]);

  // =========================================
  // TEXT ANIMATION
  // =========================================

  const collageTextOpacity =
    useTransform(
      scrollYProgress,
      [
        0.56,
        0.62,
        0.72,
        0.78,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const storyTextOpacity =
    useTransform(
      scrollYProgress,
      [
        0.78,
        0.84,
        0.92,
        0.98,
      ],
      [
        0,
        1,
        1,
        0,
      ]
    );

  const dimOverlay =
    useTransform(
      scrollYProgress,
      [0.55, 0.6],
      [0, 0.55]
    );

  const photos = useMemo(
    () => PHOTOS,
    []
  );

  // =========================================
  // RENDER
  // =========================================

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-[400vh]
        bg-bg
      "
    >
      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
        "
      >
        {photos.map(
          (photo, index) => (
            <Photo
              key={photo.src}
              photo={photo}
              index={index}
              scrollYProgress={
                scrollYProgress
              }
            />
          )
        )}

        {/* DIM */}
        <motion.div
          style={{
            opacity: dimOverlay,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            bg-bg
          "
        />

        {/* COLLAGE TEXT */}
        <motion.div
          style={{
            opacity:
              collageTextOpacity,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            flex
            flex-col
            items-center
            justify-center
            gap-2
            px-6
            text-center
          "
        >
          <p
            className="
              font-mono
              text-xs
              tracking-widest2
              text-accent
            "
          >
            DTS IN FRAME...
          </p>

          <p
            className="
              font-display
              text-4xl
              text-text
              md:text-5xl
            "
          >
            One story.
          </p>
        </motion.div>

        {/* STORY TEXT */}
        <motion.div
          style={{
            opacity:
              storyTextOpacity,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <p
            className="
              font-display
              text-4xl
              leading-tight
              text-text
              md:text-6xl
            "
          >
            Every picture
            <br />
            has a story.
          </p>
        </motion.div>
      </div>
    </div>
  );
}