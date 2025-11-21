import React from 'react';
import { Link } from 'react-router-dom';

const HOJ = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            House of Jumu'ah (HOJ)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A dedicated space for the Rutgers Jumu'ah community
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* About Section */}
          <section className="card-rutgers p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-6 text-center">
              Welcome to the House of Jumu'ah
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                The House of Jumu'ah (HOJ) is more than just a physical space—it's a community, 
                a family, and a home for Muslim students at Rutgers University. It represents our 
                commitment to building a vibrant, inclusive, and supportive Muslim community on campus.
              </p>
              <p>
                HOJ serves as the heart of our weekly Jumu'ah gatherings and various community activities. 
                It's where we come together to pray, learn, grow, and strengthen our bonds of brotherhood 
                and sisterhood.
              </p>
              <div className="bg-red-50 border-l-4 border-rutgers-red p-6 rounded mt-8">
                <p className="font-semibold text-rutgers-red mb-2">Our Vision</p>
                <p className="text-gray-700">
                  To create a welcoming space where every Muslim student feels at home, where faith is 
                  nurtured, knowledge is shared, and lasting friendships are formed.
                </p>
              </div>
            </div>
          </section>

          {/* What We Offer */}
          <section className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-8 text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2">
                  Weekly Jumu'ah
                </h3>
                <p className="text-gray-600">
                  Join us every Friday at 1:20 PM for prayer, khutbah, and community fellowship.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2">
                  Educational Programs
                </h3>
                <p className="text-gray-600">
                  Al-Kahf Circle, Gems, Salawaat Series, and other learning opportunities.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2">
                  Community Events
                </h3>
                <p className="text-gray-600">
                  Social gatherings, workshops, and special events throughout the year.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2">
                  Support & Resources
                </h3>
                <p className="text-gray-600">
                  Materials, books, prayer spaces, and a supportive community network.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="card-rutgers p-8 mb-12">
            <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-6 text-center">
              Explore HOJ Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/kahf-circle" className="card p-6 hover:shadow-rutgers-lg transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">📖</div>
                  <div>
                    <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Al-Kahf Circle</h3>
                    <p className="text-sm text-gray-600">Every Friday at 12:30 PM</p>
                  </div>
                </div>
              </Link>

              <Link to="/gems" className="card p-6 hover:shadow-rutgers-lg transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">💎</div>
                  <div>
                    <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Gems</h3>
                    <p className="text-sm text-gray-600">Weekly pearls of wisdom</p>
                  </div>
                </div>
              </Link>

              <Link to="/salawaat" className="card p-6 hover:shadow-rutgers-lg transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">📿</div>
                  <div>
                    <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Salawaat Series</h3>
                    <p className="text-sm text-gray-600">Beautiful forms of salawaat</p>
                  </div>
                </div>
              </Link>

              <Link to="/sunnah-reminders" className="card p-6 hover:shadow-rutgers-lg transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🌙</div>
                  <div>
                    <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Sunnah Reminders</h3>
                    <p className="text-sm text-gray-600">Friday practices</p>
                  </div>
                </div>
              </Link>

              <Link to="/adab" className="card p-6 hover:shadow-rutgers-lg transition-all duration-200 group">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🤲</div>
                  <div>
                    <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Adab & Conduct</h3>
                    <p className="text-sm text-gray-600">Guidelines</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <div className="card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
                Join the House of Jumu'ah
              </h3>
              <p className="text-gray-600 mb-6">
                Whether you're new to Rutgers or a returning student, you're always welcome at HOJ. 
                Come join us every Friday and be part of our growing community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="btn-primary">
                  Learn More
                </Link>
                <a
                  href="https://instagram.com/rutgersjumuah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Follow Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOJ;

