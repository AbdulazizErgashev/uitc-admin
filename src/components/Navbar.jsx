import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="bg-linear-to-r from-blue-600 to-purple-600 shadow-lg px-6 py-3 flex justify-between items-center text-white">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded hover:bg-white/10 transition-colors"
      >
        <Menu size={24} />
      </button>
      <div className="flex items-center space-x-4">
        <span className="font-medium">Welcome, {user?.full_name || 'Admin'}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
