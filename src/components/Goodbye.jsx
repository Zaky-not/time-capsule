import { motion } from 'framer-motion';

const lines = [
  { text: 'Same people.', delay: 0 },
  { text: 'Different paths.', delay: 0.9 },
  { text: 'One memory.', delay: 1.8 },
];

export default function Goodbye() {
  return (
    <section id="goodbye" className="section flex flex-col items-center justify-center gap-16 bg-bg px-6 py-32 text-center">
      <div className="flex flex-col gap-3">
        {lines.map((line) => (
          <motion.p
            key={line.text}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: line.delay, ease: 'easeOut' }}
            className="font-display text-2xl text-muted md:text-3xl"
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.4, delay: 2.8, ease: 'easeOut' }}
        className="font-display text-6xl text-text md:text-8xl"
      >
        See you again.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, delay: 4 }}
        className="font-mono text-xs tracking-widest2 text-muted"
      >
        2023 — 2026
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, delay: 4.6 }}
        className="font-display text-xl italic text-muted"
      >
        Until our paths cross again.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, delay: 5.4 }}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-[8px] tracking-widest2 text-muted-dim"
      >
        LOGO
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, delay: 6.2 }}
        className="font-mono text-[10px] tracking-widest2 text-muted-dim"
      >
        FIN.
      </motion.p>
    </section>
  );
}
