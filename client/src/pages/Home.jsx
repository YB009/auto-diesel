// client/src/pages/Home.jsx
import React from "react";
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
  return (
    <>
      <div id="top" />
      <Navbar />
      {/* Scroll-first landing */}
      <Loader />

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
