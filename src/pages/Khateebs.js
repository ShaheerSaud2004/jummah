import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/dataManager';
import OptimizedImage from '../components/OptimizedImage';

const Khateebs = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'
  const [khateebsData, setKhateebsData] = useState([]);

  useEffect(() => {
    const loadData = () => setKhateebsData(getData('khateebs'));
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  const upcomingKhateebs = khateebsData.filter(khateeb => khateeb.isUpcoming);
  const pastKhateebs = khateebsData.filter(khateeb => !khateeb.isUpcoming);

  const getFilteredKhateebs = () => {
    switch (filter) {
      case 'upcoming':
        return upcomingKhateebs;
      case 'past':
        return pastKhateebs;
      default:
        return khateebsData;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Khateebs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our community leaders and scholars who deliver inspiring khutbahs every Friday
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-rutgers">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                filter === 'all'
                  ? 'bg-rutgers-red text-white'
                  : 'text-gray-700 hover:text-rutgers-red'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                filter === 'upcoming'
                  ? 'bg-rutgers-red text-white'
                  : 'text-gray-700 hover:text-rutgers-red'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                filter === 'past'
                  ? 'bg-rutgers-red text-white'
                  : 'text-gray-700 hover:text-rutgers-red'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Khateebs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredKhateebs().map((khateeb) => (
            <Link key={khateeb.id} to={`/khateebs/${khateeb.id}`} className="card hover:shadow-rutgers-lg transition-shadow duration-200 block">
              {/* Khateeb Image */}
              <div className="relative">
                <OptimizedImage
                  src={khateeb.image}
                  alt={khateeb.name}
                  className="w-full h-64 object-cover"
                  size={400}
                />
                {khateeb.isUpcoming && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Upcoming
                    </span>
                  </div>
                )}
              </div>

              {/* Khateeb Info */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2">
                  {khateeb.name}
                </h3>
                <p className="text-gray-600 font-medium mb-3">{khateeb.title}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-rutgers-red">
                    {formatDate(khateeb.date)}
                  </p>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {khateeb.bio}
                </p>

                {/* Event Details */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Time</p>
                      <p className="font-semibold text-rutgers-red">1:20 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Location</p>
                      <p className="font-semibold text-rutgers-red">Cook SC MPR</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 italic">
                    Al-Kahf Circle at 12:30 PM
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredKhateebs().length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No khateebs found</h3>
            <p className="text-gray-500">Try selecting a different filter or check back later.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Interested in Speaking?
            </h3>
            <p className="text-gray-600 mb-6">
              We're always looking for community members to share their knowledge and insights. 
              Contact us if you're interested in delivering a khutbah.
            </p>
            <a
              href="mailto:rutgersjumuah@gmail.com"
              className="btn-primary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Khateebs;
