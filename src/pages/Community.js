import React from 'react';
import { Link } from 'react-router-dom';

const Community = () => {
  const forms = [
    {
      id: 1,
      title: 'Treasurer Application',
      description: 'Apply to join the Rutgers Jumu\'ah team as Treasurer for the 2025-2026 academic year.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      link: 'https://forms.google.com/treasurer-application',
      isExternal: true
    },
    {
      id: 2,
      title: 'Rutgers Jumu\'ah Merch Pre-Order Form 2025',
      description: 'Pre-order your Rutgers Jumu\'ah merchandise for the upcoming semester.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      link: 'https://forms.google.com/merch-preorder',
      isExternal: true
    },
    {
      id: 3,
      title: 'Materials Borrow Request Form \'24-\'25',
      description: 'Request to borrow Islamic books, prayer mats, or other materials from our collection.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      link: 'https://forms.google.com/materials-borrow',
      isExternal: true
    },
    {
      id: 4,
      title: 'Announcement/Du\'a Request Form',
      description: 'Submit announcements for the community or request specific du\'as to be shared.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      link: 'https://forms.google.com/announcement-request',
      isExternal: true
    },
    {
      id: 5,
      title: 'Feedback Form',
      description: 'Share your feedback, suggestions, or concerns about Rutgers Jumu\'ah events and activities.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      link: 'https://forms.google.com/feedback',
      isExternal: true
    },
    {
      id: 6,
      title: 'Email Sign-Up Form',
      description: 'Join our email list to receive weekly updates, event announcements, and community news.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: 'https://forms.google.com/email-signup',
      isExternal: true
    },
    {
      id: 7,
      title: 'Khutbah Topic Request Form',
      description: 'Suggest topics for upcoming khutbahs or request specific themes to be addressed.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      link: 'https://forms.google.com/khutbah-topic-request',
      isExternal: true
    },
    {
      id: 8,
      title: 'Parking Permit Request',
      description: 'Request a parking permit for Jumu\'ah events at Cook Student Center.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      link: '/parking',
      isExternal: false
    },
    {
      id: 9,
      title: 'Team Application',
      description: 'Apply to join the Rutgers Jumu\'ah team and serve the community.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      link: '/team-application',
      isExternal: false
    }
  ];

  const programs = [
    {
      name: 'Gems',
      description: 'Weekly pearls of wisdom and Islamic knowledge',
      icon: '💎'
    },
    {
      name: 'Subtle Sunnah',
      description: 'Learning and practicing the beautiful traditions of our Prophet (PBUH)',
      icon: '🌙'
    },
    {
      name: 'Community',
      description: 'Building connections and fostering brotherhood/sisterhood',
      icon: '🤝'
    },
    {
      name: 'Al-Kahf Circle',
      description: 'Weekly study circle focusing on Surah Al-Kahf',
      icon: '📖'
    },
    {
      name: 'BAFTJ',
      description: 'Building a Future Together - Joint initiatives and collaborations',
      icon: '🏗️'
    },
    {
      name: 'GoTH',
      description: 'Gems of the Heart - Spiritual development and reflection',
      icon: '❤️'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Community
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get involved, stay connected, and be part of our growing Rutgers Jumu'ah family
          </p>
        </div>

        {/* Forms Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Forms & Applications
            </h2>
            <p className="text-gray-600">
              Access all our community forms and applications in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div key={form.id} className="card hover:shadow-rutgers-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-rutgers-red rounded-lg flex items-center justify-center text-white mr-4">
                      {form.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-rutgers-red">
                      {form.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {form.description}
                  </p>
                  
                  {form.isExternal ? (
                    <a
                      href={form.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-center block"
                    >
                      Open Form
                    </a>
                  ) : (
                    <Link
                      to={form.link}
                      className="btn-primary w-full text-center block"
                    >
                      Open Form
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Programs Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Our Programs
            </h2>
            <p className="text-gray-600">
              Discover the various programs and initiatives we offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div key={index} className="card-rutgers p-6 text-center">
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">
                  {program.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Media Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-600">
              Follow us on social media for daily updates and community highlights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://instagram.com/rutgersjumuah"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 text-center hover:shadow-rutgers-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.598v1.598h1.598V7.707zm-3.197 1.598c.883 0 1.598.715 1.598 1.598s-.715 1.598-1.598 1.598-1.598-.715-1.598-1.598.715-1.598 1.598-1.598z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">Instagram</h3>
              <p className="text-gray-600 text-sm">@rutgersjumuah</p>
            </a>

            <a
              href="https://facebook.com/rutgersjumuah"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 text-center hover:shadow-rutgers-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">Facebook</h3>
              <p className="text-gray-600 text-sm">Rutgers Jumu'ah</p>
            </a>

            <a
              href="https://youtube.com/@rutgersjumuah"
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 text-center hover:shadow-rutgers-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">YouTube</h3>
              <p className="text-gray-600 text-sm">@rutgersjumuah</p>
            </a>

            <a
              href="mailto:rutgersjumuah@gmail.com"
              className="card p-6 text-center hover:shadow-rutgers-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">Email</h3>
              <p className="text-gray-600 text-sm">rutgersjumuah@gmail.com</p>
            </a>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Quick Links
            </h2>
            <p className="text-gray-600">
              Access important pages and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/kahf-circle" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Al-Kahf Circle</h3>
              <p className="text-sm text-gray-600">Every Friday 12:30 PM</p>
            </Link>

            <Link to="/gems" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Gems</h3>
              <p className="text-sm text-gray-600">Weekly wisdom</p>
            </Link>

            <Link to="/salawaat" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">📿</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Salawaat Series</h3>
              <p className="text-sm text-gray-600">Beautiful salawaat</p>
            </Link>

            <Link to="/team" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Our Team</h3>
              <p className="text-sm text-gray-600">Meet the Janitors</p>
            </Link>

            <Link to="/sunnah-reminders" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">🌙</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Sunnah Reminders</h3>
              <p className="text-sm text-gray-600">Friday practices</p>
            </Link>

            <Link to="/parking" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Parking</h3>
              <p className="text-sm text-gray-600">Request permit</p>
            </Link>

            <Link to="/team-application" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Apply to Team</h3>
              <p className="text-sm text-gray-600">Join us</p>
            </Link>

            <Link to="/adab" className="card p-6 text-center hover:shadow-rutgers-lg transition-all duration-200 group">
              <div className="text-4xl mb-3">🤲</div>
              <h3 className="font-semibold text-rutgers-red group-hover:text-rutgers-dark-red">Adab & Conduct</h3>
              <p className="text-sm text-gray-600">Guidelines</p>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card-rutgers p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-600 mb-6">
              Whether you're a new student or a returning member, there's always a place for you in our community. 
              Come join us every Friday at 1:20 PM at the Cook Student Center MPR! Al-Kahf Circle at 12:30 PM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/rutgersjumuah"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Follow Us
              </a>
              <a
                href="mailto:rutgersjumuah@gmail.com"
                className="btn-secondary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
