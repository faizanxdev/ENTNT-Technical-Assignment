import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

import { FaUserInjured, FaCalendarAlt, FaTooth, FaMoneyBillWave, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [completedTreatments, setCompletedTreatments] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const incidents = JSON.parse(localStorage.getItem('incidents')) || [];

    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const upcoming = incidents.filter(i => new Date(i.appointmentDate) > today);
    const completed = incidents.filter(
      i => i.status?.toLowerCase() === 'completed' || i.status?.toLowerCase() === 'done'
    );
    const revenue = incidents.reduce((sum, i) => {
      const date = new Date(i.appointmentDate);
      const cost = parseFloat(i.cost) || 0;
      return (date.getMonth() === thisMonth && date.getFullYear() === thisYear) ? sum + cost : sum;
    }, 0);

    setTotalPatients(patients.length);
    setUpcomingAppointments(upcoming.length);
    setCompletedTreatments(completed.length);
    setMonthlyRevenue(revenue);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loginUser');
    window.location.href = '/login';
  };

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen px-6 py-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 tracking-tight">🦷 Admin Dashboard</h1>
          
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPIBox icon={<FaUserInjured size={28} className="text-blue-500" />} label="Total Patients" value={totalPatients} />
          <KPIBox icon={<FaCalendarAlt size={28} className="text-green-500" />} label="Upcoming Appointments" value={upcomingAppointments} />
          <KPIBox icon={<FaTooth size={28} className="text-purple-500" />} label="Completed Treatments" value={completedTreatments} />
          <KPIBox icon={<FaMoneyBillWave size={28} className="text-yellow-500" />} label="Monthly Revenue (₹)" value={monthlyRevenue.toLocaleString()} />
        </div>
      </div>
    </AdminLayout>
  );
};

const KPIBox = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition duration-300 border border-gray-100">
    <div className="flex justify-center mb-2">{icon}</div>
    <div className="text-sm text-gray-600 font-medium">{label}</div>
    <div className="text-3xl font-bold text-blue-800 mt-1">{value}</div>
  </div>
);

export default AdminDashboard;
