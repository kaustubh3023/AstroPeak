import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Floating Contact Banner */}
      <div
  className="fixed top-0 left-0 w-full text-yellow-400 text-sm flex justify-center items-center space-x-4 h-8 z-50 md:hidden"
  style={{ backgroundColor: "rgba(10, 20, 55, 0.93)" }} // match navbar
>
  <div className="flex items-center space-x-1">
    <Phone size={14} />
    <span>9105029933</span>
  </div>
  <div className="flex items-center space-x-1">
    <Mail size={14} />
    <span>shrishrree@gmail.com</span>
  </div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-8 md:top-0 w-full z-50 transition-all duration-300 border-b border-blue-900/20 backdrop-blur-md`}
        style={{ backgroundColor: "rgba(10, 20, 55, 0.93)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Left side with logo and contact */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <Logo size="md" className="animate-pulse-gold" />
                <div>
                  <h1 className="text-lg sm:text-xl font-display font-bold text-white">
                    SSCS
                  </h1>
                  <p className="text-[10px] sm:text-xs -mt-1 text-blue-200">
                    Shri Shrree Asttro Consultancy
                  </p>
                </div>
              </div>

              {/* Desktop Contact Info */}
              <div className="hidden lg:flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-yellow-500" />
                  <span className="text-white text-sm">9105029933</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail size={16} className="text-yellow-500" />
                  <span className="text-white text-sm">shrishrree@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-blue-200 hover:text-white transition-colors duration-300 ml-8"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-blue-200 hover:text-white transition-colors duration-300"
              >
                Profile
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-blue-200 hover:text-white transition-colors duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-blue-200 hover:text-white transition-colors duration-300"
              >
                Testimonials
              </button>

              <button
                onClick={() => scrollToSection("service-selection")}
                className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-950 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Book Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-blue-950 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="md:hidden backdrop-blur-md border-t border-blue-900/20 rounded-b-2xl shadow-lg"
                style={{ backgroundColor: "rgba(10, 20, 55, 0.9)" }}
              >
                <div className="flex flex-col items-center px-4 py-3 space-y-3">
                  <button
                    onClick={() => scrollToSection("home")}
                    className="w-full py-2 text-center text-blue-100 hover:text-yellow-400 text-base font-medium transition-all duration-200"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full py-2 text-center text-blue-100 hover:text-yellow-400 text-base font-medium transition-all duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="w-full py-2 text-center text-blue-100 hover:text-yellow-400 text-base font-medium transition-all duration-200"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="w-full py-2 text-center text-blue-100 hover:text-yellow-400 text-base font-medium transition-all duration-200"
                  >
                    Testimonials
                  </button>

                  <button
                    onClick={() => scrollToSection("service-selection")}
                    className="w-full border border-yellow-400 text-yellow-400 py-2 rounded-full hover:bg-yellow-400 hover:text-blue-950 transition-all duration-300"
                  >
                    Book Services
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-yellow-400 text-blue-950 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300"
                  >
                    Contact
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
