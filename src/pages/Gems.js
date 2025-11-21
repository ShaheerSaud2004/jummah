import React, { useEffect, useState } from 'react';
import { getData } from '../utils/dataManager';

const Gems = () => {
  const [gemsData, setGemsData] = useState([]);

  useEffect(() => {
    const loadData = () => setGemsData(getData('gems'));
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
            Gems 💎
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Weekly pearls of wisdom and Islamic knowledge shared with our community
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Gems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gemsData.map((gem) => (
            <div key={gem.id} className="card-rutgers p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">💎</div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {formatDate(gem.date)}
                </span>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-rutgers-red mb-4">
                {gem.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {gem.content}
              </p>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {gem.author}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Stay Updated with Gems
            </h3>
            <p className="text-gray-600 mb-6">
              Follow us on Instagram @rutgersjumuah to receive weekly gems and pearls of wisdom.
            </p>
            <a
              href="https://instagram.com/rutgersjumuah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gems;

