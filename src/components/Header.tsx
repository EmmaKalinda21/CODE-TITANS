import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVoice } from '../context/VoiceContext';
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react';
const Header: React.FC = () => {
  const {
    currentUser,
    logout
  } = useAuth();
  const {
    listening,
    startListening,
    stopListening
  } = useVoice();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implementation would add/remove dark mode classes to document
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleVoiceToggle = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to={currentUser?.type === 'admin' ? '/admin-dashboard' : '/user-dashboard'} className="flex items-center">
            <img src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" alt="Farm AI Logo" className="h-10 w-10 rounded-full mr-2" />
            <span className="text-xl font-bold">Farm AI</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {currentUser && <>
                <Link to={currentUser.type === 'admin' ? '/admin-dashboard' : '/user-dashboard'} className="hover:underline">
                  Dashboard
                </Link>
                <Link to="/disease-detection" className="hover:underline">
                  Disease Detection
                </Link>
                <Link to="/weather" className="hover:underline">
                  Weather
                </Link>
                {currentUser.type === 'user' && <Link to="/farm-management" className="hover:underline">
                    Farm Management
                  </Link>}
                <Link to="/settings" className="hover:underline">
                  Settings
                </Link>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                  Logout
                </button>
              </>}
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-sm">{currentDate}</span>
            <button onClick={handleVoiceToggle} className={`p-2 rounded-full ${listening ? 'bg-red-500' : 'bg-green-600'}`} aria-label="Voice command">
              <div size={20} />
            </button>
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-green-600" aria-label="Toggle dark mode">
              {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-full bg-green-600" aria-label="Open menu">
              {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && currentUser && <div className="md:hidden mt-4 pb-2 space-y-3">
            <Link to={currentUser.type === 'admin' ? '/admin-dashboard' : '/user-dashboard'} className="block py-2 hover:bg-green-600 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
            <Link to="/disease-detection" className="block py-2 hover:bg-green-600 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Disease Detection
            </Link>
            <Link to="/weather" className="block py-2 hover:bg-green-600 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Weather
            </Link>
            {currentUser.type === 'user' && <Link to="/farm-management" className="block py-2 hover:bg-green-600 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
                Farm Management
              </Link>}
            <Link to="/settings" className="block py-2 hover:bg-green-600 px-3 rounded" onClick={() => setIsMenuOpen(false)}>
              Settings
            </Link>
            <button onClick={() => {
          handleLogout();
          setIsMenuOpen(false);
        }} className="w-full text-left py-2 text-red-300 hover:bg-red-700 px-3 rounded">
              Logout
            </button>
          </div>}
      </div>
    </header>;
};
export default Header;