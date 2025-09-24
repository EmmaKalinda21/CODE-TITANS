import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-green-800 transition duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>;
};
export default Layout;