// client/src/components/Hero.jsx
import React from "react";
import DigitalType from "./animations/DigitalType.jsx";

export default function Hero() {
  return (
    <section id="home" className="relative py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900">
              Auto Diesel
            </h1>

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

          {/* Visual block */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
              <img src="/logo.png" alt="Auto Diesel logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider h-12 mt-10" />
    </section>
  );
}
