
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    position: 'Business Owner',
    content: 'The corporate law team at Law Suvidha provided exceptional guidance during our company acquisition. Their attention to detail and strategic approach saved us from potential legal pitfalls. Highly recommend their services!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    position: 'IT Professional',
    content: 'I was facing a complex property dispute and Law Suvidha\'s team handled it with remarkable professionalism. They explained every step clearly and fought for my rights effectively. I\'m grateful for their support during a difficult time.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Aditya Patel',
    position: 'Entrepreneur',
    content: 'The document drafting service from Law Suvidha was excellent. They created comprehensive contracts that protected my business interests while being fair to all parties. Their turnaround time was impressive too!',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/67.jpg'
  },
  {
    id: 4,
    name: 'Meera Desai',
    position: 'HR Manager',
    content: 'As a company HR manager, I\'ve worked with Law Suvidha on several employment law cases. Their expertise in labour laws has been invaluable in ensuring our company policies comply with regulations while protecting our interests.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/17.jpg'
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAutoplay]);

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const goToNextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const pauseAutoplay = () => {
    setIsAutoplay(false);
  };

  const resumeAutoplay = () => {
    setIsAutoplay(true);
  };

  return (
    <section id="testimonials" className="bg-white section-spacing">
      <div className="legal-container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-legal-light text-legal-DEFAULT font-medium text-sm mb-4">
            Testimonials
          </span>
          <h2 className="heading-lg mb-4">What Our Clients Say</h2>
          <p className="text-legal-muted max-w-2xl mx-auto">
            Our clients' success stories reflect our commitment to providing exceptional legal services with personalized attention.
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <div className="overflow-hidden">
            <div 
              className={cn(
                "flex transition-transform duration-500 ease-in-out",
                isTransitioning ? "opacity-70" : "opacity-100"
              )}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-legal-light p-8 rounded-lg">
                    <div className="flex items-center mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className={index < testimonial.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <p className="text-legal-DEFAULT italic mb-6">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random`;
                        }}
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-legal-muted">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-5 md:-translate-x-10 w-10 h-10 rounded-full bg-white text-legal-DEFAULT shadow-md flex items-center justify-center hover:bg-legal-light base-transition z-10"
            onClick={goToPrevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-5 md:translate-x-10 w-10 h-10 rounded-full bg-white text-legal-DEFAULT shadow-md flex items-center justify-center hover:bg-legal-light base-transition z-10"
            onClick={goToNextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full base-transition",
                  activeIndex === index ? "bg-legal-DEFAULT scale-125" : "bg-legal-border hover:bg-legal-muted"
                )}
                onClick={() => {
                  setIsTransitioning(true);
                  setActiveIndex(index);
                  setTimeout(() => {
                    setIsTransitioning(false);
                  }, 400);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
