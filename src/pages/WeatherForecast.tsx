import React, { useState } from 'react';
import Header from '../components/Header';
import { CloudIcon, CloudRainIcon, SunIcon, WindIcon, DropletIcon } from 'lucide-react';
import { mockWeatherData } from '../utils/mockData';
const WeatherForecast: React.FC = () => {
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  // Function to format date from timestamp
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  // Function to get weather icon based on condition
  const getWeatherIcon = (condition: string, size: number = 24) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <SunIcon size={size} className="text-yellow-500" />;
      case 'clouds':
        return <CloudIcon size={size} className="text-gray-500" />;
      case 'rain':
        return <CloudRainIcon size={size} className="text-blue-500" />;
      default:
        return <CloudIcon size={size} className="text-gray-500" />;
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Weather Forecast
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Current Weather
                </h2>
                <p className="text-gray-600">{location}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter location" />
                  <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700" aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="mr-4">
                    {getWeatherIcon(weatherData.current.weather[0].main, 64)}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">
                      {weatherData.current.temp}°C
                    </h3>
                    <p className="text-blue-100 capitalize">
                      {weatherData.current.weather[0].description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DropletIcon size={20} className="mr-2 text-blue-200" />
                    <div>
                      <p className="text-blue-100">Humidity</p>
                      <p className="font-semibold">
                        {weatherData.current.humidity}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <WindIcon size={20} className="mr-2 text-blue-200" />
                    <div>
                      <p className="text-blue-100">Wind</p>
                      <p className="font-semibold">
                        {weatherData.current.wind_speed} m/s
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              5-Day Forecast
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {weatherData.daily.map((day, index) => <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <h3 className="font-medium text-gray-800">
                    {formatDate(day.dt)}
                  </h3>
                  <div className="flex justify-center my-2">
                    {getWeatherIcon(day.weather[0].main, 40)}
                  </div>
                  <p className="text-gray-600 capitalize">
                    {day.weather[0].description}
                  </p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="font-semibold">
                      {Math.round(day.temp.max)}°
                    </span>
                    <span className="text-gray-500">
                      {Math.round(day.temp.min)}°
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Weather Impact on Farming
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Crop Recommendations
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      {weatherData.current.weather[0].main === 'Rain' ? 'Hold off on planting seeds until drier conditions' : 'Good conditions for planting seeds and young plants'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      {weatherData.current.humidity > 70 ? 'High humidity may increase risk of fungal diseases' : 'Moderate humidity is good for most crops'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      {weatherData.current.wind_speed > 8 ? 'Strong winds may damage tall crops, consider windbreaks' : 'Gentle breeze helps with pollination'}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Livestock Recommendations
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      {weatherData.current.temp > 30 ? 'Ensure animals have access to shade and plenty of water' : 'Comfortable temperature for most livestock'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      {weatherData.current.weather[0].main === 'Rain' ? 'Ensure proper shelter for animals during rainfall' : 'Good conditions for grazing'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      Monitor for signs of heat stress in poultry during hot
                      days
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default WeatherForecast;