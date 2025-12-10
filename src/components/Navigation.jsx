import React from 'react';
import { Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import MobileNavLink from './MobileNavLink';

const Navigation = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <nav className="absolute top-6 left-0 right-0 z-50 flex justify-center">
      <div className="bg-white/20 border border-white/30 backdrop-blur-md rounded-full px-6 py-3 shadow-lg w-[90%] max-w-5xl text-white">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/30 rounded-full flex items-center justify-center text-xl font-brand leading-none">
              ww
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-lg font-semibold">
            <NavLink
              label="Log In"
              page="login"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              className={currentPage === 'login' ? 'border-b-2 border-[#ade9e4] pb-1' : ''}
            />
            <NavLink
              label="About Us"
              page="about"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              className={currentPage === 'about' ? 'border-b-2 border-[#ade9e4] pb-1' : ''}
            />
            {/* Learn More removed per request */}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 md:hidden space-y-2 text-left">
            <MobileNavLink label="Log In" page="login" currentPage={currentPage} setCurrentPage={setCurrentPage} setMobileMenuOpen={setMobileMenuOpen} />
            <MobileNavLink label="About Us" page="about" currentPage={currentPage} setCurrentPage={setCurrentPage} setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

