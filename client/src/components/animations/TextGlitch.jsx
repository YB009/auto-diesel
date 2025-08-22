import React from 'react';


export default function TextGlitch({ text }) {
return (
<div className="relative inline-block font-black tracking-tight">
<span className="relative text-4xl sm:text-6xl md:text-7xl text-slate-900">
{text}
<span className="absolute inset-0 text-brand-500/60 animate-[glitch_1.6s_infinite] select-none" aria-hidden>
{text}
</span>
<span className="absolute inset-0 text-blue-600/40 animate-[glitch_1.9s_infinite] select-none" aria-hidden>
{text}
</span>
</span>
</div>
);
}