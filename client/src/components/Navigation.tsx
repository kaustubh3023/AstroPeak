import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

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
              <Logo size="md" className="animate-pulse-gold" />
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
