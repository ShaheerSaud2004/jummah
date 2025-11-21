import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/dataManager';
import OptimizedImage from '../components/OptimizedImage';
import LivestreamEmbed from '../components/LivestreamEmbed';
import UpcomingEventsWidget from '../components/UpcomingEventsWidget';
import logoImage from '../assets/logo.jpg';

const Homepage = () => {
  const [khateebsData, setKhateebsData] = useState([]);
  const [weeklyContentData, setWeeklyContentData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  const loadData = () => {
    setKhateebsData(getData('khateebs'));
    setWeeklyContentData(getData('weeklyContent'));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  // Pull-to-refresh functionality
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && touchStartY.current > 0) {
        touchCurrentY.current = e.touches[0].clientY;
        const distance = touchCurrentY.current - touchStartY.current;
        
        if (distance > 0 && distance < 150) {
          setPullDistance(distance);
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 80) {
        setIsRefreshing(true);
        // Reload data
        setTimeout(() => {
          loadData();
          setIsRefreshing(false);
          setPullDistance(0);
        }, 1000);
      } else {
        setPullDistance(0);
      }
      touchStartY.current = 0;
      touchCurrentY.current = 0;
    };

    // Only enable on mobile
    if (window.innerWidth <= 768) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance]);

  // Get the next upcoming khateeb
  const upcomingKhateeb = khateebsData.find(khateeb => khateeb.isUpcoming);
  
  // Get recent weekly content (last 2 items)
  const recentContent = weeklyContentData.slice(-2);

  return (
    <div className="min-h-screen overscroll-contain" style={{ overscrollBehaviorY: 'contain' }}>
      {/* Pull-to-refresh indicator */}
      {pullDistance > 0 && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-rutgers-red/10 transition-opacity"
          style={{ 
            height: `${Math.min(pullDistance, 80)}px`,
            opacity: Math.min(pullDistance / 80, 1)
          }}
        >
          {isRefreshing ? (
            <div className="flex items-center space-x-2 text-rutgers-red">
              <div className="w-5 h-5 border-2 border-rutgers-red border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-semibold">Refreshing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-rutgers-red">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-sm font-semibold">Pull to refresh</span>
            </div>
          )}
        </div>
      )}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rutgers-red via-rutgers-light-red to-rutgers-dark-red text-white py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-white/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Islamic Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
              animation: 'float 20s ease-in-out infinite'
            }}></div>
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-white/10 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-10">
              {/* Unique Logo Container with Glow Effect */}
              <div className="relative mx-auto mb-8 w-40 h-40">
                <div className="absolute inset-0 bg-white rounded-full shadow-2xl border-4 border-white/20 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-inner"></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <img 
                    src={logoImage} 
                    alt="Rutgers Jumu'ah Logo" 
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                  />
                </div>
                {/* Rotating Ring */}
                <div className="absolute inset-0 border-4 border-transparent border-t-white/30 border-r-white/20 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
                <div className="absolute inset-2 border-2 border-transparent border-b-white/20 border-l-white/30 rounded-full animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
              </div>
              
              {/* Unique Typography with Glow */}
              <h1 className="text-6xl md:text-8xl font-serif font-bold mb-4 drop-shadow-2xl relative">
                <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-pulse">
                  JUMU'AH
                </span>
                <div className="absolute inset-0 text-6xl md:text-8xl font-serif font-bold opacity-20 blur-sm">
                  JUMU'AH
                </div>
              </h1>
              <p className="text-2xl md:text-4xl font-light opacity-95 mb-4 tracking-wider">
                at <span className="font-bold text-yellow-200">Rutgers</span>
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent to-white rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                <div className="w-16 h-1 bg-gradient-to-l from-transparent to-white rounded-full"></div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Stories from your Rutgers Jumu'ah Community. Join us every Friday at 1:20 pm at the Cook Student Center MPR! Al-Kahf Circle at 12:30 PM.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/khateebs" 
                className="group relative px-8 py-4 bg-rutgers-red hover:bg-rutgers-dark-red active:bg-rutgers-dark-red text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl overflow-hidden touch-manipulation min-h-[44px] flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  View Khateebs
                </span>
              </Link>
              <Link 
                to="/community" 
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 active:bg-white/25 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl touch-manipulation min-h-[44px] flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Join Community
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Livestream Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <LivestreamEmbed />
          </div>
        </div>
      </section>

      {/* Weekly Khutbah Card */}
        {upcomingKhateeb && (
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-32 h-32 bg-rutgers-red/5 rounded-full blur-2xl"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-rutgers-red/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-rutgers-red/3 to-transparent rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block relative">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-rutgers-red mb-4 relative">
                    <span className="bg-gradient-to-r from-rutgers-red via-rutgers-light-red to-rutgers-red bg-clip-text text-transparent">
                      This Week's Khutbah
                    </span>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-rutgers-red rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-rutgers-light-red rounded-full animate-pulse"></div>
                  </h2>
                </div>
                <p className="text-xl text-gray-600 mb-6">Join us for Jumu'ah prayer and khutbah</p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent to-rutgers-red rounded-full"></div>
                  <div className="w-2 h-2 bg-rutgers-red rounded-full animate-pulse"></div>
                  <div className="w-12 h-1 bg-gradient-to-l from-transparent to-rutgers-red rounded-full"></div>
                </div>
              </div>
              
              <div className="max-w-5xl mx-auto">
                <div className="card-rutgers p-8 md:p-12 shadow-2xl border-4 border-rutgers-red/20">
                  <div className="flex flex-col lg:flex-row items-center gap-10">
                    {/* Khateeb Photo */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-rutgers-red shadow-xl">
                        <OptimizedImage
                          src={upcomingKhateeb.image}
                          alt={upcomingKhateeb.name}
                          className="w-full h-full object-cover"
                          size={160}
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  
                  {/* Khateeb Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-2">
                      {upcomingKhateeb.name}
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">{upcomingKhateeb.title}</p>
                    <p className="text-gray-700 mb-6">{upcomingKhateeb.bio}</p>
                    
                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 shadow-lg">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-rutgers-red rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-600">Date</p>
                        </div>
                        <p className="font-bold text-rutgers-red text-lg">
                          {new Date(upcomingKhateeb.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 shadow-lg">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-rutgers-red rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-600">Khutbah Time</p>
                        </div>
                        <p className="font-bold text-rutgers-red text-lg">1:20 PM</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 shadow-lg">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-rutgers-red rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-600">Location</p>
                        </div>
                        <p className="font-bold text-rutgers-red text-lg">Cook Student Center MPR</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 italic">
                      Al-Kahf Circle at 12:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Widget */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <UpcomingEventsWidget />
          </div>
        </div>
      </section>

      {/* Weekly Updates Preview */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">Weekly Updates</h2>
            <p className="text-xl text-gray-600">Qur'an ayat and Du'as from our community</p>
            <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {recentContent.map((content) => (
              <div key={content.id} className="card-rutgers p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="mb-6">
                    <span className="bg-rutgers-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {content.type === 'ayah' ? 'Qur\'an Ayah' : 'Du\'a'}
                    </span>
                  </div>
                  <div className="text-arabic text-rutgers-red mb-6 leading-relaxed">
                    {content.arabic}
                  </div>
                  {content.transliteration && (
                    <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">
                      {content.transliteration}
                    </p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {content.translation}
                  </p>
                  {content.reference && (
                    <p className="text-sm text-rutgers-red font-semibold bg-red-50 px-3 py-1 rounded-full inline-block">
                      {content.reference}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/updates" className="btn-primary">
              View All Updates
            </Link>
          </div>
        </div>
      </section>

      {/* Adab & Conduct Notice */}
      <section className="py-12 bg-gradient-to-r from-red-50 to-red-100 border-y-2 border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start">
              <div className="text-4xl mr-4 flex-shrink-0">🤲</div>
              <div>
                <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">
                  Adab & Conduct in the Musalla
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Please maintain respectful conduct in the musalla. <strong>Do not talk when the khateeb enters or during the khutbah.</strong> 
                  Clean up any snack debris and help keep our space welcoming for everyone.
                </p>
                <Link to="/adab" className="text-rutgers-red hover:text-rutgers-dark-red font-semibold inline-flex items-center">
                  Learn more about adab guidelines
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">Community</h2>
            <p className="text-xl text-gray-600">Get involved and stay connected</p>
            <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/team-application" className="card-rutgers p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-rutgers-red to-rutgers-dark-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">Join Our Team</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Apply to be a "Janitor" and serve the community</p>
              <span className="inline-flex items-center text-rutgers-red font-semibold group-hover:text-rutgers-dark-red transition-colors duration-200">
                Apply Now 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            
            <Link to="/parking" className="card-rutgers p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-rutgers-red to-rutgers-dark-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">Parking & Forms</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Request parking permits and access community forms</p>
              <span className="inline-flex items-center text-rutgers-red font-semibold group-hover:text-rutgers-dark-red transition-colors duration-200">
                View Forms 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            
            <Link to="/kahf-circle" className="card-rutgers p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-rutgers-red to-rutgers-dark-red rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">📖</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">Al-Kahf Circle</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">Join us every Friday at 12:30 PM</p>
              <span className="inline-flex items-center text-rutgers-red font-semibold group-hover:text-rutgers-dark-red transition-colors duration-200">
                Learn More 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
