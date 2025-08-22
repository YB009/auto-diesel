import React, { useRef } from 'react';

export default function AppleTVCards({ items = [] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it, idx) => (
        <TiltCard key={idx} title={it.title} desc={it.desc} />
      ))}
    </div>
  );
}

function TiltCard({ title, desc }) {
  const ref = useRef(null);

  function onMove(e) {
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10; // tilt X
    const ry = ((x / rect.width) - 0.5) * 10;  // tilt Y
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function onLeave() { ref.current.style.transform = ''; }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="tilt-card rounded-2xl p-6 bg-white/70 border border-slate-200 shadow-soft backdrop-blur"
    >
      <div className="tilt-inner">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-slate-600">{desc}</p>
      </div>
    </div>
  );
}