// client/src/components/Navbar.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ revealed = true }) {
  return (
    <AnimatePresence>
      {revealed && (
        <motion.header
          className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="#top" className="font-bold text-lg text-brand-700">
              Auto Diesel
            </a>

            <ul className="flex items-center gap-6 text-slate-700">
              {[
                ["Home", "#home"],
                ["Services", "#services"],
                ["Customers", "#customers"],
                ["Suppliers", "#suppliers"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="relative pb-1 transition-colors hover:text-brand-700 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-brand-600 after:transition-all"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
