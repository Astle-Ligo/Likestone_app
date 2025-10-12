import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import Navbar from "../components/Navbar/Navbar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            {/* Main content area */}
            <main
                className={`flex-1 bg-gray-100 min-h-screen p-6 transition-all duration-300 
                    ${isSidebarOpen ? "ml-[12rem]" : "ml-[5rem]"} 
                    md:ml-[12rem]`}
            >
                <Navbar />
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
