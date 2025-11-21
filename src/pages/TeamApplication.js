import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TeamApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rutgersId: '',
    year: '',
    major: '',
    subteam: '',
    experience: '',
    motivation: '',
    availability: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const subteams = [
    { id: 'logistics', name: 'Logistics', description: 'Event setup, coordination, and operations' },
    { id: 'outreach', name: 'Outreach', description: 'Community engagement and social media' },
    { id: 'content', name: 'Content', description: 'Creating educational and inspirational content' },
    { id: 'janitors', name: 'Janitors', description: 'General service and support for the community' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        rutgersId: '',
        year: '',
        major: '',
        subteam: '',
        experience: '',
        motivation: '',
        availability: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Apply to be part of the Rutgers Jumu'ah team and serve the community
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Info about being a Janitor */}
        <div className="card-rutgers p-8 mb-8">
          <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-4 text-center">
            What Does Being a "Janitor" Mean?
          </h2>
          <p className="text-gray-700 leading-relaxed text-center max-w-2xl mx-auto mb-6">
            Being a "Janitor" means serving the community with humility, dedication, and love. 
            It's about recognizing that every role, no matter how small it may seem, is essential 
            to building a thriving Muslim community at Rutgers.
          </p>
          <div className="text-center">
            <Link to="/team" className="btn-secondary">
              Learn More About Our Team
            </Link>
          </div>
        </div>

        {/* Subteams Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {subteams.map((team) => (
            <div key={team.id} className="card p-6">
              <h3 className="text-lg font-serif font-bold text-rutgers-red mb-2">
                {team.name}
              </h3>
              <p className="text-sm text-gray-600">{team.description}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="card-rutgers p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-600">
                Thank you for your interest in joining our team. We'll review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Rutgers Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                    placeholder="your.name@rutgers.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rutgersId" className="block text-sm font-medium text-gray-700 mb-2">
                    Rutgers ID *
                  </label>
                  <input
                    type="text"
                    id="rutgersId"
                    name="rutgersId"
                    required
                    value={formData.rutgersId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year *
                  </label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  >
                    <option value="">Select year</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="graduate">Graduate</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-2">
                  Major/Program *
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  required
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  placeholder="e.g., Computer Science, Biology"
                />
              </div>

              <div>
                <label htmlFor="subteam" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Subteam *
                </label>
                <select
                  id="subteam"
                  name="subteam"
                  required
                  value={formData.subteam}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                >
                  <option value="">Select a subteam</option>
                  {subteams.map((team) => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  placeholder="Tell us about any relevant experience, skills, or involvement in community organizations..."
                />
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to join the team? *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  required
                  rows={4}
                  value={formData.motivation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  placeholder="Share your motivation for joining the Rutgers Jumu'ah team..."
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability *
                </label>
                <textarea
                  id="availability"
                  name="availability"
                  required
                  rows={3}
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  placeholder="What days/times are you typically available? How many hours per week can you commit?"
                />
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Note:</span> Applications are reviewed on a rolling basis. 
                  We appreciate your interest in serving the community and will get back to you as soon as possible.
                </p>
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>

        {/* Contact */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">
            Questions about the application process?
          </p>
          <a
            href="mailto:rutgersjumuah@gmail.com?subject=Team Application Inquiry"
            className="text-rutgers-red hover:text-rutgers-dark-red font-semibold"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamApplication;

