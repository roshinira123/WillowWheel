import React from 'react';

const LoginPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b55cf5] via-[#9b76ff] to-[#6fa7ff] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-12">
        <div className="text-center space-y-10 w-full max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold">Welcome Back</h1>

          <div className="space-y-4">
            <div className="w-full max-w-xl mx-auto">
              <input
                type="email"
                placeholder="email*"
                className="w-full bg-white/10 border border-white/30 rounded-full px-5 py-4 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              />
            </div>
            <div className="w-full max-w-xl mx-auto">
              <input
                type="password"
                placeholder="password*"
                className="w-full bg-white/10 border border-white/30 rounded-full px-5 py-4 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              />
            </div>
          </div>

          <div className="text-lg font-semibold">
            <span>New to WillowWheel? </span>
            <button
              onClick={() => setCurrentPage('getstarted')}
              className="text-[#dbe96c] hover:underline"
            >
              Sign up
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setCurrentPage('results')}
              className="bg-[#dbe96c] text-[#1f2041] text-lg font-semibold px-10 py-3 rounded-full shadow-lg hover:brightness-105 transition"
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-[#b55cf5] via-[#9b76ff] to-[#6fa7ff] py-8">
        <div className="text-center space-y-2">
          <div className="font-brand text-[40px] leading-none">ww</div>
          <p className="text-lg">
            2025 Made with <span role="img" aria-label="heart">❤️</span> by Team Car Insurance
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


