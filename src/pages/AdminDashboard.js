import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../utils/adminAuth';
import { getData } from '../utils/dataManager';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    khateebs: 0,
    upcomingKhateebs: 0,
    weeklyContent: 0,
    gems: 0,
    salawaat: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const khateebs = getData('khateebs');
    const weeklyContent = getData('weeklyContent');
    const gems = getData('gems');
    const salawaat = getData('salawaat');

    setStats({
      khateebs: khateebs.length || 0,
      upcomingKhateebs: khateebs.filter(k => k.isUpcoming).length || 0,
      weeklyContent: weeklyContent.length || 0,
      gems: gems.length || 0,
      salawaat: salawaat.length || 0
    });
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const adminSections = [
    {
      title: 'Khateebs',
      description: 'Manage khateebs, add new speakers, update schedules',
      link: '/admin/khateebs',
      icon: '👤',
      count: stats.khateebs,
      subCount: `${stats.upcomingKhateebs} upcoming`
    },
    {
      title: 'Weekly Content',
      description: 'Manage Qur\'an ayat and Du\'as',
      link: '/admin/weekly-content',
      icon: '📿',
      count: stats.weeklyContent
    },
    {
      title: 'Gems',
      description: 'Manage weekly gems and wisdom',
      link: '/admin/gems',
      icon: '💎',
      count: stats.gems
    },
    {
      title: 'Salawaat Series',
      description: 'Manage Salawaat installments',
      link: '/admin/salawaat',
      icon: '🕌',
      count: stats.salawaat
    },
    {
      title: 'Al-Kahf Circle',
      description: 'Manage Al-Kahf Circle clips and content',
      link: '/admin/kahf-circle',
      icon: '📖',
      count: getData('kahfCircle').length || 0
    },
    {
      title: 'Livestream',
      description: 'Configure livestream settings',
      link: '/admin/livestream',
      icon: '📺',
      count: null
    },
    {
      title: 'Team',
      description: 'Manage team members and subteams',
      link: '/admin/team',
      icon: '👥',
      count: null
    },
    {
      title: 'Sunnah Reminders',
      description: 'Manage Friday Sunnah reminders',
      link: '/admin/sunnah-reminders',
      icon: '🌙',
      count: getData('sunnahReminders').length || 0
    },
    {
      title: 'Settings',
      description: 'Change password and admin settings',
      link: '/admin/settings',
      icon: '⚙️',
      count: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage website content and settings</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-secondary">
              View Website
            </Link>
            <button onClick={handleLogout} className="btn-primary bg-gray-600 hover:bg-gray-700">
              Logout
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="text-2xl font-bold text-rutgers-red">{stats.khateebs}</div>
            <div className="text-sm text-gray-600">Khateebs</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">📿</div>
            <div className="text-2xl font-bold text-rutgers-red">{stats.weeklyContent}</div>
            <div className="text-sm text-gray-600">Weekly Content</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">💎</div>
            <div className="text-2xl font-bold text-rutgers-red">{stats.gems}</div>
            <div className="text-sm text-gray-600">Gems</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">🕌</div>
            <div className="text-2xl font-bold text-rutgers-red">{stats.salawaat}</div>
            <div className="text-sm text-gray-600">Salawaat</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-2xl font-bold text-rutgers-red">{stats.upcomingKhateebs}</div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <Link
              key={index}
              to={section.link}
              className="card p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{section.icon}</div>
                {section.count !== null && (
                  <span className="bg-rutgers-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {section.count}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2 group-hover:text-rutgers-dark-red transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {section.description}
              </p>
              {section.subCount && (
                <p className="text-xs text-gray-500">{section.subCount}</p>
              )}
              <div className="mt-4 flex items-center text-rutgers-red font-semibold group-hover:text-rutgers-dark-red transition-colors">
                Manage
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 card-rutgers p-6">
          <h3 className="text-xl font-serif font-bold text-rutgers-red mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/khateebs?action=add" className="btn-primary">
              + Add New Khateeb
            </Link>
            <Link to="/admin/weekly-content?action=add" className="btn-primary">
              + Add Weekly Content
            </Link>
            <Link to="/admin/gems?action=add" className="btn-primary">
              + Add Gem
            </Link>
            <Link to="/admin/livestream" className="btn-secondary">
              Configure Livestream
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

