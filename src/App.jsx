import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import GetStartedPage from './pages/GetStartedPage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import ChatbotPage from './pages/ChatbotPage';
import AgentPage from './pages/AgentPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {currentPage !== 'home' && (
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'getstarted' && <GetStartedPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'survey' && <SurveyPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'results' && <ResultsPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'chatbot' && <ChatbotPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'agent' && <AgentPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'profile' && <ProfilePage />}
    </div>
  );
};

export default App;


