
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-legal-DEFAULT text-white">
      <div className="legal-container section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo-white.png" 
                alt="Law Suvidha Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/200x80?text=Law+Suvidha&fontcolor=ffffff&backgroundColor=222222';
                }}
              />
              <h2 className="text-xl font-semibold">Law Suvidha</h2>
            </div>
            <p className="text-legal-muted">
              Providing exceptional legal services with integrity and dedication. Your trusted legal partner for all your needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>123 Legal Avenue, Law District, Delhi, 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="shrink-0" />
                <span>contact@lawsuvidha.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={20} className="shrink-0 mt-1" />
                <span>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="inline-block py-1 hover:text-legal-muted base-transition">Our Services</a>
              </li>
              <li>
                <a href="#expertise" className="inline-block py-1 hover:text-legal-muted base-transition">Areas of Expertise</a>
              </li>
              <li>
                <a href="#testimonials" className="inline-block py-1 hover:text-legal-muted base-transition">Testimonials</a>
              </li>
              <li>
                <Link to="/login" className="inline-block py-1 hover:text-legal-muted base-transition">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="inline-block py-1 hover:text-legal-muted base-transition">Sign Up</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="inline-block py-1 hover:text-legal-muted base-transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="inline-block py-1 hover:text-legal-muted base-transition">Terms of Service</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="inline-block py-1 hover:text-legal-muted base-transition">Legal Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-legal-muted">
            &copy; {currentYear} Law Suvidha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
