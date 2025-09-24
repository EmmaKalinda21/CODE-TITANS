// Mock data for crop diseases
export const cropDiseases = {
  coffee: [{
    id: 'coffee-leaf-rust',
    name: 'Coffee Leaf Rust',
    scientificName: 'Hemileia vastatrix',
    symptoms: ['Orange-yellow powdery spots on the underside of leaves', 'Yellow spots on the upper surface of leaves', 'Premature leaf drop', 'Reduced yield and quality'],
    treatment: ['Apply copper-based fungicides', 'Plant rust-resistant coffee varieties', 'Maintain proper spacing between plants for good air circulation', 'Remove and destroy infected leaves'],
    imageUrl: 'https://images.unsplash.com/photo-1559741033-d85618ce7e8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'coffee-berry-disease',
    name: 'Coffee Berry Disease',
    scientificName: 'Colletotrichum kahawae',
    symptoms: ['Dark, sunken lesions on green berries', 'Premature fruit drop', 'Mummified berries', 'Reduced yield'],
    treatment: ['Apply fungicides preventatively', 'Plant resistant varieties', 'Prune coffee trees to improve air circulation', 'Maintain field hygiene by removing infected berries'],
    imageUrl: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }],
  maize: [{
    id: 'maize-northern-leaf-blight',
    name: 'Northern Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    symptoms: ['Long, elliptical gray-green or tan lesions on leaves', 'Lesions become tan-brown as they mature', 'Lesions may coalesce to blight entire leaves', 'Lower leaves are affected first'],
    treatment: ['Plant resistant hybrids', 'Apply fungicides if economically feasible', 'Rotate crops with non-host plants', 'Practice good field sanitation'],
    imageUrl: 'https://images.unsplash.com/photo-1530468515069-8bbe68913a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'maize-common-rust',
    name: 'Common Rust',
    scientificName: 'Puccinia sorghi',
    symptoms: ['Small, circular to elongated cinnamon-brown pustules on both leaf surfaces', 'Pustules turn black as the plant matures', 'Severe infections cause leaf yellowing and death', 'Reduced grain fill and yield'],
    treatment: ['Plant resistant hybrids', 'Apply fungicides early in the season', 'Monitor fields regularly', 'Maintain proper plant nutrition'],
    imageUrl: 'https://images.unsplash.com/photo-1601329098780-c2e9cdd7c8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }],
  tomato: [{
    id: 'tomato-late-blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    symptoms: ['Dark, water-soaked lesions on leaves', 'White, fuzzy growth on undersides of leaves', 'Brown lesions on stems', 'Firm, dark, greasy spots on fruits'],
    treatment: ['Apply fungicides preventatively', 'Plant resistant varieties', 'Avoid overhead irrigation', 'Remove and destroy infected plants', 'Ensure good air circulation'],
    imageUrl: 'https://images.unsplash.com/photo-1592985684811-6c0f98adb014?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'tomato-early-blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    symptoms: ['Dark, concentric rings on lower leaves', 'Yellowing around the lesions', 'Premature leaf drop', 'Sunken, leathery spots on fruits'],
    treatment: ['Apply fungicides at first sign of disease', 'Practice crop rotation', 'Remove lower infected leaves', 'Mulch around plants', 'Ensure adequate plant spacing'],
    imageUrl: 'https://images.unsplash.com/photo-1592576125572-18c93540e450?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }]
};
// Mock data for animal diseases
export const animalDiseases = {
  cow: [{
    id: 'cow-mastitis',
    name: 'Mastitis',
    symptoms: ['Swollen, hard udder', 'Painful udder when touched', 'Abnormal milk (watery, clots, flakes)', 'Reduced milk production', 'Fever in severe cases'],
    treatment: ['Isolate affected animals', 'Administer antibiotics as prescribed by veterinarian', 'Frequent milking of affected quarters', 'Apply warm compresses', 'Ensure clean housing conditions'],
    prevention: ['Maintain clean milking equipment', 'Practice good hygiene during milking', 'Regularly check udder health', 'Cull chronically infected cows', 'Proper nutrition and housing'],
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'cow-foot-and-mouth',
    name: 'Foot and Mouth Disease',
    symptoms: ['Fever', 'Blisters on tongue, lips, mouth, teats, and feet', 'Excessive salivation', 'Lameness', 'Reduced feed intake and milk production'],
    treatment: ['No specific treatment available', 'Supportive care: soft food, clean water', 'Anti-inflammatory medications for comfort', 'Foot baths for affected hooves', 'Notify authorities immediately (reportable disease)'],
    prevention: ['Regular vaccination', 'Strict biosecurity measures', 'Control movement of animals', 'Quarantine new animals', 'Disinfect equipment and vehicles'],
    imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }],
  chicken: [{
    id: 'chicken-newcastle',
    name: 'Newcastle Disease',
    symptoms: ['Respiratory distress (gasping, coughing)', 'Nervous signs (tremors, twisted neck, paralysis)', 'Greenish diarrhea', 'Drop in egg production', 'Sudden death'],
    treatment: ['No specific treatment', 'Supportive care with antibiotics to prevent secondary infections', 'Electrolytes in water', 'Isolate affected birds', 'Notify authorities (reportable disease)'],
    prevention: ['Regular vaccination', 'Strict biosecurity measures', 'Control wild bird access to poultry', 'Proper disposal of dead birds', 'Clean and disinfect housing regularly'],
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 'chicken-coccidiosis',
    name: 'Coccidiosis',
    symptoms: ['Bloody diarrhea', 'Ruffled feathers', 'Weight loss', 'Pale combs and wattles', 'Reduced feed intake'],
    treatment: ['Anticoccidial medications in feed or water', 'Supportive care with vitamins and electrolytes', 'Improve housing conditions', 'Separate affected birds', 'Clean and disinfect housing'],
    prevention: ['Use anticoccidial medications preventatively', 'Maintain dry litter conditions', 'Avoid overcrowding', 'Practice good sanitation', 'Rotate anticoccidial drugs to prevent resistance'],
    imageUrl: 'https://images.unsplash.com/photo-1569317082982-25b5e490b147?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  }]
};
// Mock weather data
export const weatherForecast = [{
  date: '2023-06-20',
  temperature: {
    min: 18,
    max: 25
  },
  condition: 'Sunny',
  humidity: 60,
  rainChance: 10,
  icon: 'sun'
}, {
  date: '2023-06-21',
  temperature: {
    min: 17,
    max: 26
  },
  condition: 'Partly Cloudy',
  humidity: 65,
  rainChance: 20,
  icon: 'cloud-sun'
}, {
  date: '2023-06-22',
  temperature: {
    min: 19,
    max: 27
  },
  condition: 'Cloudy',
  humidity: 70,
  rainChance: 30,
  icon: 'cloud'
}, {
  date: '2023-06-23',
  temperature: {
    min: 20,
    max: 28
  },
  condition: 'Light Rain',
  humidity: 75,
  rainChance: 60,
  icon: 'cloud-rain'
}, {
  date: '2023-06-24',
  temperature: {
    min: 19,
    max: 25
  },
  condition: 'Thunderstorms',
  humidity: 80,
  rainChance: 70,
  icon: 'cloud-lightning'
}, {
  date: '2023-06-25',
  temperature: {
    min: 17,
    max: 23
  },
  condition: 'Light Rain',
  humidity: 75,
  rainChance: 50,
  icon: 'cloud-drizzle'
}, {
  date: '2023-06-26',
  temperature: {
    min: 16,
    max: 22
  },
  condition: 'Partly Cloudy',
  humidity: 65,
  rainChance: 20,
  icon: 'cloud-sun'
}];