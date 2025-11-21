import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeAdminPassword, logoutAdmin } from '../../utils/adminAuth';

const AdminSettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (changeAdminPassword(oldPassword, newPassword)) {
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        logoutAdmin();
        navigate('/admin/login');
      }, 2000);
    } else {
      setMessage({ type: 'error', text: 'Incorrect current password' });
    }
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
          <h1 className="text-4xl font-serif font-bold text-rutgers-red">Admin Settings</h1>
        </div>

        <div className="card-rutgers p-8">
          <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-6">Change Password</h2>
          
          {message.text && (
            <div className={`mb-6 px-4 py-3 rounded-lg flex items-center ${
              message.type === 'success' 
                ? 'bg-green-50 border-2 border-green-200 text-green-700' 
                : 'bg-red-50 border-2 border-red-200 text-red-700'
            }`}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {message.type === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              {message.text}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password *</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password *</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Change Password
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-rutgers-red mb-4">About Admin Access</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Default password: <code className="bg-gray-100 px-2 py-1 rounded">jummah2025</code></li>
              <li>• Admin session lasts 24 hours</li>
              <li>• All changes are saved to browser localStorage</li>
              <li>• Access admin panel at <code className="bg-gray-100 px-2 py-1 rounded">/admin</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

