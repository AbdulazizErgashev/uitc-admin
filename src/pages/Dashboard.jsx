import React from "react";
import { useCompanies } from "../hooks/useCompanies";
import { useCourses } from "../hooks/useCourses";
import { useTestimonials } from "../hooks/useTestimonials";
import { usePortfolio } from "../hooks/usePortfolio";

export default function Dashboard() {
  const { data: companies } = useCompanies();
  const { data: courses } = useCourses();
  const { data: testimonials } = useTestimonials();
  const { data: portfolio } = usePortfolio();

  const stats = [
    {
      label: "Companies",
      value: companies?.length || 0,
      color: "from-green-400 to-green-600",
    },
    {
      label: "Courses",
      value: courses?.length || 0,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Testimonials",
      value: testimonials?.length || 0,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      label: "Portfolio Items",
      value: portfolio?.length || 0,
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-600 mb-2">
                {stat.label}
              </h2>
              <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${stat.color}`}
            >
              <span className="text-white font-bold text-xl">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
