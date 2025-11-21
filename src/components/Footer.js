import React from 'react';
import logoImage from '../assets/logo.jpg';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/rutgersjumuah',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281h-1.598v1.598h1.598V7.707zm-3.197 1.598c.883 0 1.598.715 1.598 1.598s-.715 1.598-1.598 1.598-1.598-.715-1.598-1.598.715-1.598 1.598-1.598z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/rutgersjumuah',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@rutgersjumuah',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      href: 'mailto:rutgersjumuah@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-rutgers-red text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img 
                  src={logoImage} 
                  alt="Rutgers Jumu'ah Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">JUMU'AH</h3>
                <p className="text-sm opacity-90">at Rutgers</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Stories from your Rutgers Jumu'ah Community. Join us every Friday at 1:20 pm at the Cook Student Center MPR!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/khateebs" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Khateebs</a></li>
              <li><a href="/kahf-circle" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Al-Kahf Circle</a></li>
              <li><a href="/gems" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Gems</a></li>
              <li><a href="/salawaat" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Salawaat Series</a></li>
              <li><a href="/community" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Community</a></li>
              <li><a href="/team" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Team</a></li>
              <li><a href="/hoj" className="text-sm opacity-90 hover:opacity-100 transition-opacity">HOJ</a></li>
              <li><a href="/about" className="text-sm opacity-90 hover:opacity-100 transition-opacity">About</a></li>
              <li><a href="/admin/login" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Admin</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-90">
              © 2025 Rutgers Jumu'ah • Built for the community.
            </p>
            <p className="text-sm opacity-90 mt-2 md:mt-0">
              Cook Student Center MPR • Every Friday at 1:20 PM
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
