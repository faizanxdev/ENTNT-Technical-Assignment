// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = authenticate(email, password);

    if (result.success) {
      const user = result.user;
      if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'Patient') {
        navigate('/patient/dashboard');
      }
    } else {
      setError(result.message);
    }
  };

  const quickLogin = (role) => { // demo login
    if (role === 'Admin') {
      setEmail('admin@entnt.in');
      setPassword('admin123');
    } else {
      setEmail('john@entnt.in');
      setPassword('patient123');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#b1d6e8] via-white to-[#94cfec] px-4 sm:px-6 md:px-10">
      {/* Heading */}
      <div className="flex items-center justify-center gap-4 mb-8 px-4">
        
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900">Dental Care</h1>
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-700 mt-1">
            Advanced Dental Management System
          </h3>
          <h4 className="text-xs sm:text-sm text-gray-500">Secure & Professional Platform</h4>
        </div>
      </div>

      {/* Card */}
      <div className="bg-gradient-to-br from-[#f5faff] via-[#e6ecef] to-[#c4d5ef] rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Welcome Back</h2>
          <h4 className="text-xs sm:text-sm text-blue-900 mt-1">
            Sign in to access your dental practice
          </h4>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-800">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="mt-1 w-full px-4 py-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Quick Demo Access */}
        <div className="pt-4 text-center">
          <h5 className="text-xs sm:text-sm font-medium text-blue-900 mb-2">QUICK DEMO ACCESS</h5>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={() => quickLogin('Admin')}
              className="bg-white text-blue-900 px-4 py-2 rounded-lg border border-blue-400 hover:bg-blue-100"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => quickLogin('Patient')}
              className="bg-white text-blue-900 px-4 py-2 rounded-lg border border-blue-400 hover:bg-blue-100"
            >
              Patient
            </button>
          </div>
        </div>
      </div>

      <div className="text-center my-6 px-4">
        <h4 className="text-sm sm:text-base font-medium text-gray-700">
          Demo credentials are pre-filled for testing
        </h4>
        <h3 className="text-xs sm:text-sm text-blue-900">
          Powered by Advanced Dental Technology
        </h3>
      </div>
    </div>
  );
};

export default LoginPage;
