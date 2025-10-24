// pages/Home.tsx
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import ServiceSelection from "../components/ServiceSelection";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen mystical-gradient text-gray-100 font-body">
      <Navigation />
      <HeroSection />
      <ServiceSelection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
