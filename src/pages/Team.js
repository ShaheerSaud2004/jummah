import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../utils/dataManager';
import OptimizedImage from '../components/OptimizedImage';

const Team = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const loadData = () => setTeamData(getData('team'));
    loadData();
    window.addEventListener('dataUpdated', loadData);
    return () => window.removeEventListener('dataUpdated', loadData);
  }, []);

  if (!teamData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Meet the dedicated "Janitors" who serve the Rutgers Jumu'ah community
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mb-8 rounded-full"></div>
          
          {/* Mission Statement */}
          <div className="max-w-3xl mx-auto card-rutgers p-8 mb-12">
            <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              What Does Being a "Janitor" Mean?
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {teamData.mission}
            </p>
          </div>
        </div>

        {/* Subteams */}
        {teamData.subteams.map((subteam) => (
          <section key={subteam.id} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-3">
                {subteam.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {subteam.description}
              </p>
              <div className="w-16 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subteam.members.map((member, index) => (
                <div key={index} className="card-rutgers p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-rutgers-red shadow-lg mx-auto">
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        size={128}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-gray-600 font-medium mb-4">
                    {member.role}
                  </p>
                  
                  {member.quote && (
                    <div className="bg-red-50 border-l-4 border-rutgers-red p-4 rounded">
                      <p className="text-gray-700 italic text-sm leading-relaxed">
                        "{member.quote}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card-rutgers p-8 md:p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              We're always looking for dedicated individuals who want to serve the community. 
              Whether you're interested in logistics, outreach, content creation, or general service, 
              there's a place for you on our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/team-application" className="btn-primary">
                Apply Now
              </Link>
              <a
                href="mailto:rutgersjumuah@gmail.com?subject=Team Inquiry"
                className="btn-secondary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-rutgers-red mb-2">Service</h3>
            <p className="text-sm text-gray-600">Serving with humility</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-rutgers-red mb-2">Community</h3>
            <p className="text-sm text-gray-600">Building together</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-rutgers-red mb-2">Excellence</h3>
            <p className="text-sm text-gray-600">Striving for the best</p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-rutgers-red mb-2">Dedication</h3>
            <p className="text-sm text-gray-600">Committed to the cause</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

