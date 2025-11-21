import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/dataManager';

const SunnahReminders = () => {
  const [sunnahRemindersData, setSunnahRemindersData] = useState([]);

  useEffect(() => {
    const loadData = () => setSunnahRemindersData(getData('sunnahReminders'));
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Friday Sunnah Reminders
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beautiful practices to observe on the blessed day of Jumu'ah
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Introduction */}
        <div className="card-rutgers p-8 mb-12 max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            Friday (Jumu'ah) is a special day in Islam. The Prophet (peace be upon him) encouraged us 
            to observe certain sunnah practices on this blessed day. Here are some reminders to help 
            you prepare for and maximize the blessings of Jumu'ah.
          </p>
        </div>

        {/* Reminders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sunnahRemindersData.map((reminder) => (
            <div key={reminder.id} className="card-rutgers p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">
                    {reminder.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {reminder.description}
                  </p>
                </div>
                <div className="ml-4 text-3xl">📿</div>
              </div>

              {reminder.arabic && (
                <div className="bg-red-50 p-4 rounded-lg border border-rutgers-red mb-4">
                  <div className="text-arabic text-rutgers-red text-center leading-relaxed">
                    {reminder.arabic}
                  </div>
                </div>
              )}

              {reminder.reference && (
                <p className="text-sm text-gray-500 italic text-right">
                  {reminder.reference}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="card-rutgers p-8 md:p-12 max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-6 text-center">
            Additional Tips for Jumu'ah
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-rutgers-red text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <span className="text-sm font-bold">1</span>
              </div>
              <p>Arrive early to the masjid - the earlier you come, the greater the reward.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-rutgers-red text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <span className="text-sm font-bold">2</span>
              </div>
              <p>Listen attentively to the khutbah - avoid talking or distractions during the sermon.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-rutgers-red text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <span className="text-sm font-bold">3</span>
              </div>
              <p>Increase your salawaat (blessings) upon the Prophet (peace be upon him) throughout the day.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-rutgers-red text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <span className="text-sm font-bold">4</span>
              </div>
              <p>Read Surah Al-Kahf - join our Al-Kahf Circle at 12:30 PM or read it on your own.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-rutgers-red text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <span className="text-sm font-bold">5</span>
              </div>
              <p>Make du'a during the last hour of Friday - this is a special time when du'as are accepted.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Join Us This Friday
            </h3>
            <p className="text-gray-600 mb-6">
              Put these sunnah practices into action! Join us every Friday at 1:20 PM at the Cook Student Center MPR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/rutgersjumuah"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Follow for Reminders
              </a>
              <Link
                to="/kahf-circle"
                className="btn-secondary"
              >
                Learn About Al-Kahf Circle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunnahReminders;

