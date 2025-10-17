import React from 'react'
import * as Icons from "lucide-react";


const EmployeeHeader = ({ onAddClick, user }) => {
    return (
        <div className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b">
            <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
                <Icons.Users className="w-8 h-8 text-blue-600" />
                Employee Details
            </h1>

            {(user?.role === "Admin" || user?.role === "Manager") && (
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition cursor-pointer"
                >

                    <Icons.UserPlus className="w-5 h-5" /> Add Employee
                </button>
            )}
        </div>
    );
};


export default EmployeeHeader
