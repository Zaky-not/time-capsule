import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VIDEO_ID = 'MsinQEe4swQ';

export default function ClassVideo() {
  const [started, setStarted] = useState(false);

  return (
    <section
      id="video"
      className="section flex min-h-screen flex-col items-center justify-center gap-14 bg-bg px-6 py-24 text-center"
    >
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <p className="font-display text-3xl leading-snug text-text md:text-4xl">
          DTS IN ACTION, ACTION IN DTS
          <br />
          XII CLASS 
        </p>

        <p className="mt-4 font-display text-4xl italic text-accent md:text-5xl">
          This was us.
        </p>
      </motion.div>

      {/* VIDEO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1,
          ease: 'easeOut',
        }}
        className="film-frame relative w-full max-w-4xl overflow-hidden bg-surface"
      >
        <div className="relative aspect-video w-full">
          {!started ? (
            <>
              {/* YOUTUBE THUMBNAIL */}
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Class Video"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/35" />

              {/* PLAY BUTTON */}
              <button
                type="button"
                onClick={() => setStarted(true)}
                aria-label="Play class video"
                data-cursor="PLAY"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/40">
                  <Play
                    size={28}
                    fill="currentColor"
                    className="ml-1"
                  />
                </span>
              </button>
            </>
          ) : (
            /* YOUTUBE PLAYER */
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&playsinline=1&origin=http://localhost:5174`}
              title="Class Video"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </motion.div>

      {/* FOOTER TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.3,
        }}
        className="font-mono text-xs tracking-widest2 text-muted"
      >
        Press play. Remember everything.
      </motion.p>
    </section>
  );
}