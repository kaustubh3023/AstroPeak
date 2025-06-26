export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-mystic-navy" style={{ background: 'linear-gradient(to bottom, hsl(216, 47%, 8%) 0%, hsl(236, 45%, 16%) 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: 'hsl(43, 74%, 52%)' }}>
                About Our Practice
              </h2>
              <div className="w-24 h-1 gold-gradient rounded-full mb-8"></div>
            </div>
            
            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                With over 15 years of dedicated study and practice in Vedic astrology, numerology, and tarot reading, Shri Shrree Asttro Consultancy has guided thousands of individuals toward clarity, purpose, and prosperity.
              </p>
              
              <p>
                Our approach combines ancient Vedic wisdom with modern insights, offering comprehensive consultations that address your most pressing life questions. We believe that understanding your cosmic blueprint is the key to unlocking your highest potential.
              </p>
              
              <p>
                Each consultation is personalized, confidential, and conducted with the utmost respect for your individual journey. Our goal is to empower you with knowledge and practical remedies that create positive transformation.
              </p>
            </div>
            
            {/* Credentials */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card-3d p-6 rounded-xl border border-yellow-600/20" style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)' }}>
                <div className="text-center">
                  <span className="text-3xl mb-3 block" style={{ color: 'hsl(43, 74%, 52%)' }}>🎓</span>
                  <h4 className="font-semibold mb-2" style={{ color: 'hsl(43, 74%, 52%)' }}>Certified</h4>
                  <p className="text-sm text-gray-300">Vedic Astrology Institute</p>
                </div>
              </div>
              
              <div className="card-3d p-6 rounded-xl border border-yellow-600/20" style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)' }}>
                <div className="text-center">
                  <span className="text-3xl mb-3 block" style={{ color: 'hsl(43, 74%, 52%)' }}>👥</span>
                  <h4 className="font-semibold mb-2" style={{ color: 'hsl(43, 74%, 52%)' }}>1000+</h4>
                  <p className="text-sm text-gray-300">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Side */}
          <div className="relative">
            <div className="relative card-3d">
              <div 
                className="w-full h-96 rounded-2xl shadow-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="mystical" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23D4AF37;stop-opacity:0.3"/><stop offset="100%" style="stop-color:%231A1B3A;stop-opacity:0.8"/></radialGradient></defs><rect width="400" height="400" fill="url(%23mystical)"/><g fill="%23D4AF37" opacity="0.4"><circle cx="200" cy="200" r="80" fill="none" stroke="%23D4AF37" stroke-width="2"/><circle cx="200" cy="200" r="60" fill="none" stroke="%23F7D794" stroke-width="1"/><circle cx="200" cy="200" r="40" fill="none" stroke="%23D4AF37" stroke-width="2"/><polygon points="200,120 220,160 160,160" fill="%23D4AF37" opacity="0.6"/><polygon points="200,280 180,240 240,240" fill="%23D4AF37" opacity="0.6"/><polygon points="120,200 160,180 160,220" fill="%23D4AF37" opacity="0.6"/><polygon points="280,200 240,220 240,180" fill="%23D4AF37" opacity="0.6"/></g></svg>')`
                }}
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 animate-float">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl" style={{ color: 'hsl(216, 47%, 8%)' }}>🕉️</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'hsl(258, 43%, 51%)' }}>
                  <span className="text-white text-xl">☯️</span>
                </div>
              </div>
              
              <div className="absolute top-4 -right-4 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}>
                  <span className="text-white">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
