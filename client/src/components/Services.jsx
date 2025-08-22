// client/src/components/Services.jsx
import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Sale & Remanufacture",
    desc: "Starters • Alternators",
    img: "/images/services/service_01.png",
  },
  {
    title: "Legacy Coverage",
    desc: "Including legacy CAV units and more",
    img: "/images/services/service_02.png",
  },
  {
    title: "Diagnostics & Repair",
    desc: "Charging, starting & lighting systems",
    img: "/images/services/service_03.png",
  },
  {
    title: "Pump Overhaul",
    desc: "Mechanical diesel injection pumps",
    img: "/images/services/service_04.png",
  },
  {
    title: "Injector Testing",
    desc: "Calibration & remanufacture",
    img: "/images/services/service_05.png",
  },
  {
    title: "Clean-room Procedures",
    desc: "Calibrated test benches",
    img: "/images/services/service_06.png",
  },
];

const cardVar = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Services</h2>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Comprehensive electrical and diesel injection capability from diagnostics to full
          remanufacture.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, i) => (
            <motion.article
              key={c.title}
              variants={cardVar}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="card card-hover overflow-hidden"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-slate-700">{c.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="section-divider h-12 mt-10" />
    </section>
  );
}
