import { motion } from 'framer-motion';

const VIDEO_ID = 'MsinQEe4swQ';

export default function ClassVideo() {
  return (
    <section
      id="video"
      className="relative min-h-[100dvh] overflow-hidden bg-black text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center justify-center px-6 py-16 sm:px-8 md:px-12">

        {/* =========================
            TITLE
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
          className="w-full text-center"
        >
          {/* DTS IN ACTION, ACTION IN DTS */}
          <h2 className="whitespace-nowrap font-serif text-3xl leading-none tracking-tight text-[var(--cream)] sm:text-4xl md:text-5xl">
            DTS IN ACTION, ACTION IN DTS
          </h2>

          {/* XII CLASS */}
          <p className="mt-6 whitespace-nowrap font-serif text-2xl leading-none tracking-tight text-[var(--cream)] sm:text-3xl md:text-4xl">
            XII CLASS
          </p>

          {/* THIS WAS US */}
          <p
            className="mt-8 font-serif text-4xl italic leading-none tracking-tight sm:text-5xl md:text-6xl"
            style={{
              color: 'var(--gold)',
            }}
          >
            This was us.
          </p>
        </motion.div>

        {/* =========================
            VIDEO
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            margin: '-80px',
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: 'easeOut',
          }}
          className="mt-14 w-full"
        >
          <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-black">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&playsinline=1`}
              title="DTS In Action - XII Class"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Inner frame */}
            <div className="pointer-events-none absolute inset-0 border border-white/5" />

            {/* Corner marks */}
            <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-white/25" />
            <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-white/25" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/25" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/25" />
          </div>
        </motion.div>

        {/* =========================
            CAPTION
        ========================== */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="mt-10 text-center font-mono text-[11px] leading-[1.8] tracking-[0.35em] text-white/55 sm:text-xs"
        >
          Press play. Remember
          <br />
          everything.
        </motion.p>
      </div>

      {/* =========================
          MUSIC BUTTON
      ========================== */}
      <div className="absolute bottom-8 right-6 z-30 sm:right-10">
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 transition hover:border-white/30 hover:text-white"
        >
          <span className="text-sm">◖</span>
          MUSIC
        </button>
      </div>

      {/* =========================
          FILM GRAIN
      ========================== */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%22.8%22/%3E%3C/svg%3E")',
        }}
      />
    </section>
  );
}