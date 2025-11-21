import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getData } from '../utils/dataManager';
import OptimizedImage from '../components/OptimizedImage';
import LivestreamEmbed from '../components/LivestreamEmbed';

const KhateebDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [khateebsData, setKhateebsData] = useState([]);

  useEffect(() => {
    const loadData = () => setKhateebsData(getData('khateebs'));
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  const khateeb = khateebsData.find(k => k.id === parseInt(id));

  if (!khateeb) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-rutgers-red mb-4">Khateeb not found</h2>
          <Link to="/khateebs" className="btn-primary">Back to Khateebs</Link>
        </div>
      </div>
    );
  }

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-rutgers-red hover:text-rutgers-dark-red transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Khateeb Card */}
        <div className="card-rutgers p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-rutgers-red shadow-xl mx-auto md:mx-0">
                <OptimizedImage
                  src={khateeb.image}
                  alt={khateeb.name}
                  className="w-full h-full object-cover"
                  size={256}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-3">
                {khateeb.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{khateeb.title}</p>
              
              {khateeb.isUpcoming && (
                <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Upcoming Khateeb
                </span>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 text-rutgers-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-gray-700">{formatDate(khateeb.date)}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 text-rutgers-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-gray-700">1:20 PM - Khutbah</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <svg className="w-5 h-5 text-rutgers-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold text-gray-700">Cook Student Center MPR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{khateeb.bio}</p>
          </div>

          {/* Event Details */}
          <div className="bg-red-50 p-6 rounded-xl border-2 border-rutgers-red">
            <h3 className="text-xl font-serif font-bold text-rutgers-red mb-4">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Khutbah Time</p>
                <p className="font-bold text-rutgers-red text-lg">1:20 PM</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-bold text-rutgers-red text-lg">Cook Student Center MPR</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-rutgers-red">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-rutgers-red">Al-Kahf Circle:</span> Join us at 12:30 PM before the khutbah for our weekly study of Surah Al-Kahf.
              </p>
            </div>
          </div>

          {/* Livestream Embed */}
          <div className="mt-6">
            <LivestreamEmbed />
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/khateebs" className="btn-secondary text-center">
              View All Khateebs
            </Link>
            <a
              href="mailto:rutgersjumuah@gmail.com?subject=Khateeb Inquiry"
              className="btn-primary text-center"
            >
              Contact About Khateeb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhateebDetail;

