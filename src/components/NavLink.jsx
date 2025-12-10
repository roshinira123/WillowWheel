import React from 'react';

const NavLink = ({ label, page, currentPage, setCurrentPage, className = '' }) => {
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`hover:text-white transition-colors ${currentPage === page ? 'text-white' : ''} ${className}`}
    >
      {label}
    </button>
  );
};

export default NavLink;

