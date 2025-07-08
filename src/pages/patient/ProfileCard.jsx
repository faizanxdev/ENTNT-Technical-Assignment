import React, { useEffect, useState } from 'react';
import PatientLayout from '../../components/PatientLayout';
import { FaUserCircle, FaBirthdayCake, FaPhoneAlt, FaEnvelope, FaNotesMedical } from 'react-icons/fa';

const ProfileCard = () => {
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    email: '',
    healthInfo: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loginUser'));
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];

    if (user?.role === 'Patient') {
      const current = allPatients.find(p => p.id === user.patientId);
      if (current) {
        setPatient(current);
        setFormData(current);
      }
    }

    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const updated = allPatients.map(p =>
      p.id === patient?.id ? { ...p, ...formData } : p
    );
    localStorage.setItem('patients', JSON.stringify(updated));
    alert('✅ Profile updated successfully!');
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="p-6 text-center text-gray-500 text-lg animate-pulse">
          Loading profile...
        </div>
      </PatientLayout>
    );
  }

  if (!patient) {
    return (
      <PatientLayout>
        <div className="p-6 text-center text-red-500 font-semibold text-lg">
          ❌ Patient not found.
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 sm:p-10 rounded-3xl shadow-2xl border border-blue-100">
          <div className="flex flex-col items-center mb-8">
            <FaUserCircle className="text-blue-600 text-5xl mb-2" />
            <h2 className="text-3xl font-bold text-blue-900">My Profile</h2>
            <p className="text-sm text-gray-500">Manage and update your personal details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <FormField
              icon={<FaUserCircle />}
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            {/* Date of Birth */}
            <FormField
              icon={<FaBirthdayCake />}
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
            />

            {/* Contact Number */}
            <FormField
              icon={<FaPhoneAlt />}
              label="Contact Number"
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              pattern="\d{10}"
              title="Must be a 10-digit number"
            />

            {/* Email Address */}
            <FormField
              icon={<FaEnvelope />}
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            {/* Health Information */}
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1 flex items-center gap-2">
                <FaNotesMedical /> Health Information
              </label>
              <textarea
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none cursor-pointer"
                rows={4}
                value={formData.healthInfo}
                onChange={(e) => setFormData({ ...formData, healthInfo: e.target.value })}
                placeholder="Mention allergies, ongoing medications, etc."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-200 cursor-pointer"
            >
              💾 Save Changes
            </button>
          </form>
        </div>
      </div>
    </PatientLayout>
  );
};

const FormField = ({ icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-blue-800 mb-1 flex items-center gap-2">
      {icon} {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm cursor-pointer"
    />
  </div>
);

export default ProfileCard;
