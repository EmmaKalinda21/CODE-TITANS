import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        // Check user type to redirect
        if (email === 'emmaderek80@gmail.com') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
        toast.success('Login successful!');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')"
  }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <img src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" alt="Farm AI Logo" className="h-16 w-16 rounded-full mx-auto" />
          <h2 className="text-2xl font-bold text-green-800 mt-2">Farm AI</h2>
          <p className="text-gray-600">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter your password" />
              <button type="button" className="absolute right-3 top-2.5 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:text-green-800 font-medium">
              Sign up
            </Link>
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            For demo purposes: Admin login with emmaderek80@gmail.com / Emma123
          </p>
        </div>
      </div>
    </div>;
};
export default Login;