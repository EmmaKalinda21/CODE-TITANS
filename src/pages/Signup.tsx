import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    location: '',
    farmName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    signup
  } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const success = await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : undefined,
        location: formData.location,
        farmName: formData.farmName,
        type: 'user' // All new signups are regular users
      });
      if (success) {
        toast.success('Account created successfully!');
        navigate('/login');
      } else {
        toast.error('Email already exists');
      }
    } catch (error) {
      toast.error('An error occurred during signup');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-cover bg-center py-8" style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')"
  }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <img src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" alt="Farm AI Logo" className="h-16 w-16 rounded-full mx-auto" />
          <h2 className="text-2xl font-bold text-green-800 mt-2">Farm AI</h2>
          <p className="text-gray-600">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter your full name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter your email" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Create password" />
                  <button type="button" className="absolute right-3 top-2.5 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Confirm password" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Your age" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input id="location" name="location" type="text" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Your location" />
              </div>
            </div>
            <div>
              <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-1">
                Farm Name
              </label>
              <input id="farmName" name="farmName" type="text" value={formData.farmName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Your farm's name" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 mt-4">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default Signup;