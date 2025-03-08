
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'What areas of law does Law Suvidha specialize in?',
    answer: 'Law Suvidha specializes in various areas including Family Law, Corporate Law, Labour Law, and Criminal Law. Our team of experienced attorneys provides comprehensive legal solutions tailored to your specific needs.'
  },
  {
    question: 'How do I schedule a consultation with a lawyer?',
    answer: 'You can schedule a consultation by filling out the contact form on our website, using our chat service, or calling our office directly. We offer both in-person and virtual consultations to accommodate your preferences.'
  },
  {
    question: 'What are your fees and payment options?',
    answer: 'Our fees vary depending on the nature and complexity of your case. We offer transparent pricing structures including hourly rates, flat fees for specific services, and contingency arrangements for certain cases. We accept various payment methods including credit/debit cards, bank transfers, and digital payment options.'
  },
  {
    question: 'How long does it typically take to resolve a legal case?',
    answer: 'The duration varies significantly based on the type of case, its complexity, court schedules, and whether a settlement is possible. During your initial consultation, we can provide a more specific timeline based on your particular situation.'
  },
  {
    question: 'Do you offer pro bono or reduced-fee legal services?',
    answer: 'Yes, Law Suvidha is committed to providing access to justice. We dedicate a portion of our practice to pro bono work and offer reduced-fee arrangements for clients with financial constraints who meet certain criteria.'
  },
  {
    question: 'What documentation should I prepare for my first consultation?',
    answer: 'It's helpful to bring any documents relevant to your case, such as contracts, correspondence, court papers, police reports, or financial records. Also, prepare a chronological summary of events related to your legal issue.'
  },
  {
    question: 'How do I know if I have a valid legal case?',
    answer: 'During your initial consultation, our attorneys will evaluate the facts, evidence, and applicable laws to determine if you have a viable legal claim. We provide honest assessments and only recommend proceeding if there's a reasonable basis for legal action.'
  },
  {
    question: 'Can you represent me in another city or state?',
    answer: 'Our attorneys are licensed to practice in specific jurisdictions. We can directly represent you within those jurisdictions and can often coordinate with local counsel in other areas when necessary.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="bg-white section-spacing">
      <div className="legal-container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-legal-light text-legal-DEFAULT font-medium text-sm mb-4">
            Got Questions?
          </span>
          <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
          <p className="text-legal-muted max-w-2xl mx-auto">
            Find answers to common questions about our legal services and processes. If you can't find what you're looking for, don't hesitate to contact us.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-legal-border last:border-0">
              <button
                className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-legal-accent" size={20} />
                ) : (
                  <ChevronDown className="text-legal-DEFAULT" size={20} />
                )}
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-6 pt-0 text-legal-muted">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
