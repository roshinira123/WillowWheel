import React from 'react';

const MobileNavLink = ({ label, page, currentPage, setCurrentPage, setMobileMenuOpen }) => {
  return (
    <button
      onClick={() => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      className={`text-left py-2 hover:text-purple-400 transition-colors ${currentPage === page ? 'text-purple-400' : ''}`}
    >
      {label}
    </button>
  );
};

export default MobileNavLink;

