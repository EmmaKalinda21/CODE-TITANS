import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, LeafIcon, BarChartIcon, CloudSunIcon, PawPrintIcon, ShieldIcon, XIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
interface SidebarProps {
  closeSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  closeSidebar
}) => {
  const location = useLocation();
  const {
    user
  } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const navItems = [{
    name: 'Dashboard',
    path: '/dashboard',
    icon: <HomeIcon size={20} />
  }, {
    name: 'Disease Detection',
    path: '/disease-detection',
    icon: <LeafIcon size={20} />
  }, {
    name: 'Farm Management',
    path: '/farm-management',
    icon: <BarChartIcon size={20} />
  }, {
    name: 'Weather Forecast',
    path: '/weather',
    icon: <CloudSunIcon size={20} />
  }, {
    name: 'Animal Health',
    path: '/animal-health',
    icon: <PawPrintIcon size={20} />
  }];
  // Add admin link if user is admin
  if (user?.role === 'admin') {
    navItems.push({
      name: 'Admin Panel',
      path: '/admin',
      icon: <ShieldIcon size={20} />
    });
  }
  return <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <div className="text-white font-bold text-xl">Farm AI</div>
        <button onClick={closeSidebar} className="text-white focus:outline-none">
          <XIcon size={24} />
        </button>
      </div>
      <div className="hidden lg:flex items-center justify-center py-8">
        <h1 className="text-white font-bold text-2xl">Farm AI</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navItems.map(item => <li key={item.path}>
              <Link to={item.path} className={`flex items-center px-4 py-3 text-sm rounded-lg ${isActive(item.path) ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700 hover:text-white'}`} onClick={() => closeSidebar()}>
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>)}
        </ul>
      </nav>
      <div className="p-4 border-t border-green-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
            <span className="text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-green-200">{user?.role || 'farmer'}</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Sidebar;