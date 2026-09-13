import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Owns two <audio> elements:
 *  - ambient: soft projector/room-tone loop, allowed to start right after
 *    the first user gesture (ENTER MEMORY).
 *  - mainSong: the emotional track, reserved for the Memory Wall. Starts at
 *    volume 0 and eases up over ~4s once triggered.
 *
 * Exposes imperative handles so sibling sections can trigger sfx/song
 * without lifting audio state into App.
 */
const AudioController = forwardRef(function AudioController(_, ref) {
  const ambientRef = useRef(null);
  const songRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [songStarted, setSongStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    startAmbient() {
      const el = ambientRef.current;
      if (!el || muted) return;
      el.volume = 0.18;
      el.play().catch(() => {});
    },
    playShutter() {
      // Lightweight one-shot sfx reuse the ambient element's sibling pattern.
      // Replace src at /src/assets/audio/shutter.mp3
      if (muted) return;
      const sfx = new Audio('/src/assets/audio/shutter.mp3');
      sfx.volume = 0.3;
      sfx.play().catch(() => {});
    },
    startMainSong() {
      const el = songRef.current;
      if (!el || songStarted) return;
      setSongStarted(true);
      if (muted) return;
      el.volume = 0;
      el.play().catch(() => {});
      const steps = [0.1, 0.25, 0.5, 0.7];
      steps.forEach((v, i) => {
        setTimeout(() => {
          if (el) el.volume = v;
        }, (i + 1) * 900);
      });
    },
    fadeOutMainSong(duration = 2500) {
      const el = songRef.current;
      if (!el) return;
      const startVol = el.volume;
      const steps = 10;
      const stepTime = duration / steps;
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        el.volume = Math.max(0, startVol * (1 - i / steps));
        if (i >= steps) {
          clearInterval(interval);
          el.pause();
        }
      }, stepTime);
    },
  }));

  useEffect(() => {
    if (ambientRef.current) ambientRef.current.muted = muted;
    if (songRef.current) songRef.current.muted = muted;
  }, [muted]);

  return (
    <>
      {/* Replace sources with real files. Ambient should be a soft, seamless loop. */}
      <audio ref={ambientRef} src="/src/assets/audio/ambient.mp3" loop preload="none" />
      <audio ref={songRef} src="/src/assets/audio/main-song.mp3" loop preload="none" />

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-pressed={muted}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-line bg-bg-soft/70 px-4 py-2 font-mono text-[10px] tracking-widest2 text-muted backdrop-blur-sm transition-colors hover:text-text"
      >
        {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        <span>MUSIC</span>
      </button>
    </>
  );
});

export default AudioController;
