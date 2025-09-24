import React from 'react';
import { Link } from 'react-router-dom';
import { LeafIcon, BarChartIcon, CloudSunIcon, PawPrintIcon, ArrowRightIcon, AlertTriangleIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const Dashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  // Mock data for dashboard
  const weatherData = {
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    rainChance: 20
  };
  const alerts = [{
    id: 1,
    type: 'disease',
    message: 'Possible leaf rust detected in coffee plants',
    severity: 'high'
  }, {
    id: 2,
    type: 'weather',
    message: 'Heavy rainfall expected in the next 48 hours',
    severity: 'medium'
  }, {
    id: 3,
    type: 'animal',
    message: 'Vaccination due for livestock next week',
    severity: 'low'
  }];
  return <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.name}
        </h2>
        <p className="text-gray-600 mt-1">
          Here's what's happening on your farm today
        </p>
      </div>
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Crops Monitored</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <LeafIcon size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Livestock</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <PawPrintIcon size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-2xl font-bold text-gray-800">
                {weatherData.temperature}°C
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <CloudSunIcon size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-800">
                {alerts.length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <AlertTriangleIcon size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Alerts section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Recent Alerts</h3>
          <Link to="/alerts" className="text-green-600 text-sm flex items-center hover:text-green-700">
            View all <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
        <div className="space-y-3">
          {alerts.map(alert => <div key={alert.id} className={`p-4 rounded-lg flex items-start ${alert.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' : alert.severity === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
              <AlertTriangleIcon size={20} className={`mr-3 ${alert.severity === 'high' ? 'text-red-500' : alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'}`} />
              <div>
                <p className="font-medium text-gray-800">{alert.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {alert.type === 'disease' && 'Disease Alert'}
                  {alert.type === 'weather' && 'Weather Alert'}
                  {alert.type === 'animal' && 'Livestock Alert'}
                </p>
              </div>
            </div>)}
        </div>
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/disease-detection" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col items-center text-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <LeafIcon size={24} className="text-green-600" />
          </div>
          <h3 className="font-medium text-gray-800">Crop Disease Detection</h3>
          <p className="text-sm text-gray-500 mt-2">Scan plants for diseases</p>
        </Link>
        <Link to="/farm-management" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <BarChartIcon size={24} className="text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-800">Farm Management</h3>
          <p className="text-sm text-gray-500 mt-2">Track your farm's data</p>
        </Link>
        <Link to="/weather" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col items-center text-center">
          <div className="bg-yellow-100 p-3 rounded-full mb-4">
            <CloudSunIcon size={24} className="text-yellow-600" />
          </div>
          <h3 className="font-medium text-gray-800">Weather Forecast</h3>
          <p className="text-sm text-gray-500 mt-2">View 7-day predictions</p>
        </Link>
        <Link to="/animal-health" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col items-center text-center">
          <div className="bg-purple-100 p-3 rounded-full mb-4">
            <PawPrintIcon size={24} className="text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-800">Animal Health</h3>
          <p className="text-sm text-gray-500 mt-2">Monitor livestock health</p>
        </Link>
      </div>
    </div>;
};
export default Dashboard;