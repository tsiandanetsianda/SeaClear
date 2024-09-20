import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password }, { withCredentials: true });
      if (response.data.status === 'success') {
        // Set a flag in localStorage to indicate the user is logged in
        localStorage.setItem('isLoggedIn', 'true');
        // Navigate to the admin dashboard
        navigate('/admin');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" 
         style={{backgroundImage: "url('https://i.postimg.cc/h4x9B7Ts/Beach-Image.jpg')"}}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <button onClick={() => navigate('/')} className="text-white hover:text-gray-300 transition duration-300">
            <X size={24} />
          </button>
        </div>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="w-full bg-white bg-opacity-20 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-3 text-white" size={20} />
            </div>
          </div>
          
          <div>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full bg-white bg-opacity-20 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-3 text-white" size={20} />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-100 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* New button to navigate back to home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;