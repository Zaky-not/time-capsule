import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

import { supabase } from '../lib/supabase.js';
import MemoryForm from './MemoryForm.jsx';

const PLACEMENTS = [
  { rotate: -4, top: '4%', left: '6%' },
  { rotate: 3, top: '2%', left: '38%' },
  { rotate: -2, top: '10%', left: '68%' },
  { rotate: 5, top: '30%', left: '20%' },
  { rotate: -6, top: '34%', left: '52%' },
  { rotate: 2, top: '28%', left: '80%' },
  { rotate: -3, top: '56%', left: '10%' },
  { rotate: 4, top: '60%', left: '42%' },
  { rotate: -5, top: '52%', left: '72%' },
];

function placementFor(index) {
  return PLACEMENTS[index % PLACEMENTS.length];
}

export default function MemoryWall({ onEnterWall }) {
  const [memories, setMemories] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD MEMORIES
  // ==========================================

  useEffect(() => {
    let mounted = true;

    async function loadMemories() {
      setLoading(true);

      const { data, error } = await supabase
        .from('memories')
        .select(
          'id, name, message, anonymous, created_at'
        )
        .order('created_at', {
          ascending: true,
        });

      if (error) {
        console.error(
          'Failed to load memories:',
          error
        );

        if (mounted) {
          setMemories([]);
        }
      } else if (mounted) {
        setMemories(data || []);
      }

      if (mounted) {
        setLoading(false);
      }
    }

    loadMemories();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================
  // SUBMIT MEMORY
  // ==========================================

  const handleSubmit = async (entry) => {
    const cleanName =
      entry.name?.trim() || '';

    const cleanMessage =
      entry.message?.trim() || '';

    const anonymous =
      Boolean(entry.anonymous);

    if (!cleanMessage) {
      return;
    }

    const { data, error } = await supabase
      .from('memories')
      .insert([
        {
          name: anonymous
            ? null
            : cleanName || null,
          message: cleanMessage,
          anonymous,
        },
      ])
      .select(
        'id, name, message, anonymous, created_at'
      )
      .single();

    if (error) {
      console.error(
        'Failed to save memory:',
        error
      );

      alert(
        'Memory gagal disimpan. Silakan coba lagi.'
      );

      return;
    }

    if (data) {
      setMemories((prev) => [
        ...prev,
        data,
      ]);
    }

    setFormOpen(false);
  };

  return (
    <section
      id="wall"
      className="section relative overflow-hidden bg-bg-soft px-6 py-24 md:px-16"
    >
      {/* ==========================================
          INTRO
      ========================================== */}

      <motion.div
        onViewportEnter={onEnterWall}
        viewport={{
          amount: 0.3,
          once: true,
        }}
        className="mb-20 flex flex-col items-center gap-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display text-3xl text-text md:text-4xl"
        >
          Before you leave&hellip;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.8,
          }}
          className="font-display text-3xl italic text-accent md:text-4xl"
        >
          Leave something behind.
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 1.6,
          }}
          className="mt-10 font-display text-5xl text-text md:text-6xl"
        >
          Memory Wall
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 1.9,
          }}
          className="text-sm text-muted"
        >
          Words we couldn&rsquo;t say out loud.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 2.1,
          }}
          className="font-mono text-[11px] tracking-widest2 text-muted"
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={memories.length}
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 6,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              {memories.length} MEMORIES LEFT
            </motion.span>
          </AnimatePresence>
        </motion.p>
      </motion.div>

      {/* ==========================================
          MEMORY WALL
      ========================================== */}

      <div className="relative mx-auto min-h-[300px] w-full max-w-5xl md:min-h-[600px]">

        {/* LOADING */}

        {loading && (
          <div className="flex min-h-[220px] items-center justify-center">
            <p className="font-mono text-[10px] tracking-widest2 text-muted-dim">
              LOADING MEMORIES...
            </p>
          </div>
        )}

        {/* DESKTOP */}

        {!loading &&
          memories.length > 0 && (
            <div className="hidden md:block">
              {memories.map(
                (memory, index) => {
                  const placement =
                    placementFor(index);

                  return (
                    <motion.div
                      key={memory.id}
                      initial={{
                        opacity: 0,
                        y: 40,
                        rotate: 0,
                        scale: 0.8,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        rotate:
                          placement.rotate,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.4,
                      }}
                      transition={{
                        duration: 0.6,
                        delay:
                          (index % 6) *
                          0.08,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      style={{
                        position:
                          'absolute',
                        top:
                          placement.top,
                        left:
                          placement.left,
                      }}
                      className="paper-note w-56 p-5 font-display text-base leading-snug"
                    >
                      <p className="italic">
                        &ldquo;
                        {memory.message}
                        &rdquo;
                      </p>

                      <p className="mt-4 font-mono text-[10px] not-italic tracking-widest2 text-muted-dim">
                        —{' '}
                        {memory.anonymous
                          ? 'Anonymous'
                          : memory.name ||
                            'Anonymous'}
                      </p>
                    </motion.div>
                  );
                }
              )}
            </div>
          )}

        {/* MOBILE */}

        {!loading &&
          memories.length > 0 && (
            <div className="flex flex-col gap-5 md:hidden">
              {memories.map(
                (memory, index) => (
                  <motion.div
                    key={memory.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                      rotate:
                        index % 2 === 0
                          ? -2
                          : 2,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.4,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="paper-note p-5 font-display text-base leading-snug"
                  >
                    <p className="italic">
                      &ldquo;
                      {memory.message}
                      &rdquo;
                    </p>

                    <p className="mt-4 font-mono text-[10px] not-italic tracking-widest2 text-muted-dim">
                      —{' '}
                      {memory.anonymous
                        ? 'Anonymous'
                        : memory.name ||
                          'Anonymous'}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          )}

        {/* EMPTY STATE */}

        {!loading &&
          memories.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
              }}
              className="flex min-h-[220px] items-center justify-center text-center"
            >
              <p className="max-w-sm font-display text-lg italic text-muted-dim">
                No memories have been
                left yet.
                <br />
                Maybe yours will be
                the first.
              </p>
            </motion.div>
          )}
      </div>

      {/* ==========================================
          BUTTON
      ========================================== */}

      <div className="mt-20 flex justify-center">
        <button
          type="button"
          data-cursor="WRITE"
          onClick={() =>
            setFormOpen(true)
          }
          className="flex items-center gap-2 border border-line px-7 py-3 font-mono text-[11px] tracking-widest2 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Plus size={13} />
          LEAVE A MEMORY
        </button>
      </div>

      {/* ==========================================
          FORM
      ========================================== */}

      <MemoryForm
        open={formOpen}
        onClose={() =>
          setFormOpen(false)
        }
        onSubmit={handleSubmit}
      />
    </section>
  );
}