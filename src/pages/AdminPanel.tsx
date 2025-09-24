import React, { useState } from 'react';
import { UsersIcon, BarChart3Icon, Settings2Icon, DatabaseIcon, EditIcon, TrashIcon, PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}
interface AppStat {
  name: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}
const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  // Mock users data
  const [users, setUsers] = useState<User[]>([{
    id: 1,
    name: 'Admin User',
    email: 'admin@farmai.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-06-19 10:30 AM'
  }, {
    id: 2,
    name: 'John Farmer',
    email: 'farmer@farmai.com',
    role: 'farmer',
    status: 'active',
    lastLogin: '2023-06-18 03:45 PM'
  }, {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'farmer',
    status: 'active',
    lastLogin: '2023-06-17 09:20 AM'
  }, {
    id: 4,
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'farmer',
    status: 'inactive',
    lastLogin: '2023-06-10 11:15 AM'
  }, {
    id: 5,
    name: 'Technical Support',
    email: 'support@farmai.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-06-19 08:00 AM'
  }]);
  // App statistics
  const appStats: AppStat[] = [{
    name: 'Total Users',
    value: users.length,
    change: 12.5,
    icon: <UsersIcon size={20} className="text-blue-600" />
  }, {
    name: 'Active Users',
    value: users.filter(user => user.status === 'active').length,
    change: 8.2,
    icon: <UsersIcon size={20} className="text-green-600" />
  }, {
    name: 'Disease Scans',
    value: 142,
    change: 23.1,
    icon: <DatabaseIcon size={20} className="text-purple-600" />
  }, {
    name: 'Weather Checks',
    value: 287,
    change: 14.3,
    icon: <BarChart3Icon size={20} className="text-yellow-600" />
  }];
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });
  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(user => user.id === id ? {
      ...user,
      status: user.status === 'active' ? 'inactive' : 'active'
    } : user));
  };
  return <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-gray-600 mt-1">
          Manage users and monitor system performance
        </p>
      </div>
      {/* App Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {appStats.map((stat, index) => <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change >= 0 ? '+' : ''}
                    {stat.change}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
            </div>
          </div>)}
      </div>
      {/* Admin Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-6 py-4 text-sm font-medium ${activeTab === 'users' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('users')}>
            User Management
          </button>
          <button className={`px-6 py-4 text-sm font-medium ${activeTab === 'system' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('system')}>
            System Settings
          </button>
          <button className={`px-6 py-4 text-sm font-medium ${activeTab === 'logs' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('logs')}>
            Activity Logs
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'users' && <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <div className="w-full md:w-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <input type="text" placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                    <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="pl-10 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none">
                      <option value="all">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="farmer">Farmer</option>
                    </select>
                    <FilterIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
                <button className="w-full sm:w-auto flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <PlusIcon size={16} className="mr-2" />
                  Add New User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? filteredUsers.map(user => <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleToggleUserStatus(user.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                              {user.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                              <EditIcon size={16} />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                              <TrashIcon size={16} />
                            </button>
                          </td>
                        </tr>) : <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No users found matching your criteria
                        </td>
                      </tr>}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{filteredUsers.length}</span> of{' '}
                  <span className="font-medium">{users.length}</span> users
                </div>
                <div className="flex-1 flex justify-end">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>}
          {activeTab === 'system' && <div>
              <h3 className="text-lg font-medium text-gray-800 mb-6">
                System Settings
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    AI Model Configuration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="model-confidence" className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Confidence Threshold
                      </label>
                      <div className="flex items-center">
                        <input type="range" id="model-confidence" min="50" max="95" step="5" defaultValue="70" className="w-full" />
                        <span className="ml-2 text-sm text-gray-700">70%</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Set the minimum confidence level required for disease
                        detection
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">
                          Enable automatic model updates
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    Data Management
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">
                          Store user uploaded images for model improvement
                        </span>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="data-retention" className="block text-sm font-medium text-gray-700 mb-1">
                        Data Retention Period
                      </label>
                      <select id="data-retention" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md" defaultValue="90">
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        <option value="365">1 year</option>
                      </select>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Clear All Cached Data
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-800 mb-4">
                    Notifications
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">
                          Send email notifications for new user registrations
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">
                          Send system health alerts
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3">
                    Cancel
                  </button>
                  <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>}
          {activeTab === 'logs' && <div>
              <h3 className="text-lg font-medium text-gray-800 mb-6">
                System Activity Logs
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex space-x-4">
                    <select className="pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md" defaultValue="all">
                      <option value="all">All Events</option>
                      <option value="login">Login Events</option>
                      <option value="upload">Upload Events</option>
                      <option value="diagnosis">Diagnosis Events</option>
                      <option value="error">Error Events</option>
                    </select>
                    <select className="pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md" defaultValue="7">
                      <option value="1">Last 24 Hours</option>
                      <option value="7">Last 7 Days</option>
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last 90 Days</option>
                    </select>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Export Logs
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2023-06-19 10:30 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Login
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        admin@farmai.com
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Successful login
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        192.168.1.1
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2023-06-19 09:45 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Upload
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        farmer@farmai.com
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Image uploaded for disease detection
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        192.168.1.2
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2023-06-19 09:15 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Diagnosis
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        farmer@farmai.com
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Coffee leaf rust detected (87% confidence)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        192.168.1.2
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2023-06-19 08:30 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Error
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        System
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        Database connection timeout
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        127.0.0.1
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">4</span> of{' '}
                  <span className="font-medium">120</span> logs
                </div>
                <div className="flex-1 flex justify-end">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default AdminPanel;