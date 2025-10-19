// pages/Home.tsx
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import ServiceSelection from "../components/ServiceSelection";
import Profile from "../components/Profile";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen mystical-gradient text-gray-100 font-body">
      <Navigation />
      <HeroSection />
      <ServiceSelection />
      {/* <Profile /> removed, now only on /profile */}
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
