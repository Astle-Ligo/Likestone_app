import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import * as Icons from "lucide-react";
import EmployeeModal from "../../components/Employee/EmployeeModal";

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState(null);

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
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(res.data);
            } catch (err) {
                console.log("Error fetching employees:", err.message);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h1>Employee List</h1>
            <div className="w-full h-full bg-gray-500 flex">
                <div className="w-full h-auto bg-yellow-300 flex flex-wrap items-center justify-center p-4 gap-8">
                    {employees.map((emp, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedEmp(emp)}
                            className="cursor-pointer p-2 bg-white rounded shadow w-[24rem] flex gap-8 hover:scale-105 transition"
                        >
                            <img src={emp.photo} alt="" className="w-[6rem] h-[6rem] object-cover rounded" />
                            <div>
                                <p><strong>Name:</strong> {emp.name}</p>
                                <p><strong>Phone:</strong> {emp.phone}</p>
                                <p><strong>Skill Type:</strong> {emp.skillType}</p>
                                <p><strong>Due Amount:</strong> {emp.dueAmount}</p>
                            </div>
                        </div>
                    ))}
                </div>
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
        </div>
    );
};

export default EmployeePage;
