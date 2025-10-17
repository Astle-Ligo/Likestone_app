import React, { useState } from "react";
import { X } from "lucide-react";

const AddInventoryModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState({
        category: "",
        itemName: "",
        supplier: "",
        quantity: "",
        rate: "",
        purchaseDate: "",
        billFile: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(form);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X />
                </button>
                <h2 className="text-xl font-semibold mb-4">Add Inventory Item</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="category"
                        placeholder="Category (e.g., Cement)"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="itemName"
                        placeholder="Item Name"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="supplier"
                        placeholder="Supplier Name"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="rate"
                        placeholder="Rate per unit"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="purchaseDate"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="billFile"
                        className="w-full border rounded p-2"
                    />

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInventoryModal;
