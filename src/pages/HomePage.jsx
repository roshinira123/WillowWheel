import React from 'react';
import Navigation from '../components/Navigation';

const imgStress = "https://www.figma.com/api/mcp/asset/14c69bdc-1a38-4d69-8bc7-40cc8ae39b60";
const imgHandling = "https://www.figma.com/api/mcp/asset/276813fa-a923-4098-b7fd-088ca1dc9ce6";
const imgMerged = "https://www.figma.com/api/mcp/asset/843714c0-fb9c-480a-b761-f404df1ccf35";
const imgCar1 = "https://www.figma.com/api/mcp/asset/613c6fda-2a8d-44f0-86ed-39952064d9cd";

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#b55cf5] via-[#9b76ff] to-[#6fa7ff] pb-20">
        <Navigation
          currentPage="home"
          setCurrentPage={setCurrentPage}
          mobileMenuOpen={false}
          setMobileMenuOpen={() => {}}
        />

        <div className="max-w-6xl mx-auto px-6 pt-32 text-center text-white">
          <h1 className="text-[72px] md:text-[96px] leading-tight font-semibold">WillowWheel</h1>
          <p className="mt-2 text-xl md:text-2xl font-medium">Insure your Car, Insure your Life</p>

          <div className="mt-10 text-left max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold">Find the right car insurance for you</h2>
            <p className="mt-3 text-lg text-white/90">
              Join countless other happy customers and get started on your willow wheel journey now!
            </p>
          </div>

          <div className="mt-10">
            <button
              onClick={() => setCurrentPage('getstarted')}
              className="bg-gradient-to-r from-[#dbe96c] to-[#c7e55c] text-[#1f2041] text-2xl font-semibold px-10 py-4 rounded-full shadow-lg hover:brightness-105 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h3 className="text-4xl md:text-5xl font-semibold text-[#1e1e1e] mb-6">Willow Wheel’s Mission</h3>
          <p className="text-lg md:text-xl text-[#1e1e1e] leading-8">
            WillowWheel’s mission is to make auto insurance easier to understand, more transparent, and less stressful for everyone,
            especially new and young drivers. We aim to empower users with clear, unbiased information, personalized recommendations,
            and education-first tools that build confidence before decisions are made. By prioritizing clarity, fairness, and user
            control, WillowWheel helps people choose coverage that truly fits their needs without pressure or confusion.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <img src={imgStress} alt="Helping users feel confident" className="w-36 h-36 object-contain" />
              <p className="text-base text-[#1e1e1e] leading-6">Helping users feel confident, not overwhelmed.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <img src={imgHandling} alt="Clear information" className="w-36 h-36 object-contain" />
              <p className="text-base text-[#1e1e1e] leading-6">Clear information without hidden agendas.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <img src={imgMerged} alt="Trust through transparency" className="w-36 h-36 object-contain" />
              <p className="text-base text-[#1e1e1e] leading-6">Trust built through transparency, not pressure.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <img src={imgCar1} alt="Insurance for real life" className="w-36 h-36 object-contain" />
              <p className="text-base text-[#1e1e1e] leading-6">Insurance designed for real drivers and real life.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-[#b55cf5] via-[#9b76ff] to-[#6fa7ff] py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-white space-y-2">
          <div className="font-brand text-[48px] leading-none">ww</div>
          <p className="text-lg">
            2025 Made with <span role="img" aria-label="heart">❤️</span> by Team Car Insurance
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


