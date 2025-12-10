import React from 'react';
import Footer from '../components/Footer';
import InsuranceQuote from '../components/InsuranceQuote';

const ResultsPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Here are your curated quotes</h1>
        
        <div className="space-y-6">
          <InsuranceQuote 
            company="Allstate" 
            price="$96" 
            details={["Bodily Injury Liability: $100,000", "Property Damage: $50,000", "Medical Payments: $5,000"]}
            setCurrentPage={setCurrentPage}
          />
          <InsuranceQuote 
            company="Progressive" 
            price="$88" 
            details={["Bodily Injury Liability: $100,000", "Property Damage: $50,000", "Medical Payments: $5,000"]}
            setCurrentPage={setCurrentPage}
          />
          <InsuranceQuote 
            company="GEICO" 
            price="$82" 
            details={["Bodily Injury Liability: $100,000", "Property Damage: $50,000", "Medical Payments: $5,000"]}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ResultsPage;


