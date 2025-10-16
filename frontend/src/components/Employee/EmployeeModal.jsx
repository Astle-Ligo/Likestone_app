import React, { useState } from "react";
import { Pen, Check, X, Trash2, ToggleLeft, ToggleRight, Eye, EyeOff } from "lucide-react";

const EmployeeModal = ({ employee, onClose, onDelete, onToggleStatus, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(employee);
    const [showAadhar, setShowAadhar] = useState(false);

    if (!employee) return null;

    const handleSave = () => {
        onSave(editableData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditableData(employee);
        setIsEditing(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl w-[42rem] shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gray-100 border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-800">Employee Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* === Top Section: Editable Fields === */}
                <div className="p-6 flex gap-6 items-start border-b">
                    {/* Profile Image */}
                    <img
                        src={employee.photo}
                        alt={employee.name}
                        className="w-[7rem] h-[7rem] rounded-full object-cover border"
                    />

                    {/* Editable Info */}
                    <div className="flex-1 flex flex-col gap-2">
                        {/* Name */}
                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={editableData.name}
                                        onChange={(e) =>
                                            setEditableData({ ...editableData, name: e.target.value })
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none text-2xl font-bold"
                                    />
                                    <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                                        <Check />
                                    </button>
                                    <button onClick={handleCancel} className="text-red-600 hover:text-red-700">
                                        <X />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900">{employee.name}</h3>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Pen />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Skill Type, Phone, Address, Daily Wage, Aadhar */}
                        <div className="flex flex-wrap gap-4 mt-1">
                            <div>
                                <strong>Skill:</strong>{" "}
                                {isEditing ? (
                                    <select
                                        value={editableData.skillType}
                                        onChange={(e) =>
                                            setEditableData({ ...editableData, skillType: e.target.value })
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none ml-1"
                                    >
                                        <option value="Mason">Mason</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Carpenter">Carpenter</option>
                                        <option value="Helper">Helper</option>
                                        <option value="Painter">Painter</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="Accounts">Accounts</option>
                                    </select>
                                ) : (
                                    <span className="ml-1">{employee.skillType}</span>
                                )}
                            </div>

                            {/* Gender */}
                            <div>
                                <strong>Gender:</strong>{" "}
                                {isEditing ? (
                                    <select
                                        value={editableData.gender}
                                        onChange={(e) =>
                                            setEditableData({ ...editableData, gender: e.target.value })
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none ml-1"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                ) : (
                                    <span className="ml-1">{employee.gender}</span>
                                )}
                            </div>


                            <div>
                                <strong>Phone:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editableData.phone}
                                        onChange={(e) =>
                                            setEditableData({ ...editableData, phone: e.target.value })
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none ml-1 w-[10rem]"
                                    />
                                ) : (
                                    <span className="ml-1">{employee.phone}</span>
                                )}
                            </div>

                            <div className="flex items-center gap-1">
                                <strong>Address:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editableData.address}
                                        onChange={(e) =>
                                            setEditableData({ ...editableData, address: e.target.value })
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none ml-1 w-[15rem]"
                                    />
                                ) : (
                                    <span className="ml-1">{employee.address}</span>
                                )}
                            </div>

                            <div>
                                <strong>Daily Wage:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editableData.dailyWage}
                                        onChange={(e) =>
                                            setEditableData({ ...editableData, dailyWage: e.target.value })
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none ml-1 w-[6rem]"
                                    />
                                ) : (
                                    <span className="ml-1">₹{employee.dailyWage}</span>
                                )}
                            </div>

                            {/* Aadhar Field */}
                            <div className="flex items-center gap-2">
                                <strong>Aadhar:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editableData.aadhar}
                                        onChange={(e) =>
                                            setEditableData({ ...editableData, aadhar: e.target.value })
                                        }
                                        className="border-b border-gray-300 focus:border-blue-500 outline-none ml-1 w-[10rem]"
                                    />
                                ) : (
                                    <span className="ml-1">
                                        {showAadhar
                                            ? employee.aadhar
                                            : employee.aadhar
                                                ? "•••• •••• ••••"
                                                : "N/A"}
                                    </span>
                                )}

                                {/* Show / Hide Button */}
                                {!isEditing && employee.aadhar && (
                                    <button
                                        onClick={() => setShowAadhar(!showAadhar)}
                                        className="ml-2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showAadhar ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* === Middle Section: Info Boxes === */}
                <div className="px-6 py-4 grid grid-cols-2 gap-4 border-b">
                    <div className="p-3 border rounded-md bg-gray-50">
                        <strong>Total Working Days:</strong> {employee.totalWorkingDayCount}
                    </div>
                    <div className="p-3 border rounded-md bg-gray-50">
                        <strong>Total Wages Paid:</strong> ₹{employee.totalWagesPaid}
                    </div>
                    <div className="p-3 border rounded-md bg-gray-50">
                        <strong>Leave Days:</strong> {employee.leaveDayCount}
                    </div>
                    <div className="p-3 border rounded-md bg-gray-50">
                        <strong>Overtime:</strong> {employee.overtime}
                    </div>
                    <div
                        className={`p-3 border rounded-md ${employee.dueAmount < 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                            }`}
                    >
                        <strong>Due Amount:</strong> ₹{employee.dueAmount}
                    </div>
                </div>

                {/* === Bottom Section: Action Buttons === */}
                <div className="px-6 py-4 flex gap-4 justify-end">
                    <button
                        onClick={() => onToggleStatus(employee._id, employee.isActive)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${employee.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-yellow-700 hover:bg-yellow-200"
                            }`}
                    >
                        {employee.isActive ? "Active" : "Inactive"}
                        {employee.isActive ? <ToggleRight /> : <ToggleLeft />}
                    </button>

                    <button
                        onClick={() => {
                            const confirmed = window.confirm(
                                `Are you sure you want to delete ${employee.name}?`
                            );
                            if (confirmed) onDelete(employee._id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                    >
                        <Trash2 /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;
