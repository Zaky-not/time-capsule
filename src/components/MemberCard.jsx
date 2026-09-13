import { motion } from 'framer-motion';

export default function MemberCard({ member, onOpen, index, className = '' }) {
  const isMemorial = member.memorial;

  return (
    <motion.button
      type="button"
      data-cursor="VIEW"
      onClick={() => onOpen(member)}
      initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -4 : 4, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: isMemorial ? -3 : -6 }}
      className={`group relative flex flex-col overflow-hidden border bg-surface text-left ${isMemorial ? 'border-accent/30' : 'border-line'} ${className}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={member.photo}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isMemorial ? 'grayscale' : 'grayscale-[15%]'}`}
        />
        <span className="absolute left-3 top-3 font-mono text-[10px] tracking-widest2 text-text/80">
          #{member.number}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h4 className="font-display text-xl text-text">{member.name}</h4>
        <span className="font-mono text-[10px] tracking-widest2 text-muted">{member.instagram}</span>
        {isMemorial ? (
          <p className="mt-2 font-display text-sm italic text-accent/80">{member.memorialNote}</p>
        ) : (
          <p className="mt-2 line-clamp-2 font-display text-sm italic text-muted/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{member.quote}</p>
        )}
      </div>
    </motion.button>
  );
}
