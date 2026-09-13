import { motion } from 'framer-motion';

const FRAME_RATIO = 'aspect-[4/3]';

export default function MemoryPhoto({ photo, index, onOpen, className = '' }) {
  return (
    <motion.button
      type="button"
      data-cursor="VIEW"
      onClick={onOpen}
      initial={{ opacity: 0, y: 22, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`film-frame group block overflow-hidden bg-surface ${className}`}
    >
      <div className={`${FRAME_RATIO} w-full overflow-hidden`}>
        <img
          src={photo.src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </motion.button>
  );
}
