import React from 'react';

const InsuranceQuote = ({ company, price, details, setCurrentPage }) => {
  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{company}</h3>
          <p className="text-sm text-gray-600 mt-1">Policy Overview</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-purple-600">{price}</p>
          <p className="text-sm text-gray-600">/mo</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {details.map((detail, idx) => (
          <p key={idx} className="text-sm text-gray-600">{detail}</p>
        ))}
      </div>
      <div>
        <button 
          onClick={() => setCurrentPage('chatbot')}
          className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-full transition-all"
        >
          View Policy
        </button>
      </div>
    </div>
  );
};

export default InsuranceQuote;

