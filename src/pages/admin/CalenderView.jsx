import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaClock, FaClipboardList } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('incidents')) || [];
    console.log('📅 Loaded incidents:', stored);
    setIncidents(stored);
  }, []);

  const getAppointmentsForDate = (date) => {
    return incidents.filter((incident) => {
      const apptDate = new Date(incident.appointmentDate);
      return apptDate.toDateString() === date.toDateString();
    });
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const appointments = getAppointmentsForDate(date);
      return appointments.length > 0 ? (
        <div className="text-blue-600 text-xs mt-1">
          {appointments.slice(0, 2).map((appt, idx) => (
            <div key={idx} className="truncate">• {appt.title}</div>
          ))}
          {appointments.length > 2 && (
            <div className="text-gray-400">+{appointments.length - 2} more</div>
          )}
        </div>
      ) : null;
    }
    return null;
  };

  const selectedAppointments = getAppointmentsForDate(selectedDate);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaCalendarAlt className="text-blue-700 text-3xl" />
          <h2 className="text-3xl font-bold text-gray-800">Appointment Calendar</h2>
        </div>

        {/* Calendar Section */}
        <div className="bg-white p-5 rounded-2xl shadow-lg max-w-3xl mb-8">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            className="w-full calendar-custom"
          />
        </div>

        {/* Appointments List */}
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaClipboardList className="text-blue-600" />
            Appointments on {selectedDate.toDateString()}
          </h3>

          {selectedAppointments.length === 0 ? (
            <p className="text-gray-500 italic">No appointments on this date.</p>
          ) : (
            <ul className="space-y-4">
              {selectedAppointments.map((appt, idx) => (
                <li key={idx} className="border rounded-xl p-4 shadow-sm bg-gray-50">
                  <h4 className="text-lg font-bold text-blue-800 mb-1">{appt.title}</h4>
                  <p className="text-sm text-gray-700">{appt.description}</p>
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="block">Status: <strong>{appt.status || 'N/A'}</strong></span>
                    <span className="flex items-center gap-1 mt-1">
                      <FaClock className="text-gray-500" />
                      {new Date(appt.appointmentDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CalendarView;
