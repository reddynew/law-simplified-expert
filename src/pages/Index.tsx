
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const id = href.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        e.preventDefault();
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <Header />
      
      <main className="pt-0">
        <HeroSection />
        <ServicesSection />
        <ExpertiseSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      
      <Footer />
      
      <ChatBot />
    </>
  );
};

export default Index;
