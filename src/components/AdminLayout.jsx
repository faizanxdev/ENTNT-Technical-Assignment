import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUserInjured, FaCalendarAlt, FaSignOutAlt , FaNotesMedical } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-md">
        <div className="p-5 text-2xl font-bold border-b border-blue-700 flex items-center gap-2">
          🦷 Admin Panel
        </div>

        <nav className="flex-1 px-4 py-6 space-y-4 text-base">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:text-yellow-300 transition-all"
          >
            <FaTachometerAlt className="text-lg" /> Dashboard
          </Link>
          <Link
            to="/admin/patients"
            className="flex items-center gap-2 hover:text-yellow-300 transition-all"
          >
            <FaUserInjured className="text-lg" /> Manage Patients
          </Link>
          <Link
            to="/admin/calendar"
            className="flex items-center gap-2 hover:text-yellow-300 transition-all"
          >
            <FaCalendarAlt className="text-lg" /> Calendar
          </Link>
          <Link
            to="/admin/incidents"
            className="flex items-center gap-2 hover:text-yellow-300 transition-all"
          >
            <FaNotesMedical className="text-lg" /> Manage Incidents
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-sm cursor-pointer flex items-center justify-center gap-2 transition"
          >
            <FaSignOutAlt className="text-md" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 bg-gradient-to-br from-[#b1d6e8] via-white to-[#94cfec]">{children}</main>
    </div>
  );
};

export default AdminLayout;
