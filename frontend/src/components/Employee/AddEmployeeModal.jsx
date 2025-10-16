import React, { useState } from "react";
import { Check, X } from "lucide-react";

const AddEmployeeModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        skillType: "Mason",
        dailyWage: 0,
        aadhar: "",
        gender: "",
        photo:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        dueAmount: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl w-full max-w-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ===== Header ===== */}
                <div className="bg-yellow-600 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-semibold">Add New Employee</h2>
                    <button
                        onClick={onClose}
                        className="text-white text-2xl leading-none hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>

                {/* ===== Form ===== */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto overflow-x-hidden"
                >
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-gray-700 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Skill Type */}
                    <div>
                        <label className="block text-gray-700 font-medium">Skill Type</label>
                        <select
                            name="skillType"
                            value={formData.skillType}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
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
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        ></textarea>
                    </div>

                    {/* Aadhar */}
                    <div>
                        <label className="block text-gray-700 font-medium">Aadhar Number</label>
                        <input
                            type="text"
                            name="aadhar"
                            value={formData.aadhar}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>

                    {/* Daily Wage */}
                    <div>
                        <label className="block text-gray-700 font-medium">Daily Wage (₹)</label>
                        <input
                            type="number"
                            name="dailyWage"
                            value={formData.dailyWage}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>

                    {/* Due Amount */}
                    <div>
                        <label className="block text-gray-700 font-medium">Due Amount (₹)</label>
                        <input
                            type="number"
                            name="dueAmount"
                            value={formData.dueAmount}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>

                    {/* Photo URL */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 font-medium">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            value={formData.photo}
                            onChange={handleChange}
                            placeholder="Paste image URL"
                            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>
                </form>

                {/* ===== Footer ===== */}
                <div className="px-6 py-4 flex justify-end gap-3 border-t bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                    >
                        <X size={18} /> Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
                    >
                        <Check size={18} /> Add Employee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
