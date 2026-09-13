import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Volume2, VolumeX } from 'lucide-react';

import ambient from '../assets/audio/ambient.mp3';
import mainSong from '../assets/audio/main.mp3';
import shutter from '../assets/audio/shutter.mp3';

/**
 * Audio Controller
 *
 * ambient.mp3  → ambience untuk bagian awal
 * shutter.mp3  → efek kamera / photo explosion
 * main.mp3     → lagu utama, mulai saat Memory Wall
 */

const AudioController = forwardRef(function AudioController(_, ref) {
  const ambientRef = useRef(null);
  const songRef = useRef(null);

  const [muted, setMuted] = useState(false);
  const [songStarted, setSongStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    /**
     * Start ambient sound
     * Dipanggil setelah user melakukan gesture
     * seperti ENTER MEMORY.
     */
    startAmbient() {
      const el = ambientRef.current;

      if (!el || muted) return;

      el.volume = 0.18;

      el.play().catch(() => {});
    },

    /**
     * Camera shutter sound
     * Dipakai saat Photo Explosion / perpindahan foto.
     */
    playShutter() {
      if (muted) return;

      const sfx = new Audio(shutter);

      sfx.volume = 0.3;

      sfx.play().catch(() => {});
    },

    /**
     * Start main emotional song
     * Dipanggil saat masuk Memory Wall.
     */
    startMainSong() {
      const el = songRef.current;

      if (!el || songStarted) return;

      setSongStarted(true);

      if (muted) return;

      el.volume = 0;

      el.play().catch(() => {});

      // Smooth fade-in sekitar 3.6 detik
      const steps = [0.1, 0.25, 0.5, 0.7];

      steps.forEach((volume, index) => {
        setTimeout(() => {
          if (el && !el.paused) {
            el.volume = volume;
          }
        }, (index + 1) * 900);
      });
    },

    /**
     * Fade out main song
     * Dipanggil ketika menuju halaman akhir.
     */
    fadeOutMainSong(duration = 2500) {
      const el = songRef.current;

      if (!el) return;

      const startVolume = el.volume;
      const steps = 10;
      const stepTime = duration / steps;

      let step = 0;

      const interval = setInterval(() => {
        step += 1;

        el.volume = Math.max(
          0,
          startVolume * (1 - step / steps)
        );

        if (step >= steps) {
          clearInterval(interval);

          el.pause();
          el.currentTime = 0;
        }
      }, stepTime);
    },
  }));

  /**
   * Sync mute state dengan audio element.
   */
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.muted = muted;
    }

    if (songRef.current) {
      songRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <>
      {/* Ambient */}
      <audio
        ref={ambientRef}
        src={ambient}
        loop
        preload="none"
      />

      {/* Main Song */}
      <audio
        ref={songRef}
        src={mainSong}
        loop
        preload="none"
      />

      {/* Music Control */}
      <button
        type="button"
        onClick={() => setMuted((current) => !current)}
        aria-pressed={muted}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        className="
          fixed bottom-6 right-6 z-50
          flex items-center gap-2
          rounded-full
          border border-line
          bg-bg-soft/70
          px-4 py-2
          font-mono text-[10px]
          tracking-widest2
          text-muted
          backdrop-blur-sm
          transition-colors
          hover:text-text
        "
      >
        {muted ? (
          <VolumeX size={12} />
        ) : (
          <Volume2 size={12} />
        )}

        <span>MUSIC</span>
      </button>
    </>
  );
});

export default AudioController;