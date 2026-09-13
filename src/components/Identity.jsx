import { motion } from 'framer-motion';
import logo from '../assets/logo/logo.png';

export default function Identity() {
  return (
    <section id="identity" className="section flex items-center justify-center overflow-hidden bg-bg">
      <div className="light-sweep" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">

        {/* LOGO ANGKATAN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-10 flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60 md:h-72 md:w-72"
        >
          <img
            src={logo}
            alt="Drestanta Tiyasa"
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* NAMA ANGKATAN */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
          className="font-display text-5xl font-medium tracking-tight text-text sm:text-6xl md:text-7xl"
        >
          Drestanta Tiyasa
        </motion.h1>

        {/* MOTTO */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
          className="mt-6 font-display text-xl italic text-muted md:text-2xl"
        >
          &ldquo;Abhipraya Nawasena.&rdquo;
        </motion.p>

        {/* TAHUN */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-10 font-mono text-xs tracking-widest2 text-muted"
        >
          2022 — 2025
        </motion.p>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 max-w-xs text-sm leading-relaxed text-muted/80"
        >
          Harapan untuk masa depan yang cerah.
        </motion.p>

      </div>
    </section>
  );
}