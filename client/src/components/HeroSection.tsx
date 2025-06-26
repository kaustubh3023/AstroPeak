import { ChevronDown } from 'lucide-react';
import FloatingElements from './3d/FloatingElements';
import ThreeBackground from './3d/ThreeBackground';
import Logo from './Logo';

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ThreeBackground />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Constellation pattern background */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="%23D4AF37" opacity="0.3"/><circle cx="5" cy="5" r="0.3" fill="%23F7D794" opacity="0.2"/><circle cx="15" cy="15" r="0.2" fill="%23D4AF37" opacity="0.4"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>')`
            }}
          />
        </div>
        
        {/* Floating 3D particles */}
        <FloatingElements />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Logo Display */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" className="animate-glow" />
          </div>
          
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight animate-glow" style={{ color: 'hsl(43, 74%, 52%)' }}>
              <span className="block">Shri Shrree</span>
              <span className="block text-4xl md:text-5xl mt-2" style={{ color: 'hsl(41, 73%, 77%)' }}>Asttro Consultancy</span>
            </h1>
            <div className="w-32 h-1 gold-gradient mx-auto rounded-full"></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Unlock the mysteries of your destiny through ancient Vedic wisdom, numerology, and tarot guidance
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button 
              onClick={scrollToServices}
              className="card-3d gold-gradient px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              style={{ color: 'hsl(216, 47%, 8%)' }}
            >
              🔮 Explore Services
            </button>
            <button 
              onClick={scrollToContact}
              className="card-3d border-2 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              style={{ borderColor: 'hsl(43, 74%, 52%)', color: 'hsl(43, 74%, 52%)' }}
            >
              📞 Book Consultation
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12 pt-12 text-sm">
            <div className="flex items-center space-x-2">
              <span style={{ color: 'hsl(43, 74%, 52%)' }}>👥</span>
              <span className="text-gray-300">1000+ Happy Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <span style={{ color: 'hsl(43, 74%, 52%)' }}>🏆</span>
              <span className="text-gray-300">15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span style={{ color: 'hsl(43, 74%, 52%)' }}>⭐</span>
              <span className="text-gray-300">Certified Astrologer</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-xl" style={{ color: 'hsl(43, 74%, 52%)' }} />
      </div>
    </section>
  );
}
