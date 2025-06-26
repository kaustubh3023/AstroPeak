import { TESTIMONIALS } from '../lib/constants';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: 'hsl(43, 74%, 52%)' }}>
            Client Experiences
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our guidance has transformed lives and brought clarity to thousands of seekers
          </p>
          <div className="w-24 h-1 gold-gradient mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="card-3d p-8 rounded-2xl border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-500 opacity-0 translate-y-5"
              style={{ 
                background: `linear-gradient(135deg, hsl(236, 45%, 16%) 0%, hsl(216, 47%, 8%) 100%)`,
                animationDelay: `${index * 0.2}s`,
                animation: 'fadeInUp 0.6s ease forwards'
              }}
            >
              <div className="space-y-6">
                {/* Stars Rating */}
                <div className="flex" style={{ color: 'hsl(43, 74%, 52%)' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-300 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <span className="font-semibold" style={{ color: 'hsl(216, 47%, 8%)' }}>
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
