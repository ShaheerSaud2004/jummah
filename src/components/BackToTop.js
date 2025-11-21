import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-30 w-12 h-12 sm:w-14 sm:h-14 bg-rutgers-red text-white rounded-full shadow-2xl hover:bg-rutgers-dark-red transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95 touch-manipulation"
      aria-label="Back to top"
      style={{ minWidth: '44px', minHeight: '44px' }}
    >
      <svg 
        className="w-6 h-6 sm:w-7 sm:h-7" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
};

export default BackToTop;

