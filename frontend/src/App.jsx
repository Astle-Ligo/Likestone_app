import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import SuppliersPage from "./pages/Suppliers/SuppliersPage";
import PurchasePage from "./pages/Purchases/PurchasePage";

function App() {

  return (
    <Router>
      <Routes>
        {/* 🔹 Layout wrapper for all dashboard pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="vehicle-details" element={<VehicleDetails />} />
            <Route path="sub-contract" element={<SubContract />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="purchase" element={<PurchasePage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 🔹 Auth pages outside the dashboard layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* 🔔 Global Toast Notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default styles for all toasts
          style: {
            background: "#1f2937", // dark gray (matches dashboard tone)
            color: "#f9fafb", // light text
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "0.95rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            border: "1px solid #374151", // subtle border
          },

          // Success toast
          success: {
            duration: 3000,
            style: {
              background: "#14532d", // dark green
              color: "#dcfce7", // pale green text
              border: "1px solid #22c55e",
            },
            iconTheme: {
              primary: "#22c55e",
              secondary: "#14532d",
            },
          },

          // Error toast
          error: {
            duration: 4000,
            style: {
              background: "#7f1d1d", // dark red
              color: "#fee2e2",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#7f1d1d",
            },
          },
        }}
      />

    </Router>
  );
}

export default App;
