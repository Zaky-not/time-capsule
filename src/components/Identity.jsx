import { motion } from 'framer-motion';

export default function Identity() {
  return (
    <section id="identity" className="section flex items-center justify-center overflow-hidden bg-bg">
      <div className="light-sweep" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-line font-mono text-[10px] tracking-widest2 text-muted"
        >
          LOGO
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          className="font-display text-5xl font-medium tracking-tight text-text sm:text-6xl md:text-7xl"
        >
          [NAMA ANGKATAN]
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
          className="mt-6 font-display text-xl italic text-muted md:text-2xl"
        >
          &ldquo;Same Class, Different Stories.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-10 font-mono text-xs tracking-widest2 text-muted"
        >
          2023 — 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 max-w-xs text-sm leading-relaxed text-muted/80"
        >
          A collection of moments we never want to forget.
        </motion.p>
      </div>
    </section>
  );
}
