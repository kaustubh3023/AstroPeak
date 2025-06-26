import { SERVICES } from '../lib/constants';
import { BarChart3, Calculator, Smartphone, Type, CreditCard, Edit, Clock, Coins, PenTool } from 'lucide-react';

export default function ServicesSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (iconName: string) => {
    const iconProps = { size: 24, className: "text-current" };
    switch(iconName) {
      case 'chart': return <BarChart3 {...iconProps} />;
      case 'calculator': return <Calculator {...iconProps} />;
      case 'smartphone': return <Smartphone {...iconProps} />;
      case 'type': return <Type {...iconProps} />;
      case 'cards': return <CreditCard {...iconProps} />;
      case 'edit': return <Edit {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      case 'coins': return <Coins {...iconProps} />;
      case 'pen-tool': return <PenTool {...iconProps} />;
      default: return <BarChart3 {...iconProps} />;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: 'hsl(43, 74%, 52%)' }}>
            Our Divine Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive astrological guidance combining ancient wisdom with modern insights to illuminate your path forward
          </p>
          <div className="w-24 h-1 gold-gradient mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id}
              className="card-3d bg-gradient-to-br p-8 rounded-2xl border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-500 group animate-fade-in-up"
              style={{ 
                background: `linear-gradient(135deg, hsl(236, 45%, 16%) 0%, hsl(216, 47%, 8%) 100%)`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="text-center space-y-6">
                <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <div style={{ color: 'hsl(216, 47%, 8%)' }}>
                    {getIcon(service.icon)}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                  {service.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-center">
                  <span className="font-semibold" style={{ color: 'hsl(41, 73%, 77%)' }}>
                    {service.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <button 
            onClick={scrollToContact}
            className="card-3d gold-gradient px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300"
            style={{ color: 'hsl(216, 47%, 8%)' }}
          >
            Book Your Consultation Today
          </button>
        </div>
      </div>
      

    </section>
  );
}
