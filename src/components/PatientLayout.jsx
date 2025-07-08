// src/components/PatientLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PatientLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <header className="bg-blue-700 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-semibold">🦷 Dental Center</h1>
        <div className="space-x-4 text-sm">
          <Link to="/patient/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/patient/profile" className="hover:underline">
            Profile
          </Link>
          <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-[#b1d6e8] via-white to-[#94cfec]">{children}</main>
    </div>
  );
};

export default PatientLayout;
