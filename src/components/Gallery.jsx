import { useState } from 'react';
import { motion } from 'framer-motion';

import gallery from '../data/gallery.js';

import FeaturedPhoto from './FeaturedPhoto.jsx';
import MemoryPhoto from './MemoryPhoto.jsx';
import PhotoViewer from './PhotoViewer.jsx';

const FEATURED_COUNT = 3;

const FEATURED_ALIGN = ['left', 'right', 'center'];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  const featured = gallery.slice(0, FEATURED_COUNT);
  const memories = gallery.slice(FEATURED_COUNT);

  return (
    <section
      id="gallery"
      className="relative overflow-x-hidden bg-bg"
    >

      {/* ==================================================
          GALLERY INTRO
      ================================================== */}

      <div className="section flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-xs tracking-widest2 text-accent"
        >
          ARCHIVE 001
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
          className="mt-4 font-display text-5xl text-text md:text-7xl"
        >
          The Gallery
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 0.9,
            delay: 0.3,
          }}
          className="mt-6 font-display text-2xl italic text-text/90 md:text-3xl"
        >
          Every picture has a story.
        </motion.p>
      </div>


      {/* ==================================================
          FEATURED PHOTOS
      ================================================== */}

      <div className="flex flex-col gap-28 px-6 py-20 md:gap-40 md:px-16 md:py-28 lg:px-24">
        {featured.map((photo, i) => (
          <div
            key={photo.id}
            className="w-full"
          >

            {/* PHOTO */}
            <FeaturedPhoto
              photo={photo}
              align={FEATURED_ALIGN[i % FEATURED_ALIGN.length]}
              onOpen={() => setActiveIndex(i)}
            />

            {/* PHOTO INFORMATION */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="mx-auto mt-7 max-w-xl text-center"
            >

              {/* TITLE */}
              <h3 className="font-display text-xl uppercase tracking-wide text-text md:text-2xl">
                {photo.title}
              </h3>

              {/* DESCRIPTION */}
              {photo.description && (
                <p className="mt-2 font-display text-base italic text-text/70 md:text-lg">
                  {photo.description}
                </p>
              )}

              {/* META */}
              {(photo.date || photo.location) && (
                <div className="mt-4 flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-text/40">
                  {photo.date && <span>{photo.date}</span>}

                  {photo.date && photo.location && (
                    <span>·</span>
                  )}

                  {photo.location && (
                    <span>{photo.location}</span>
                  )}
                </div>
              )}
            </motion.div>

          </div>
        ))}
      </div>


      {/* ==================================================
          MEMORIES HEADING
      ================================================== */}

      {memories.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center md:py-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9 }}
            className="font-mono text-xs tracking-widest2 text-accent"
          >
            ARCHIVE 002
          </motion.span>

          <motion.h3
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
            className="font-display text-4xl text-text md:text-6xl"
          >
            Memories
          </motion.h3>
        </div>
      )}


      {/* ==================================================
          MEMORY GRID
      ================================================== */}

      {memories.length > 0 && (
        <div className="px-6 pb-28 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-5">

            {memories.map((photo, i) => {
              const globalIndex = FEATURED_COUNT + i;

              return (
                <MemoryPhoto
                  key={photo.id}
                  photo={photo}
                  index={globalIndex}
                  onOpen={() => setActiveIndex(globalIndex)}
                />
              );
            })}

          </div>
        </div>
      )}


      {/* ==================================================
          PHOTO VIEWER
      ================================================== */}

      <PhotoViewer
        photos={gallery}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />


      {/* ==================================================
          CLOSING TEXT
      ================================================== */}

      <div className="section flex flex-col items-center justify-center gap-8 border-t border-line px-6 text-center">

        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 1,
          }}
          className="max-w-md font-display text-3xl leading-snug text-text md:text-4xl"
        >
          But the memories were never just about the places.
        </motion.p>

        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="max-w-md font-display text-3xl leading-snug text-accent md:text-4xl"
        >
          They&rsquo;re about the people in them.
        </motion.p>

      </div>

    </section>
  );
}