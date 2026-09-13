import { ArrowUpRight } from 'lucide-react';

export default function DeveloperCredit() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-line bg-bg px-6 py-10 text-center">
      <p className="font-mono text-[9px] tracking-widest2 text-muted-dim">MEET THE DEVELOPER</p>
      <p className="font-display text-lg text-muted">Zaky</p>
      <a
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        data-cursor="VISIT"
        className="flex items-center gap-1 font-mono text-[10px] tracking-widest2 text-muted-dim transition-colors hover:text-accent"
      >
        VISIT WEBSITE
        <ArrowUpRight size={11} />
      </a>
    </footer>
  );
}
