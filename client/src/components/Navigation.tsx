import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-yellow-600/20 ${
        isScrolled ? 'backdrop-blur-mystical' : 'backdrop-blur-mystical'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                {/* Lotus flower representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl animate-pulse-gold" style={{ color: 'hsl(43, 74%, 52%)' }}>🪷</span>
                </div>
                {/* Radiating lines */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-full h-full relative">
                    <div className="absolute top-0 left-1/2 w-0.5 h-2 transform -translate-x-1/2" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                    <div className="absolute top-1 right-1 w-0.5 h-1.5 transform rotate-45" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                    <div className="absolute right-0 top-1/2 w-2 h-0.5 transform -translate-y-1/2" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                    <div className="absolute bottom-1 right-1 w-0.5 h-1.5 transform -rotate-45" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                    <div className="absolute bottom-0 left-1/2 w-0.5 h-2 transform -translate-x-1/2" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                    <div className="absolute bottom-1 left-1 w-0.5 h-1.5 transform rotate-45" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                    <div className="absolute left-0 top-1/2 w-2 h-0.5 transform -translate-y-1/2" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                    <div className="absolute top-1 left-1 w-0.5 h-1.5 transform -rotate-45" style={{ backgroundColor: 'hsl(43, 74%, 52%)' }}></div>
                  </div>
                </div>
                {/* Moon and Star elements */}
                <div className="absolute -left-3 top-2">
                  <span className="text-xs" style={{ color: 'hsl(41, 73%, 77%)' }}>🌙</span>
                </div>
                <div className="absolute -right-2 top-1">
                  <span className="text-xs" style={{ color: 'hsl(41, 73%, 77%)' }}>⭐</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold" style={{ color: 'hsl(43, 74%, 52%)' }}>SSCS</h1>
                <p className="text-xs -mt-1" style={{ color: 'hsl(41, 73%, 77%)' }}>Shri Shrree Asttro Consultancy</p>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">
              Services
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">
              About
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-yellow-500 transition-colors duration-300">
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="gold-gradient px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ color: 'hsl(216, 47%, 8%)' }}
            >
              Contact
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="transition-colors duration-300"
              style={{ color: 'hsl(43, 74%, 52%)' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-mystical border-t border-yellow-600/20">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-300 hover:text-yellow-500 py-2 transition-colors duration-300">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-gray-300 hover:text-yellow-500 py-2 transition-colors duration-300">
                Services
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-gray-300 hover:text-yellow-500 py-2 transition-colors duration-300">
                About
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-gray-300 hover:text-yellow-500 py-2 transition-colors duration-300">
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full gold-gradient px-4 py-2 rounded-full font-semibold text-center mt-4"
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
