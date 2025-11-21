// Data management utilities for admin panel
// Uses localStorage to persist changes

// Import default data
import khateebsData from '../data/khateebs.json';
import weeklyContentData from '../data/weeklyContent.json';
import gemsData from '../data/gems.json';
import salawaatData from '../data/salawaat.json';
import kahfCircleData from '../data/kahfCircle.json';
import livestreamData from '../data/livestream.json';
import teamData from '../data/team.json';
import sunnahRemindersData from '../data/sunnahReminders.json';

const DATA_KEYS = {
  khateebs: 'jummah_khateebs',
  weeklyContent: 'jummah_weekly_content',
  gems: 'jummah_gems',
  salawaat: 'jummah_salawaat',
  kahfCircle: 'jummah_kahf_circle',
  livestream: 'jummah_livestream',
  team: 'jummah_team',
  sunnahReminders: 'jummah_sunnah_reminders'
};

const defaultData = {
  khateebs: khateebsData,
  weeklyContent: weeklyContentData,
  gems: gemsData,
  salawaat: salawaatData,
  kahfCircle: kahfCircleData,
  livestream: livestreamData,
  team: teamData,
  sunnahReminders: sunnahRemindersData
};

// Initialize data in localStorage if not present
export const initializeData = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  
  Object.keys(DATA_KEYS).forEach(key => {
    if (!localStorage.getItem(DATA_KEYS[key])) {
      localStorage.setItem(DATA_KEYS[key], JSON.stringify(defaultData[key]));
    }
  });
};

// Get data from localStorage or default
export const getData = (dataType) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return defaultData[dataType];
  }
  
  const stored = localStorage.getItem(DATA_KEYS[dataType]);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultData[dataType];
    }
  }
  return defaultData[dataType];
};

// Save data to localStorage
export const saveData = (dataType, data) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  
  try {
    localStorage.setItem(DATA_KEYS[dataType], JSON.stringify(data));
    // Trigger refresh event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dataUpdated'));
    }
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Add new item to data array
export const addItem = (dataType, item) => {
  const data = getData(dataType);
  if (Array.isArray(data)) {
    // Generate new ID
    const maxId = data.length > 0 ? Math.max(...data.map(d => d.id || 0)) : 0;
    const newItem = { ...item, id: maxId + 1 };
    const newData = [...data, newItem];
    saveData(dataType, newData);
    return newItem;
  }
  return null;
};

// Update item in data array
export const updateItem = (dataType, id, updates) => {
  const data = getData(dataType);
  if (Array.isArray(data)) {
    const newData = data.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    saveData(dataType, newData);
    return newData.find(item => item.id === id);
  }
  return null;
};

// Delete item from data array
export const deleteItem = (dataType, id) => {
  const data = getData(dataType);
  if (Array.isArray(data)) {
    const newData = data.filter(item => item.id !== id);
    saveData(dataType, newData);
    return true;
  }
  return false;
};

// Reorder items in data array
export const reorderItems = (dataType, newOrder) => {
  const data = getData(dataType);
  if (Array.isArray(data)) {
    const reorderedData = newOrder.map(id => 
      data.find(item => item.id === id)
    ).filter(Boolean);
    saveData(dataType, reorderedData);
    return true;
  }
  return false;
};

// Update single object data (like livestream)
export const updateObjectData = (dataType, updates) => {
  const data = getData(dataType);
  if (typeof data === 'object' && !Array.isArray(data)) {
    const newData = { ...data, ...updates };
    saveData(dataType, newData);
    return newData;
  }
  return null;
};

// Reset data to defaults
export const resetData = (dataType) => {
  localStorage.removeItem(DATA_KEYS[dataType]);
  return getData(dataType);
};

// Initialize on import
if (typeof window !== 'undefined') {
  initializeData();
}

// Export a function to trigger data refresh in components
export const triggerDataRefresh = () => {
  // Dispatch a custom event that components can listen to
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('dataUpdated'));
  }
};

