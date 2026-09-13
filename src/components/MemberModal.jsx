import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function MemberModal({ member, onClose }) {
  const isMemorial = member?.memorial;

  useEffect(() => {
    if (!member) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Profile of ${member.name}`}
          onClick={onClose}
        >
          <button
            type="button"
            data-cursor="CLOSE"
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-6 top-6 text-muted transition-colors hover:text-text"
          >
            <X size={22} />
          </button>

          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-3xl flex-col items-center gap-8 px-6 text-center md:flex-row md:items-stretch md:text-left"
          >
            <div
              className={`h-72 w-56 shrink-0 overflow-hidden border bg-surface md:h-96 md:w-72 ${
                isMemorial ? 'border-accent/30' : 'border-line'
              }`}
            >
              <img
                src={member.photo}
                alt=""
                className={`h-full w-full object-cover ${isMemorial ? 'grayscale' : ''}`}
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <span className="font-mono text-xs tracking-widest2 text-accent">#{member.number}</span>
              <h3 className="font-display text-5xl text-text">{member.name}</h3>
              <span className="font-mono text-xs tracking-widest2 text-muted">{member.instagram}</span>

              {isMemorial ? (
                <>
                  <p className="mt-2 font-display text-xl italic text-accent/90">{member.memorialNote}</p>
                  <p className="max-w-xs font-display text-lg leading-relaxed text-text/80">{member.memory}</p>
                </>
              ) : (
                <p className="mt-4 max-w-xs font-display text-2xl italic leading-snug text-text/90">
                  {member.quote}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
