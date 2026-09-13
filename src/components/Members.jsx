import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import members from '../data/members.js';
import MemberCard from './MemberCard.jsx';
import MemberModal from './MemberModal.jsx';

export default function Members() {
  const [active, setActive] = useState(null);

  const regularMembers = members.filter((member) => !member.memorial);
  const memorialMember = members.find((member) => member.memorial);

  const pickRandom = () => {
    const pick = members[Math.floor(Math.random() * members.length)];
    setActive(pick);
  };

  return (
    <section id="members" className="section bg-bg px-6 py-24 md:px-16 lg:px-24">
      <div className="mb-16 flex flex-col items-center text-center">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9 }} className="font-display text-5xl text-text md:text-7xl">
          Meet the DTS People.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, delay: 0.2 }} className="mt-4 font-mono text-xs tracking-widest2 text-muted">
          Apapun Apa Yang Dimpikan, Semoga Tersampaikan. 
        </motion.p>

        <motion.button type="button" data-cursor="SHUFFLE" onClick={pickRandom} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.9, delay: 0.4 }} className="mt-10 flex items-center gap-2 border border-line px-6 py-3 font-mono text-[11px] tracking-widest2 text-muted transition-colors hover:border-accent hover:text-accent">
          <Shuffle size={13} />
          RANDOM MEMORY
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {regularMembers.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} onOpen={setActive} />
        ))}
      </div>

      {memorialMember && (
        <div className="mt-20 flex justify-center">
          <MemberCard
            member={memorialMember}
            index={regularMembers.length}
            onOpen={setActive}
            className="w-full max-w-[18rem] sm:max-w-[20rem] md:max-w-[22rem]"
          />
        </div>
      )}

      <MemberModal member={active} onClose={() => setActive(null)} />
    </section>
  );
}
