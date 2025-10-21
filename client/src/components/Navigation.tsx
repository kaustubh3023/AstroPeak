import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Logo from './Logo';
import { useLocation } from 'wouter';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-blue-900/20 ${
        isScrolled ? 'backdrop-blur-md' : 'backdrop-blur-md'
      }`}
      style={{ backgroundColor: 'rgba(10, 20, 55, 0.93)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left side with logo and contact - shifted left */}
          <div className="flex items-center space-x-8 -ml-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Logo size="md" className="animate-pulse-gold" />
              <div>
                <h1 className="text-xl font-display font-bold text-white">SSCS</h1>
                <p className="text-xs -mt-1 text-blue-200">Shri Shrree Asttro Consultancy</p>
              </div>
            </div>
            
            {/* Contact Info - Left Side */}
            <div className="flex items-center space-x-8">
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
            <button onClick={() => scrollToSection('home')} className="text-blue-200 hover:text-white transition-colors duration-300 ml-8">
              Home
            </button>
            <button onClick={() => navigate('/profile')} className="text-blue-200 hover:text-white transition-colors duration-300">
              Profile
            </button>
            <button onClick={() => scrollToSection('about')} className="text-blue-200 hover:text-white transition-colors duration-300">
              About
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-blue-200 hover:text-white transition-colors duration-300">
              Testimonials
            </button>
            

            
            <button 
              onClick={() => scrollToSection('service-selection')} 
              className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-950 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Book Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
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
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md border-t border-blue-900/20" style={{ backgroundColor: 'rgba(10, 20, 55, 0.7)' }}>
            <div className="px-4 pt-2 pb-4 space-y-2">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-blue-200 hover:text-white py-2 transition-colors duration-300">
                Home
              </button>
              <button onClick={() => { setIsMenuOpen(false); navigate('/profile'); }} className="block w-full text-left text-blue-200 hover:text-white py-2 transition-colors duration-300">
                Profile
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-blue-200 hover:text-white py-2 transition-colors duration-300">
                About
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-gray-300 hover:text-yellow-500 py-2 transition-colors duration-300">
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('service-selection')} 
                className="block w-full border-2 px-4 py-2 rounded-full font-semibold text-center mt-2"
                style={{ borderColor: 'hsl(43, 74%, 52%)', color: 'hsl(43, 74%, 52%)' }}
            >
                Book Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full gold-gradient px-4 py-2 rounded-full font-semibold text-center mt-2"
                style={{ color: 'hsl(216, 47%, 8%)' }}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
