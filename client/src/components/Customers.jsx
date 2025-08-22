// client/src/components/Customers.jsx
import React from "react";
import { motion } from "framer-motion";

const tiles = [
  {
    title: "Plant Hire Companies",
    desc: "Service & support for plant hire fleets and heavy equipment.",
    img: "/images/customers/customer_01.png",
  },
  {
    title: "Fork Lift Companies",
    desc: "Diagnostics & repair for electric and diesel forklift systems.",
    img: "/images/customers/customer_02.png",
  },
  {
    title: "Local Authorities",
    desc: "Trusted support partner for council and municipal vehicle electrics.",
    img: "/images/customers/customer_03.png",
  },
  {
    title: "General Trade & Public",
    desc: "From classic cars to commercial vans we help keep you moving.",
    img: "/images/customers/customer_04.png",
  },
];

const tileVar = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Customers() {
  return (
    <section id="customers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Who we serve</h2>
        <p className="mt-2 text-slate-600">
          Our customer base is varied, with specialisms in plant hire, forklifts and local
          authorities alongside the general trade and public.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((t, i) => (
            <motion.article
              key={t.title}
              variants={tileVar}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="card card-hover overflow-hidden"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img src={t.img} alt={t.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-slate-900">{t.title}</h3>
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-500/70" />
                </div>
                <p className="mt-2 text-sm text-slate-600">{t.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="section-divider h-12 mt-10" />
    </section>
  );
}
