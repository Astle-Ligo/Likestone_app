import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import * as Icons from "lucide-react";
import EmployeeModal from "../../components/Employee/EmployeeModal";
import EmployeeCard from "../../components/Employee/EmployeeCard";

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        const res = await axios.delete(
            `${API_URL}/employee/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setSelectedEmp(null);
        setEmployees(prev => prev.filter(emp => emp._id !== id));
    };

    const handleToggle = async (id, currentState) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.patch(
                `${API_URL}/employee/${id}`,
                { isActive: !currentState },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSelectedEmp((prev) => ({ ...prev, isActive: !prev.isActive }));

            setEmployees((prev) =>
                prev.map((emp) =>
                    emp._id === id ? { ...emp, isActive: !currentState } : emp
                )
            );
        } catch (err) {
            console.log("Error Chaning Active State : ", err.message);

        }
    };

    const handleSave = async (updatedEmp) => {
        try {
            const token = localStorage.getItem("token");

            // Update backend with PUT request
            await axios.put(
                `${API_URL}/employee/${updatedEmp._id}`,
                updatedEmp, // send the updated employee data
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update local state
            setEmployees((prev) =>
                prev.map((emp) => (emp._id === updatedEmp._id ? updatedEmp : emp))
            );
            setSelectedEmp(updatedEmp);
        } catch (err) {
            console.log("Error updating employee:", err.message);
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_URL}/employee`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployees(res.data);
            } catch (err) {
                console.log("Error fetching employees:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="min-h-screen mt-2 bg-gray-100 flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b">
                <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
                    <Icons.Users className="w-8 h-8 text-blue-600" />
                    Employee Details
                </h1>
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Icons.RefreshCw className="w-5 h-5" /> Refresh
                </button>
            </div>

            {/* Employee Cards */}
            <div className="flex-1 p-8">
                {loading ? (
                    <div className="text-center text-gray-500 text-lg">Loading...</div>
                ) : employees.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">
                        No employees found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {employees.map((emp, idx) => (
                            <EmployeeCard
                                key={emp._id || idx}
                                emp={emp}

                                onClick={setSelectedEmp}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Employee Modal */}
            {selectedEmp && (
                <EmployeeModal
                    employee={selectedEmp}
                    onClose={() => setSelectedEmp(null)}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggle}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default EmployeePage;
