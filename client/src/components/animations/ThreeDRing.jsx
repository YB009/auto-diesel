import React from 'react';

export default function ThreeDRing({ items = [] }) {
  return (
    <div className="relative h-56 sm:h-64 md:h-72 perspective-[1000px]">
      <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] animate-[spin_20s_linear_infinite]">
        {items.map((t, i) => (
          <span
            key={i}
            className="absolute inline-flex items-center justify-center w-28 h-16 rounded-xl bg-white/80 border border-slate-200 shadow-soft backdrop-blur text-slate-800 font-medium"
            style={{ transform: `rotateY(${i * (360 / items.length)}deg) translateZ(220px)` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}