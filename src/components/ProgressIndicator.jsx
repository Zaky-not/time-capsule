import { motion } from 'framer-motion';

const STEPS = [
  { id: 'identity', label: 'INTRO' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'members', label: 'CLASS' },
  { id: 'video', label: 'VIDEO' },
  { id: 'wall', label: 'WALL' },
  { id: 'goodbye', label: 'END' },
];

export default function ProgressIndicator({ activeId, onNavigate }) {
  return (
    <nav
      aria-label="Section progress"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-0 md:flex"
    >
      {STEPS.map((step, i) => {
        const isActive = step.id === activeId;
        return (
          <div key={step.id} className="group flex items-center gap-3 py-2">
            <span
              className={`font-mono text-[9px] tracking-widest2 transition-opacity duration-300 ${
                isActive ? 'opacity-70 text-accent' : 'opacity-0 group-hover:opacity-40 text-muted'
              }`}
            >
              {step.label}
            </span>
            <button
              type="button"
              onClick={() => onNavigate?.(step.id)}
              aria-label={`Go to ${step.label}`}
              aria-current={isActive}
              className="relative flex h-4 w-4 items-center justify-center"
            >
              <motion.span
                animate={{
                  scale: isActive ? 1 : 0.5,
                  backgroundColor: isActive ? '#c9a45c' : 'rgba(241,236,225,0.3)',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="block h-1.5 w-1.5 rounded-full"
              />
            </button>
            {i < STEPS.length - 1 && <span className="hidden" />}
          </div>
        );
      })}
    </nav>
  );
}

export { STEPS };
