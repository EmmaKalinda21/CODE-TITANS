import React, { useState } from 'react';
import { MenuIcon, BellIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header: React.FC<HeaderProps> = ({
  toggleSidebar
}) => {
  const {
    user,
    logout
  } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 lg:hidden">
            <MenuIcon size={24} />
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-bold text-green-700">
              Farm AI Assistant
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 focus:outline-none">
            <BellIcon size={20} />
          </button>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 text-gray-700 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                <UserIcon size={18} />
              </div>
              <span className="hidden md:inline-block">
                {user?.name || 'User'}
              </span>
            </button>
            {dropdownOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  Signed in as{' '}
                  <span className="font-medium">{user?.email}</span>
                </div>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </button>
              </div>}
          </div>
        </div>
      </div>
    </header>;
};
export default Header;