import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useState } from 'react';

export default function MemberCard({
  member,
  index = 0,
  onOpen,
  className = '',
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const isMemorial = member.memorial;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.015, 0.12),
        ease: 'easeOut',
      }}
      className={`group ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpen?.(member)}
        aria-label={`Open ${member.name}`}
        className={`relative block w-full text-left ${
          isMemorial ? 'film-frame' : ''
        }`}
      >
        {/* PHOTO */}
        <div
          className={`relative aspect-[4/5] w-full overflow-hidden bg-surface ${
            isMemorial
              ? 'border border-accent/60'
              : 'border border-line'
          }`}
        >
          {/* Loading background */}
          <div
            className={`absolute inset-0 bg-surface transition-opacity duration-300 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <img
            src={member.photo}
            alt={member.name}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index < 2 ? 'high' : 'auto'}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300 ${
              isMemorial
                ? 'grayscale'
                : 'grayscale-[10%]'
            }`}
          />

          {/* Desktop hover effect only */}
          <div className="pointer-events-none absolute inset-0 hidden bg-black/10 opacity-0 transition-opacity duration-300 md:block md:group-hover:opacity-100" />

          {/* Number */}
          <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] tracking-[0.18em] text-white/80 drop-shadow">
            {String(member.number).padStart(2, '0')}
          </div>

          {/* Memorial */}
          {isMemorial && (
            <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
              Forever remembered
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="mt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-lg leading-tight text-text">
                {member.name}
              </h3>

              {member.instagram && (
                <div className="mt-1.5 flex items-center gap-2 text-muted">
                  <Instagram
                    size={10}
                    strokeWidth={1.5}
                  />

                  <span className="font-mono text-[9px] tracking-wider">
                    {member.instagram}
                  </span>
                </div>
              )}
            </div>

            <span className="shrink-0 font-mono text-[9px] tracking-widest text-muted">
              {String(member.number).padStart(2, '0')}
            </span>
          </div>

          {/* QUOTE */}
          {(member.quote || member.memorialNote) && (
            <p
              className={`mt-3 border-l pl-3 font-display text-sm italic leading-relaxed ${
                isMemorial
                  ? 'border-accent/60 text-accent'
                  : 'border-line text-muted'
              }`}
            >
              {isMemorial
                ? member.memorialNote
                : member.quote}
            </p>
          )}
        </div>
      </button>
    </motion.article>
  );
}