import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/Users/UserList";
import Login from "../pages/Auth/Login";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { user } = useAuth();

  const PrivateRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
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
    </Routes>
  );
}
