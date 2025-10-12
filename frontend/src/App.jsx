import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Signup/Login";
import Signup from "./pages/Login/Signup/Signup";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeesPage from "./pages/Employees/EmployeesPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import InventoryPage from "./pages/Inventory/InventoryPage";
import ReportsPage from "./pages/Reports/ReportsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import AttendancePage from "./pages/Attendance/AttendancePage";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Routes>
        {/* 🔹 Layout wrapper for all dashboard pages */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 🔹 Auth pages outside the dashboard layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
