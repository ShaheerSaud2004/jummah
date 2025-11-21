import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../assets/logo.jpg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/khateebs', label: 'Khateebs' },
    { path: '/updates', label: 'Weekly Updates' },
    { path: '/kahf-circle', label: 'Al-Kahf Circle' },
    { path: '/gems', label: 'Gems' },
    { path: '/salawaat', label: 'Salawaat' },
    { path: '/community', label: 'Community' },
    { path: '/team', label: 'Team' },
    { path: '/hoj', label: 'HOJ' },
    { path: '/sunnah-reminders', label: 'Sunnah' },
    { path: '/adab', label: 'Adab' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b-2 border-rutgers-red sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 min-h-[44px] min-w-[44px] touch-manipulation active:scale-95 transition-transform">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rutgers-red shadow-lg">
              <img 
                src={logoImage} 
                alt="Rutgers Jumu'ah Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Logo failed to load:', e.target.src);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-rutgers-red rounded-full flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white font-bold text-lg">J</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold text-rutgers-red">
                JUMU'AH
              </h1>
              <p className="text-xs text-gray-600 -mt-1">at Rutgers</p>
            </div>
          </Link>

          {/* Desktop Navigation - 44x44px touch targets */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center touch-manipulation active:scale-95 ${
                  isActive(item.path)
                    ? 'text-rutgers-red bg-red-50'
                    : 'text-gray-700 hover:text-rutgers-red hover:bg-red-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 min-h-[44px] flex items-center touch-manipulation active:scale-95 ${
                  isActive(item.path)
                    ? 'text-rutgers-red bg-red-50'
                    : 'text-gray-700 hover:text-rutgers-red hover:bg-red-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button - 44x44px touch target */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-rutgers-red focus:outline-none focus:text-rutgers-red w-11 h-11 flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Improved touch targets */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto overscroll-contain">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 min-h-[44px] flex items-center touch-manipulation active:scale-98 ${
                    isActive(item.path)
                      ? 'text-rutgers-red bg-red-50'
                      : 'text-gray-700 hover:text-rutgers-red hover:bg-red-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
