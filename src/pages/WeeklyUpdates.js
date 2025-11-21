import React, { useState, useEffect } from 'react';
import { getData } from '../utils/dataManager';

const WeeklyUpdates = () => {
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'ayah', 'dua'
  const [weeklyContentData, setWeeklyContentData] = useState([]);

  useEffect(() => {
    const loadData = () => setWeeklyContentData(getData('weeklyContent'));
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  const getFilteredContent = () => {
    if (selectedType === 'all') {
      return weeklyContentData;
    }
    return weeklyContentData.filter(content => content.type === selectedType);
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'ayah':
        return 'Qur\'an Ayah';
      case 'dua':
        return 'Du\'a';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Weekly Updates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Qur'an ayat and Du'as shared with our community to inspire and guide us
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-rutgers">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                selectedType === 'all'
                  ? 'bg-rutgers-red text-white'
                  : 'text-gray-700 hover:text-rutgers-red'
              }`}
            >
              All Content
            </button>
            <button
              onClick={() => setSelectedType('ayah')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                selectedType === 'ayah'
                  ? 'bg-rutgers-red text-white'
                  : 'text-gray-700 hover:text-rutgers-red'
              }`}
            >
              Qur'an Ayat
            </button>
            <button
              onClick={() => setSelectedType('dua')}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                selectedType === 'dua'
                  ? 'bg-rutgers-red text-white'
                  : 'text-gray-700 hover:text-rutgers-red'
              }`}
            >
              Du'as
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {getFilteredContent().map((content) => (
            <div key={content.id} className="card-rutgers p-8">
              {/* Content Type Badge */}
              <div className="flex justify-between items-start mb-6">
                <span className="bg-rutgers-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {getTypeLabel(content.type)}
                </span>
                {content.reference && (
                  <span className="text-sm text-gray-500 font-medium">
                    {content.reference}
                  </span>
                )}
              </div>

              {/* Arabic Text */}
              <div className="text-center mb-6">
                <div className="text-arabic text-rutgers-red leading-relaxed">
                  {content.arabic}
                </div>
              </div>

              {/* Transliteration (for Du'as) */}
              {content.transliteration && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 italic text-center leading-relaxed">
                    {content.transliteration}
                  </p>
                </div>
              )}

              {/* English Translation */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-center">
                  {content.translation}
                </p>
              </div>

              {/* Share Button */}
              <div className="text-center">
                <button
                  onClick={() => {
                    const text = `${content.arabic}\n\n${content.translation}${content.reference ? `\n\n${content.reference}` : ''}`;
                    navigator.clipboard.writeText(text);
                    // You could add a toast notification here
                  }}
                  className="text-rutgers-red hover:text-rutgers-dark-red font-semibold transition-colors duration-200"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredContent().length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No content found</h3>
            <p className="text-gray-500">Try selecting a different filter or check back later for new updates.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Follow us on social media to receive weekly updates and stay connected with our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/rutgersjumuah"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Follow on Instagram
              </a>
              <a
                href="mailto:rutgersjumuah@gmail.com"
                className="btn-secondary"
              >
                Join Email List
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyUpdates;
