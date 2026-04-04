// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Dashboard from "../pages/Dashboard";
import CompanyList from "../pages/Companies/CompanyList";
import CompanyForm from "../pages/Companies/CompanyForm";
import CourseList from "../pages/Courses/CourseList";
import CourseForm from "../pages/Courses/CourseForm";
import PortfolioList from "../pages/Portfolio/PortfolioList";
import PortfolioForm from "../pages/Portfolio/PortfolioForm";
import TeamList from "../pages/Team/TeamList";
import TeamForm from "../pages/Team/TeamForm";
import TestimonialsList from "../pages/Testimonials/TestimonialsList";
import TestimonialsForm from "../pages/Testimonials/TestimonialsForm";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  const { user } = useSelector((state) => state.auth); // Redux store orqali olamiz
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const PrivateRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  const Layout = ({ children }) => (
    <div className="flex">
      {sidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/companies"
        element={
          <PrivateRoute>
            <Layout>
              <CompanyList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/companies/create"
        element={
          <PrivateRoute>
            <Layout>
              <CompanyForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/companies/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CompanyForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <Layout>
              <CourseList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/courses/create"
        element={
          <PrivateRoute>
            <Layout>
              <CourseForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/courses/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CourseForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <PrivateRoute>
            <Layout>
              <PortfolioList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/portfolio/create"
        element={
          <PrivateRoute>
            <Layout>
              <PortfolioForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/portfolio/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <PortfolioForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/team"
        element={
          <PrivateRoute>
            <Layout>
              <TeamList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/team/create"
        element={
          <PrivateRoute>
            <Layout>
              <TeamForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/team/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <TeamForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/testimonials"
        element={
          <PrivateRoute>
            <Layout>
              <TestimonialsList />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/testimonials/create"
        element={
          <PrivateRoute>
            <Layout>
              <TestimonialsForm />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/testimonials/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <TestimonialsForm />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
