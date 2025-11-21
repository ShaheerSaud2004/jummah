import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getData, addItem, updateItem, deleteItem, reorderItems, triggerDataRefresh } from '../../utils/dataManager';
import OptimizedImage from '../../components/OptimizedImage';

const AdminKhateebs = () => {
  const [khateebs, setKhateebs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    title: '',
    bio: '',
    image: '',
    isUpcoming: false
  });
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadKhateebs();
    if (searchParams.get('action') === 'add') {
      setShowForm(true);
    }
  }, [searchParams]);

  const loadKhateebs = () => {
    const data = getData('khateebs');
    setKhateebs(data);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      updateItem('khateebs', editingId, formData);
    } else {
      addItem('khateebs', formData);
    }
    
    triggerDataRefresh();
    loadKhateebs();
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (khateeb) => {
    setFormData(khateeb);
    setEditingId(khateeb.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this khateeb?')) {
      deleteItem('khateebs', id);
      triggerDataRefresh();
      loadKhateebs();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      title: '',
      bio: '',
      image: '',
      isUpcoming: false
    });
    setEditingId(null);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newOrder = [...khateebs];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, removed);

    const ids = newOrder.map(k => k.id);
    reorderItems('khateebs', ids);
    triggerDataRefresh();
    loadKhateebs();
    setDraggedIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="text-rutgers-red hover:text-rutgers-dark-red mb-2 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-serif font-bold text-rutgers-red">Manage Khateebs</h1>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add New Khateeb'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card-rutgers p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-6">
              {editingId ? 'Edit Khateeb' : 'Add New Khateeb'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isUpcoming"
                  checked={formData.isUpcoming}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-rutgers-red border-gray-300 rounded focus:ring-rutgers-red"
                />
                <label className="ml-2 text-sm text-gray-700">Mark as upcoming khateeb</label>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Khateeb' : 'Add Khateeb'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Khateebs List */}
        <div className="space-y-4">
          {khateebs.map((khateeb, index) => (
            <div
              key={khateeb.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className="card p-6 hover:shadow-lg transition-all cursor-move"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-rutgers-red">
                    <OptimizedImage
                      src={khateeb.image}
                      alt={khateeb.name}
                      className="w-full h-full object-cover"
                      size={80}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-rutgers-red mb-1">
                        {khateeb.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{khateeb.title}</p>
                      <p className="text-sm text-gray-700 mb-2">{khateeb.bio}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📅 {new Date(khateeb.date).toLocaleDateString()}</span>
                        {khateeb.isUpcoming && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Upcoming
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(khateeb)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(khateeb.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Drag to reorder
              </div>
            </div>
          ))}
        </div>

        {khateebs.length === 0 && (
          <div className="card p-12 text-center">
            <p className="text-gray-600">No khateebs yet. Add your first khateeb!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminKhateebs;

