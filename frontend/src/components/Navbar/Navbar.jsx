import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get(`${API_URL}/staff/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(res => {
                setUser(res.data.user);
            })
            .catch(err => console.error(err));


    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
            {/* Left side: Logo or Title */}
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-800">{user?.role || "Admin"} Dashboard</h1>
            </div>

            {/* Right side: User info and dropdown */}
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition"
                >
                    <span>{user?.name || "Admin"}</span>
                    <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
