import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(isFine);
    if (!isFine) return;

    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (labelRef.current) {
        labelRef.current.style.left = `${e.clientX}px`;
        labelRef.current.style.top = `${e.clientY - 26}px`;
      }
    };

    const over = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target || !dotRef.current || !labelRef.current) return;
      const word = target.getAttribute('data-cursor');
      dotRef.current.style.width = '46px';
      dotRef.current.style.height = '46px';
      dotRef.current.style.background = 'transparent';
      dotRef.current.style.border = '1px solid #c9a45c';
      labelRef.current.textContent = word;
      labelRef.current.style.opacity = word ? '1' : '0';
    };

    const out = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (!target || !dotRef.current || !labelRef.current) return;
      dotRef.current.style.width = '10px';
      dotRef.current.style.height = '10px';
      dotRef.current.style.background = '#c9a45c';
      dotRef.current.style.border = 'none';
      labelRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
