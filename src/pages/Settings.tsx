import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useVoice } from '../context/VoiceContext';
import { toast } from 'sonner';
import { UserIcon, LockIcon, VolumeIcon, SunIcon, MoonIcon } from 'lucide-react';
const Settings: React.FC = () => {
  const {
    currentUser,
    updateUser,
    updatePassword
  } = useAuth();
  const {
    availableVoices,
    selectedVoice,
    setSelectedVoice
  } = useVoice();
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    age: currentUser?.age || '',
    location: currentUser?.location || '',
    farmName: currentUser?.farmName || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        age: currentUser.age || '',
        location: currentUser.location || '',
        farmName: currentUser.farmName || ''
      });
    }
  }, [currentUser]);
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: profileData.name,
      age: profileData.age ? parseInt(profileData.age.toString()) : undefined,
      location: profileData.location,
      farmName: profileData.farmName
    });
    toast.success('Profile updated successfully');
  };
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    const success = await updatePassword(passwordData.currentPassword, passwordData.newPassword);
    if (success) {
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      toast.error('Current password is incorrect');
    }
  };
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceName = e.target.value;
    const voice = availableVoices.find(v => v.name === voiceName);
    if (voice) {
      setSelectedVoice(voice);
    }
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would apply dark mode styles
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <UserIcon className="mr-2" size={24} />
                  Profile Information
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input id="name" name="name" type="text" value={profileData.name} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input id="age" name="age" type="number" value={profileData.age} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input id="location" name="location" type="text" value={profileData.location} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-1">
                        Farm Name
                      </label>
                      <input id="farmName" name="farmName" type="text" value={profileData.farmName} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <LockIcon className="mr-2" size={24} />
                  Change Password
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <VolumeIcon className="mr-2" size={24} />
                  Voice Settings
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="voice" className="block text-sm font-medium text-gray-700 mb-1">
                    Voice Selection
                  </label>
                  <select id="voice" value={selectedVoice?.name || ''} onChange={handleVoiceChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                    {availableVoices.length === 0 ? <option value="">No voices available</option> : availableVoices.map(voice => <option key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>)}
                  </select>
                </div>
                <button onClick={() => {
                if (selectedVoice) {
                  toast.success(`Voice set to ${selectedVoice.name}`);
                }
              }} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Test Voice
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  {isDarkMode ? <MoonIcon className="mr-2" size={24} /> : <SunIcon className="mr-2" size={24} />}
                  Appearance
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Dark Mode</span>
                  <button onClick={toggleDarkMode} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${isDarkMode ? 'bg-green-600' : 'bg-gray-300'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="font-medium text-gray-800 mb-4">
                  Account Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{currentUser?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type:</span>
                    <span className="font-medium capitalize">
                      {currentUser?.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default Settings;