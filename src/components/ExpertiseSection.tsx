
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const expertiseAreas = [
  {
    title: 'Family Law',
    icon: '/icons/family-law.svg',
    iconFallback: '👨‍👩‍👧‍👦',
    description: 'We handle divorce, child custody, adoption, and other family matters with sensitivity and care, focusing on the welfare of all parties involved.',
    areas: ['Divorce & Separation', 'Child Custody & Support', 'Adoption', 'Domestic Violence', 'Alimony', 'Prenuptial Agreements']
  },
  {
    title: 'Corporate Law',
    icon: '/icons/corporate-law.svg',
    iconFallback: '🏢',
    description: 'Our corporate legal services help businesses navigate regulations, transactions, and legal challenges to achieve their strategic objectives.',
    areas: ['Business Formation', 'Corporate Governance', 'Mergers & Acquisitions', 'Contract Drafting & Review', 'Intellectual Property', 'Compliance']
  },
  {
    title: 'Criminal Law',
    icon: '/icons/criminal-law.svg',
    iconFallback: '⚖️',
    description: 'We provide strong defense for individuals facing criminal charges, ensuring your rights are protected throughout the legal process.',
    areas: ['Criminal Defense', 'White Collar Crimes', 'DUI Defense', 'Juvenile Crime', 'Appeals', 'Bail Applications']
  },
  {
    title: 'Labour Law',
    icon: '/icons/labour-law.svg',
    iconFallback: '👷',
    description: 'We represent both employers and employees in workplace legal matters, from compliance to dispute resolution.',
    areas: ['Employment Contracts', 'Workplace Discrimination', 'Wrongful Termination', 'Wage & Hour Disputes', 'Workers Compensation', 'Union Relations']
  }
];

const ExpertiseSection = () => {
  const [selectedExpertise, setSelectedExpertise] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedExpertise((prev) => (prev + 1) % expertiseAreas.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="expertise" className="bg-legal-light section-spacing">
      <div className="legal-container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-white text-legal-DEFAULT font-medium text-sm mb-4">
            Areas of Expertise
          </span>
          <h2 className="heading-lg mb-4">Legal Specializations</h2>
          <p className="text-legal-muted max-w-2xl mx-auto">
            Our team of skilled attorneys specializes in various areas of law to provide you with expert legal guidance and representation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Tabs */}
          <div className="space-y-4">
            {expertiseAreas.map((area, index) => (
              <button
                key={index}
                className={cn(
                  "w-full text-left p-4 rounded-lg base-transition border",
                  selectedExpertise === index
                    ? "bg-legal-DEFAULT text-white border-legal-DEFAULT shadow-md" 
                    : "bg-white text-legal-DEFAULT border-legal-border hover:border-legal-accent"
                )}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setSelectedExpertise(index);
                    setIsAnimating(false);
                  }, 300);
                }}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <img 
                      src={area.icon}
                      alt={`${area.title} icon`}
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.outerHTML = `<span class="text-2xl">${area.iconFallback}</span>`;
                      }}
                    />
                  </div>
                  <span className="font-medium">{area.title}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Right Side: Content */}
          <div className={cn(
            "bg-white p-8 rounded-lg border border-legal-border shadow-md",
            isAnimating ? "opacity-0" : "opacity-100 transition-opacity duration-300"
          )}>
            <h3 className="heading-md mb-4">{expertiseAreas[selectedExpertise].title}</h3>
            <p className="text-legal-muted mb-6">{expertiseAreas[selectedExpertise].description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {expertiseAreas[selectedExpertise].areas.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-legal-DEFAULT rounded-full mr-2"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-legal-DEFAULT text-white rounded-md font-medium hover:bg-legal-accent base-transition inline-block"
              >
                Consult a Specialist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
