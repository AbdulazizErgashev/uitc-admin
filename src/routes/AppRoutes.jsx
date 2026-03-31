// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "../pages/Dashboard";
import UserList from "../pages/Users/UserList";
import Login from "../pages/Auth/Login";

export default function AppRoutes() {
  const { user } = useSelector((state) => state.auth); // Redux store orqali olamiz

  const PrivateRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute role="admin">
            <UserList />
          </PrivateRoute>
        }
      />
      {/* Keyinchalik: /companies, /courses, /portfolio va boshqalar */}
    </Routes>
  );
}
