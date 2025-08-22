// client/src/components/Suppliers.jsx
import React from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "Durite", img: "/images/suppliers/supplier_01_durite.png" },
  { name: "Cargo", img: "/images/suppliers/supplier_02_cargo.png" },
  { name: "Hella", img: "/images/suppliers/supplier_03_hella.png" },
  { name: "Lampion", img: "/images/suppliers/supplier_04_lampion.png" },
  { name: "Britax", img: "/images/suppliers/supplier_05_britax.png" },
  { name: "Brigade", img: "/images/suppliers/supplier_06_brigade.png" },
];

const varItem = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Suppliers() {
  return (
    <section id="suppliers" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Trusted suppliers</h2>
        <p className="mt-2 text-slate-600">
          We maintain long-standing relationships with industry-leading suppliers.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {logos.map((l, i) => (
            <motion.div
              key={l.name}
              variants={varItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="card card-hover h-28 flex items-center justify-center overflow-hidden p-3"
              title={l.name}
            >
              <img
                src={l.img}
                alt={`${l.name} placeholder`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider h-12 mt-10" />
    </section>
  );
}
