import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { UserContext } from "../../context/UserContext";

import InventoryHeader from "../../components/Inventory/InventoryHeader";
import InventoryCategoryCard from "../../components/Inventory/InventoryCategoryCard";
import InventoryModal from "../../components/Inventory/InventoryModal";
import AddInventoryModal from "../../components/Inventory/AddInventoryModal";

const API_URL = import.meta.env.VITE_API_URL;

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showInventoryModal, setShowInventoryModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const { user, loadingUser } = useContext(UserContext);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_URL}/inventory`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInventory(res.data);
            } catch (err) {
                console.log("Error fetching inventory:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    if (loading || loadingUser) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

    // Group by category
    const groupedInventory = inventory.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <InventoryHeader onAddClick={() => setShowAddModal(true)} user={user} />

            <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.keys(groupedInventory).map(category => {
                    const totalQty = groupedInventory[category].reduce((sum, item) => sum + item.quantity, 0);
                    return (
                        <InventoryCategoryCard
                            key={category}
                            category={category}
                            totalQty={totalQty}
                            onClick={() => setSelectedCategory(category)}
                        />
                    );
                })}
            </div>

            {selectedCategory && (
                <InventoryModal
                    category={selectedCategory}
                    items={groupedInventory[selectedCategory]}
                    onClose={() => setSelectedCategory(null)}
                    user={user}
                    setInventory={setInventory}
                />
            )}

            {showAddModal && (
                <AddInventoryModal
                    onClose={() => setShowAddModal(false)}
                    setInventory={setInventory}
                    user={user}
                />
            )}
        </div>
    );
};

export default InventoryPage;
