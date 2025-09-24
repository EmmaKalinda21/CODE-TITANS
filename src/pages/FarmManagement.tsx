import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, TrashIcon, EditIcon, SaveIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { mockStockCategories, mockStockItems } from '../utils/mockData';
interface StockItem {
  id: string;
  userId: string;
  category: string;
  name: string;
  quantity: number;
  unit: string;
  lastUpdated: string;
}
const FarmManagement: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [newItem, setNewItem] = useState({
    category: '',
    name: '',
    quantity: '',
    unit: ''
  });
  useEffect(() => {
    // Load stock items from localStorage or use mock data
    const storedItems = localStorage.getItem('stockItems');
    if (storedItems) {
      setStockItems(JSON.parse(storedItems));
    } else {
      setStockItems(mockStockItems);
      localStorage.setItem('stockItems', JSON.stringify(mockStockItems));
    }
  }, []);
  // Filter items by current user and selected category
  const filteredItems = stockItems.filter(item => item.userId === currentUser?.id && (selectedCategory === 'all' || item.category === selectedCategory));
  const handleAddItem = () => {
    if (!newItem.category || !newItem.name || !newItem.quantity || !newItem.unit) {
      toast.error('Please fill in all fields');
      return;
    }
    const newStockItem: StockItem = {
      id: Date.now().toString(),
      userId: currentUser?.id || '',
      category: newItem.category,
      name: newItem.name,
      quantity: parseFloat(newItem.quantity),
      unit: newItem.unit,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    const updatedItems = [...stockItems, newStockItem];
    setStockItems(updatedItems);
    localStorage.setItem('stockItems', JSON.stringify(updatedItems));
    setNewItem({
      category: '',
      name: '',
      quantity: '',
      unit: ''
    });
    setIsAddModalOpen(false);
    toast.success('Stock item added successfully');
  };
  const handleEditItem = (item: StockItem) => {
    setEditingItem({
      ...item
    });
  };
  const handleSaveEdit = () => {
    if (!editingItem) return;
    const updatedItems = stockItems.map(item => item.id === editingItem.id ? {
      ...editingItem,
      lastUpdated: new Date().toISOString().split('T')[0]
    } : item);
    setStockItems(updatedItems);
    localStorage.setItem('stockItems', JSON.stringify(updatedItems));
    setEditingItem(null);
    toast.success('Stock item updated successfully');
  };
  const handleDeleteItem = (id: string) => {
    const updatedItems = stockItems.filter(item => item.id !== id);
    setStockItems(updatedItems);
    localStorage.setItem('stockItems', JSON.stringify(updatedItems));
    toast.success('Stock item deleted successfully');
  };
  const handleCancelEdit = () => {
    setEditingItem(null);
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Farm Management</h1>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
            <PlusIcon size={18} className="mr-2" />
            Add Stock Item
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded-md ${selectedCategory === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                All Categories
              </button>
              {mockStockCategories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-4 py-2 rounded-md ${selectedCategory === category.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                  {category.name}
                </button>)}
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
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.length > 0 ? filteredItems.map(item => <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem?.id === item.id ? <input type="text" value={editingItem.name} onChange={e => setEditingItem({
                    ...editingItem,
                    name: e.target.value
                  })} className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" /> : <div className="font-medium text-gray-900">
                            {item.name}
                          </div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem?.id === item.id ? <select value={editingItem.category} onChange={e => setEditingItem({
                    ...editingItem,
                    category: e.target.value
                  })} className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                            {mockStockCategories.map(category => <option key={category.id} value={category.id}>
                                {category.name}
                              </option>)}
                          </select> : <div className="text-gray-500">
                            {mockStockCategories.find(c => c.id === item.category)?.name || item.category}
                          </div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingItem?.id === item.id ? <div className="flex items-center space-x-2">
                            <input type="number" value={editingItem.quantity} onChange={e => setEditingItem({
                      ...editingItem,
                      quantity: parseFloat(e.target.value)
                    })} className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                            <input type="text" value={editingItem.unit} onChange={e => setEditingItem({
                      ...editingItem,
                      unit: e.target.value
                    })} className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                          </div> : <div className="text-gray-500">
                            {item.quantity} {item.unit}
                          </div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{item.lastUpdated}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {editingItem?.id === item.id ? <div className="flex justify-end space-x-2">
                            <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-900" aria-label="Save changes">
                              <SaveIcon size={18} />
                            </button>
                            <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-900" aria-label="Cancel editing">
                              <XIcon size={18} />
                            </button>
                          </div> : <div className="flex justify-end space-x-4">
                            <button onClick={() => handleEditItem(item)} className="text-indigo-600 hover:text-indigo-900" aria-label="Edit item">
                              <EditIcon size={18} />
                            </button>
                            <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900" aria-label="Delete item">
                              <TrashIcon size={18} />
                            </button>
                          </div>}
                      </td>
                    </tr>) : <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No stock items found. Click "Add Stock Item" to add your
                      first item.
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* Add Item Modal */}
      {isAddModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Stock Item
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select value={newItem.category} onChange={e => setNewItem({
              ...newItem,
              category: e.target.value
            })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                  <option value="">Select Category</option>
                  {mockStockCategories.map(category => <option key={category.id} value={category.id}>
                      {category.name}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input type="text" value={newItem.name} onChange={e => setNewItem({
              ...newItem,
              name: e.target.value
            })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter item name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input type="number" value={newItem.quantity} onChange={e => setNewItem({
                ...newItem,
                quantity: e.target.value
              })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Amount" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <input type="text" value={newItem.unit} onChange={e => setNewItem({
                ...newItem,
                unit: e.target.value
              })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="kg, liters, etc." />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                Cancel
              </button>
              <button onClick={handleAddItem} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Add Item
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default FarmManagement;