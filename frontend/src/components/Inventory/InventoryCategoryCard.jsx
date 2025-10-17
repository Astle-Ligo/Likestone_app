import React from "react";

const InventoryCategoryCard = ({ category, totalQty, onClick }) => {
    return (
        <div
            className="p-4 bg-white rounded-xl shadow cursor-pointer hover:shadow-md transition"
            onClick={onClick}
        >
            <h2 className="text-xl font-semibold">{category}</h2>
            <p className="text-gray-600 mt-2">Total Stock: {totalQty}</p>
        </div>
    );
};

export default InventoryCategoryCard;
