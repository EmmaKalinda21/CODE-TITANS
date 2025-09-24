import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { UsersIcon, TrashIcon, PencilIcon, SearchIcon } from 'lucide-react';
import { toast } from 'sonner';
const AdminDashboard: React.FC = () => {
  const {
    users,
    deleteUser
  } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  // Filter out admin users and apply search
  const filteredUsers = users.filter(user => user.type === 'user' && (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.farmName && user.farmName.toLowerCase().includes(searchTerm.toLowerCase())));
  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      toast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage farm users and system data</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <UsersIcon className="mr-2" size={24} />
                User Management
              </h2>
              <div className="relative">
                <input type="text" placeholder="Search users..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farm Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? filteredUsers.map(user => <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">
                          {user.farmName || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">
                          {user.location || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{user.age || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4" aria-label="Edit user">
                          <PencilIcon size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteClick(user.id)} aria-label="Delete user">
                          <TrashIcon size={18} />
                        </button>
                      </td>
                    </tr>) : <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      {searchTerm ? 'No users found matching your search' : 'No users registered yet'}
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              System Status
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Users:</span>
                <span className="font-medium">
                  {users.filter(user => user.type === 'user').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Today:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Disease Detections:</span>
                <span className="font-medium">27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weather Requests:</span>
                <span className="font-medium">42</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Common Crops
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Maize</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{
                width: '65%'
              }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Coffee</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{
                width: '45%'
              }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Tea</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{
                width: '30%'
              }}></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Common Livestock
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Cows</span>
                <span className="font-medium">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{
                width: '70%'
              }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Chicken</span>
                <span className="font-medium">55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{
                width: '55%'
              }}></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Goats</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{
                width: '35%'
              }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default AdminDashboard;