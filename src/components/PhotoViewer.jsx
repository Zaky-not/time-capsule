import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoViewer({ photos, activeIndex, onClose, onNavigate }) {
  const open = activeIndex !== null && activeIndex !== undefined;
  const photo = open ? photos[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (!open) return;
    onNavigate((activeIndex - 1 + photos.length) % photos.length);
  }, [open, activeIndex, photos.length, onNavigate]);

  const goNext = useCallback(() => {
    if (!open) return;
    onNavigate((activeIndex + 1) % photos.length);
  }, [open, activeIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/97 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={onClose}
        >
          <button type="button" data-cursor="CLOSE" onClick={onClose} aria-label="Close photo" className="absolute right-6 top-6 z-20 text-muted transition-colors hover:text-text">
            <X size={22} />
          </button>

          <button type="button" data-cursor="PREV" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous photo" className="absolute left-3 top-1/2 z-20 -translate-y-1/2 p-3 text-muted transition-colors hover:text-text md:left-8">
            <ChevronLeft size={26} />
          </button>

          <button type="button" data-cursor="NEXT" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next photo" className="absolute right-3 top-1/2 z-20 -translate-y-1/2 p-3 text-muted transition-colors hover:text-text md:right-8">
            <ChevronRight size={26} />
          </button>

          <motion.div
            key={photo?.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-7xl items-center justify-center px-14 py-16 md:px-24"
          >
            {photo && (
              <img src={photo.src} alt="" className="max-h-full max-w-full object-contain" />
            )}
          </motion.div>

          {photo && (
            <span className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest2 text-muted">
              {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
