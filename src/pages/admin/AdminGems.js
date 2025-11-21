import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getData, addItem, updateItem, deleteItem, triggerDataRefresh } from '../../utils/dataManager';

const AdminGems = () => {
  const [gems, setGems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Community Team'
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadGems();
    if (searchParams.get('action') === 'add') {
      setShowForm(true);
    }
  }, [searchParams]);

  const loadGems = () => setGems(getData('gems'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateItem('gems', editingId, formData);
    } else {
      addItem('gems', formData);
    }
    triggerDataRefresh();
    loadGems();
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (gem) => {
    setFormData(gem);
    setEditingId(gem.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this gem?')) {
      deleteItem('gems', id);
      triggerDataRefresh();
      loadGems();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], author: 'Community Team' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button onClick={() => navigate('/admin')} className="text-rutgers-red hover:text-rutgers-dark-red mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-serif font-bold text-rutgers-red">Manage Gems</h1>
          </div>
          <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="btn-primary">
            {showForm ? 'Cancel' : '+ Add Gem'}
          </button>
        </div>

        {showForm && (
          <div className="card-rutgers p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-6">{editingId ? 'Edit Gem' : 'Add New Gem'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea name="content" value={formData.content} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red" />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add Gem'}</button>
                <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {gems.map((gem) => (
            <div key={gem.id} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💎</span>
                    <h3 className="text-xl font-serif font-bold text-rutgers-red">{gem.title}</h3>
                    <span className="text-sm text-gray-500">{new Date(gem.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{gem.content}</p>
                  <p className="text-sm text-gray-600">— {gem.author}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(gem)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(gem.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGems;

