import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5001/api';

const LoginPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.user.token);
      localStorage.setItem('user', JSON.stringify({
        user_id: data.user.user_id,
        email: data.user.email,
        name: data.user.name
      }));

      setSuccess('Login successful! Redirecting...');
      
      // Check if user has completed survey
      const hasSurvey = localStorage.getItem('surveyData');
      
      setTimeout(() => {
        if (hasSurvey) {
          // User has survey data, go to results
          setCurrentPage('results');
        } else {
          // No survey data, redirect to survey
          setCurrentPage('survey');
        }
      }, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 flex items-center pt-24 pb-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome back</h1>
          <p className="text-gray-600 mb-6 text-center">Sign in to continue to WillowWheel</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            New here?{' '}
            <button onClick={() => setCurrentPage('getstarted')} className="text-purple-600 font-semibold hover:underline">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;