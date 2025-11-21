import React, { useState, useEffect } from 'react';
import { getData } from '../utils/dataManager';
import OptimizedImage from '../components/OptimizedImage';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [khateebs, setKhateebs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'list'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

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

  // Combine events with khateeb info and generate recurring events
  const getAllEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + 2); // Show 2 months ahead

    const allEvents = [];
    const jumuahEvents = events.filter(e => e.type === 'jumuah');
    const specialEvents = events.filter(e => e.type !== 'jumuah');

    // Add special events
    specialEvents.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate >= today && eventDate <= endDate) {
        allEvents.push({
          ...event,
          khateeb: event.khateebId ? khateebs.find(k => k.id === event.khateebId) : null
        });
      }
    });

    // Generate recurring Jumu'ah events for Fridays
    const startDate = new Date(currentDate);
    startDate.setDate(1); // Start of current month
    startDate.setMonth(startDate.getMonth() - 1); // Include previous month
    startDate.setHours(0, 0, 0, 0);

    const endDateCopy = new Date(endDate);
    endDateCopy.setHours(23, 59, 59, 999);

    for (let d = new Date(startDate); d <= endDateCopy; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 5) { // Friday
        const dateStr = d.toISOString().split('T')[0];
        
        // Check if event already exists
        const existingEvent = jumuahEvents.find(e => e.date === dateStr);
        if (existingEvent) {
          // Use existing event with khateeb info
          const khateeb = existingEvent.khateebId 
            ? khateebs.find(k => k.id === existingEvent.khateebId)
            : khateebs.find(k => k.date === dateStr);
          allEvents.push({
            ...existingEvent,
            khateeb: khateeb
          });
        } else {
          // Generate new Jumu'ah event
          const khateeb = khateebs.find(k => k.date === dateStr);
          allEvents.push({
            id: `jumuah-${dateStr}`,
            title: "Jumu'ah Prayer",
            date: dateStr,
            time: "1:20 PM",
            endTime: "2:00 PM",
            type: "jumuah",
            location: "Cook Student Center MPR",
            description: "Weekly Jumu'ah prayer with khutbah",
            khateeb: khateeb,
            kahfCircle: { enabled: true, time: "12:30 PM" }
          });
        }
      }
    }

    return allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const allEvents = getAllEvents();

  // Calendar month view helpers
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return allEvents.filter(e => e.date === dateStr);
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month's trailing days
    const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthEnd - i);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      days.push({ date, isCurrentMonth: true, events: getEventsForDate(date) });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
      days.push({ date, isCurrentMonth: false, events: getEventsForDate(date) });
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white rounded-xl shadow-rutgers border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Week day headers */}
          {weekDays.map(day => (
            <div key={day} className="bg-rutgers-red text-white p-2 text-center text-sm font-semibold">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => {
            const isToday = day.date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`bg-white p-2 min-h-[80px] sm:min-h-[100px] ${
                  !day.isCurrentMonth ? 'text-gray-300' : 'text-gray-900'
                } ${isToday ? 'bg-rutgers-red/5 border-2 border-rutgers-red' : ''}`}
              >
                <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-rutgers-red' : ''}`}>
                  {day.date.getDate()}
                </div>
                <div className="space-y-1">
                  {day.events.slice(0, 2).map((event, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventModal(true);
                      }}
                      className={`w-full text-left text-xs px-2 py-1 rounded truncate touch-manipulation active:scale-95 transition-transform ${
                        event.type === 'jumuah'
                          ? 'bg-rutgers-red text-white hover:bg-rutgers-dark-red'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                      title={event.title}
                    >
                      {event.title}
                    </button>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const today = new Date(currentDate);
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    return (
      <div className="space-y-4">
        {weekDays.map((day, idx) => {
          const dayEvents = getEventsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow-md border-2 overflow-hidden ${
                isToday ? 'border-rutgers-red' : 'border-gray-200'
              }`}
            >
              <div className={`p-3 font-semibold ${
                isToday ? 'bg-rutgers-red text-white' : 'bg-gray-100 text-gray-900'
              }`}>
                {day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
              <div className="p-4 space-y-2">
                {dayEvents.length > 0 ? (
                  dayEvents.map((event, eventIdx) => (
                    <button
                      key={eventIdx}
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventModal(true);
                      }}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-rutgers-red hover:bg-red-50 transition-colors touch-manipulation active:scale-98"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{event.title}</h3>
                          {event.khateeb && (
                            <p className="text-sm text-rutgers-red font-medium">{event.khateeb.name}</p>
                          )}
                          <p className="text-sm text-gray-600">{event.time} • {event.location}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-2">No events</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderListView = () => {
    const upcomingEvents = allEvents.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate >= new Date().setHours(0, 0, 0, 0);
    });

    return (
      <div className="space-y-3">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, idx) => {
            const eventDate = new Date(event.date);
            const isToday = eventDate.toDateString() === new Date().toDateString();
            
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
                className="w-full text-left bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-rutgers-red hover:bg-red-50 p-4 transition-all touch-manipulation active:scale-98"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center ${
                    isToday ? 'bg-rutgers-red text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    <span className="text-xs font-medium">
                      {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-2xl font-bold">{eventDate.getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{event.title}</h3>
                    {event.khateeb && (
                      <p className="text-rutgers-red font-medium mb-2">{event.khateeb.name}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </span>
                      {event.kahfCircle?.enabled && (
                        <span className="flex items-center text-rutgers-red font-medium">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Al-Kahf Circle {event.kahfCircle.time}
                        </span>
                      )}
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p>No upcoming events</p>
          </div>
        )}
      </div>
    );
  };

  const changeMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const exportToGoogleCalendar = (event) => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = event.endTime 
      ? new Date(`${event.date}T${event.endTime}`)
      : new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour default

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const details = [
      event.description || '',
      event.khateeb ? `Khateeb: ${event.khateeb.name}` : '',
      event.location ? `Location: ${event.location}` : '',
      event.kahfCircle?.enabled ? `Al-Kahf Circle: ${event.kahfCircle.time}` : ''
    ].filter(Boolean).join('\\n');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(event.location || '')}`;
    window.open(url, '_blank');
  };

  const exportToICal = (event) => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = event.endTime 
      ? new Date(`${event.date}T${event.endTime}`)
      : new Date(startDate.getTime() + 60 * 60 * 1000);

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const details = [
      event.description || '',
      event.khateeb ? `Khateeb: ${event.khateeb.name}` : '',
      event.location ? `Location: ${event.location}` : ''
    ].filter(Boolean).join('\\n');

    const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rutgers Jumu'ah//EN
BEGIN:VEVENT
UID:${event.id}@rutgersjumuah
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${details}
LOCATION:${event.location || ''}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ical], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Event Calendar
          </h1>
          <p className="text-lg text-gray-600">
            View all Jumu'ah prayers, special events, and community activities
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all min-h-[44px] touch-manipulation active:scale-95 ${
                  viewMode === 'month'
                    ? 'bg-rutgers-red text-white'
                    : 'text-gray-700 hover:text-rutgers-red'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all min-h-[44px] touch-manipulation active:scale-95 ${
                  viewMode === 'week'
                    ? 'bg-rutgers-red text-white'
                    : 'text-gray-700 hover:text-rutgers-red'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all min-h-[44px] touch-manipulation active:scale-95 ${
                  viewMode === 'list'
                    ? 'bg-rutgers-red text-white'
                    : 'text-gray-700 hover:text-rutgers-red'
                }`}
              >
                List
              </button>
            </div>

            {/* Month Navigation (for month view) */}
            {viewMode === 'month' && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95"
                  aria-label="Previous month"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900 min-w-[200px] text-center">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95"
                  aria-label="Next month"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition-colors min-h-[44px] touch-manipulation active:scale-95"
                >
                  Today
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Calendar View */}
        <div className="mb-6">
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'list' && renderListView()}
        </div>

        {/* Export Buttons */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Export events to your calendar</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                const nextEvent = allEvents.find(e => new Date(e.date) >= new Date());
                if (nextEvent) exportToGoogleCalendar(nextEvent);
              }}
              className="btn-secondary min-h-[44px] touch-manipulation"
            >
              <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.36 2.04C18.67 1.94 17.88 2 17 2H7C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-.88-.06-1.67-.16-2.36-.1-.7-.26-1.35-.48-1.6zM17 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7 4h6c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1zm0 16c-1.66 0-3-1.34-3-3V7h14v10c0 1.66-1.34 3-3 3H7z"/>
              </svg>
              Add to Google Calendar
            </button>
            <button
              onClick={() => {
                const nextEvent = allEvents.find(e => new Date(e.date) >= new Date());
                if (nextEvent) exportToICal(nextEvent);
              }}
              className="btn-secondary min-h-[44px] touch-manipulation"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download iCal
            </button>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowEventModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-rutgers-red to-rutgers-dark-red text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold">{selectedEvent.title}</h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors touch-manipulation active:scale-95"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {selectedEvent.khateeb && (
                <div className="flex items-center gap-4 mb-6">
                  {selectedEvent.khateeb.image && (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-rutgers-red">
                      <OptimizedImage
                        src={selectedEvent.khateeb.image}
                        alt={selectedEvent.khateeb.name}
                        className="w-full h-full object-cover"
                        size={80}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-rutgers-red">{selectedEvent.khateeb.name}</h3>
                    <p className="text-gray-600">{selectedEvent.khateeb.title}</p>
                  </div>
                </div>
              )}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-rutgers-red flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-rutgers-red flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-rutgers-red flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{selectedEvent.location}</p>
                  </div>
                </div>
                {selectedEvent.kahfCircle?.enabled && (
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-rutgers-red flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Al-Kahf Circle</p>
                      <p className="font-semibold text-rutgers-red">{selectedEvent.kahfCircle.time}</p>
                    </div>
                  </div>
                )}
              </div>
              {selectedEvent.description && (
                <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => exportToGoogleCalendar(selectedEvent)}
                  className="btn-primary flex-1 min-h-[44px] touch-manipulation"
                >
                  Add to Google Calendar
                </button>
                <button
                  onClick={() => exportToICal(selectedEvent)}
                  className="btn-secondary flex-1 min-h-[44px] touch-manipulation"
                >
                  Download iCal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

