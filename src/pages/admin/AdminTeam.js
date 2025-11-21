import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, saveData, triggerDataRefresh } from '../../utils/dataManager';

const AdminTeam = () => {
  const [teamData, setTeamData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData('team');
    setTeamData(data);
  }, []);

  const handleSave = () => {
    saveData('team', teamData);
    triggerDataRefresh();
    alert('Team data saved successfully!');
  };

  const handleSubteamChange = (subteamId, field, value) => {
    setTeamData(prev => ({
      ...prev,
      subteams: prev.subteams.map(subteam =>
        subteam.id === subteamId ? { ...subteam, [field]: value } : subteam
      )
    }));
  };

  const handleMemberChange = (subteamId, memberIndex, field, value) => {
    setTeamData(prev => ({
      ...prev,
      subteams: prev.subteams.map(subteam =>
        subteam.id === subteamId
          ? {
              ...subteam,
              members: subteam.members.map((member, idx) =>
                idx === memberIndex ? { ...member, [field]: value } : member
              )
            }
          : subteam
      )
    }));
  };

  const addMember = (subteamId) => {
    setTeamData(prev => ({
      ...prev,
      subteams: prev.subteams.map(subteam =>
        subteam.id === subteamId
          ? {
              ...subteam,
              members: [...subteam.members, { name: '', role: '', quote: '', image: '' }]
            }
          : subteam
      )
    }));
  };

  const removeMember = (subteamId, memberIndex) => {
    if (window.confirm('Remove this team member?')) {
      setTeamData(prev => ({
        ...prev,
        subteams: prev.subteams.map(subteam =>
          subteam.id === subteamId
            ? {
                ...subteam,
                members: subteam.members.filter((_, idx) => idx !== memberIndex)
              }
            : subteam
        )
      }));
    }
  };

  const handleMissionChange = (value) => {
    setTeamData(prev => ({ ...prev, mission: value }));
  };

  if (!teamData) return <div>Loading...</div>;

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
            <h1 className="text-4xl font-serif font-bold text-rutgers-red">Manage Team</h1>
          </div>
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
        </div>

        <div className="card-rutgers p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-4">Mission Statement</h2>
          <textarea
            value={teamData.mission}
            onChange={(e) => handleMissionChange(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
          />
        </div>

        <div className="space-y-6">
          {teamData.subteams.map((subteam) => (
            <div key={subteam.id} className="card p-6">
              <div className="mb-4">
                <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-2">{subteam.name}</h3>
                <input
                  type="text"
                  value={subteam.description}
                  onChange={(e) => handleSubteamChange(subteam.id, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                  placeholder="Subteam description"
                />
              </div>

              <div className="space-y-4">
                {subteam.members.map((member, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(subteam.id, idx, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleMemberChange(subteam.id, idx, 'role', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                        placeholder="Role"
                      />
                    </div>
                    <textarea
                      value={member.quote}
                      onChange={(e) => handleMemberChange(subteam.id, idx, 'quote', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red mb-2"
                      placeholder="Quote"
                      rows={2}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={member.image}
                        onChange={(e) => handleMemberChange(subteam.id, idx, 'image', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red"
                        placeholder="Image URL"
                      />
                      <button
                        onClick={() => removeMember(subteam.id, idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addMember(subteam.id)}
                  className="text-rutgers-red hover:text-rutgers-dark-red font-semibold flex items-center"
                >
                  + Add Member
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTeam;

