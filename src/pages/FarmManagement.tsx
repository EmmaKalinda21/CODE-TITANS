import React, { useState } from 'react';
import { BarChart3Icon, PlusIcon, CalendarIcon, SaveIcon, TrashIcon, EditIcon, ChevronDownIcon } from 'lucide-react';
interface StockEntry {
  id: string;
  type: string;
  category: string;
  quantity: number;
  date: string;
  notes: string;
}
const FarmManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('livestock');
  const [showForm, setShowForm] = useState(false);
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([{
    id: '1',
    type: 'livestock',
    category: 'Cow',
    quantity: 5,
    date: '2023-06-15',
    notes: 'Healthy dairy cows'
  }, {
    id: '2',
    type: 'livestock',
    category: 'Chicken',
    quantity: 50,
    date: '2023-06-10',
    notes: 'Layer hens'
  }, {
    id: '3',
    type: 'crop',
    category: 'Maize',
    quantity: 200,
    date: '2023-05-20',
    notes: 'Planted in north field'
  }, {
    id: '4',
    type: 'crop',
    category: 'Coffee',
    quantity: 150,
    date: '2023-04-15',
    notes: 'Arabica variety'
  }]);
  const [formData, setFormData] = useState<Omit<StockEntry, 'id'>>({
    type: activeTab,
    category: '',
    quantity: 0,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      type: tab
    }));
    setShowForm(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing entry
      setStockEntries(prev => prev.map(entry => entry.id === editingId ? {
        ...formData,
        id: editingId
      } : entry));
      setEditingId(null);
    } else {
      // Add new entry
      setStockEntries(prev => [...prev, {
        ...formData,
        id: Date.now().toString()
      }]);
    }
    // Reset form
    setFormData({
      type: activeTab,
      category: '',
      quantity: 0,
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowForm(false);
  };
  const handleEdit = (entry: StockEntry) => {
    setFormData({
      type: entry.type,
      category: entry.category,
      quantity: entry.quantity,
      date: entry.date,
      notes: entry.notes
    });
    setEditingId(entry.id);
    setShowForm(true);
  };
  const handleDelete = (id: string) => {
    setStockEntries(prev => prev.filter(entry => entry.id !== id));
  };
  const filteredEntries = stockEntries.filter(entry => entry.type === activeTab);
  // Get unique categories for statistics
  const categories = Array.from(new Set(filteredEntries.map(entry => entry.category)));
  const statistics = categories.map(category => {
    const entries = filteredEntries.filter(entry => entry.category === category);
    const totalQuantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    return {
      category,
      totalQuantity
    };
  });
  return <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Farm Management</h2>
        <p className="text-gray-600 mt-1">
          Track and manage your farm inventory
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-6 py-4 text-sm font-medium ${activeTab === 'livestock' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabChange('livestock')}>
            Livestock
          </button>
          <button className={`px-6 py-4 text-sm font-medium ${activeTab === 'crop' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleTabChange('crop')}>
            Crops
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">
              {activeTab === 'livestock' ? 'Livestock Inventory' : 'Crop Inventory'}
            </h3>
            <button onClick={() => setShowForm(!showForm)} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <PlusIcon size={16} className="mr-2" />
              Add {activeTab === 'livestock' ? 'Livestock' : 'Crop'}
            </button>
          </div>
          {showForm && <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-medium text-gray-800 mb-4">
                {editingId ? 'Edit Entry' : `Add New ${activeTab === 'livestock' ? 'Livestock' : 'Crop'}`}
              </h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      {activeTab === 'livestock' ? 'Animal Type' : 'Crop Type'}
                    </label>
                    <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                      <option value="">
                        Select {activeTab === 'livestock' ? 'animal' : 'crop'}{' '}
                        type
                      </option>
                      {activeTab === 'livestock' ? <>
                          <option value="Cow">Cow</option>
                          <option value="Goat">Goat</option>
                          <option value="Sheep">Sheep</option>
                          <option value="Chicken">Chicken</option>
                          <option value="Duck">Duck</option>
                        </> : <>
                          <option value="Coffee">Coffee</option>
                          <option value="Tea">Tea</option>
                          <option value="Maize">Maize</option>
                          <option value="Wheat">Wheat</option>
                          <option value="Beans">Beans</option>
                          <option value="Groundnuts">Groundnuts</option>
                          <option value="Banana">Banana</option>
                          <option value="Okra">Okra</option>
                          <option value="Tomato">Tomato</option>
                          <option value="Cassava">Cassava</option>
                        </>}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleInputChange} required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                      <CalendarIcon size={16} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows={1} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Cancel
                  </button>
                  <button type="submit" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <SaveIcon size={16} className="mr-2" />
                    {editingId ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {statistics.map((stat, index) => <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <BarChart3Icon size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.category}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {stat.totalQuantity}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'livestock' ? 'Animal Type' : 'Crop Type'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntries.length > 0 ? filteredEntries.map(entry => <tr key={entry.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {entry.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{entry.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{entry.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500 truncate max-w-xs">
                          {entry.notes}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEdit(entry)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <EditIcon size={16} />
                        </button>
                        <button onClick={() => handleDelete(entry.id)} className="text-red-600 hover:text-red-900">
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </tr>) : <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No entries found. Add your first{' '}
                      {activeTab === 'livestock' ? 'livestock' : 'crop'} record.
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
};
export default FarmManagement;