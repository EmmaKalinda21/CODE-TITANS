import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { CalendarIcon, CloudIcon, LeafIcon, BarChart2Icon, SettingsIcon } from 'lucide-react';
import { mockWeatherData, mockStockItems } from '../utils/mockData';
const UserDashboard: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  const userStocks = mockStockItems.filter(item => item.userId === currentUser?.id);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const currentWeather = mockWeatherData.current;
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-gray-600">{currentDate}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Weather Card */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-700">Current Weather</h2>
              <CloudIcon className="text-blue-500" size={24} />
            </div>
            <div className="flex items-center justify-center flex-grow">
              <div className="text-center">
                <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description} className="w-20 h-20 mx-auto" />
                <div className="text-3xl font-bold">
                  {currentWeather.temp}°C
                </div>
                <div className="text-gray-500 capitalize">
                  {currentWeather.weather[0].description}
                </div>
              </div>
            </div>
            <Link to="/weather" className="mt-4 text-center text-sm text-blue-600 hover:underline">
              View detailed forecast
            </Link>
          </div>
          {/* Farm Stock Summary */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-700">Farm Stock</h2>
              <BarChart2Icon className="text-green-500" size={24} />
            </div>
            <div className="flex-grow">
              {userStocks.length > 0 ? <ul className="space-y-2">
                  {userStocks.slice(0, 3).map(stock => <li key={stock.id} className="flex justify-between">
                      <span className="text-gray-600">{stock.name}</span>
                      <span className="font-medium">
                        {stock.quantity} {stock.unit}
                      </span>
                    </li>)}
                </ul> : <p className="text-gray-500 text-center py-4">
                  No stock items found
                </p>}
            </div>
            <Link to="/farm-management" className="mt-4 text-center text-sm text-blue-600 hover:underline">
              Manage farm stock
            </Link>
          </div>
          {/* Disease Detection */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-700">Disease Detection</h2>
              <LeafIcon className="text-green-500" size={24} />
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <img src="https://images.unsplash.com/photo-1536657464919-892534f79d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80" alt="Disease Detection" className="w-16 h-16 mx-auto rounded-full object-cover" />
                <p className="mt-2 text-gray-600">
                  Detect crop and animal diseases
                </p>
              </div>
            </div>
            <Link to="/disease-detection" className="mt-4 text-center text-sm text-blue-600 hover:underline">
              Start detection
            </Link>
          </div>
          {/* Calendar / Events */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-700">Farming Calendar</h2>
              <CalendarIcon className="text-orange-500" size={24} />
            </div>
            <div className="flex-grow">
              <div className="text-center py-4">
                <p className="text-gray-600 mb-2">Best time to plant:</p>
                <ul className="space-y-1">
                  <li className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Maize: March - April
                  </li>
                  <li className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Beans: April - May
                  </li>
                  <li className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Wheat: June - July
                  </li>
                </ul>
              </div>
            </div>
            <button className="mt-4 text-center text-sm text-blue-600 hover:underline">
              View full calendar
            </button>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Link to="/disease-detection" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <LeafIcon size={32} className="text-green-600 mb-2" />
              <span className="text-gray-700 text-center">Detect Disease</span>
            </Link>
            <Link to="/farm-management" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <BarChart2Icon size={32} className="text-blue-600 mb-2" />
              <span className="text-gray-700 text-center">Update Stock</span>
            </Link>
            <Link to="/weather" className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <CloudIcon size={32} className="text-yellow-600 mb-2" />
              <span className="text-gray-700 text-center">Check Weather</span>
            </Link>
            <Link to="/settings" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <SettingsIcon size={32} className="text-purple-600 mb-2" />
              <span className="text-gray-700 text-center">Settings</span>
            </Link>
          </div>
        </div>
        {/* Farm Tips */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Farming Tips
          </h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h3 className="font-medium text-green-800">Crop Rotation</h3>
              <p className="text-gray-600">
                Rotate crops each season to prevent soil depletion and reduce
                pest buildup.
              </p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="font-medium text-blue-800">Water Conservation</h3>
              <p className="text-gray-600">
                Consider drip irrigation to reduce water usage while keeping
                your crops properly hydrated.
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <h3 className="font-medium text-yellow-800">Pest Management</h3>
              <p className="text-gray-600">
                Introduce beneficial insects like ladybugs to naturally control
                pest populations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default UserDashboard;