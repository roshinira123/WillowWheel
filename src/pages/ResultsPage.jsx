import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import InsuranceQuote from '../components/InsuranceQuote';

const ResultsPage = ({ setCurrentPage, surveyData }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      if (!surveyData) {
        setError('No survey data available');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://localhost:5001/api/quotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(surveyData),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }

        const data = await response.json();
        setQuotes(data.quotes || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching quotes:', err);
        setError('Failed to load quotes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [surveyData]);

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
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && quotes.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center">
            <p className="text-gray-600">No quotes available. Please complete the survey again.</p>
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


