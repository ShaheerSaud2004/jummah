import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';

const About = () => {
  const highlights = [
    {
      name: 'Gems',
      description: 'Weekly pearls of wisdom and Islamic knowledge shared with our community',
      icon: '💎',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Subtle Sunnah',
      description: 'Learning and practicing the beautiful traditions of our Prophet (PBUH)',
      icon: '🌙',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Community',
      description: 'Building connections and fostering brotherhood/sisterhood among students',
      icon: '🤝',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Al-Kahf Circle',
      description: 'Weekly study circle focusing on Surah Al-Kahf and its timeless lessons',
      icon: '📖',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'BAFTJ',
      description: 'Building a Future Together - Joint initiatives and community collaborations',
      icon: '🏗️',
      color: 'from-red-500 to-pink-500'
    },
    {
      name: 'GoTH',
      description: 'Gems of the Heart - Spiritual development and personal reflection',
      icon: '❤️',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Student Leadership Team',
      role: 'Organizers',
      description: 'Dedicated students who plan and coordinate all Rutgers Jumu\'ah activities and events.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=faces'
    },
    {
      name: 'Community Scholars',
      role: 'Khateebs & Speakers',
      description: 'Local and visiting scholars who share their knowledge and wisdom with our community.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces'
    },
    {
      name: 'Volunteers',
      role: 'Community Support',
      description: 'Amazing volunteers who help make every event and gathering a success.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=faces'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-6">
            About Rutgers Jumu'ah
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Building a vibrant Muslim community at Rutgers University through faith, knowledge, and brotherhood
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="card-rutgers p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
                Our Mission
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Rutgers Jumu'ah is dedicated to fostering a strong, inclusive Muslim community at Rutgers University. 
                We strive to create an environment where students can grow in their faith, build meaningful relationships, 
                and develop leadership skills while maintaining their Islamic values.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our mission is to provide weekly Jumu'ah prayers, educational programs, and community events that 
                strengthen the bonds of brotherhood and sisterhood among Muslim students. We believe in the power 
                of community to support individual growth and collective success.
              </p>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-rutgers-red font-semibold text-center text-lg">
                  "And hold firmly to the rope of Allah all together and do not become divided." 
                  <br />
                  <span className="text-sm font-normal italic">- Quran 3:103</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Our Programs
            </h2>
            <p className="text-gray-600">
              Discover the various programs and initiatives that make our community special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="card hover:shadow-rutgers-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${highlight.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl">{highlight.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3 text-center">
                    {highlight.name}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed text-center">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Our Community
            </h2>
            <p className="text-gray-600">
              Meet the people who make Rutgers Jumu'ah possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card text-center hover:shadow-rutgers-lg transition-shadow duration-200">
                <div className="p-6">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-rutgers-red"
                    size={96}
                  />
                  
                  <h3 className="text-xl font-serif font-bold text-rutgers-red mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-gray-600 font-medium mb-3">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Our Values
            </h2>
            <p className="text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-rutgers p-6 text-center">
              <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">Unity</h3>
              <p className="text-gray-700 text-sm">Building bridges and fostering togetherness</p>
            </div>

            <div className="card-rutgers p-6 text-center">
              <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">Knowledge</h3>
              <p className="text-gray-700 text-sm">Seeking and sharing Islamic wisdom</p>
            </div>

            <div className="card-rutgers p-6 text-center">
              <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">Service</h3>
              <p className="text-gray-700 text-sm">Serving our community and beyond</p>
            </div>

            <div className="card-rutgers p-6 text-center">
              <div className="w-12 h-12 bg-rutgers-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-rutgers-red mb-2">Excellence</h3>
              <p className="text-gray-700 text-sm">Striving for the best in all we do</p>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section>
          <div className="card-rutgers p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-rutgers-red mb-4">
              Join Our Community
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              Whether you're a new student or a returning member, there's always a place for you in our community. 
              Come join us every Friday at 1:20 PM at the Cook Student Center MPR for Jumu'ah prayer and community fellowship.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-rutgers-red mb-2">When</h4>
                <p className="text-gray-700">Every Friday at 1:20 PM</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-rutgers-red mb-2">Where</h4>
                <p className="text-gray-700">Cook Student Center MPR</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-rutgers-red mb-2">Al-Kahf Circle</h4>
                <p className="text-gray-700">12:30 PM (before khutbah)</p>
              </div>
            </div>
            
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
              <Link to="/adab" className="btn-secondary">
                Adab Guidelines
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
