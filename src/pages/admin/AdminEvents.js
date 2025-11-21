import React, { useState, useEffect } from 'react';
import { getData, addItem, updateItem, deleteItem, saveData, triggerDataRefresh } from '../../utils/dataManager';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [khateebs, setKhateebs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '1:20 PM',
    endTime: '2:00 PM',
    type: 'jumuah',
    khateebId: '',
    location: 'Cook Student Center MPR',
    description: '',
    isRecurring: false,
    recurrence: 'weekly',
    recurrenceDay: 5,
    kahfCircle: {
      enabled: true,
      time: '12:30 PM'
    }
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadData = () => {
      setEvents(getData('events'));
      setKhateebs(getData('khateebs'));
    };
    
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('kahfCircle.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        kahfCircle: {
          ...prev.kahfCircle,
          [field]: field === 'enabled' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '1:20 PM',
      endTime: '2:00 PM',
      type: 'jumuah',
      khateebId: '',
      location: 'Cook Student Center MPR',
      description: '',
      isRecurring: false,
      recurrence: 'weekly',
      recurrenceDay: 5,
      kahfCircle: {
        enabled: true,
        time: '12:30 PM'
      }
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      khateebId: formData.khateebId ? parseInt(formData.khateebId) : null
    };

    if (editingId) {
      updateItem('events', editingId, eventData);
    } else {
      addItem('events', eventData);
    }
    
    triggerDataRefresh();
    resetForm();
  };

  const handleEdit = (event) => {
    setFormData({
      ...event,
      khateebId: event.khateebId || ''
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteItem('events', id);
      triggerDataRefresh();
    }
  };

  // Auto-generate Jumu'ah events from khateebs
  const generateJumuahEvents = () => {
    const upcomingKhateebs = khateebs.filter(k => k.isUpcoming);
    const existingEvents = getData('events');
    const newEvents = [];

    upcomingKhateebs.forEach(khateeb => {
      const exists = existingEvents.some(e => e.date === khateeb.date && e.type === 'jumuah');
      if (!exists) {
        newEvents.push({
          title: "Jumu'ah Prayer",
          date: khateeb.date,
          time: '1:20 PM',
          endTime: '2:00 PM',
          type: 'jumuah',
          khateebId: khateeb.id,
          location: 'Cook Student Center MPR',
          description: 'Weekly Jumu\'ah prayer with khutbah',
          kahfCircle: {
            enabled: true,
            time: '12:30 PM'
          }
        });
      }
    });

    if (newEvents.length > 0) {
      const currentEvents = getData('events');
      saveData('events', [...currentEvents, ...newEvents]);
      triggerDataRefresh();
      alert(`Generated ${newEvents.length} Jumu'ah events from upcoming khateebs`);
    } else {
      alert('No new events to generate. All khateeb dates already have events.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-rutgers-red mb-6">Manage Events</h1>

        {/* Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { resetForm(); setShowForm(!showForm); }}
              className="btn-primary min-h-[44px] touch-manipulation"
            >
              {showForm ? 'Cancel' : 'Add New Event'}
            </button>
            <button
              onClick={generateJumuahEvents}
              className="btn-secondary min-h-[44px] touch-manipulation"
            >
              Generate from Khateebs
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingId ? 'Edit Event' : 'Add New Event'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                  >
                    <option value="jumuah">Jumu'ah Prayer</option>
                    <option value="special">Special Event</option>
                    <option value="ramadan">Ramadan</option>
                    <option value="eid">Eid</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Khateeb (Optional)</label>
                  <select
                    name="khateebId"
                    value={formData.khateebId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                  >
                    <option value="">Select Khateeb</option>
                    {khateebs.map(khateeb => (
                      <option key={khateeb.id} value={khateeb.id}>
                        {khateeb.name} - {new Date(khateeb.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="1:20 PM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="text"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    placeholder="2:00 PM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                  />
                </div>
              </div>

              {/* Al-Kahf Circle Settings */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Al-Kahf Circle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="kahfCircle.enabled"
                      checked={formData.kahfCircle.enabled}
                      onChange={handleChange}
                      className="w-5 h-5 text-rutgers-red border-gray-300 rounded focus:ring-rutgers-red"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Enable Al-Kahf Circle</label>
                  </div>
                  {formData.kahfCircle.enabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Al-Kahf Circle Time</label>
                      <input
                        type="text"
                        name="kahfCircle.time"
                        value={formData.kahfCircle.time}
                        onChange={handleChange}
                        placeholder="12:30 PM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rutgers-red min-h-[44px]"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary min-h-[44px] touch-manipulation">
                  {editingId ? 'Update Event' : 'Add Event'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary min-h-[44px] touch-manipulation">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Events</h2>
          <div className="space-y-4">
            {events.length > 0 ? (
              events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event) => {
                  const khateeb = event.khateebId ? khateebs.find(k => k.id === event.khateebId) : null;
                  return (
                    <div
                      key={event.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 gap-4"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-rutgers-red">{event.title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} • {event.time}
                        </p>
                        {khateeb && (
                          <p className="text-sm text-gray-600">Khateeb: {khateeb.name}</p>
                        )}
                        <p className="text-sm text-gray-600">Location: {event.location}</p>
                        <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                          event.type === 'jumuah' ? 'bg-rutgers-red text-white' :
                          event.type === 'special' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors min-h-[44px] touch-manipulation active:scale-95"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors min-h-[44px] touch-manipulation active:scale-95"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-gray-500 text-center py-8">No events yet. Add your first event above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;

