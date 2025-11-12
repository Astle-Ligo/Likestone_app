import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import SupplierModal from "../../components/Supplier/SupplierModal";
import SupplierDetailsModal from "../../components/Supplier/SupplierDetailsModal";

const API_URL = import.meta.env.VITE_API_URL;

const SuppliersPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

    // Fetch all suppliers
    const fetchSuppliers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_URL}/supplier`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuppliers(res.data);
            console.log(res.data);

        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch suppliers");
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this supplier?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/supplier/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Supplier deleted successfully");
            fetchSuppliers();
        } catch (err) {
            toast.error(err.response?.data?.message || "Error deleting supplier");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Suppliers</h1>
                <button
                    onClick={() => {
                        setSelectedSupplier(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    <Plus size={18} />
                    Add Supplier
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Total Purchases</th>
                            <th className="p-3 text-left">Balance</th>
                            <th className="p-3 text-left">Actions</th>
                            <th className="p-3 text-left">Account Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.length > 0 ? (
                            suppliers.map((s) => (
                                <tr
                                    key={s._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{s.name}</td>
                                    <td className="p-3">{s.phone}</td>
                                    <td className="p-3">{s.category||'N/A'}</td>
                                    <td className="p-3">{s.totalPurchases || 0}</td>
                                    <td className="p-3 text-red-600 font-medium">
                                        ₹{s.balance?.toFixed(2) || 0}
                                    </td>
                                    <td className="p-3 flex gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedSupplier(s);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button onClick={() => {
                                            setSelectedSupplier(s);
                                            setIsAccountModalOpen(true);
                                        }} className="text-blue-600 hover:text-blue-800 cursor-pointer">View Details</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-5 text-center text-gray-500">
                                    No suppliers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <SupplierModal
                    supplier={selectedSupplier}
                    onClose={() => setIsModalOpen(false)}
                    refresh={fetchSuppliers}
                />
            )}
            {isAccountModalOpen && selectedSupplier && (
                <SupplierDetailsModal
                    supplier={selectedSupplier}
                    onClose={() => setIsAccountModalOpen(false)}
                />
            )}

        </div>
    );
};

export default SuppliersPage;
