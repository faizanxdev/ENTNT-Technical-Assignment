import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import AppointmentCard from './pages/patient/AppointmentCard';
import ProfileCard from './pages/patient/ProfileCard';

import AdminDashboard from './pages/admin/AdminDashboard';
import Patient from './pages/admin/Patient';
import Incidents from './pages/admin/Incidents';
import CalendarView from './pages/admin/CalenderView';

import ErrorBoundary from './components/ErrorBoundary'; //erorr handler

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <ErrorBoundary>
                <AdminDashboard />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <ErrorBoundary>
                <Patient />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/incident/:patientId" 
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <ErrorBoundary>
                <Incidents />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/calendar"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <ErrorBoundary>
                <CalendarView />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />

        {/* Patient routes */}
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Patient']}>
              <ErrorBoundary>
                <AppointmentCard />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute allowedRoles={['Patient']}>
              <ErrorBoundary>
                <ProfileCard />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />

        {/* Optional 404 route */}
        <Route path="*" element={<div className="text-center p-6 text-red-500 font-semibold">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
