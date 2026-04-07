import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Menu, User } from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-600 shadow-xl px-6 py-3 flex justify-between items-center text-white sticky top-0 z-20">
      {/* Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded hover:bg-white/20 transition-colors"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        {/* Optional avatar icon */}
        <div className="flex items-center space-x-2">
          <User size={28} className="text-white/90" />
          <span className="font-medium text-white">
            {user?.full_name || "Admin"}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition-all font-medium text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
