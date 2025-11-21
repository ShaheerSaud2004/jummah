import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/dataManager';
import OptimizedImage from '../components/OptimizedImage';

const KahfCircle = () => {
  const [kahfCircleData, setKahfCircleData] = useState([]);

  useEffect(() => {
    const loadData = () => setKahfCircleData(getData('kahfCircle'));
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
            Al-Kahf Circle 📖
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Join us every Friday at 12:30 PM for our weekly study of Surah Al-Kahf
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mb-6 rounded-full"></div>
          
          {/* Key Info Card */}
          <div className="max-w-3xl mx-auto card-rutgers p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Time</p>
                <p className="font-bold text-rutgers-red text-lg">12:30 PM</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-bold text-rutgers-red text-lg">Cook SC MPR</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Day</p>
                <p className="font-bold text-rutgers-red text-lg">Every Friday</p>
              </div>
            </div>
            <div className="mt-6 bg-red-50 p-4 rounded-lg border border-rutgers-red">
              <p className="text-gray-700 text-center">
                <span className="font-semibold text-rutgers-red">Note:</span> Al-Kahf Circle happens before Jumu'ah khutbah at 1:20 PM. Join us to read and reflect on this blessed surah together!
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-12">
          <div className="card-rutgers p-8 md:p-12">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-6 text-center">
              Why Read Surah Al-Kahf on Friday?
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                The Prophet (peace be upon him) said: "Whoever reads Surah Al-Kahf on Friday, a light will shine for him between the two Fridays."
              </p>
              <p>
                Surah Al-Kahf contains four powerful stories that teach us about faith, wealth, knowledge, and power. Each story provides timeless lessons for navigating the challenges of modern life while maintaining our Islamic values.
              </p>
              <div className="bg-blue-50 border-l-4 border-rutgers-red p-4 rounded mt-6">
                <p className="font-semibold text-rutgers-red mb-2">The Four Stories:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>The People of the Cave - Faith and perseverance</li>
                  <li>The Owner of Two Gardens - Wealth and gratitude</li>
                  <li>Musa and Khidr - Knowledge and patience</li>
                  <li>Dhul-Qarnayn - Power and justice</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Clips Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Recent Clips & Highlights
            </h2>
            <p className="text-gray-600">
              Catch up on past Al-Kahf Circle sessions from our Instagram
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kahfCircleData.map((clip) => (
              <a
                key={clip.id}
                href={clip.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    size={400}
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.598v1.598h1.598V7.707zm-3.197 1.598c.883 0 1.598.715 1.598 1.598s-.715 1.598-1.598 1.598-1.598-.715-1.598-1.598.715-1.598 1.598-1.598z"/>
                    </svg>
                    Instagram
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold text-rutgers-red mb-2 group-hover:text-rutgers-dark-red transition-colors">
                    {clip.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {clip.description}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(clip.date)}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Join Us This Friday
            </h3>
            <p className="text-gray-600 mb-6">
              Don't miss out on this blessed weekly gathering. Bring your copy of the Quran and join us at 12:30 PM every Friday!
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
              <Link to="/" className="btn-secondary text-center block">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KahfCircle;

