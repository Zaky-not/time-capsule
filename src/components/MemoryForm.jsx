import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function MemoryForm({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const reset = () => {
    setName('');
    setMessage('');
    setAnonymous(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit({
      name: anonymous ? null : name.trim() || null,
      message: message.trim(),
      anonymous,
    });
    reset();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/90 px-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Leave a memory"
          onClick={onClose}
        >
          <motion.form
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="relative w-full max-w-md border border-line bg-bg-soft p-8"
          >
            <button
              type="button"
              data-cursor="CLOSE"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-muted transition-colors hover:text-text"
            >
              <X size={18} />
            </button>

            <p className="font-mono text-xs tracking-widest2 text-accent">LEAVE A MEMORY</p>

            <label className="mt-8 block font-mono text-[10px] tracking-widest2 text-muted" htmlFor="mem-name">
              NAME
            </label>
            <input
              id="mem-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={anonymous}
              placeholder="Your name"
              className="mt-2 w-full border-b border-line bg-transparent pb-2 text-sm text-text outline-none placeholder:text-muted-dim focus:border-accent disabled:opacity-40"
            />

            <label className="mt-6 block font-mono text-[10px] tracking-widest2 text-muted" htmlFor="mem-message">
              YOUR MESSAGE
            </label>
            <textarea
              id="mem-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say what you never got to say."
              className="mt-2 w-full resize-none border-b border-line bg-transparent pb-2 text-sm text-text outline-none placeholder:text-muted-dim focus:border-accent"
            />

            <label className="mt-6 flex items-center gap-2 text-xs text-muted">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="h-3.5 w-3.5 accent-accent"
              />
              POST ANONYMOUSLY
            </label>

            <button
              type="submit"
              className="mt-8 w-full border border-line py-3 font-mono text-[11px] tracking-widest2 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              POST MEMORY
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
