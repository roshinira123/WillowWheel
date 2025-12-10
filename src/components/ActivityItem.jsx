import React from 'react';

const ActivityItem = ({ date, activity }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
      <span className="text-gray-800">{activity}</span>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
  );
};

export default ActivityItem;

