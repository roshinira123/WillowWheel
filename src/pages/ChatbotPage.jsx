import React, { useState } from 'react';
import Footer from '../components/Footer';

const ChatbotPage = ({ setCurrentPage }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! How can I help you today?' },
    { type: 'bot', text: 'What factors affect my insurance rates?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { type: 'user', text: trimmed }]);
    setInputValue('');
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach chatbot');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.response || 'Sorry, I did not catch that.' }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to reach the assistant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Your Trusted Insurance Companion</h1>
          <p className="text-gray-600 mb-6 text-center">Ask me anything about your insurance</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              <p>{error}</p>
            </div>
          )}

          <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl ${msg.type === 'user' ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 shadow'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-xs px-4 py-3 rounded-2xl bg-white text-gray-800 shadow">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-yellow-300 hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold px-6 py-3 rounded-full transition-all"
            >
              Send
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentPage('agent')}
            className="bg-white/95 backdrop-blur hover:bg-white text-purple-600 font-semibold px-8 py-3 rounded-full shadow-lg transition-all"
          >
            Connect with an Agent
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ChatbotPage;
