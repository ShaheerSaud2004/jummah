import React, { useEffect, useState } from 'react';
import { getData } from '../utils/dataManager';

const Salawaat = () => {
  const [salawaatData, setSalawaatData] = useState([]);

  useEffect(() => {
    const loadData = () => setSalawaatData(getData('salawaat'));
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
            Salawaat Series
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn beautiful forms of sending blessings upon the Prophet (peace be upon him)
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Salawaat Installments */}
        <div className="space-y-8">
          {salawaatData.map((salawaat, index) => (
            <div key={salawaat.id} className="card-rutgers p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-rutgers-red text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-rutgers-red">
                      {salawaat.title}
                    </h2>
                    <p className="text-sm text-gray-500">{formatDate(salawaat.date)}</p>
                  </div>
                </div>
              </div>

              {/* Arabic Text */}
              <div className="mb-6">
                <div className="text-arabic text-rutgers-red text-center leading-relaxed p-6 bg-red-50 rounded-xl border-2 border-rutgers-red">
                  {salawaat.arabic}
                </div>
              </div>

              {/* Transliteration */}
              <div className="mb-4">
                <p className="text-gray-700 italic text-center leading-relaxed text-lg">
                  {salawaat.transliteration}
                </p>
              </div>

              {/* Translation */}
              <div className="mb-6">
                <p className="text-gray-700 text-center leading-relaxed text-lg">
                  <span className="font-semibold text-rutgers-red">Translation:</span> {salawaat.translation}
                </p>
              </div>

              {/* Explanation */}
              {salawaat.explanation && (
                <div className="bg-blue-50 border-l-4 border-rutgers-red p-4 rounded">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-rutgers-red">Note:</span> {salawaat.explanation}
                  </p>
                </div>
              )}

              {/* Share Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    const text = `${salawaat.arabic}\n\n${salawaat.transliteration}\n\n${salawaat.translation}`;
                    navigator.clipboard.writeText(text);
                    alert('Copied to clipboard!');
                  }}
                  className="text-rutgers-red hover:text-rutgers-dark-red font-semibold transition-colors duration-200 flex items-center justify-center mx-auto"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Copy Salawaat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Increase Your Salawaat
            </h3>
            <p className="text-gray-600 mb-6">
              The Prophet (peace be upon him) said: "Whoever sends blessings upon me once, Allah will send blessings upon him ten times." Make it a habit to send salawaat throughout the day, especially on Fridays.
            </p>
            <a
              href="https://instagram.com/rutgersjumuah"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow for More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salawaat;

