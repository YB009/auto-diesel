// client/src/components/Navbar.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "./logo.png";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Customers", href: "#customers" },
  { label: "Suppliers", href: "#suppliers" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ revealed = true }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  // Close mobile menu when resizing up
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Smooth scroll that respects the fixed header height
  const smoothScrollTo = useCallback((hash) => {
    if (!hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;

    const el =
      document.getElementById(id) ||
      document.querySelector(hash) ||
      document.querySelector(`[name="${id}"]`);
    if (!el) {
      // fall back to default hash navigation if element not found
      window.location.hash = hash;
      return;
    }

    const headerH = headerRef.current?.offsetHeight ?? 64; // h-16 fallback
    const y = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: y < 0 ? 0 : y, behavior: "smooth" });
  }, []);

  // Brand click => smooth scroll to top
  const onBrandClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  // Handle link clicks (desktop & mobile)
  const onNavClick = useCallback(
    (e, href, isMobile) => {
      if (!href?.startsWith("#")) return; // let external links work normally
      e.preventDefault();

      if (isMobile) {
        // Close the dropdown first, then scroll after the collapse animation
        setOpen(false);
        setTimeout(() => smoothScrollTo(href), 280); // must match dropdown transition (~0.28s)
      } else {
        smoothScrollTo(href);
      }
    },
    [smoothScrollTo]
  );

  return (
    <AnimatePresence initial={false}>
      {revealed && (
        <motion.header
          ref={headerRef}
          className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand */}
            <a href="#top" onClick={onBrandClick} className="flex items-center gap-3">
              <img
                src={logo}
                alt="Auto Diesel"
                className="h-8 w-auto rounded-sm object-contain"
                loading="eager"
              />
              <span className="sr-only">Auto Diesel</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-slate-700">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href, false)}
                  className="relative pb-1 hover:text-brand-700 transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-brand-600 after:transition-all"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-white transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Mobile dropdown panel */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="md:hidden border-t border-slate-200 bg-white"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                <nav className="px-4 py-4 flex flex-col gap-4 text-slate-800">
                  {LINKS.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={(e) => onNavClick(e, l.href, true)}
                      className="px-2 py-2 rounded-lg hover:bg-slate-50"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
