import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building, BookOpen, Briefcase, UserCheck, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/companies', label: 'Companies', icon: Building },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { path: '/team', label: 'Team', icon: UserCheck },
    { path: '/testimonials', label: 'Testimonials', icon: MessageSquare },
  ];

  return (
    <div className="bg-linear-to-b from-gray-900 to-gray-800 text-white w-64 min-h-screen p-6 shadow-xl">
      <h1 className="text-2xl font-bold mb-10 text-center bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        UITC Admin
      </h1>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-linear-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'hover:bg-gray-700 hover:shadow-md'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
