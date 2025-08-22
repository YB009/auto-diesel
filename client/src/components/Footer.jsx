import React from 'react';


export default function Footer() {
return (
<footer className="py-10 border-t border-slate-200 bg-white/70 reveal">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
<p className="text-sm text-slate-600">© {new Date().getFullYear()} Auto Diesel. All rights reserved.</p>
<nav className="text-sm text-slate-600 flex gap-4">
<a href="#services" className="hover:text-brand-700">Services</a>
<a href="#customers" className="hover:text-brand-700">Customers</a>
<a href="#suppliers" className="hover:text-brand-700">Suppliers</a>
<a href="#contact" className="hover:text-brand-700">Contact</a>
</nav>
</div>
</footer>
);
}