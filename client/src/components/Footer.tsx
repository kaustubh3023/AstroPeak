import Logo from './Logo';
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-yellow-600/20 py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'hsl(216, 47%, 8%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Logo size="sm" />
              <div>
                <h3 className="text-lg font-display font-bold" style={{ color: 'hsl(43, 74%, 52%)' }}>SSCS</h3>
                <p className="text-xs -mt-1" style={{ color: 'hsl(41, 73%, 77%)' }}>Shri Shrree Asttro Consultancy</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Guiding souls through ancient wisdom and cosmic insights for over 15 years.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>Quick Links</h4>
            <div className="space-y-2">
              <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Services
              </button>
              <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                About
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                Contact
              </button>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:border-blue-600 group"
                style={{ borderColor: 'hsl(43, 74%, 52%)' }}
              >
                <Facebook size={18} className="group-hover:text-white" style={{ color: 'hsl(43, 74%, 52%)' }} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-pink-600 hover:border-pink-600 group"
                style={{ borderColor: 'hsl(43, 74%, 52%)' }}
              >
                <Instagram size={18} className="group-hover:text-white" style={{ color: 'hsl(43, 74%, 52%)' }} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-red-600 hover:border-red-600 group"
                style={{ borderColor: 'hsl(43, 74%, 52%)' }}
              >
                <Youtube size={18} className="group-hover:text-white" style={{ color: 'hsl(43, 74%, 52%)' }} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:border-green-600 group"
                style={{ borderColor: 'hsl(43, 74%, 52%)' }}
              >
                <MessageCircle size={18} className="group-hover:text-white" style={{ color: 'hsl(43, 74%, 52%)' }} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-yellow-600/20 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Shri Shrree Asttro Consultancy. All rights reserved. | Designed for seekers of cosmic wisdom.
          </p>
        </div>
      </div>
    </footer>
  );
}
