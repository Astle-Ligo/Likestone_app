// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ import jwt-decode

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    // 🔹 If no token — redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        // Decode token
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        // 🔹 If token expired
        if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }

        // 🔹 Token is valid — show protected content
        return <Outlet />;
    } catch (err) {
        // If decoding fails (malformed token)
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
