// client/src/components/Hero.jsx
import React from "react";
import DigitalType from "./animations/DigitalType.jsx";
import logo from "./logo.png"; // <-- ensure the file is placed here

export default function Hero() {
  return (
    <section id="home" className="relative py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            {/* Replace title with logo */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="Auto Diesel"
                className="h-16 sm:h-20 md:h-24 w-auto rounded-md object-contain"
              />
            </div>

            {/* Digital-Type under the main header */}
            <div className="mt-4 text-slate-700 text-lg sm:text-xl digital-type digital-glow">
              <DigitalType
                phrases={[
                  "Auto Electrics",
                  "Diesel Injection",
                  "Starter & Alternator Specialists",
                  "Diagnostics • Overhaul • Remanufacture",
                ]}
                typeSpeed={40}
                deleteSpeed={24}
                pause={1200}
              />
            </div>

            <p className="mt-6 text-slate-600 max-w-xl">
              Independent specialists based in Newcastle upon Tyne testing, overhaul and
              remanufacture across starters, alternators and diesel injection systems.
            </p>

            <div className="mt-8 flex gap-3">
              <a
                href="#services"
                className="px-5 py-3 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition"
              >
                Our services
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-white transition"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Visual block (kept as before) */}
          
        </div>
      </div>
      <div className="section-divider h-12 mt-10" />
    </section>
  );
}
