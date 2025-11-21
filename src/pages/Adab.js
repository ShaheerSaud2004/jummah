import React from 'react';

const Adab = () => {
  const adabPoints = [
    {
      title: "Respectful Conduct",
      description: "Maintain proper adab (etiquette) in the musalla. This is a sacred space for worship and reflection.",
      icon: "🤲"
    },
    {
      title: "Silence During Khutbah",
      description: "When the khateeb enters and during the khutbah, maintain complete silence. Talking during the khutbah is strongly discouraged and distracts others from the message.",
      icon: "🤫"
    },
    {
      title: "Clean Up After Yourself",
      description: "Please clean up any snack debris, water bottles, or other items. Help keep our space clean and welcoming for everyone.",
      icon: "🧹"
    },
    {
      title: "Arrive on Time",
      description: "Try to arrive before the khateeb enters. Late arrivals can be disruptive to those who are listening to the khutbah.",
      icon: "⏰"
    },
    {
      title: "Respect the Space",
      description: "The musalla is a place of worship. Avoid loud conversations, phone calls, or any behavior that might disturb others in prayer or reflection.",
      icon: "🕌"
    },
    {
      title: "Dress Appropriately",
      description: "Wear clean, modest clothing that is appropriate for a place of worship.",
      icon: "👔"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Adab & Conduct
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guidelines for respectful conduct in the musalla and during Jumu'ah
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Introduction */}
        <div className="card-rutgers p-8 mb-12">
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            The musalla is a sacred space where we come together to worship, learn, and connect with our community. 
            Observing proper adab (etiquette) ensures that everyone can benefit from this blessed gathering. 
            Please review these guidelines and help us maintain a respectful and welcoming environment.
          </p>
        </div>

        {/* Adab Points */}
        <div className="space-y-6 mb-12">
          {adabPoints.map((point, index) => (
            <div key={index} className="card-rutgers p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start">
                <div className="text-4xl mr-4 flex-shrink-0">{point.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="card p-8 bg-red-50 border-2 border-rutgers-red mb-12">
          <div className="flex items-start">
            <svg className="w-8 h-8 text-rutgers-red mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="text-xl font-serif font-bold text-rutgers-red mb-3">
                Special Reminder: Silence During Khutbah
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When the khateeb enters the musalla and begins the khutbah, it is essential to maintain complete silence. 
                This is not just a recommendation—it is a sunnah of the Prophet (peace be upon him). Talking during the 
                khutbah, even in whispers, is discouraged and can prevent others from benefiting from the message.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you need to communicate something urgent, please step outside the musalla. Otherwise, 
                save all conversations for after the prayer is complete.
              </p>
            </div>
          </div>
        </div>

        {/* Cleanliness */}
        <div className="card-rutgers p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold text-rutgers-red mb-4 text-center">
            Keeping Our Space Clean
          </h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              We share this space with many community members. Please help us maintain cleanliness by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Disposing of any food wrappers, water bottles, or trash in the designated bins</li>
              <li>Cleaning up any spills or messes you may create</li>
              <li>Returning any borrowed materials (books, prayer mats, etc.) to their proper places</li>
              <li>Leaving the space as clean as or cleaner than you found it</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Remember: "Cleanliness is half of faith." Taking care of our shared space is an act of worship and 
              respect for the community.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-rutgers-red mb-4">
              Thank You for Your Cooperation
            </h3>
            <p className="text-gray-600 mb-6">
              By observing these guidelines, you help create a welcoming and respectful environment for everyone. 
              Together, we can make every Jumu'ah a meaningful and blessed experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sunnah-reminders"
                className="btn-primary"
              >
                View Sunnah Reminders
              </a>
              <a
                href="/"
                className="btn-secondary"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adab;

