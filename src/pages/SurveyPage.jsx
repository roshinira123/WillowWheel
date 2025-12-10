import React, { useState } from 'react';
import Footer from '../components/Footer';

const SurveyPage = ({ setCurrentPage }) => {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tell us about your drivers</h1>
          <p className="text-gray-600 mb-8">Step {step} of 5</p>
          
          <div className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                  <input type="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Gender</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Marital Status</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option>Select status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                  </select>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Make</label>
                  <input type="text" placeholder="e.g. Toyota" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
                  <input type="text" placeholder="e.g. Camry" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Year</label>
                  <input type="number" placeholder="2024" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Current Insurance Provider</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Years with Current Provider</label>
                  <input type="number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Driving History</label>
                  <textarea rows="4" placeholder="Any accidents or violations?" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Annual Mileage</label>
                  <input type="number" placeholder="e.g. 12000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </>
            )}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-full transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step < 5) {
                    setStep(step + 1);
                  } else {
                    setCurrentPage('results');
                  }
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition-all"
              >
                {step === 5 ? 'Get Quotes' : 'Next'}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SurveyPage;


