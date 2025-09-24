import React, { useState } from 'react';
import { PawPrintIcon, SearchIcon, AlertCircleIcon, ArrowRightIcon, CheckCircleIcon, CameraIcon, UploadIcon } from 'lucide-react';
import { animalDiseases } from '../utils/diseaseData';
const AnimalHealth: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('symptom-checker');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const animalOptions = [{
    value: 'cow',
    label: 'Cow'
  }, {
    value: 'sheep',
    label: 'Sheep'
  }, {
    value: 'goat',
    label: 'Goat'
  }, {
    value: 'chicken',
    label: 'Chicken'
  }, {
    value: 'duck',
    label: 'Duck'
  }];
  // Combine all symptoms from all animals
  const allSymptoms = Object.values(animalDiseases).flatMap(diseases => diseases.flatMap(disease => disease.symptoms));
  // Remove duplicates
  const uniqueSymptoms = Array.from(new Set(allSymptoms));
  const filteredSymptoms = uniqueSymptoms.filter(symptom => symptom.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAnimal(e.target.value);
    setSelectedSymptoms([]);
    setDiagnosisResult(null);
  };
  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
    setDiagnosisResult(null);
  };
  const handleDiagnose = () => {
    if (!selectedAnimal || selectedSymptoms.length === 0) {
      return;
    }
    // Simple mock diagnosis algorithm
    // In a real app, this would be a much more sophisticated AI-based system
    const animalDiseasesData = animalDiseases[selectedAnimal as keyof typeof animalDiseases] || [];
    if (animalDiseasesData.length === 0) {
      setDiagnosisResult({
        disease: null,
        message: 'No diseases found for the selected animal type.'
      });
      return;
    }
    // Calculate a simple match score for each disease
    const diagnosisResults = animalDiseasesData.map(disease => {
      const matchingSymptoms = disease.symptoms.filter(symptom => selectedSymptoms.includes(symptom));
      const matchScore = matchingSymptoms.length / disease.symptoms.length;
      return {
        disease,
        matchScore,
        matchingSymptoms
      };
    });
    // Find the disease with the highest match score
    const bestMatch = diagnosisResults.reduce((best, current) => current.matchScore > best.matchScore ? current : best, {
      matchScore: 0
    });
    if (bestMatch.matchScore >= 0.3) {
      setDiagnosisResult({
        disease: bestMatch.disease,
        matchScore: Math.round(bestMatch.matchScore * 100),
        matchingSymptoms: bestMatch.matchingSymptoms
      });
    } else {
      setDiagnosisResult({
        disease: null,
        message: 'No clear diagnosis found. Consider consulting a veterinarian.'
      });
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleImageAnalysis = () => {
    if (!imageFile || !selectedAnimal) return;
    setIsAnalyzing(true);
    // Simulate AI analysis with a delay
    setTimeout(() => {
      // For demo purposes, randomly select a disease from the mock data
      const availableDiseases = animalDiseases[selectedAnimal as keyof typeof animalDiseases];
      if (availableDiseases && availableDiseases.length > 0) {
        const randomDisease = availableDiseases[Math.floor(Math.random() * availableDiseases.length)];
        setDiagnosisResult({
          disease: randomDisease,
          matchScore: Math.floor(Math.random() * 30) + 70 // Random confidence between 70-99%
        });
      } else {
        setDiagnosisResult({
          disease: null,
          message: 'No diseases detected. Animal appears healthy.'
        });
      }
      setIsAnalyzing(false);
    }, 2000);
  };
  const resetAnalysis = () => {
    setImageFile(null);
    setImagePreview(null);
    setDiagnosisResult(null);
  };
  return <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Animal Health</h2>
        <p className="text-gray-600 mt-1">
          Identify and manage livestock health issues
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-6 py-4 text-sm font-medium ${activeTab === 'symptom-checker' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('symptom-checker')}>
            Symptom Checker
          </button>
          <button className={`px-6 py-4 text-sm font-medium ${activeTab === 'image-analysis' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('image-analysis')}>
            Image Analysis
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'symptom-checker' ? <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1: Select animal */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <PawPrintIcon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Step 1: Select Animal
                    </h3>
                  </div>
                  <select value={selectedAnimal} onChange={handleAnimalChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                    <option value="">Select an animal</option>
                    {animalOptions.map(animal => <option key={animal.value} value={animal.value}>
                        {animal.label}
                      </option>)}
                  </select>
                </div>
                {/* Step 2: Select symptoms */}
                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <AlertCircleIcon size={20} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Step 2: Select Symptoms
                    </h3>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search symptoms..." className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
                      <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                  </div>
                  <div className="h-48 overflow-y-auto border border-gray-200 rounded-md p-2">
                    {filteredSymptoms.length > 0 ? <div className="space-y-1">
                        {filteredSymptoms.map((symptom, index) => <div key={index} className={`flex items-center p-2 rounded-md cursor-pointer ${selectedSymptoms.includes(symptom) ? 'bg-green-100' : 'hover:bg-gray-50'}`} onClick={() => toggleSymptom(symptom)}>
                            <input type="checkbox" checked={selectedSymptoms.includes(symptom)} onChange={() => {}} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">
                              {symptom}
                            </span>
                          </div>)}
                      </div> : <div className="flex items-center justify-center h-full text-gray-500">
                        No symptoms found matching your search
                      </div>}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button onClick={handleDiagnose} disabled={!selectedAnimal || selectedSymptoms.length === 0} className={`px-6 py-3 rounded-md shadow-sm text-sm font-medium ${!selectedAnimal || selectedSymptoms.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`}>
                  Diagnose
                </button>
              </div>
              {selectedSymptoms.length > 0 && <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Selected Symptoms:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom, index) => <div key={index} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                        {symptom}
                        <button onClick={() => toggleSymptom(symptom)} className="ml-1 text-green-600 hover:text-green-800">
                          ×
                        </button>
                      </div>)}
                  </div>
                </div>}
            </div> : <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image upload */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <CameraIcon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Upload Image
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <select value={selectedAnimal} onChange={handleAnimalChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                      <option value="">Select an animal</option>
                      {animalOptions.map(animal => <option key={animal.value} value={animal.value}>
                          {animal.label}
                        </option>)}
                    </select>
                    <label className="block w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                      <UploadIcon size={24} className="text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        Click to upload or drag and drop
                      </span>
                      <span className="mt-1 text-xs text-gray-400">
                        PNG, JPG up to 5MB
                      </span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                    {imagePreview && <div className="mt-4">
                        <img src={imagePreview} alt="Animal preview" className="rounded-lg object-cover w-full h-48" />
                        <div className="flex justify-between mt-2">
                          <button onClick={resetAnalysis} className="text-sm text-gray-600 hover:text-gray-800">
                            Remove image
                          </button>
                          <button onClick={handleImageAnalysis} disabled={isAnalyzing || !selectedAnimal} className={`px-4 py-2 rounded-md text-sm font-medium ${isAnalyzing || !selectedAnimal ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                          </button>
                        </div>
                      </div>}
                  </div>
                </div>
              </div>
            </div>}
          {/* Diagnosis results */}
          {diagnosisResult && <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">
                  Diagnosis Results
                </h3>
              </div>
              <div className="p-6">
                {diagnosisResult.disease ? <div className="space-y-6">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full mr-4 ${diagnosisResult.matchScore > 85 ? 'bg-red-100' : diagnosisResult.matchScore > 70 ? 'bg-yellow-100' : 'bg-orange-100'}`}>
                        <AlertCircleIcon size={24} className={diagnosisResult.matchScore > 85 ? 'text-red-600' : diagnosisResult.matchScore > 70 ? 'text-yellow-600' : 'text-orange-600'} />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-gray-800">
                          {diagnosisResult.disease.name}
                        </h4>
                        <p className="text-gray-500 mt-1">
                          Confidence:{' '}
                          <span className="font-medium">
                            {diagnosisResult.matchScore}%
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-md font-medium text-gray-800 mb-2">
                        Symptoms
                      </h5>
                      <ul className="space-y-2">
                        {diagnosisResult.disease.symptoms.map((symptom: string, index: number) => <li key={index} className="flex items-start">
                              <ArrowRightIcon size={16} className="text-gray-400 mr-2 mt-1" />
                              <span className={`text-gray-700 ${diagnosisResult.matchingSymptoms?.includes(symptom) ? 'font-medium' : ''}`}>
                                {symptom}
                                {diagnosisResult.matchingSymptoms?.includes(symptom) && <span className="ml-2 text-sm text-green-600">
                                    (Reported)
                                  </span>}
                              </span>
                            </li>)}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-md font-medium text-gray-800 mb-2">
                        Treatment
                      </h5>
                      <ul className="space-y-2">
                        {diagnosisResult.disease.treatment.map((treatment: string, index: number) => <li key={index} className="flex items-start">
                              <CheckCircleIcon size={16} className="text-green-500 mr-2 mt-1" />
                              <span className="text-gray-700">{treatment}</span>
                            </li>)}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-md font-medium text-gray-800 mb-2">
                        Prevention
                      </h5>
                      <ul className="space-y-2">
                        {diagnosisResult.disease.prevention.map((prevention: string, index: number) => <li key={index} className="flex items-start">
                              <CheckCircleIcon size={16} className="text-blue-500 mr-2 mt-1" />
                              <span className="text-gray-700">
                                {prevention}
                              </span>
                            </li>)}
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircleIcon size={20} className="text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">
                            Important Note
                          </p>
                          <p className="text-sm text-yellow-700 mt-1">
                            This is an AI-assisted diagnosis and should not
                            replace professional veterinary advice. Please
                            consult a veterinarian for proper diagnosis and
                            treatment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> : <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <AlertCircleIcon size={48} className="mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-800 mb-2">
                        No Clear Diagnosis
                      </h4>
                      <p className="text-gray-600 max-w-md">
                        {diagnosisResult.message || "We couldn't determine a clear diagnosis based on the provided information. Please consult a veterinarian."}
                      </p>
                    </div>
                  </div>}
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default AnimalHealth;