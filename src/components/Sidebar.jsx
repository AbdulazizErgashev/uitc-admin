import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Building,
  BookOpen,
  Briefcase,
  UserCheck,
  MessageSquare,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // collapsible sidebar toggle

  const menuItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/companies", label: "Companies", icon: Building },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/portfolio", label: "Portfolio", icon: Briefcase },
    { path: "/team", label: "Team", icon: UserCheck },
    { path: "/testimonials", label: "Testimonials", icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">UITC Admin</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      <div
        className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-6 shadow-xl
                       ${isOpen ? "w-64" : "w-16"} transition-all duration-300 relative`}
      >
        {/* Logo / Title */}
        <h1
          className={`text-2xl font-bold mb-10 text-center
                        bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent
                        ${isOpen ? "block" : "hidden"}`}
        >
          UITC Admin
        </h1>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300
                               ${active ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg" : "hover:bg-gray-700 hover:shadow-md"}`}
                  >
                    {/* Active Indicator */}
                    {active && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-tr-lg rounded-br-lg" />
                    )}
                    <Icon size={20} className="mr-3 flex-shrink-0" />
                    <span
                      className={`${isOpen ? "inline" : "hidden"} transition-all duration-200`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-all md:block hidden"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>
    </>
  );
}
