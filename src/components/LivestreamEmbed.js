import React, { useEffect, useState } from 'react';
import { getData } from '../utils/dataManager';

const LivestreamEmbed = () => {
  const [livestreamData, setLivestreamData] = useState({ isLive: false, livestreamUrl: '', embedUrl: '', platform: 'instagram', note: '' });

  useEffect(() => {
    const loadData = () => setLivestreamData(getData('livestream'));
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  const { isLive, livestreamUrl, embedUrl, platform, note } = livestreamData;

  // Helper function to get embed URL based on platform
  const getEmbedUrl = (url, platform) => {
    if (!url) return null;

    if (platform === 'youtube') {
      // Convert YouTube URL to embed format
      // Handles: https://www.youtube.com/watch?v=VIDEO_ID
      // Or: https://youtu.be/VIDEO_ID
      // Or: https://www.youtube.com/embed/VIDEO_ID
      const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
      const match = url.match(youtubeRegex);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
      }
    } else if (platform === 'facebook') {
      // Convert Facebook Live URL to embed format
      const fbRegex = /facebook\.com\/(?:watch\/)?videos?\/(\d+)/;
      const match = url.match(fbRegex);
      if (match && match[1]) {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
      }
    } else if (platform === 'instagram') {
      // Instagram Live cannot be directly embedded due to platform restrictions
      // We'll show a link to the Instagram Live instead
      return null;
    } else if (platform === 'custom' && embedUrl) {
      // Use custom embed URL if provided
      return embedUrl;
    }

    return null;
  };

  const finalEmbedUrl = embedUrl || getEmbedUrl(livestreamUrl, platform);

  // Special handling for Instagram Live - cannot be embedded directly
  if (platform === 'instagram' && isLive && livestreamUrl) {
    return (
      <div className="bg-white rounded-xl shadow-2xl border-2 border-rutgers-red overflow-hidden">
        <div className="bg-gradient-to-r from-rutgers-red to-rutgers-dark-red text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <p className="font-bold text-lg">LIVE - Jumu'ah Khutbah on Instagram</p>
          </div>
        </div>
        
        <div className="p-8 text-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.598v1.598h1.598V7.707zm-3.197 1.598c.883 0 1.598.715 1.598 1.598s-.715 1.598-1.598 1.598-1.598-.715-1.598-1.598.715-1.598 1.598-1.598z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Watch Live on Instagram
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Instagram Live streams cannot be embedded directly. Click the button below to watch the livestream on Instagram.
            </p>
            <a
              href={livestreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.598v1.598h1.598V7.707zm-3.197 1.598c.883 0 1.598.715 1.598 1.598s-.715 1.598-1.598 1.598-1.598-.715-1.598-1.598.715-1.598 1.598-1.598z"/>
              </svg>
              Watch on Instagram
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="text-xs text-gray-500 mt-4">
              Make sure you have the Instagram app installed or open in Instagram
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If not live or no URL, show notice
  if (!isLive || !finalEmbedUrl) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <svg className="w-8 h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <div className="text-center">
            <p className="font-bold text-blue-900 text-lg">Livestream</p>
            <p className="text-sm text-blue-700">{note || "Check back on Fridays at 1:20 PM or follow us on Instagram @rutgersjumuah for updates."}</p>
          </div>
        </div>
        {livestreamUrl && !isLive && (
          <div className="text-center mt-4">
            <a
              href={livestreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-700 hover:text-blue-900 font-semibold"
            >
              Watch on {platform === 'youtube' ? 'YouTube' : platform === 'facebook' ? 'Facebook' : platform === 'instagram' ? 'Instagram' : 'External Link'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    );
  }

  // Show embedded livestream
  return (
    <div className="bg-white rounded-xl shadow-2xl border-2 border-rutgers-red overflow-hidden">
      <div className="bg-gradient-to-r from-rutgers-red to-rutgers-dark-red text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <p className="font-bold text-lg">LIVE - Jumu'ah Khutbah</p>
        </div>
        <a
          href={livestreamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline flex items-center"
        >
          Watch on {platform === 'youtube' ? 'YouTube' : platform === 'facebook' ? 'Facebook' : platform === 'instagram' ? 'Instagram' : 'External'}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
        <iframe
          src={finalEmbedUrl}
          className="absolute top-0 left-0 w-full h-full"
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Jumu'ah Livestream"
        ></iframe>
      </div>
    </div>
  );
};

export default LivestreamEmbed;

