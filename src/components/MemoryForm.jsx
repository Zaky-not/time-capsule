import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function MemoryForm({
  open,
  onClose,
  onSubmit,
}) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] =
    useState(false);
  const [submitting, setSubmitting] =
    useState(false);

  const handleClose = () => {
    if (submitting) return;

    setName('');
    setMessage('');
    setAnonymous(false);

    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanMessage =
      message.trim();

    if (
      !cleanMessage ||
      submitting
    ) {
      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        message: cleanMessage,
        anonymous,
      });

      setName('');
      setMessage('');
      setAnonymous(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.35,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="relative w-full max-w-lg border border-line bg-bg-soft p-7 md:p-9"
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              aria-label="Close"
              className="absolute right-5 top-5 text-muted transition-colors hover:text-text disabled:opacity-30"
            >
              <X size={19} />
            </button>

            {/* HEADER */}

            <div className="mb-8">
              <p className="font-mono text-[9px] tracking-widest2 text-muted-dim">
                MEMORY WALL
              </p>

              <h3 className="mt-3 font-display text-3xl text-text">
                Leave something behind.
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                A memory, a message, or
                something you never got
                to say.
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* NAME */}

              <div>
                <label
                  htmlFor="memory-name"
                  className="mb-2 block font-mono text-[10px] tracking-widest2 text-muted"
                >
                  NAME
                </label>

                <input
                  id="memory-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  disabled={
                    anonymous ||
                    submitting
                  }
                  maxLength={80}
                  placeholder="Your name"
                  className="w-full border-b border-line bg-transparent px-0 py-3 font-display text-base text-text outline-none placeholder:text-muted-dim focus:border-accent disabled:cursor-not-allowed disabled:opacity-40"
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label
                  htmlFor="memory-message"
                  className="mb-2 block font-mono text-[10px] tracking-widest2 text-muted"
                >
                  YOUR MEMORY
                </label>

                <textarea
                  id="memory-message"
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value
                    )
                  }
                  maxLength={1000}
                  required
                  rows={5}
                  placeholder="Write something..."
                  disabled={submitting}
                  className="w-full resize-none border-b border-line bg-transparent px-0 py-3 font-display text-base leading-relaxed text-text outline-none placeholder:text-muted-dim focus:border-accent disabled:opacity-40"
                />

                <p className="mt-2 text-right font-mono text-[9px] text-muted-dim">
                  {message.length}/1000
                </p>
              </div>

              {/* ANONYMOUS */}

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(event) =>
                    setAnonymous(
                      event.target.checked
                    )
                  }
                  disabled={submitting}
                  className="h-3.5 w-3.5 accent-current"
                />

                <span className="font-mono text-[10px] tracking-widest2 text-muted">
                  LEAVE ANONYMOUS
                </span>
              </label>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={
                  !message.trim() ||
                  submitting
                }
                className="w-full border border-line px-6 py-3.5 font-mono text-[10px] tracking-widest2 text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
              >
                {submitting
                  ? 'LEAVING MEMORY...'
                  : 'LEAVE MEMORY'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}