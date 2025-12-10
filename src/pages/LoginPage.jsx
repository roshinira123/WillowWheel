import React from 'react';

const LoginPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 flex items-center pt-24 pb-16">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome back</h1>
          <p className="text-gray-600 mb-6 text-center">Sign in to continue to WillowWheel</p>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCurrentPage('results'); }}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-full transition-all"
            >
              Sign in
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            New here?{' '}
            <button onClick={() => setCurrentPage('getstarted')} className="text-purple-600 font-semibold hover:underline">
              Create an account
            </button>
          </p>
        </div>
        {/* Intentionally no WW box/footer here (keeps login simple) */}
      </div>
    </div>
  );
};

export default LoginPage;


