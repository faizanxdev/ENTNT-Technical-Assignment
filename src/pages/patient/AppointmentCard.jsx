import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaFileMedical } from 'react-icons/fa6';
import PatientLayout from '../../components/PatientLayout';

const AppointmentCard = () => {
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loginUser'));
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];

    if (user?.role === 'Patient') {
      const current = allPatients.find(p => p.id === user.patientId);
      setPatient(current);

      const patientIncidents = allIncidents
        .filter(i => i.patientId === user.patientId)
        .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

      setIncidents(patientIncidents);

      const future = patientIncidents.find(i => new Date(i.appointmentDate) > new Date());
      setNextAppointment(future || null);

      const upcoming = patientIncidents.filter(i => new Date(i.appointmentDate) > new Date());
      setUpcomingCount(upcoming.length);

      const completed = patientIncidents.filter(i =>
        i.status?.toLowerCase() === 'completed' || i.status?.toLowerCase() === 'done'
      );
      setCompletedCount(completed.length);

      const total = completed.reduce((sum, i) => sum + (parseFloat(i.cost) || 0), 0);
      setTotalSpent(total);
    }
  }, []);

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'done' || s === 'completed') return 'bg-green-100 text-green-700';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <PatientLayout>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-800">
        <h1 className="text-3xl font-bold mb-1">My Appointments & Treatments</h1>
        <p className="text-sm text-gray-500 mb-6">View your appointment history and upcoming visits</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600">📅 Upcoming Appointments</div>
            <div className="text-2xl font-bold mt-2">{upcomingCount}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600">✅ Completed Treatments</div>
            <div className="text-2xl font-bold mt-2">{completedCount}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="text-sm font-medium text-gray-600">💲 Total Spent</div>
            <div className="text-2xl font-bold mt-2 text-green-600">₹{totalSpent.toFixed(2)}</div>
          </div>
        </div>

        {/* Upcoming & History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              Upcoming Appointments
            </h2>
            {nextAppointment ? (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{nextAppointment.title}</div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                    {nextAppointment.status || 'Pending'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <FaCalendarAlt /> {new Date(nextAppointment.appointmentDate).toLocaleString()}
                </div>
                <div className="text-sm mt-1 text-blue-600">
                  <span className="font-medium">Comments:</span> {nextAppointment.description}
                </div>
              </div>
            ) : (
              <h2 className="text-gray-700">No Appointment scheduled.</h2>
            )}
          </div>

          {/* Treatment History */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaFileMedical className="text-green-500" />
              Treatment History
            </h2>
            {incidents.length === 0 ? (
              <h2 className="text-gray-700">No treatment has been done.</h2>
            ) : (
              incidents.map((i) => (
                <div key={i.id} className="bg-gray-50 p-4 rounded-lg border mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{i.title}</div>
                      <div className="text-sm text-gray-600">{i.description}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(i.status)}`}>
                      {i.status || 'None'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <FaCalendarAlt /> {new Date(i.appointmentDate).toLocaleDateString()}
                  </div>
                  <div className="mt-2 text-sm">
                    <strong className="text-gray-700">Treatment:</strong> {i.treatment || 'N/A'}
                  </div>
                  <div className="mt-1 text-sm">
                    <strong className="text-gray-700">Cost:</strong>
                    <span className="text-green-600 font-medium"> ${i.cost}</span>
                  </div>
                  <div className="mt-1 text-sm text-blue-600">
                    <strong>Comments:</strong> {i.comments}
                  </div>

                  {/* Attached Files */}
                  {Array.isArray(i.files) && i.files.length > 0 && (
                    <div className="mt-2">
                      <strong className="text-sm text-gray-700">Attachments:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {i.files.map((file, index) => (
                          <a
                            key={index}
                            href={file.url}
                            download={file.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-gray-300 text-sm px-2 py-1 rounded shadow-sm hover:bg-gray-100"
                          >
                            {file.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default AppointmentCard;
