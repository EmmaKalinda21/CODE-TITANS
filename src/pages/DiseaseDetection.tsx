import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { useVoice } from '../context/VoiceContext';
import { CameraIcon, UploadIcon } from 'lucide-react';
import { toast } from 'sonner';
import { mockCropDiseases, mockAnimalDiseases } from '../utils/mockData';
type DetectionType = 'crop' | 'animal' | 'poultry';
type DetectionResult = {
  name: string;
  symptoms: string;
  prevention: string;
  treatment: string;
  confidence: number;
};
const DiseaseDetection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<DetectionType>('crop');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    speak
  } = useVoice();
  const cropOptions = ['coffee', 'tea', 'maize', 'wheat', 'sorghum', 'beans', 'banana', 'groundnuts', 'okra', 'tomatoes', 'cassava', 'sugarcane', 'greens', 'red pepper', 'green pepper'];
  const animalOptions = ['cow', 'sheep', 'goat', 'pig', 'horse'];
  const poultryOptions = ['chicken', 'duck', 'ostrich', 'pigeon'];
  const speciesOptions = selectedType === 'crop' ? cropOptions : selectedType === 'animal' ? animalOptions : poultryOptions;
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    toast.info('Camera functionality would be implemented here');
  };
  const analyzeImage = () => {
    if (!image || !selectedSpecies) {
      toast.error('Please select a species and upload an image');
      return;
    }
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      let detectionResult: DetectionResult | null = null;
      if (selectedType === 'crop') {
        const diseases = mockCropDiseases[selectedSpecies as keyof typeof mockCropDiseases];
        if (diseases && diseases.length > 0) {
          const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
          detectionResult = {
            ...randomDisease,
            confidence: Math.floor(Math.random() * 30) + 70 // 70-99%
          };
        }
      } else {
        const diseases = mockAnimalDiseases[selectedSpecies as keyof typeof mockAnimalDiseases];
        if (diseases && diseases.length > 0) {
          const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
          detectionResult = {
            ...randomDisease,
            confidence: Math.floor(Math.random() * 30) + 70 // 70-99%
          };
        }
      }
      if (!detectionResult) {
        detectionResult = {
          name: 'Healthy',
          symptoms: 'No symptoms detected',
          prevention: 'Continue with good farming practices',
          treatment: 'No treatment needed',
          confidence: 95
        };
      }
      setResult(detectionResult);
      setIsAnalyzing(false);
    }, 2000);
  };
  const handleReset = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const speakResult = () => {
    if (result) {
      const text = `Disease detected: ${result.name}. Symptoms: ${result.symptoms}. Prevention: ${result.prevention}. Treatment: ${result.treatment}.`;
      speak(text);
    }
  };
  return <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Disease Detection
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Analyze Your Crops and Animals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Type
                  </label>
                  <div className="flex space-x-4">
                    <button onClick={() => {
                    setSelectedType('crop');
                    setSelectedSpecies('');
                  }} className={`px-4 py-2 rounded-md ${selectedType === 'crop' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                      Crop
                    </button>
                    <button onClick={() => {
                    setSelectedType('animal');
                    setSelectedSpecies('');
                  }} className={`px-4 py-2 rounded-md ${selectedType === 'animal' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                      Animal
                    </button>
                    <button onClick={() => {
                    setSelectedType('poultry');
                    setSelectedSpecies('');
                  }} className={`px-4 py-2 rounded-md ${selectedType === 'poultry' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                      Poultry
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Species
                  </label>
                  <select value={selectedSpecies} onChange={e => setSelectedSpecies(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                    <option value="">Select {selectedType}</option>
                    {speciesOptions.map(option => <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>)}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <UploadIcon size={18} className="mr-2" />
                      Upload Image
                    </button>
                    <button onClick={handleCameraCapture} className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                      <CameraIcon size={18} className="mr-2" />
                      Take Photo
                    </button>
                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                </div>
                {image && <div className="mb-6">
                    <div className="relative">
                      <img src={image} alt="Uploaded" className="w-full h-48 object-cover rounded-md" />
                      <button onClick={handleReset} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600" aria-label="Remove image">
                        <div size={16} />
                      </button>
                    </div>
                  </div>}
                <div className="flex space-x-4">
                  <button onClick={analyzeImage} disabled={!image || !selectedSpecies || isAnalyzing} className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex-grow`}>
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                  </button>
                </div>
              </div>
              <div className={`bg-gray-50 p-6 rounded-md ${!result && 'flex items-center justify-center'}`}>
                {result ? <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Detection Results
                      </h3>
                      <button onClick={speakResult} className="flex items-center p-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200" aria-label="Speak results">
                        <div size={18} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 font-medium">
                          Condition:
                        </span>
                        <span className="text-gray-900 font-bold">
                          {result.name}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div className={`h-2.5 rounded-full ${result.name === 'Healthy' ? 'bg-green-600' : 'bg-red-600'}`} style={{
                      width: `${result.confidence}%`
                    }}></div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {result.confidence}% confidence
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Symptoms:
                        </h4>
                        <p className="text-gray-600">{result.symptoms}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Prevention:
                        </h4>
                        <p className="text-gray-600">{result.prevention}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">
                          Treatment:
                        </h4>
                        <p className="text-gray-600">{result.treatment}</p>
                      </div>
                    </div>
                  </div> : <div className="text-center text-gray-500">
                    <img src="https://images.unsplash.com/photo-1592496001020-d31bd830651f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&h=120&q=80" alt="Disease Detection" className="w-24 h-24 mx-auto mb-4 rounded-full object-cover" />
                    <p>Upload an image and select species to detect diseases</p>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default DiseaseDetection;