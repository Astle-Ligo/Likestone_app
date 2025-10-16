import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EmployeeModal from "../../components/Employee/EmployeeModal";
import EmployeeCard from "../../components/Employee/EmployeeCard";
import EmployeeHeader from "../../components/Employee/EmployeeHeader";
import AddEmployeeModal from "../../components/Employee/AddEmployeeModal";

const API_URL = import.meta.env.VITE_API_URL;

const skillColors = {
    Mason: "from-yellow-50 to-yellow-100 border-yellow-300",
    Electrician: "from-blue-50 to-blue-100 border-blue-300",
    Plumber: "from-teal-50 to-teal-100 border-teal-300",
    Carpenter: "from-orange-50 to-orange-100 border-orange-300",
    Helper: "from-gray-50 to-gray-100 border-gray-300",
    Painter: "from-pink-50 to-pink-100 border-pink-300",
    Supervisor: "from-purple-50 to-purple-100 border-purple-300",
    Accounts: "from-green-50 to-green-100 border-green-300",
};

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);


    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(
                `${API_URL}/employee/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedEmp(null);
            setEmployees(prev => prev.filter(emp => emp._id !== id));
            toast.success("Succesfully Deleted!!")
        } catch (error) {
            toast.error("Failed to Delete!!")
        }

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
            toast.success("Editing Successfully!!")
        } catch (err) {
            console.log("Error updating employee:", err.message);
            toast.error("Error Editing")
        }
    };

    const handleAddEmployee = () => setShowAddModal(true);

    const handleAdd = async (newEmp) => {
        const t = toast.loading("Adding employee...");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API_URL}/employee/add`, newEmp, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const addedEmployee = res.data.employee;
            setEmployees((prev) => [...prev, addedEmployee]);
            setShowAddModal(false);
            toast.success("Employee Added Successfully!!!", { id: t });;
        } catch (err) {
            toast.error(" Failed to add employee", { id: t });
            console.log("Error adding employee:", err.message);
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

    // Group active employees by skill
    const activeBySkill = employees
        .filter(emp => emp.isActive)
        .reduce((acc, emp) => {
            if (!acc[emp.skillType]) acc[emp.skillType] = [];
            acc[emp.skillType].push(emp);
            return acc;
        }, {});

    // Collect all inactive employees
    const inactiveAll = employees.filter(emp => !emp.isActive);

    if (loading)
        return <div className="text-center mt-20 text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen mt-2 bg-gray-100 flex flex-col">
            <EmployeeHeader onAddClick={() => setShowAddModal(true)} />

            <div className="flex-1 p-6 space-y-8">
                {/* Active Employees by Skill */}
                {Object.keys(activeBySkill).map(skill => (
                    <div key={skill} className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">{skill}</h2>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 rounded-xl border ${skillColors[skill]} bg-white`}>
                            {activeBySkill[skill].map(emp => (
                                <EmployeeCard key={emp._id} emp={emp} onClick={setSelectedEmp} />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Inactive Employees */}
                {inactiveAll.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">Inactive Employees</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 rounded-xl border border-gray-300 bg-gray-100">
                            {inactiveAll.map(emp => (
                                <EmployeeCard key={emp._id} emp={emp} onClick={setSelectedEmp} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showAddModal && (
                <AddEmployeeModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />
            )}

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
