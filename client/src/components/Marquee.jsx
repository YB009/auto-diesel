import React from 'react';


export default function Marquee({ items = [] }) {
return (
<div className="overflow-hidden border-y border-slate-200 bg-white/60">
<div className="marquee-track marquee-animate py-4">
{[...items, ...items].map((t, i) => (
<span key={i} className="text-sm tracking-wide text-slate-600">
{t}
</span>
))}
</div>
</div>
);
}