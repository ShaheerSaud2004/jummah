import React, { useState } from 'react';

const Parking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rutgersId: '',
    vehicleMake: '',
    vehicleModel: '',
    licensePlate: '',
    reason: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would submit to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        rutgersId: '',
        vehicleMake: '',
        vehicleModel: '',
        licensePlate: '',
        reason: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-rutgers-red mb-4">
            Parking Permit Request
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Request a parking permit for Jumu'ah events at Cook Student Center
          </p>
          <div className="w-20 h-1 bg-rutgers-red mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Info Card */}
        <div className="card-rutgers p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-rutgers-red mb-2">Important Information</p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Parking permits are for Rutgers students attending Jumu'ah</li>
                <li>Please submit your request at least 2 days before the event</li>
                <li>You will receive a confirmation email with parking details</li>
                <li>Permits are subject to availability</li>
              </ul>
            </div>
          </div>
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
                Request Submitted!
              </h3>
              <p className="text-gray-600">
                We've received your parking permit request. You'll receive a confirmation email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your full name"
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

              <div>
                <label htmlFor="rutgersId" className="block text-sm font-medium text-gray-700 mb-2">
                  Rutgers ID Number *
                </label>
                <input
                  type="text"
                  id="rutgersId"
                  name="rutgersId"
                  required
                  value={formData.rutgersId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  placeholder="Enter your Rutgers ID"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Make *
                  </label>
                  <input
                    type="text"
                    id="vehicleMake"
                    name="vehicleMake"
                    required
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                    placeholder="e.g., Toyota, Honda"
                  />
                </div>

                <div>
                  <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    required
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                    placeholder="e.g., Camry, Accord"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-2">
                  License Plate Number *
                </label>
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  required
                  value={formData.licensePlate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  placeholder="Enter license plate number"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Request *
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  required
                  rows={4}
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rutgers-red focus:border-transparent"
                  placeholder="Please explain why you need a parking permit (e.g., regular Jumu'ah attendee, special circumstances, etc.)"
                />
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Note:</span> By submitting this form, you agree to follow all parking regulations and understand that permits are subject to availability and approval.
                </p>
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Submit Parking Request
              </button>
            </form>
          )}
        </div>

        {/* Alternative Contact */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">
            Need help or have questions about parking?
          </p>
          <a
            href="mailto:rutgersjumuah@gmail.com?subject=Parking Inquiry"
            className="text-rutgers-red hover:text-rutgers-dark-red font-semibold"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Parking;

