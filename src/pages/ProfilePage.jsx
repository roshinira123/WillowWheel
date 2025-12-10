import React from 'react';
import Footer from '../components/Footer';
import ProfileSection from '../components/ProfileSection';
import ProfileItem from '../components/ProfileItem';
import ActivityItem from '../components/ActivityItem';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                <p className="text-gray-600">john.doe@email.com</p>
              </div>
            </div>
            <button className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full transition-all">
              Edit Profile
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ProfileSection title="Personal Information">
              <ProfileItem label="Phone" value="(555) 123-4567" />
              <ProfileItem label="Address" value="123 Main St, City, State 12345" />
              <ProfileItem label="Date of Birth" value="01/15/1990" />
            </ProfileSection>
            <ProfileSection title="Insurance Details">
              <ProfileItem label="Policy Number" value="WW-2024-001234" />
              <ProfileItem label="Coverage Type" value="Full Coverage" />
              <ProfileItem label="Monthly Premium" value="$88/month" />
            </ProfileSection>
            <ProfileSection title="Vehicle Information">
              <ProfileItem label="Make/Model" value="Toyota Camry" />
              <ProfileItem label="Year" value="2022" />
              <ProfileItem label="VIN" value="1HGBH41JXMN109186" />
            </ProfileSection>
            <ProfileSection title="Payment Method">
              <ProfileItem label="Card" value="•••• •••• •••• 4242" />
              <ProfileItem label="Billing Date" value="1st of each month" />
              <ProfileItem label="Next Payment" value="January 1, 2025" />
            </ProfileSection>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <ActivityItem date="Dec 1, 2024" activity="Monthly payment processed" />
              <ActivityItem date="Nov 15, 2024" activity="Policy renewed" />
              <ActivityItem date="Nov 1, 2024" activity="Monthly payment processed" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;


