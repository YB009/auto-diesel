// client/src/components/Loader.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fullscreen landing that responds to SCROLL:
 * - Title + nav links gently translate upward and fade as you scroll past.
 * - No button. Content below becomes visible as you scroll.
 * - Matches the feel of your nav-anim reference.
 */
export default function Loader() {
  const ref = useRef(null);

  // 0 when top of Loader hits viewport top; 1 when bottom hits top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Motion mappings
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0]);

  const navY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.75, 0]);

  const navItems = ["Home", "Services", "Customers", "Suppliers", "Contact"];

  return (
    <section ref={ref} className="min-h-screen bg-landing flex items-center justify-center">
      <div className="text-center px-4">
        <motion.h1
          style={{ y: titleY, opacity: titleOpacity }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-7xl font-black text-slate-900"
        >
          Auto Diesel
        </motion.h1>

        <motion.ul
          style={{ y: navY, opacity: navOpacity }}
          className="mt-6 flex flex-wrap items-center justify-center gap-6 text-slate-700"
        >
          {navItems.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
              className="relative group"
            >
              <a
                href={item === "Home" ? "#top" : `#${item.toLowerCase()}`}
                className="px-1 pb-1 hover:text-brand-700"
              >
                {item}
              </a>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.28 + i * 0.06, duration: 0.5 }}
                className="block h-0.5 bg-brand-500"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
