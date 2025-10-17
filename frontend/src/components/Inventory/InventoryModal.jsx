import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AddInventoryModal from "./AddInventoryModal";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryModal = ({ category, items, onClose, user, setInventory }) => {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`${API_URL}/inventory/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInventory(prev => prev.filter(item => item._id !== id));
            toast.success("Deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete!");
            console.log(err.message);
        }
    };

    const handleUpdate = async (updatedItem) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`${API_URL}/inventory/${updatedItem._id}`, updatedItem, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInventory(prev => prev.map(item => item._id === updatedItem._id ? updatedItem : item));
            toast.success("Updated successfully!");
        } catch (err) {
            toast.error("Failed to update!");
            console.log(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
            <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-4xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{category} Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
                </div>

                {(user?.role === "Admin" || user?.role === "Manager") && (
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-700"
                    >
                        Add Batch
                    </button>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Item</th>
                                <th className="border px-4 py-2">Supplier</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">Rate</th>
                                <th className="border px-4 py-2">Purchase Date</th>
                                <th className="border px-4 py-2">Bill</th>
                                {user?.role !== "Supervisor" && <th className="border px-4 py-2">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item._id} className="text-center">
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.supplier}</td>
                                    <td className="border px-4 py-2">{item.quantity}</td>
                                    <td className="border px-4 py-2">{item.rate}</td>
                                    <td className="border px-4 py-2">{item.purchaseDate}</td>
                                    <td className="border px-4 py-2">{item.bill || "-"}</td>
                                    {user?.role !== "Supervisor" && (
                                        <td className="border px-4 py-2 space-x-2">
                                            <button
                                                onClick={() => handleUpdate(item)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showAddModal && (
                    <AddInventoryModal
                        category={category}
                        onClose={() => setShowAddModal(false)}
                        setInventory={setInventory}
                        user={user}
                    />
                )}
            </div>
        </div>
    );
};

export default InventoryModal;
