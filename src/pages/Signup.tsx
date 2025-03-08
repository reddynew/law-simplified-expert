
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      // Simple password strength calculation
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // This is where you would make the actual API call
      console.log('Signup attempt with:', formData);
      
      // For demo purposes, let's show an error
      setError('This email is already registered. Please try a different email or login instead.');
      setIsSubmitting(false);
    }, 1500);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Medium';
    if (passwordStrength === 3) return 'Strong';
    return 'Very Strong';
  };
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-red-500';
    if (passwordStrength === 1) return 'bg-orange-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-green-500';
    return 'bg-emerald-500';
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-legal-light">
      <div className="p-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-legal-DEFAULT hover:text-legal-accent base-transition"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="heading-lg mb-2">Create Your Account</h1>
            <p className="text-legal-muted">Join Law Suvidha to access personalized legal services</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-legal-DEFAULT mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="input-field"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-legal-DEFAULT mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="input-field"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-legal-DEFAULT mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-legal-DEFAULT mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="input-field pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-legal-muted hover:text-legal-DEFAULT base-transition"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-legal-muted">Password strength: {getPasswordStrengthText()}</div>
                    <div className="text-xs text-legal-muted">{passwordStrength}/4</div>
                  </div>
                  <div className="h-1 w-full bg-legal-border rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-300", getPasswordStrengthColor())}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="flex items-center text-xs">
                      <span className={cn(
                        "w-4 h-4 mr-1 flex items-center justify-center rounded-full",
                        formData.password.length >= 8 ? "bg-green-500 text-white" : "bg-legal-border"
                      )}>
                        {formData.password.length >= 8 ? <Check size={12} /> : ""}
                      </span>
                      At least 8 characters
                    </div>
                    <div className="flex items-center text-xs">
                      <span className={cn(
                        "w-4 h-4 mr-1 flex items-center justify-center rounded-full",
                        /[A-Z]/.test(formData.password) ? "bg-green-500 text-white" : "bg-legal-border"
                      )}>
                        {/[A-Z]/.test(formData.password) ? <Check size={12} /> : ""}
                      </span>
                      Uppercase letter
                    </div>
                    <div className="flex items-center text-xs">
                      <span className={cn(
                        "w-4 h-4 mr-1 flex items-center justify-center rounded-full",
                        /[0-9]/.test(formData.password) ? "bg-green-500 text-white" : "bg-legal-border"
                      )}>
                        {/[0-9]/.test(formData.password) ? <Check size={12} /> : ""}
                      </span>
                      Number
                    </div>
                    <div className="flex items-center text-xs">
                      <span className={cn(
                        "w-4 h-4 mr-1 flex items-center justify-center rounded-full",
                        /[^A-Za-z0-9]/.test(formData.password) ? "bg-green-500 text-white" : "bg-legal-border"
                      )}>
                        {/[^A-Za-z0-9]/.test(formData.password) ? <Check size={12} /> : ""}
                      </span>
                      Special character
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-legal-DEFAULT mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className={cn(
                  "input-field",
                  formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-500" : ""
                )}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 border-legal-border rounded text-legal-DEFAULT focus:ring-legal-DEFAULT"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-legal-muted">
                  I agree to the{' '}
                  <Link to="/terms" className="text-legal-DEFAULT hover:text-legal-accent">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-legal-DEFAULT hover:text-legal-accent">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md flex items-start text-sm">
              <Info size={18} className="text-blue-500 mr-2 mt-0.5 shrink-0" />
              <p className="text-blue-700">
                By signing up, you'll receive email notifications about your legal queries and case updates. You can unsubscribe anytime.
              </p>
            </div>
            
            <div>
              <button
                type="submit"
                className={cn(
                  "w-full py-3 px-4 rounded-md text-white font-medium base-transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legal-DEFAULT",
                  isSubmitting
                    ? "bg-legal-accent cursor-not-allowed"
                    : "bg-legal-DEFAULT hover:bg-legal-accent"
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-legal-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-legal-DEFAULT font-medium hover:text-legal-accent">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
