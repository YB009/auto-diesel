import React, { useEffect, useState } from 'react';
import { fetchWhatsAppLink, requestCallback, sendContact } from '../lib/api.js';


export default function Contact() {
const fallbackMsg = encodeURIComponent('Hello Auto Diesel, I have an enquiry.');
const fallbackLink = `https://wa.me/441912760826?text=${fallbackMsg}`;
const [wa, setWa] = useState({ link: fallbackLink, tel: 'tel:01912760826' });
const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
const [status, setStatus] = useState(null);


useEffect(() => {
fetchWhatsAppLink().then(data => {
  if (data && data.link && data.tel) setWa(data);
}).catch(()=>{
  // stay on fallback
});
}, []);


async function onSubmit(e) {
e.preventDefault();
setStatus('sending');
try {
const res = await sendContact(form);
setStatus(res.ok ? 'sent' : 'error');
} catch {
setStatus('error');
}
}


async function onCallback() {
setStatus('sending');
try {
const res = await requestCallback({ name: form.name, phone: form.phone, preferredTime: 'Business hours' });
setStatus(res.ok ? 'callback' : 'error');
} catch {
setStatus('error');
}
}


return (
<section id="contact" className="py-20 bg-white reveal">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid lg:grid-cols-2 gap-10">
<div>
<h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">Get in touch (no bookings)</h2>
<p className="mt-2 text-slate-600">Prefer a quick message? Use the form or request a callback. You can also phone us directly or use WhatsApp.</p>


<div className="mt-6 space-y-3 text-slate-700">
<p><strong>Address:</strong> 10 St. Lawrence Rd, Newcastle upon Tyne, NE6 1AR</p>
<p><strong>Phone:</strong> <a className="text-brand-700" href={wa.tel}>0191 276 0826</a></p>
<p><strong>Email:</strong> <a className="text-brand-700" href="mailto:info@auto-diesel.co.uk">info@auto-diesel.co.uk</a></p>
<p><strong>WhatsApp:</strong> <a className="text-brand-700" href={wa.link} target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
</div>


<div className="mt-8 flex gap-3">
<button onClick={onCallback} className="px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition">Request a callback</button>
<a href={wa.link} target="_blank" rel="noreferrer noopener" className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-white transition">Open WhatsApp</a>
</div>


{status === 'callback' && <p className="mt-3 text-green-700">Callback request sent.</p>}
</div>


<form onSubmit={onSubmit} className="rounded-3xl p-6 bg-white/70 border border-slate-200 shadow-soft">
<div className="grid sm:grid-cols-2 gap-4">
<div>
<label htmlFor="name" className="text-sm text-slate-600">Name</label>
<input id="name" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white" />
</div>
<div>
<label htmlFor="email" className="text-sm text-slate-600">Email</label>
<input id="email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white" />
</div>
<div className="sm:col-span-2">
<label htmlFor="phone" className="text-sm text-slate-600">Phone</label>
<input id="phone" required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white" />
 </div>
<div className="sm:col-span-2">
<label htmlFor="message" className="text-sm text-slate-600">Message</label>
<textarea id="message" rows="5" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white" />
 </div>
</div>
<div className="mt-6 flex items-center gap-3">
<button type="submit" className="px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition">Send message</button>
{status === 'sent' && <span className="text-green-700">Message sent.</span>}
{status === 'error' && <span className="text-red-600">Something went wrong. Try again.</span>}
{status === 'sending' && <span className="text-slate-600">Sending…</span>}
</div>
</form>
</div>
</div>
</section>
);
}