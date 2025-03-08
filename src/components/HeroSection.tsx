
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1589994965851-a7f91bbe974d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Legal background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-legal-DEFAULT bg-opacity-70"></div>
      </div>

      {/* Content */}
      <div className="legal-container relative z-10 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full bg-white bg-opacity-20 text-white font-medium mb-6 animate-fade-in">
            Your Trusted Legal Partner
          </span>
          <h1 className="heading-xl mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Legal Excellence with a Personal Touch
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{animationDelay: '0.4s'}}>
            Law Suvidha provides comprehensive legal services with dedicated attorneys who are committed to achieving the best outcomes for our clients.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <a 
              href="#services" 
              className="px-6 py-3 bg-white text-legal-DEFAULT rounded-md font-medium hover:bg-opacity-90 base-transition flex items-center"
            >
              Our Services
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-medium hover:bg-white hover:bg-opacity-10 base-transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;
