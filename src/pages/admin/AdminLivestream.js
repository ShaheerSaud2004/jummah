import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, updateObjectData, triggerDataRefresh } from '../../utils/dataManager';

const AdminLivestream = () => {
  const [formData, setFormData] = useState({
    isLive: false,
    livestreamUrl: '',
    embedUrl: '',
    platform: 'instagram',
    note: ''
  });
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData('livestream');
    setFormData(data);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateObjectData('livestream', formData);
    triggerDataRefresh();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="text-rutgers-red hover:text-rutgers-dark-red mb-2 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-serif font-bold text-rutgers-red">Configure Livestream</h1>
        </div>

        <div className="card-rutgers p-8">
          {saved && (
            <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Settings saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isLive"
                checked={formData.isLive}
                onChange={handleInputChange}
                className="w-4 h-4 text-rutgers-red border-gray-300 rounded focus:ring-rutgers-red"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">Livestream is currently live</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform *</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                required
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Livestream URL *</label>
              <input
                type="url"
                name="livestreamUrl"
                value={formData.livestreamUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                placeholder="https://www.instagram.com/rutgersjumuah/ or YouTube/Facebook URL"
                required
              />
              <p className="text-xs text-gray-500 mt-1">For Instagram Live, use the profile URL or direct live link</p>
            </div>

            {formData.platform === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Embed URL</label>
                <input
                  type="url"
                  name="embedUrl"
                  value={formData.embedUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                  placeholder="https://..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note (when not live)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                placeholder="Message to show when livestream is not active"
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> Set "isLive" to true and add the livestream URL to enable the livestream on the website. 
                For Instagram Live, users will be directed to watch on Instagram since it cannot be embedded directly.
              </p>
            </div>

            <button type="submit" className="btn-primary">
              Save Livestream Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLivestream;

