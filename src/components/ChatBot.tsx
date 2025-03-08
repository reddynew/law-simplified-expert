import { useState, useRef, useEffect } from 'react';
import { X, Plus, Send, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

interface Message {
  type: 'user' | 'bot';
  text: string;
  options?: string[];
}

type ChatStage = 
  | 'initial' 
  | 'name' 
  | 'contact' 
  | 'location' 
  | 'caseType' 
  | 'questions' 
  | 'consent' 
  | 'end';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [stage, setStage] = useState<ChatStage>('initial');
  const [userData, setUserData] = useState({
    name: '',
    contact: '',
    location: '',
    caseType: '',
    answers: {}
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Case type specific questions
  const caseTypeQuestions: Record<string, string[]> = {
    'Family Law': [
      "Are you seeking a divorce or separation?",
      "Are there children involved in your case?",
      "Is there any property or assets to be divided?",
      "Have you tried mediation or counseling?",
    ],
    'Corporate Law': [
      "What is the nature of your business?",
      "Is this related to contract negotiation or review?",
      "Are you dealing with intellectual property issues?",
      "Is this regarding employment or labor disputes?",
    ],
    'Criminal Law': [
      "What charges are you facing?",
      "Have you been arrested?",
      "Do you have a court date scheduled?",
      "Have you been questioned by the police?",
    ],
    'Labour Law': [
      "Are you an employer or employee?",
      "Is this regarding termination or layoffs?",
      "Are you dealing with workplace discrimination?",
      "Is this related to compensation or benefits?",
    ]
  };

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          text: "Hello! Welcome to Law Suvidha. I'm here to assist you with your legal questions. To get started, may I know your name?"
        }
      ]);
      setStage('name');
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    // Reset chat state
    setMessages([]);
    setStage('initial');
    setUserData({
      name: '',
      contact: '',
      location: '',
      caseType: '',
      answers: {}
    });
    setCurrentQuestionIndex(0);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = {
      type: 'user',
      text: userInput
    };

    setMessages(prev => [...prev, newUserMessage]);
    processUserInput(userInput);
    setUserInput('');
  };

  const handleOptionSelect = (option: string) => {
    const newUserMessage: Message = {
      type: 'user',
      text: option
    };

    setMessages(prev => [...prev, newUserMessage]);
    processUserInput(option);
  };

  const processUserInput = (input: string) => {
    switch (stage) {
      case 'name':
        setUserData(prev => ({ ...prev, name: input }));
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: `Nice to meet you, ${input}! Could you please share your contact number?`
          }]);
          setStage('contact');
        }, 500);
        break;

      case 'contact':
        setUserData(prev => ({ ...prev, contact: input }));
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: "Thank you. What is your location or city?"
          }]);
          setStage('location');
        }, 500);
        break;

      case 'location':
        setUserData(prev => ({ ...prev, location: input }));
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: "Thank you for providing your details. What type of legal assistance do you need?",
            options: ['Family Law', 'Corporate Law', 'Criminal Law', 'Labour Law']
          }]);
          setStage('caseType');
        }, 500);
        break;

      case 'caseType':
        setUserData(prev => ({ ...prev, caseType: input }));
        setCurrentQuestionIndex(0);
        setTimeout(() => {
          if (caseTypeQuestions[input] && caseTypeQuestions[input].length > 0) {
            setMessages(prev => [...prev, {
              type: 'bot',
              text: caseTypeQuestions[input][0]
            }]);
            setStage('questions');
          } else {
            // If no questions for this case type
            setMessages(prev => [...prev, {
              type: 'bot',
              text: "Do you consent to Law Suvidha storing your information to better assist you?",
              options: ['Yes, I consent', 'No, I do not consent']
            }]);
            setStage('consent');
          }
        }, 500);
        break;

      case 'questions':
        // Store answer to current question
        setUserData(prev => ({
          ...prev,
          answers: {
            ...prev.answers,
            [caseTypeQuestions[userData.caseType][currentQuestionIndex]]: input
          }
        }));

        // Move to next question or to consent stage
        const nextIndex = currentQuestionIndex + 1;
        if (userData.caseType && caseTypeQuestions[userData.caseType] && nextIndex < caseTypeQuestions[userData.caseType].length) {
          setCurrentQuestionIndex(nextIndex);
          setTimeout(() => {
            setMessages(prev => [...prev, {
              type: 'bot',
              text: caseTypeQuestions[userData.caseType][nextIndex]
            }]);
          }, 500);
        } else {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              type: 'bot',
              text: "Thank you for providing those details. Do you consent to Law Suvidha storing your information to better assist you?",
              options: ['Yes, I consent', 'No, I do not consent']
            }]);
            setStage('consent');
          }, 500);
        }
        break;

      case 'consent':
        const consented = input.toLowerCase().includes('yes');
        setTimeout(() => {
          if (consented) {
            setMessages(prev => [...prev, {
              type: 'bot',
              text: `Thank you, ${userData.name}! Our legal team will review your information and contact you soon at ${userData.contact}. Please click the "Thank You" button below to complete this conversation.`,
              options: ['Thank You']
            }]);
          } else {
            setMessages(prev => [...prev, {
              type: 'bot',
              text: `We understand your privacy concerns, ${userData.name}. Your information will not be stored. Our legal team can still assist you if you contact us directly. Please click the "Thank You" button below to complete this conversation.`,
              options: ['Thank You']
            }]);
          }
          setStage('end');
        }, 500);
        break;

      case 'end':
        toast({
          title: "Chat completed",
          description: "Thank you for contacting Law Suvidha!",
          duration: 3000,
        });
        handleClose();
        break;

      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat button */}
      {!isOpen && (
        <Button 
          onClick={handleOpen}
          className="bg-[#403E43] text-white shadow-lg h-12 w-12 rounded-full p-0 flex items-center justify-center"
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className={cn(
          "bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300",
          isMinimized 
            ? "h-12 w-12 overflow-hidden p-0" 
            : "h-[500px] w-[350px] md:w-[400px]"
        )}>
          {/* Chat header - Minimized state shows just the Plus button */}
          {isMinimized ? (
            <Button 
              className="bg-[#403E43] text-white h-12 w-12 rounded-full p-0 flex items-center justify-center"
              onClick={handleMinimize}
            >
              <Plus size={20} className="text-white" />
            </Button>
          ) : (
            <div className="bg-[#403E43] text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="font-semibold">Law Suvidha Assistant</div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={handleMinimize}
                >
                  <div className="w-4 h-0.5 bg-white rounded"></div>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={handleClose}
                >
                  <X size={18} className="text-white" />
                </Button>
              </div>
            </div>
          )}

          {/* Chat body */}
          {!isMinimized && (
            <>
              <div className="p-4 h-[380px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index}>
                    <div className={`mb-4 max-w-[80%] ${message.type === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                      <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-[#403E43] text-white' : 'bg-gray-100 text-black'}`}>
                        {message.text}
                      </div>
                    </div>
                    {message.options && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {message.options.map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            size="sm"
                            onClick={() => handleOptionSelect(option)}
                            className="text-sm"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t w-full">
                <div className="flex items-center space-x-2 w-full">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 min-w-0"
                    disabled={messages.length > 0 && messages[messages.length - 1].options !== undefined}
                  />
                  <Button 
                    className="bg-[#403E43] text-white shrink-0"
                    onClick={handleSend}
                    disabled={messages.length > 0 && messages[messages.length - 1].options !== undefined}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
