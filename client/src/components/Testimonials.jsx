// client/src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";
import reviews from "../data/reviews.js";

const varCard = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">What people say</h2>
        <p className="mt-2 text-slate-600">Recent comments from customers in the community.</p>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={varCard}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="card card-hover p-6"
            >
              <p className="text-slate-700">“{r.quote}”</p>
              <p className="mt-3 text-sm text-slate-500">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider h-12 mt-10" />
    </section>
  );
}
