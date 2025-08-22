import React from 'react';


export default function LiquidGlassCTA({ onContact }) {
return (
<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/60 backdrop-blur p-8 shadow-soft">
<div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-brand-300 blob" />
<div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-blue-300 blob" />
<div className="relative">
<h3 className="text-2xl font-semibold text-slate-900">Need quick help?</h3>
<p className="mt-2 text-slate-600">Skip bookings. Request a callback or ping us on WhatsApp — we’ll get right back to you.</p>
<div className="mt-5 flex flex-wrap gap-3">
<a href="#contact" className="inline-flex items-center px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition">Request a callback</a>
<a href="#contact" className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 transition">WhatsApp us</a>
</div>
</div>
</div>
);
}