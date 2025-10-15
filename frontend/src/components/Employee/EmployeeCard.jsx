import React from "react";
import { BadgeCheck, XCircle, Phone, CalendarDays, Umbrella } from "lucide-react";

const EmployeeCard = ({ emp, onClick }) => {
    const isActive = emp.isActive;
    const due = emp.dueAmount ?? 0;

    // ✅ Use your actual DB fields
    const totalWorkingDays = emp.totalWorkingDays ?? 0;
    const totalLeaveDays = emp.totalLeaveDays ?? 0;

    // 🧮 Calculate attendance rate (just for display)
    const totalDays = totalWorkingDays + totalLeaveDays;
    const attendancePercent =
        totalDays > 0 ? Math.round((totalWorkingDays / totalDays) * 100) : 0;

    // 💰 Color-coded due amount
    const getDueColor = () => {
        if (due === 0) return "text-green-600 bg-green-100";
        if (due <= 5000) return "text-orange-600 bg-orange-100";
        return "text-red-600 bg-red-100";
    };

    // 🎨 Attendance progress bar color
    const getAttendanceColor = () => {
        if (attendancePercent >= 85) return "bg-green-500";
        if (attendancePercent >= 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div
            onClick={() => onClick(emp)}
            className="cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden border border-gray-200"
        >
            {/* Image Section */}
            <div className="relative">
                <img
                    src={emp.photo || "/placeholder.jpg"}
                    alt={emp.name}
                    className="w-full h-48 object-cover"
                />
                <div
                    className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold shadow-sm ${isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {isActive ? (
                        <>
                            <BadgeCheck className="w-4 h-4" /> Active
                        </>
                    ) : (
                        <>
                            <XCircle className="w-4 h-4" /> Inactive
                        </>
                    )}
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                    {emp.name}
                </h2>
                <p className="text-sm text-gray-500 font-medium">{emp.skillType}</p>

                <div className="mt-2 flex flex-col gap-1 text-sm text-gray-700">
                    <p className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-800 font-medium">{emp.phone}</span>
                    </p>
                    <p
                        className={`inline-block mt-1 px-2 py-1 rounded-md text-sm font-semibold w-fit ${getDueColor()}`}
                    >
                        Due: ₹{due.toLocaleString()}
                    </p>
                </div>

                {/* Attendance Section */}
                <div className="mt-4">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                            <CalendarDays className="w-4 h-4" />
                            <span>{totalWorkingDays} Worked</span>
                        </div>

                        <div className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-md">
                            <Umbrella className="w-4 h-4" />
                            <span>{totalLeaveDays} Leaves</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                            className={`h-2 rounded-full ${getAttendanceColor()}`}
                            style={{ width: `${attendancePercent}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Attendance: <span className="font-semibold">{attendancePercent}%</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
