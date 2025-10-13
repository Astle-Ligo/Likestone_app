import React, { useEffect } from "react";
import * as Icons from "lucide-react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const sidebarData = [
        { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
        { name: "Employees", icon: "Users", path: "/employees" },
        { name: "Attendance", icon: "CalendarDays", path: "/attendance" },
        { name: "Projects", icon: "Building", path: "/projects" },
        { name: "Inventory", icon: "Warehouse", path: "/inventory" },
        { name: "Sub Contract", icon: "FileUser", path: "/sub-contract" },
        { name: "Vehicle Details", icon: "Truck", path: "/vehicle-details" },
        { name: "Reports", icon: "BarChart3", path: "/reports" },
        { name: "Settings", icon: "Settings", path: "/settings" },
    ];

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                ".sidebar-item",
                { x: -60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.4,
                    ease: "power3.out",
                }
            );
        }
    }, [isOpen]);

    return (
        <div
            className={`h-screen bg-gray-900 text-white fixed left-0 top-0 transition-all duration-300
                ${isOpen ? "w-[12rem]" : "w-[5rem]"}
                md:w-[12rem] overflow-hidden z-50`}
        >
            {/* ===== Logo Section ===== */}
            <div className="w-full h-[8rem] bg-red-500 flex flex-col justify-center items-center py-6">
                <h1 className="text-[1.8rem] font-extrabold leading-tight">LIKESTONE</h1>
                {isOpen && (
                    <p className="text-sm font-medium mt-1">Builders & Developers</p>
                )}
            </div>

            {/* ===== Sidebar Menu ===== */}
            <div className="p-4 space-y-2">
                {sidebarData.map((item) => {
                    const Icon = Icons[item.icon];
                    const isActive = location.pathname === item.path; // highlight current route

                    return (
                        <div
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`sidebar-item flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors
                                hover:bg-gray-800 
                                ${isActive ? "bg-gray-800" : ""}`}
                        >
                            {Icon && <Icon size={22} />}
                            {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
                        </div>
                    );
                })}
            </div>

            {/* ===== Toggle Button (only visible on small screens) ===== */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 
                    bg-blue-800 p-2 rounded-full hover:bg-gray-700 transition 
                    border border-gray-700 cursor-pointer block md:hidden"
            >
                {isOpen ? (
                    <Icons.ChevronLeft size={20} />
                ) : (
                    <Icons.ChevronRight size={20} />
                )}
            </button>
        </div>
    );
};

export default DashboardSidebar;
