import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/dataManager';

const UpcomingEventsWidget = () => {
  const [events, setEvents] = useState([]);
  const [khateebs, setKhateebs] = useState([]);
  const [nextJumuah, setNextJumuah] = useState(null);
  const [daysUntil, setDaysUntil] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const eventsData = getData('events');
      const khateebsData = getData('khateebs');
      setEvents(eventsData || []);
      setKhateebs(khateebsData || []);
    };

    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  useEffect(() => {
    // Find next Jumu'ah and calculate days until
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all Jumu'ah events and upcoming khateebs
    const jumuahEvents = events.filter(e => e.type === 'jumuah');
    const upcomingKhateebs = khateebs.filter(k => k.isUpcoming);

    // Combine events with khateeb info
    const allEvents = jumuahEvents.map(event => {
      const khateeb = event.khateebId 
        ? khateebs.find(k => k.id === event.khateebId)
        : upcomingKhateebs.find(k => k.date === event.date);
      
      return {
        ...event,
        khateeb: khateeb
      };
    });

    // Add khateeb dates that aren't in events
    upcomingKhateebs.forEach(khateeb => {
      const exists = allEvents.some(e => e.date === khateeb.date);
      if (!exists) {
        allEvents.push({
          id: `khateeb-${khateeb.id}`,
          title: "Jumu'ah Prayer",
          date: khateeb.date,
          time: "1:20 PM",
          type: "jumuah",
          location: "Cook Student Center MPR",
          khateeb: khateeb,
          kahfCircle: { enabled: true, time: "12:30 PM" }
        });
      }
    });

    // Sort by date and find next upcoming
    const sortedEvents = allEvents
      .filter(e => {
        const eventDate = new Date(e.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    if (sortedEvents.length > 0) {
      const next = sortedEvents[0];
      setNextJumuah(next);
      
      const nextDate = new Date(next.date);
      const diffTime = nextDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntil(diffDays);
    }

    setEvents(sortedEvents);
  }, [events, khateebs]);


  return (
    <div className="bg-white rounded-xl shadow-rutgers border-2 border-rutgers-red overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-rutgers-red to-rutgers-dark-red text-white p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold">Upcoming Events</h2>
              {nextJumuah && daysUntil >= 0 && (
                <p className="text-sm opacity-90">
                  Next Jumu'ah in {daysUntil === 0 ? 'today' : daysUntil === 1 ? 'tomorrow' : `${daysUntil} days`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="p-4 sm:p-6">
        {events.length > 0 ? (
          <div className="space-y-3 mb-4">
            {events.slice(0, 5).map((event, index) => (
              <div
                key={event.id || index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-rutgers-red/10 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-rutgers-red">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {event.title}
                  </h3>
                  {event.khateeb && (
                    <p className="text-sm text-rutgers-red font-medium">
                      {event.khateeb.name}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </span>
                    {event.kahfCircle?.enabled && (
                      <span className="flex items-center text-rutgers-red">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Al-Kahf {event.kahfCircle.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No upcoming events scheduled</p>
          </div>
        )}

        {/* View Full Calendar Button */}
        <Link
          to="/calendar"
          className="block w-full text-center btn-primary mt-4 min-h-[44px] flex items-center justify-center touch-manipulation"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          View Full Calendar
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEventsWidget;

