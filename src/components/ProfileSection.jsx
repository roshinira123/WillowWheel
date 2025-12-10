import React from 'react';

const ProfileSection = ({ title, children }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default ProfileSection;

