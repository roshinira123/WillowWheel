import React from 'react';

const ProfileItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
};

export default ProfileItem;

