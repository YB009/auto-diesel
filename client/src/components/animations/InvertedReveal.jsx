import React from 'react';


export default function InvertedReveal({ headline, sub }) {
return (
<section className="relative py-24 bg-slate-900 text-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<h2 className="text-3xl sm:text-5xl font-black mix-diff text-white">{headline}</h2>
<p className="mt-4 text-white/80 max-w-2xl">{sub}</p>
</div>
</section>
);
}