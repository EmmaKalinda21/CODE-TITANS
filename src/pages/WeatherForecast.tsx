import React, { useState } from 'react';
import { CloudSunIcon, CloudIcon, CloudRainIcon, CloudLightningIcon, SunIcon, CloudDrizzleIcon, DropletIcon, WindIcon, ThermometerIcon, MapPinIcon } from 'lucide-react';
import { weatherForecast } from '../utils/diseaseData';
const WeatherForecast: React.FC = () => {
  const [location, setLocation] = useState('Kampala, Uganda');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [inputLocation, setInputLocation] = useState(location);
  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun':
        return <SunIcon size={36} className="text-yellow-500" />;
      case 'cloud-sun':
        return <CloudSunIcon size={36} className="text-gray-500" />;
      case 'cloud':
        return <CloudIcon size={36} className="text-gray-500" />;
      case 'cloud-rain':
        return <CloudRainIcon size={36} className="text-blue-500" />;
      case 'cloud-lightning':
        return <CloudLightningIcon size={36} className="text-purple-500" />;
      case 'cloud-drizzle':
        return <CloudDrizzleIcon size={36} className="text-blue-400" />;
      default:
        return <CloudIcon size={36} className="text-gray-500" />;
    }
  };
  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(inputLocation);
    setShowLocationInput(false);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };
  // Get today's forecast
  const todayForecast = weatherForecast[0];
  return <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Weather Forecast
            </h2>
            <div className="flex items-center mt-1 text-gray-600">
              <MapPinIcon size={16} className="mr-1" />
              <p>{location}</p>
            </div>
          </div>
          <button onClick={() => setShowLocationInput(!showLocationInput)} className="text-green-600 hover:text-green-700 text-sm flex items-center">
            Change location
          </button>
        </div>
        {showLocationInput && <form onSubmit={handleLocationSubmit} className="mt-4 flex">
            <input type="text" value={inputLocation} onChange={e => setInputLocation(e.target.value)} placeholder="Enter location" className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Update
            </button>
          </form>}
      </div>
      {/* Today's weather */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Today's Weather
        </h3>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-10">
            {getWeatherIcon(todayForecast.icon)}
            <p className="text-xl font-bold mt-2">{todayForecast.condition}</p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center mb-1">
                <ThermometerIcon size={16} className="text-red-500 mr-1" />
                <p className="text-sm text-gray-500">Temperature</p>
              </div>
              <p className="text-2xl font-bold">
                {todayForecast.temperature.max}°C
              </p>
              <p className="text-sm text-gray-500">
                Low: {todayForecast.temperature.min}°C
              </p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <DropletIcon size={16} className="text-blue-500 mr-1" />
                <p className="text-sm text-gray-500">Humidity</p>
              </div>
              <p className="text-2xl font-bold">{todayForecast.humidity}%</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <CloudRainIcon size={16} className="text-blue-500 mr-1" />
                <p className="text-sm text-gray-500">Rain Chance</p>
              </div>
              <p className="text-2xl font-bold">{todayForecast.rainChance}%</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <WindIcon size={16} className="text-gray-500 mr-1" />
                <p className="text-sm text-gray-500">Wind</p>
              </div>
              <p className="text-2xl font-bold">12 km/h</p>
              <p className="text-sm text-gray-500">NE direction</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">
            Agricultural Advice
          </h4>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-700">
              {todayForecast.rainChance > 50 ? 'Heavy rainfall expected. Consider postponing any spraying activities and ensure proper drainage in your fields.' : todayForecast.rainChance > 20 ? 'Light rain possible. Good conditions for transplanting seedlings.' : 'Dry conditions expected. Consider irrigation for your crops if needed.'}
            </p>
          </div>
        </div>
      </div>
      {/* 7-day forecast */}
      <div className="bg-white p-6 rounded-lg shadow-sm overflow-hidden">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          7-Day Forecast
        </h3>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {weatherForecast.map((day, index) => <div key={index} className={`flex flex-col items-center p-4 rounded-lg ${index === 0 ? 'bg-green-50' : 'bg-white'}`} style={{
            minWidth: '120px'
          }}>
                <p className="text-sm font-medium text-gray-700">
                  {formatDate(day.date)}
                </p>
                <div className="my-3">{getWeatherIcon(day.icon)}</div>
                <p className="text-md font-bold">{day.temperature.max}°C</p>
                <p className="text-xs text-gray-500">{day.temperature.min}°C</p>
                <div className="mt-2 flex items-center">
                  <CloudRainIcon size={14} className="text-blue-500 mr-1" />
                  <span className="text-xs">{day.rainChance}%</span>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Weather alerts */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Weather Alerts
        </h3>
        {weatherForecast.some(day => day.rainChance > 60) ? <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <CloudLightningIcon size={24} className="text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-yellow-800">
                  Heavy Rainfall Alert
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Heavy rainfall expected in the next few days. Take precautions
                  to protect crops and ensure proper drainage.
                </p>
              </div>
            </div>
          </div> : <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
            <div className="flex">
              <CloudSunIcon size={24} className="text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-800">
                  No Severe Weather Alerts
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Weather conditions look favorable for agricultural activities
                  in the coming days.
                </p>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default WeatherForecast;