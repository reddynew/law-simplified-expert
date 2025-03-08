
import { useState, useEffect } from 'react';
import { Menu, X, User, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="legal-container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Law Suvidha Logo" 
            className="h-10 md:h-12 w-auto"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/200x80?text=Law+Suvidha';
            }}
          />
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Law Suvidha</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="font-medium hover:text-legal-accent base-transition">Services</a>
          <a href="#expertise" className="font-medium hover:text-legal-accent base-transition">Expertise</a>
          <a href="#testimonials" className="font-medium hover:text-legal-accent base-transition">Testimonials</a>
          <a href="#contact" className="font-medium hover:text-legal-accent base-transition">Contact</a>
          <div className="flex items-center space-x-4 ml-4">
            <Link 
              to="/login" 
              className="flex items-center space-x-1 px-4 py-2 rounded-md border border-legal-DEFAULT hover:bg-legal-DEFAULT hover:text-white base-transition"
            >
              <User size={18} />
              <span>Login</span>
            </Link>
            <Link 
              to="/signup" 
              className="flex items-center space-x-1 px-4 py-2 rounded-md bg-legal-DEFAULT text-white hover:bg-legal-accent base-transition"
            >
              <UserPlus size={18} />
              <span>Sign Up</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-legal-DEFAULT hover:text-legal-accent base-transition"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={cn(
            "fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out p-6",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <button 
              className="text-legal-DEFAULT hover:text-legal-accent base-transition"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mt-8 flex flex-col space-y-6">
            <a 
              href="#services" 
              className="font-medium hover:text-legal-accent base-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#expertise" 
              className="font-medium hover:text-legal-accent base-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Expertise
            </a>
            <a 
              href="#testimonials" 
              className="font-medium hover:text-legal-accent base-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="font-medium hover:text-legal-accent base-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            
            <div className="pt-4 border-t border-legal-border">
              <Link 
                to="/login" 
                className="flex items-center space-x-2 py-2 font-medium hover:text-legal-accent base-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                <span>Login</span>
              </Link>
              <Link 
                to="/signup" 
                className="flex items-center space-x-2 py-2 font-medium hover:text-legal-accent base-transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
