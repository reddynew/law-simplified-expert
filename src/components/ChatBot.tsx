
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Plus, Minus, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatStep = {
  id: string;
  type: 'question' | 'option' | 'input' | 'message' | 'thank-you';
  content: string;
  options?: string[];
  inputType?: 'text' | 'email' | 'tel';
  placeholder?: string;
  isRequired?: boolean;
  nextStep?: string | { [key: string]: string };
};

type UserResponse = {
  [key: string]: string;
};

const INITIAL_STEPS: ChatStep[] = [
  {
    id: 'intro',
    type: 'message',
    content: 'Hello, welcome to Law Suvidha. I'm here to help you with your legal queries. To get started, I'll need some information from you.',
    nextStep: 'name'
  },
  {
    id: 'name',
    type: 'input',
    inputType: 'text',
    content: 'What is your name?',
    placeholder: 'Enter your full name',
    isRequired: true,
    nextStep: 'contact'
  },
  {
    id: 'contact',
    type: 'input',
    inputType: 'tel',
    content: 'What is your contact number?',
    placeholder: 'Enter your phone number',
    isRequired: true,
    nextStep: 'email'
  },
  {
    id: 'email',
    type: 'input',
    inputType: 'email',
    content: 'What is your email address?',
    placeholder: 'Enter your email',
    isRequired: true,
    nextStep: 'location'
  },
  {
    id: 'location',
    type: 'input',
    inputType: 'text',
    content: 'Where are you located?',
    placeholder: 'Enter your city',
    isRequired: true,
    nextStep: 'case-type'
  },
  {
    id: 'case-type',
    type: 'option',
    content: 'What type of legal assistance do you need?',
    options: ['Family Law', 'Corporate Law', 'Labour Law', 'Criminal Law'],
    nextStep: {
      'Family Law': 'family-q1',
      'Corporate Law': 'corporate-q1',
      'Labour Law': 'labour-q1',
      'Criminal Law': 'criminal-q1'
    }
  },
  // Family Law Questions
  {
    id: 'family-q1',
    type: 'option',
    content: 'What aspect of Family Law do you need help with?',
    options: ['Divorce', 'Child Custody', 'Alimony', 'Property Distribution', 'Other'],
    nextStep: 'family-q2'
  },
  {
    id: 'family-q2',
    type: 'question',
    content: 'How long has this issue been ongoing?',
    nextStep: 'family-q3'
  },
  {
    id: 'family-q3',
    type: 'question',
    content: 'Have you previously consulted any other lawyer regarding this matter?',
    nextStep: 'consent'
  },
  // Corporate Law Questions
  {
    id: 'corporate-q1',
    type: 'option',
    content: 'What area of Corporate Law are you interested in?',
    options: ['Business Formation', 'Contracts', 'Intellectual Property', 'Compliance', 'Dispute Resolution', 'Other'],
    nextStep: 'corporate-q2'
  },
  {
    id: 'corporate-q2',
    type: 'question',
    content: 'Is this for an existing business or a new venture?',
    nextStep: 'corporate-q3'
  },
  {
    id: 'corporate-q3',
    type: 'question',
    content: 'What is the approximate size of your business (number of employees)?',
    nextStep: 'consent'
  },
  // Labour Law Questions
  {
    id: 'labour-q1',
    type: 'option',
    content: 'What specific Labour Law issue do you need assistance with?',
    options: ['Wrongful Termination', 'Workplace Discrimination', 'Wage Disputes', 'Workers Compensation', 'Other'],
    nextStep: 'labour-q2'
  },
  {
    id: 'labour-q2',
    type: 'question',
    content: 'When did this incident or issue occur?',
    nextStep: 'labour-q3'
  },
  {
    id: 'labour-q3',
    type: 'question',
    content: 'Have you filed any formal complaints with HR or other authorities?',
    nextStep: 'consent'
  },
  // Criminal Law Questions
  {
    id: 'criminal-q1',
    type: 'option',
    content: 'What type of Criminal Law matter do you need help with?',
    options: ['Criminal Defense', 'Bail Application', 'Appeals', 'Other'],
    nextStep: 'criminal-q2'
  },
  {
    id: 'criminal-q2',
    type: 'question',
    content: 'Has a case been registered or any legal proceedings started?',
    nextStep: 'criminal-q3'
  },
  {
    id: 'criminal-q3',
    type: 'question',
    content: 'What is the current status of your case?',
    nextStep: 'consent'
  },
  // Consent and Thank You
  {
    id: 'consent',
    type: 'message',
    content: 'Thank you for providing this information. Do you consent to Law Suvidha storing the information you've shared for the purpose of addressing your legal query?',
    nextStep: 'thank-you'
  },
  {
    id: 'thank-you',
    type: 'thank-you',
    content: 'Thank you for reaching out to Law Suvidha. One of our legal experts will review your information and contact you within 24 hours. We look forward to assisting you with your legal matter.'
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: 'bot' | 'user', content: string, id?: string}[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('intro');
  const [userInput, setUserInput] = useState('');
  const [userResponses, setUserResponses] = useState<UserResponse>({});
  const [isChatComplete, setIsChatComplete] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Handle scrolling to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      const introStep = INITIAL_STEPS.find(step => step.id === 'intro');
      if (introStep) {
        setChatHistory([{ role: 'bot', content: introStep.content, id: introStep.id }]);
        const nextStepId = introStep.nextStep as string;
        setTimeout(() => {
          const nextStep = INITIAL_STEPS.find(step => step.id === nextStepId);
          if (nextStep) {
            setChatHistory(prev => [...prev, { role: 'bot', content: nextStep.content, id: nextStep.id }]);
          }
        }, 1000);
      }
    }
  }, [isOpen]);

  const findStepById = (id: string): ChatStep | undefined => {
    return INITIAL_STEPS.find(step => step.id === id);
  };

  const handleUserResponse = (response: string, stepId: string) => {
    // Add user response to chat history
    setChatHistory(prev => [...prev, { role: 'user', content: response }]);
    
    // Store response
    setUserResponses(prev => ({...prev, [stepId]: response }));
    
    // Find current step
    const currentStep = findStepById(stepId);
    if (!currentStep || !currentStep.nextStep) return;
    
    // Determine next step
    let nextStepId: string;
    if (typeof currentStep.nextStep === 'string') {
      nextStepId = currentStep.nextStep;
    } else {
      nextStepId = currentStep.nextStep[response] || Object.values(currentStep.nextStep)[0];
    }
    
    // Get next step
    const nextStep = findStepById(nextStepId);
    if (!nextStep) return;
    
    // Add bot's next question to chat history after a delay
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'bot', content: nextStep.content, id: nextStep.id }]);
      
      // Check if chat is complete
      if (nextStep.type === 'thank-you') {
        setIsChatComplete(true);
      }
    }, 800);
  };

  const handleTextInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const currentStepObj = findStepById(currentStep);
    if (currentStepObj) {
      handleUserResponse(userInput, currentStep);
      setUserInput('');
      
      if (typeof currentStepObj.nextStep === 'string') {
        setCurrentStep(currentStepObj.nextStep);
      }
    }
  };

  const handleOptionSelect = (option: string, stepId: string) => {
    handleUserResponse(option, stepId);
    
    const currentStepObj = findStepById(stepId);
    if (currentStepObj && typeof currentStepObj.nextStep === 'object') {
      setCurrentStep(currentStepObj.nextStep[option] || Object.values(currentStepObj.nextStep)[0]);
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    // Reset chat if needed
    if (isChatComplete) {
      setChatHistory([]);
      setUserResponses({});
      setCurrentStep('intro');
      setIsChatComplete(false);
    }
  };

  const renderInputForStep = (step: ChatStep) => {
    if (step.type === 'input') {
      return (
        <form onSubmit={handleTextInput} className="mt-4 flex">
          <input
            type={step.inputType || 'text'}
            className="input-field"
            placeholder={step.placeholder}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required={step.isRequired}
          />
          <button 
            type="submit" 
            className="ml-2 bg-legal-DEFAULT text-white p-2 rounded-md hover:bg-legal-accent base-transition"
            aria-label="Send"
          >
            <ChevronRight size={20} />
          </button>
        </form>
      );
    }
    
    if (step.type === 'option' && step.options) {
      return (
        <div className="mt-4 space-y-2">
          {step.options.map((option, idx) => (
            <button
              key={idx}
              className="w-full py-2 px-4 bg-white text-legal-DEFAULT border border-legal-border rounded-md hover:bg-legal-light hover:border-legal-accent base-transition text-left"
              onClick={() => handleOptionSelect(option, step.id)}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }
    
    if (step.type === 'question') {
      return (
        <form onSubmit={handleTextInput} className="mt-4 flex">
          <input
            type="text"
            className="input-field"
            placeholder="Type your answer..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="ml-2 bg-legal-DEFAULT text-white p-2 rounded-md hover:bg-legal-accent base-transition"
            aria-label="Send"
          >
            <ChevronRight size={20} />
          </button>
        </form>
      );
    }
    
    if (step.type === 'thank-you') {
      return (
        <button
          className="mt-4 w-full py-2 px-4 bg-legal-DEFAULT text-white rounded-md hover:bg-legal-accent base-transition flex items-center justify-center"
          onClick={closeChat}
        >
          <Check size={18} className="mr-2" />
          Close Chat
        </button>
      );
    }
    
    return null;
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className={cn(
          "fixed z-40 shadow-lg base-transition flex items-center justify-center",
          isMinimized 
            ? "bottom-6 right-6 h-12 w-12 rounded-full bg-legal-DEFAULT text-white" 
            : "bottom-6 right-6 h-14 w-14 rounded-full bg-legal-DEFAULT text-white hover:bg-legal-accent"
        )}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isMinimized ? <Plus size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* FAQ Button */}
      <button
        className="fixed z-40 bottom-6 left-6 h-14 w-14 rounded-full bg-legal-DEFAULT text-white shadow-lg hover:bg-legal-accent base-transition flex items-center justify-center"
        onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="View FAQs"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      </button>
      
      {/* Chat Window */}
      <div 
        className={cn(
          "fixed z-50 bottom-24 right-6 w-full max-w-sm bg-white rounded-lg shadow-xl border border-legal-border overflow-hidden base-transition",
          isOpen && !isMinimized ? "animate-fade-in" : "hidden"
        )}
      >
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 bg-legal-DEFAULT text-white">
          <h3 className="font-semibold">Law Suvidha Chat</h3>
          <div className="flex items-center space-x-2">
            <button 
              className="hover:text-legal-light base-transition"
              onClick={minimizeChat}
              aria-label="Minimize chat"
            >
              <Minus size={20} />
            </button>
            <button 
              className="hover:text-legal-light base-transition"
              onClick={closeChat}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="p-4 h-80 overflow-y-auto bg-legal-light">
          {chatHistory.map((message, idx) => (
            <div
              key={idx}
              className={cn(
                "mb-4 max-w-[80%] p-3 rounded-lg animate-fade-in",
                message.role === 'bot' 
                  ? "bg-white text-legal-DEFAULT mr-auto" 
                  : "bg-legal-DEFAULT text-white ml-auto"
              )}
            >
              {message.content}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        {/* Chat Input Area */}
        <div className="p-4 border-t border-legal-border">
          {chatHistory.length > 0 && (
            renderInputForStep(
              findStepById(
                chatHistory[chatHistory.length - 1].id || currentStep
              ) || INITIAL_STEPS[0]
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBot;
