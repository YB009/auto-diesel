// client/src/pages/Home.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Customers from "../components/Customers.jsx";
import Suppliers from "../components/Suppliers.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <div id="top" />
      {/* Navbar is present but hidden until introDone */}
      <Navbar revealed={introDone} />

      {/* Intro overlay (locks scroll) */}
      {!introDone && <Loader onDone={() => setIntroDone(true)} />}

      {/* Main content */}
      <Hero />
      <Services />
      <Customers />
      <Suppliers />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
