import React from 'react';
// Mock user data
export const mockUsers = [{
  id: '1',
  email: 'emmaderek80@gmail.com',
  name: 'Emma Derek',
  type: 'admin'
}, {
  id: '2',
  email: 'johndoe@example.com',
  name: 'John Doe',
  age: 45,
  location: 'Nairobi, Kenya',
  farmName: 'Green Acres Farm',
  type: 'user'
}, {
  id: '3',
  email: 'janedoe@example.com',
  name: 'Jane Doe',
  age: 38,
  location: 'Nakuru, Kenya',
  farmName: 'Sunset Valley Farm',
  type: 'user'
}];
// Mock weather data
export const mockWeatherData = {
  current: {
    temp: 24,
    humidity: 65,
    wind_speed: 5.2,
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }]
  },
  daily: [{
    dt: Date.now() / 1000,
    temp: {
      day: 24,
      min: 18,
      max: 26
    },
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }]
  }, {
    dt: Date.now() / 1000 + 86400,
    temp: {
      day: 26,
      min: 19,
      max: 28
    },
    weather: [{
      main: 'Clouds',
      description: 'few clouds',
      icon: '02d'
    }]
  }, {
    dt: Date.now() / 1000 + 172800,
    temp: {
      day: 23,
      min: 17,
      max: 25
    },
    weather: [{
      main: 'Rain',
      description: 'light rain',
      icon: '10d'
    }]
  }, {
    dt: Date.now() / 1000 + 259200,
    temp: {
      day: 22,
      min: 16,
      max: 24
    },
    weather: [{
      main: 'Rain',
      description: 'moderate rain',
      icon: '10d'
    }]
  }, {
    dt: Date.now() / 1000 + 345600,
    temp: {
      day: 25,
      min: 18,
      max: 27
    },
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }]
  }]
};
// Mock crop diseases
export const mockCropDiseases = {
  coffee: [{
    name: 'Coffee Leaf Rust',
    symptoms: 'Yellow-orange powdery spots on the underside of leaves',
    prevention: 'Plant resistant varieties, maintain proper spacing for air circulation',
    treatment: 'Apply copper-based fungicides, remove infected leaves'
  }, {
    name: 'Coffee Berry Disease',
    symptoms: 'Dark, sunken lesions on green berries',
    prevention: 'Prune trees to improve air circulation, plant resistant varieties',
    treatment: 'Apply fungicides during fruit development stage'
  }],
  maize: [{
    name: 'Northern Corn Leaf Blight',
    symptoms: 'Long, elliptical gray-green lesions on leaves',
    prevention: 'Crop rotation, plant resistant varieties',
    treatment: 'Apply foliar fungicides, remove crop debris after harvest'
  }, {
    name: 'Corn Smut',
    symptoms: 'Grayish-white galls on ears, tassels and leaves',
    prevention: 'Plant resistant hybrids, avoid mechanical injury to plants',
    treatment: 'Remove and destroy galls before they rupture'
  }]
  // More crops would be added here
};
// Mock animal diseases
export const mockAnimalDiseases = {
  cow: [{
    name: 'Foot and Mouth Disease',
    symptoms: 'Fever, blisters in mouth and on feet, reduced milk production',
    prevention: 'Vaccination, biosecurity measures',
    treatment: 'No specific treatment, supportive care and antibiotics to prevent secondary infections'
  }, {
    name: 'Mastitis',
    symptoms: 'Swollen, hard udder, abnormal milk, reduced milk production',
    prevention: 'Good milking hygiene, proper housing, nutrition',
    treatment: 'Antibiotics, frequent milking, anti-inflammatory drugs'
  }],
  chicken: [{
    name: 'Newcastle Disease',
    symptoms: 'Respiratory distress, nervous symptoms, decreased egg production',
    prevention: 'Vaccination, biosecurity measures',
    treatment: 'No specific treatment, infected birds should be culled'
  }, {
    name: 'Avian Influenza',
    symptoms: 'Sudden death, decreased egg production, respiratory symptoms',
    prevention: 'Biosecurity, vaccination, monitoring',
    treatment: 'No treatment, infected flocks must be culled'
  }]
  // More animals would be added here
};
// Mock farm stock categories
export const mockStockCategories = [{
  id: 'crops',
  name: 'Crops'
}, {
  id: 'livestock',
  name: 'Livestock'
}, {
  id: 'poultry',
  name: 'Poultry'
}, {
  id: 'equipment',
  name: 'Equipment'
}, {
  id: 'supplies',
  name: 'Supplies'
}];
// Mock farm stock items
export const mockStockItems = [{
  id: '1',
  userId: '2',
  category: 'crops',
  name: 'Maize',
  quantity: 500,
  unit: 'kg',
  lastUpdated: '2023-10-15'
}, {
  id: '2',
  userId: '2',
  category: 'livestock',
  name: 'Dairy Cows',
  quantity: 12,
  unit: 'animals',
  lastUpdated: '2023-10-14'
}, {
  id: '3',
  userId: '3',
  category: 'poultry',
  name: 'Layers',
  quantity: 200,
  unit: 'birds',
  lastUpdated: '2023-10-10'
}];