import React, { useEffect, useRef } from 'react';

// Flashlight effect inspired by your "Flashlight" demo
export default function FlashlightLayer() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    function onMove(e) {
      const { clientX: x, clientY: y } = e;
      el.style.background = `radial-gradient(160px at ${x}px ${y}px, rgba(255,255,255,0.0), rgba(255,255,255,0.8))`;
    }
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div ref={ref} className="flashlight-overlay fixed inset-0 z-10"></div>
  );
}