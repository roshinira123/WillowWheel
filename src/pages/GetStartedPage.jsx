import React from 'react';
import Footer from '../components/Footer';

const GetStartedPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 pt-24 pb-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Get Started</h1>
          <p className="text-gray-600 mb-8 text-center">Create your account to find the perfect insurance</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('survey')}
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-full transition-all"
            >
              Sign up
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <button onClick={() => setCurrentPage('login')} className="text-purple-600 font-semibold hover:underline">
              Log in here
            </button>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default GetStartedPage;


