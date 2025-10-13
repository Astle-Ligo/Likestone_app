import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);

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
                <div className="w-full h-auto bg-yellow-300 flex flex-col items-center p-4">
                    {employees.map((emp, idx) => (
                        <div key={idx} className="p-2 m-2 bg-white rounded shadow w-1/2">
                            <p><strong>Name:</strong> {emp.name}</p>
                            <p><strong>Phone:</strong> {emp.phone}</p>
                            <p><strong>Address:</strong> {emp.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeePage;
