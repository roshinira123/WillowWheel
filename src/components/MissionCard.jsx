import React from 'react';

const MissionCard = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-purple-600 mb-3">{icon}</div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
};

export default MissionCard;

