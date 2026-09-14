import { motion } from 'framer-motion';

const FEATURED_RATIO = 'aspect-[3/2]';

const ALIGN = {
  left: 'md:mr-auto md:ml-0',
  right: 'md:ml-auto md:mr-0',
  center: 'md:mx-auto',
};

export default function FeaturedPhoto({
  photo,
  align = 'center',
  onOpen,
}) {
  const alignClasses =
    ALIGN[align] ?? ALIGN.center;

  return (
    <div
      className={`w-full ${alignClasses} md:w-3/4 lg:w-2/3`}
    >
      <motion.button
        type="button"
        data-cursor="VIEW"
        onClick={onOpen}
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.35,
        }}
        transition={{
          duration: 0.9,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        whileHover={{
          scale: 1.01,
        }}
        className={`
          film-frame
          group
          ${FEATURED_RATIO}
          block
          w-full
          overflow-hidden
          bg-surface
        `}
      >
        <img
          src={photo.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-1000
            ease-out
            group-hover:scale-[1.025]
          "
        />
      </motion.button>
    </div>
  );
}