import React, { useEffect, useState } from 'react';
import { UploadIcon, CameraIcon, LeafIcon, SearchIcon, AlertCircleIcon, ArrowRightIcon, CheckCircleIcon, BookmarkIcon, ClockIcon, TrashIcon, InfoIcon, BarChartIcon } from 'lucide-react';
import { cropDiseases } from '../utils/diseaseData';
import { useAuth } from '../context/AuthContext';
// Define interfaces for type safety
interface AnalysisResult {
  id?: string;
  disease: any;
  confidence: number;
  message?: string;
  timestamp?: Date;
  cropType?: string;
  imageUrl?: string;
  saved?: boolean;
}
interface ScanHistory {
  id: string;
  cropType: string;
  diseaseName: string | null;
  confidence: number;
  timestamp: Date;
  imageUrl: string;
  saved: boolean;
}
const DiseaseDetection: React.FC = () => {
  const {
    user
  } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('scan');
  // Load scan history from localStorage on component mount
  useEffect(() => {
    if (user) {
      const savedHistory = localStorage.getItem(`scanHistory-${user.id}`);
      if (savedHistory) {
        try {
          // Parse dates correctly from localStorage
          const history = JSON.parse(savedHistory, (key, value) => {
            if (key === 'timestamp') return new Date(value);
            return value;
          });
          setScanHistory(history);
        } catch (e) {
          console.error('Failed to parse scan history:', e);
        }
      }
    }
  }, [user]);
  // Save scan history to localStorage whenever it changes
  useEffect(() => {
    if (user && scanHistory.length > 0) {
      localStorage.setItem(`scanHistory-${user.id}`, JSON.stringify(scanHistory));
    }
  }, [scanHistory, user]);
  const cropOptions = [{
    value: 'coffee',
    label: 'Coffee'
  }, {
    value: 'tea',
    label: 'Tea'
  }, {
    value: 'maize',
    label: 'Maize'
  }, {
    value: 'wheat',
    label: 'Wheat'
  }, {
    value: 'beans',
    label: 'Beans'
  }, {
    value: 'groundnuts',
    label: 'Groundnuts'
  }, {
    value: 'banana',
    label: 'Banana'
  }, {
    value: 'okra',
    label: 'Okra'
  }, {
    value: 'tomato',
    label: 'Tomato'
  }, {
    value: 'cassava',
    label: 'Cassava'
  }];
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
    }
  };
  const handleAnalyze = () => {
    if (!selectedCrop) {
      setError('Please select a crop type first');
      return;
    }
    if (!imageFile) {
      setError('Please upload an image first');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    // Simulate AI analysis with a delay
    setTimeout(() => {
      // For demo purposes, randomly select a disease from the mock data
      const availableDiseases = cropDiseases[selectedCrop as keyof typeof cropDiseases];
      let result: AnalysisResult;
      if (availableDiseases && availableDiseases.length > 0) {
        const randomDisease = availableDiseases[Math.floor(Math.random() * availableDiseases.length)];
        const confidence = Math.floor(Math.random() * 30) + 70; // Random confidence between 70-99%
        result = {
          id: `scan-${Date.now()}`,
          disease: randomDisease,
          confidence,
          timestamp: new Date(),
          cropType: selectedCrop,
          imageUrl: imagePreview || '',
          saved: false
        };
      } else {
        result = {
          id: `scan-${Date.now()}`,
          disease: null,
          message: 'No diseases detected. Plant appears healthy.',
          confidence: 95,
          timestamp: new Date(),
          cropType: selectedCrop,
          imageUrl: imagePreview || '',
          saved: false
        };
      }
      setAnalysisResult(result);
      // Add to scan history
      if (result.disease || result.message) {
        const historyEntry: ScanHistory = {
          id: result.id || `scan-${Date.now()}`,
          cropType: selectedCrop,
          diseaseName: result.disease ? result.disease.name : null,
          confidence: result.confidence,
          timestamp: new Date(),
          imageUrl: imagePreview || '',
          saved: false
        };
        setScanHistory(prev => [historyEntry, ...prev]);
      }
      setIsAnalyzing(false);
    }, 2000);
  };
  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(e.target.value);
    setAnalysisResult(null);
  };
  const resetAnalysis = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setError(null);
  };
  const handleSaveResult = () => {
    if (analysisResult && analysisResult.id) {
      // Update the analysis result
      setAnalysisResult({
        ...analysisResult,
        saved: true
      });
      // Update the scan history
      setScanHistory(prev => prev.map(item => item.id === analysisResult.id ? {
        ...item,
        saved: true
      } : item));
    }
  };
  const handleDeleteFromHistory = (id: string) => {
    setScanHistory(prev => prev.filter(item => item.id !== id));
  };
  const handleViewFromHistory = (historyItem: ScanHistory) => {
    // Find the disease details from our data
    if (historyItem.diseaseName) {
      const diseases = cropDiseases[historyItem.cropType as keyof typeof cropDiseases] || [];
      const disease = diseases.find(d => d.name === historyItem.diseaseName);
      if (disease) {
        setAnalysisResult({
          id: historyItem.id,
          disease,
          confidence: historyItem.confidence,
          cropType: historyItem.cropType,
          imageUrl: historyItem.imageUrl,
          saved: historyItem.saved,
          timestamp: historyItem.timestamp
        });
        setSelectedCrop(historyItem.cropType);
        setImagePreview(historyItem.imageUrl);
        setActiveTab('scan');
      }
    } else {
      setAnalysisResult({
        id: historyItem.id,
        disease: null,
        message: 'No diseases detected. Plant appears healthy.',
        confidence: historyItem.confidence,
        cropType: historyItem.cropType,
        imageUrl: historyItem.imageUrl,
        saved: historyItem.saved,
        timestamp: historyItem.timestamp
      });
      setSelectedCrop(historyItem.cropType);
      setImagePreview(historyItem.imageUrl);
      setActiveTab('scan');
    }
  };
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  return <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">
          Crop Disease Detection
        </h2>
        <p className="text-gray-600 mt-1">
          Upload a photo of your crop to identify potential diseases
        </p>
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('scan')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'scan' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              New Scan
            </button>
            <button onClick={() => setActiveTab('history')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Scan History ({scanHistory.length})
            </button>
          </nav>
        </div>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircleIcon size={16} className="mr-2" />
          <span>{error}</span>
        </div>}
      {activeTab === 'scan' ? <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Select crop */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <LeafIcon size={20} className="text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">
                  Step 1: Select Crop
                </h3>
              </div>
              <select value={selectedCrop} onChange={handleCropChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                <option value="">Select a crop type</option>
                {cropOptions.map(crop => <option key={crop.value} value={crop.value}>
                    {crop.label}
                  </option>)}
              </select>
            </div>
            {/* Step 2: Upload image */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <CameraIcon size={20} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">
                  Step 2: Upload Image
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                  <UploadIcon size={24} className="text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    PNG, JPG up to 5MB
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
            </div>
            {/* Step 3: Analyze */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <SearchIcon size={20} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">
                  Step 3: Analyze
                </h3>
              </div>
              <button onClick={handleAnalyze} disabled={isAnalyzing || !imageFile || !selectedCrop} className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isAnalyzing || !imageFile || !selectedCrop ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`}>
                {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </div>
          {/* Image preview and results */}
          {imagePreview && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image preview */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Uploaded Image
                </h3>
                <div className="relative aspect-w-16 aspect-h-9">
                  <img src={imagePreview} alt="Crop preview" className="rounded-lg object-cover w-full h-64" />
                </div>
                <div className="mt-4 flex justify-between">
                  <button onClick={resetAnalysis} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Upload Different Image
                  </button>
                  {analysisResult && <button onClick={handleSaveResult} disabled={analysisResult.saved} className={`flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${analysisResult.saved ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                      <BookmarkIcon size={16} className="mr-2" />
                      {analysisResult.saved ? 'Saved' : 'Save Result'}
                    </button>}
                </div>
              </div>
              {/* Analysis results */}
              {analysisResult && <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Analysis Results
                    </h3>
                    {analysisResult.timestamp && <span className="text-xs text-gray-500 flex items-center">
                        <ClockIcon size={12} className="mr-1" />
                        {formatDate(analysisResult.timestamp)}
                      </span>}
                  </div>
                  {analysisResult.disease ? <div>
                      <div className="flex items-center mb-4">
                        <div className={`p-2 rounded-full mr-3 ${analysisResult.confidence > 90 ? 'bg-red-100' : 'bg-yellow-100'}`}>
                          <AlertCircleIcon size={20} className={analysisResult.confidence > 90 ? 'text-red-600' : 'text-yellow-600'} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {analysisResult.disease.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {analysisResult.disease.scientificName}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${analysisResult.confidence > 90 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {analysisResult.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-800 mb-2">
                          Symptoms
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {analysisResult.disease.symptoms.map((symptom: string, index: number) => <li key={index} className="flex items-start">
                                <ArrowRightIcon size={14} className="text-gray-400 mr-2 mt-1" />
                                {symptom}
                              </li>)}
                        </ul>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-800 mb-2">
                          Recommended Treatment
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {analysisResult.disease.treatment.map((treatment: string, index: number) => <li key={index} className="flex items-start">
                                <CheckCircleIcon size={14} className="text-green-500 mr-2 mt-1" />
                                {treatment}
                              </li>)}
                        </ul>
                      </div>
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex">
                          <InfoIcon size={20} className="text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-blue-800">
                              Impact Assessment
                            </h5>
                            <p className="text-sm text-blue-700 mt-1">
                              {analysisResult.confidence > 85 ? `This disease can significantly reduce your ${selectedCrop} yield by up to 40% if not treated promptly. Immediate action is recommended.` : `This disease may affect your ${selectedCrop} yield by approximately 15-25% if left untreated. Treatment is recommended within the next week.`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <div className="flex">
                          <BarChartIcon size={20} className="text-green-600 mr-2 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-green-800">
                              Prevention Tips
                            </h5>
                            <ul className="text-sm text-green-700 mt-1 space-y-1">
                              <li>
                                • Ensure proper spacing between plants for
                                adequate air circulation
                              </li>
                              <li>
                                • Implement crop rotation with non-host plants
                              </li>
                              <li>• Use disease-free planting materials</li>
                              <li>
                                • Monitor regularly for early signs of disease
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div> : <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <CheckCircleIcon size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Healthy Plant Detected
                        </h4>
                        <p className="text-sm text-gray-500">
                          No signs of disease found with{' '}
                          {analysisResult.confidence}% confidence
                        </p>
                      </div>
                    </div>}
                </div>}
            </div>}
        </> :
    // History tab content
    <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Your Scan History
          </h3>
          {scanHistory.length === 0 ? <div className="text-center py-8">
              <ClockIcon size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No scan history available yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Your disease detection scans will appear here
              </p>
              <button onClick={() => setActiveTab('scan')} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Start New Scan
              </button>
            </div> : <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-4">
                {scanHistory.map(item => <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row items-center md:items-start">
                    <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden mr-0 md:mr-4 mb-4 md:mb-0">
                      <img src={item.imageUrl} alt={item.cropType} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.cropType.charAt(0).toUpperCase() + item.cropType.slice(1)}
                            {item.diseaseName ? ` - ${item.diseaseName}` : ' - Healthy'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(item.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.diseaseName ? item.confidence > 85 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {item.confidence}% confidence
                          </span>
                          {item.saved && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <BookmarkIcon size={10} className="mr-1" />
                              Saved
                            </span>}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button onClick={() => handleViewFromHistory(item)} className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800">
                          View Details
                        </button>
                        <button onClick={() => handleDeleteFromHistory(item.id)} className="px-3 py-1 text-sm text-red-600 hover:text-red-800 flex items-center">
                          <TrashIcon size={14} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>}
    </div>;
};
export default DiseaseDetection;