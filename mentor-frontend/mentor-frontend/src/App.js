import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import Login from './Pages/common/Login';

// Admin pages
import Matches from './Pages/Admin/Matches';
import Sessions from './Pages/Admin/Sessions';
import User from './Pages/Admin/User';

// Common pages
import LoginPage from './Pages/common/Login';
import ProfileEdit from './Pages/common/ProfileEdit';

// Mentee pages
import Dashboard from './Pages/Mentee/Dashboard';
import Mentors from './Pages/Mentee/Mentors';
import MyRequests from './Pages/Mentee/MyRequests';
import MySessions from './Pages/Mentee/MySessions';

// Mentor pages
import Availability from './Pages/Mentor/Availability';
import DashboardMentor from './Pages/Mentor/Dashboard';
import Requests from './Pages/Mentor/Requests';
import SessionsMentor from './Pages/Mentor/Sessions';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const PrivateRoute = ({ children, requiredRole }) => {
    if (!role) {
      return <Navigate to="/" />;
    }
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />

          {/* Admin routes */}
          <Route
            path="/admin/matches"
            element={
              <PrivateRoute requiredRole="admin">
                <Matches />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/sessions"
            element={
              <PrivateRoute requiredRole="admin">
                <Sessions />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <PrivateRoute requiredRole="admin">
                <User />
              </PrivateRoute>
            }
          />

          {/* Common */}
          <Route path="/common/login" element={<LoginPage />} />
          <Route path="/common/profile-edit" element={<ProfileEdit />} />

          {/* Mentee */}
          <Route
            path="/mentee/dashboard"
            element={
              <PrivateRoute requiredRole="mentee">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentee/mentors"
            element={
              <PrivateRoute requiredRole="mentee">
                <Mentors />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentee/my-requests"
            element={
              <PrivateRoute requiredRole="mentee">
                <MyRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentee/my-sessions"
            element={
              <PrivateRoute requiredRole="mentee">
                <MySessions />
              </PrivateRoute>
            }
          />

          {/* Mentor */}
          <Route
            path="/mentor/availability"
            element={
              <PrivateRoute requiredRole="mentor">
                <Availability />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentor/dashboard"
            element={
              <PrivateRoute requiredRole="mentor">
                <DashboardMentor />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentor/requests"
            element={
              <PrivateRoute requiredRole="mentor">
                <Requests />
              </PrivateRoute>
            }
          />
          <Route
            path="/mentor/sessions"
            element={
              <PrivateRoute requiredRole="mentor">
                <SessionsMentor />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;