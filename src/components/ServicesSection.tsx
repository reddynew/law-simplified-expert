
import { FileText, Users, Scale, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: FileText,
    title: 'Legal Consultation',
    description: 'Get expert advice on your legal matters from our experienced attorneys. We offer comprehensive consultations to help you understand your rights and options.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Users,
    title: 'Legal Representation',
    description: 'Our attorneys will represent you in court proceedings, negotiations, and other legal forums with skill and dedication to protect your interests.',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: FileText,
    title: 'Document Drafting',
    description: 'We prepare legally sound documents including contracts, agreements, wills, and other important legal paperwork tailored to your specific needs.',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: CheckSquare,
    title: 'Case Evaluation',
    description: 'Our team conducts thorough case evaluations to assess the strength of your legal position and develop effective strategies for your situation.',
    color: 'bg-emerald-50 text-emerald-600'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-white section-spacing">
      <div className="legal-container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-legal-light text-legal-DEFAULT font-medium text-sm mb-4">
            Our Services
          </span>
          <h2 className="heading-lg mb-4">Comprehensive Legal Solutions</h2>
          <p className="text-legal-muted max-w-2xl mx-auto">
            Law Suvidha offers a wide range of legal services designed to address your specific needs with expertise and personalized attention.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg border border-legal-border shadow-sm hover:shadow-md base-transition card-hover"
            >
              <div className={cn(
                "w-14 h-14 flex items-center justify-center rounded-lg mb-6",
                service.color
              )}>
                <service.icon size={28} />
              </div>
              <h3 className="heading-sm mb-4">{service.title}</h3>
              <p className="text-legal-muted">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#contact" 
            className="px-6 py-3 bg-legal-DEFAULT text-white rounded-md font-medium hover:bg-legal-accent base-transition inline-block"
          >
            Get Legal Assistance
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
