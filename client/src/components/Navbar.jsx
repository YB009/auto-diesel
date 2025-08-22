import React, { useState } from 'react';


export default function Navbar() {
const [open, setOpen] = useState(false);
return (
<header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/60 reveal is-visible">
<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex h-16 items-center justify-between">
<a href="#services" className="text-xl font-bold text-brand-700">Auto Diesel</a>
<button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
<span className="i">☰</span>
</button>
<ul className="hidden md:flex items-center gap-8 text-slate-700">
<li><a href="#services" className="hover:text-brand-700">Services</a></li>
<li><a href="#customers" className="hover:text-brand-700">Customers</a></li>
<li><a href="#suppliers" className="hover:text-brand-700">Suppliers</a></li>
<li><a href="#contact" className="hover:text-brand-700">Contact</a></li>
</ul>
</div>
{open && (
<ul className="md:hidden pb-4 space-y-2 text-slate-700">
<li><a onClick={()=>setOpen(false)} href="#services">Services</a></li>
<li><a onClick={()=>setOpen(false)} href="#customers">Customers</a></li>
<li><a onClick={()=>setOpen(false)} href="#suppliers">Suppliers</a></li>
<li><a onClick={()=>setOpen(false)} href="#contact">Contact</a></li>
</ul>
)}
</nav>
</header>
);
}