import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import InsuranceQuote from '../components/InsuranceQuote';

const ResultsPage = ({ setCurrentPage, surveyData }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      // Get survey data from props or localStorage
      const data = surveyData || JSON.parse(localStorage.getItem('surveyData') || 'null');
      
      if (!data) {
        setError('No survey data available');
        setLoading(false);
        return;
      }

      // ⭐ Get authentication token from localStorage
      const token = localStorage.getItem('token');
      
      // Check if user is logged in
      if (!token) {
        setError('Please log in to view quotes');
        setLoading(false);
        // Optionally redirect to login
        // setCurrentPage('login');
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching quotes with token:', token ? 'Present' : 'Missing');
        console.log('Survey data:', data);
        
        const response = await fetch('http://localhost:5001/api/quotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // ⭐ Add Authorization header
          },
          body: JSON.stringify(data),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 401) {
            throw new Error('Your session has expired. Please log in again.');
          } else if (response.status === 403) {
            throw new Error('Access denied. Please check your credentials.');
          }
          throw new Error(`Failed to fetch quotes (${response.status})`);
        }

        const result = await response.json();
        console.log('Quotes received:', result);
        
        setQuotes(result.quotes || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching quotes:', err);
        setError(err.message || 'Failed to load quotes. Please try again.');
        
        // If authentication error, redirect to login
        if (err.message.includes('session has expired') || err.message.includes('log in')) {
          setTimeout(() => {
            setCurrentPage('login');
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [surveyData, setCurrentPage]);

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const formatCoverageDetails = (coverage) => {
    return [
      `Bodily Injury Liability: ${coverage.bodily_injury}`,
      `Property Damage: ${coverage.property_damage}`,
      `Medical Payments: ${coverage.medical_payments}`
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Here are your curated quotes</h1>
        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4 text-lg">Generating personalized quotes with AI...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
            {error.includes('log in') && (
              <button 
                onClick={() => setCurrentPage('login')}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Go to Login
              </button>
            )}
          </div>
        )}

        {!loading && !error && quotes.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center">
            <p className="text-gray-600 mb-4">No quotes available. Please complete the survey again.</p>
            <button 
              onClick={() => setCurrentPage('survey')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"
            >
              Return to Survey
            </button>
          </div>
        )}

        {!loading && !error && quotes.length > 0 && (
          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <InsuranceQuote 
                key={index}
                company={quote.provider} 
                price={formatPrice(quote.monthly_price)} 
                details={formatCoverageDetails(quote.coverage)}
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default ResultsPage;