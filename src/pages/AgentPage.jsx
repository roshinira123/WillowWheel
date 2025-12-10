import React from 'react';
import Footer from '../components/Footer';

const AgentPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            A
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Connect with one of our expert agents</h1>
          <p className="text-gray-600 mb-8">Get personalized help from our insurance professionals</p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <label className="block text-gray-700 font-medium mb-3 text-left">What do you need help with?</label>
            <textarea
              rows="4"
              placeholder="Describe your question or concern..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>
          </div>
          <button
            onClick={() => setCurrentPage('profile')}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-full transition-all mb-4"
          >
            Connect with an Agent
          </button>
          <p className="text-sm text-gray-500">Average response time: 2 minutes</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AgentPage;


