import React from 'react';

const TeamMember = ({ name, role, title, company }) => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg mx-auto mb-3"></div>
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-purple-600">{role}</p>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
      <p className="text-xs text-gray-400">{company}</p>
    </div>
  );
};

export default TeamMember;

