import React, { useState, useEffect } from 'react';

import { FaUserPlus, FaEdit, FaTrash, FaUsers, FaRegCalendarPlus } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    email: '',
    healthInfo: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const savePatients = (updatedList) => {
    localStorage.setItem('patients', JSON.stringify(updatedList));
    setPatients(updatedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...patients];
      updated[editingIndex] = { ...updated[editingIndex], ...formData };
      savePatients(updated);
      setEditingIndex(null);
    } else {
      const newPatient = {
        id: `p${Date.now()}`,
        ...formData
      };
      savePatients([...patients, newPatient]);
    }
    setFormData({ name: '', dob: '', contact: '', email: '', healthInfo: '' });
  };

  const handleEdit = (index) => {
    setFormData(patients[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...patients];
    updated.splice(index, 1);
    savePatients(updated);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-6">
          <FaUsers className="text-blue-600 text-2xl" />
          <h2 className="text-3xl font-bold text-gray-800">Patient Management</h2>
        </div>

        {/* Patient Form */}
        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-2xl shadow-lg space-y-4 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="date"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact (10-digit)"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
              pattern="\d{10}"
              title="Must be a 10-digit number"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Health Info"
            className="border border-gray-300 p-3 rounded-md w-full"
            value={formData.healthInfo}
            onChange={(e) => setFormData({ ...formData, healthInfo: e.target.value })}
          />
          <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            <FaUserPlus />
            {editingIndex !== null ? 'Update Patient' : 'Add Patient'}
          </button>
        </form>

        {/* Patient Table */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-700">
            <FaRegCalendarPlus className="text-blue-500" />
            📋 All Patients
          </div>
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">DOB</th>
                <th className="p-3 border">Contact</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Health Info</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="p-3 border">{patient.name}</td>
                  <td className="p-3 border">{patient.dob}</td>
                  <td className="p-3 border">{patient.contact}</td>
                  <td className="p-3 border">{patient.email}</td>
                  <td className="p-3 border">{patient.healthInfo}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      className="inline-flex items-center bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-white cursor-pointer"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit className="mr-1 cursor-pointer" /> Edit
                    </button>
                    <button
                      className="inline-flex items-center bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white cursor-pointer"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Patient;
