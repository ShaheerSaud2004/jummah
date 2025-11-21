import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Assalamu alaikum! I'm here to help with questions about Jumu'ah, events, forms, and more. How can I assist you?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const faqData = {
    'prayer': {
      keywords: ['prayer', 'jumuah', 'jummah', 'time', 'when', 'khutbah'],
      response: "Jumu'ah prayer is every Friday at 1:20 PM at the Cook Student Center MPR. Al-Kahf Circle starts at 12:30 PM before the khutbah."
    },
    'location': {
      keywords: ['location', 'where', 'place', 'cook', 'mpr'],
      response: "We're located at the Cook Student Center MPR (Multi-Purpose Room). It's on the Rutgers Cook/Douglass campus."
    },
    'khateeb': {
      keywords: ['khateeb', 'speaker', 'who', 'speaking'],
      response: "You can view upcoming khateebs on our Khateebs page. For khateeb inquiries, complaints, or to suggest a speaker, please use our contact form or reach out via email."
    },
    'forms': {
      keywords: ['form', 'application', 'apply', 'request', 'borrow', 'parking'],
      response: "We have various forms available: parking permits, team applications, material borrowing, announcement requests, and more. Check the Community page for all forms."
    },
    'team': {
      keywords: ['team', 'join', 'apply', 'janitor', 'volunteer'],
      response: "We'd love to have you join our team! Check out our Team page to learn about different subteams and apply. Being a 'Janitor' means serving the community with humility and dedication."
    },
    'livestream': {
      keywords: ['livestream', 'stream', 'online', 'watch', 'video'],
      response: "Livestream information will be posted on our homepage and social media when available. Follow us on Instagram @rutgersjumuah for updates."
    },
    'kahf': {
      keywords: ['kahf', 'al-kahf', 'circle', '12:30', 'surah'],
      response: "Al-Kahf Circle happens every Friday at 12:30 PM before Jumu'ah. We read and discuss Surah Al-Kahf together. Check our dedicated Kahf Circle page for clips and more information."
    },
    'contact': {
      keywords: ['contact', 'email', 'reach', 'dm', 'message'],
      response: "You can reach us at rutgersjumuah@gmail.com or DM us on Instagram @rutgersjumuah. This chatbot is also a great way to ask questions instead of DMing!"
    },
    'default': {
      response: "I can help with prayer times, locations, forms, team applications, khateeb info, and more. Try asking about 'prayer time', 'forms', 'team', or 'khateeb'. For specific inquiries, you can also email us at rutgersjumuah@gmail.com or use the contact forms on our website."
    }
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for matches in FAQ data
    for (const [key, data] of Object.entries(faqData)) {
      if (key === 'default') continue;
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return data.response;
      }
    }

    // Special handling for event questions
    if (lowerMessage.includes('event') || lowerMessage.includes('upcoming')) {
      return "Check our homepage for upcoming events and khateebs. You can also follow us on Instagram @rutgersjumuah for real-time updates and announcements. You can also submit questions during events through this chatbot!";
    }
    
    // Special handling for submitting questions during events
    if (lowerMessage.includes('submit') && (lowerMessage.includes('question') || lowerMessage.includes('event'))) {
      return "Yes! You can submit questions during events through this chatbot. Just type your question and we'll receive it. You can also use this chatbot as an alternative to DMing us on Instagram for a more formal way to reach out.";
    }

    // Special handling for vendor inquiries
    if (lowerMessage.includes('vendor') || lowerMessage.includes('business')) {
      return "For vendor outreach and business inquiries, please email us at rutgersjumuah@gmail.com with details about your proposal.";
    }

    // Special handling for supplies
    if (lowerMessage.includes('supply') || lowerMessage.includes('material') || lowerMessage.includes('book')) {
      return "You can request to borrow materials, books, or supplies using our Materials Borrow Request Form on the Community page.";
    }

    return faqData.default.response;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const quickQuestions = [
    "Prayer time?",
    "Where is it?",
    "How to join team?",
    "Forms available?"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    // Trigger send
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(question),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Button - Mobile optimized positioning and touch target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 bg-rutgers-red text-white rounded-full shadow-2xl hover:bg-rutgers-dark-red transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95 touch-manipulation"
        aria-label="Open chatbot"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {/* Chatbot Window - Mobile optimized */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-3rem)] h-[calc(100vh-8rem)] sm:h-[600px] max-h-[600px] bg-white rounded-2xl shadow-2xl border-2 border-rutgers-red flex flex-col overflow-hidden overscroll-contain">
          {/* Header */}
          <div className="bg-gradient-to-r from-rutgers-red to-rutgers-dark-red text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Jumu'ah Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95"
              aria-label="Close chatbot"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-rutgers-red text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 px-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs bg-gray-100 hover:bg-rutgers-red hover:text-white text-gray-700 px-3 py-2 rounded-full transition-all min-h-[44px] touch-manipulation active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent min-h-[44px] text-base"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-11 h-11 bg-rutgers-red text-white rounded-full flex items-center justify-center hover:bg-rutgers-dark-red transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95 min-w-[44px] min-h-[44px]"
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Can submit event questions, reach us for inquiries, or submit questions during events
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

