import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails"
import SubContract from "./pages/SubContract/SubContract";

function App() {

  return (
    <Router>
      <Routes>
        {/* 🔹 Layout wrapper for all dashboard pages */}
        <Route path="/" element={<ProtectedRoute> <DashboardLayout /> </ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="vehicle-details" element={<VehicleDetails />} />
          <Route path="sub-contract" element={<SubContract />} />
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
