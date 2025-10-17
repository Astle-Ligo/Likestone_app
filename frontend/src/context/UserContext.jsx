import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const loadUserFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (err) {
                console.error("Invalid token:", err);
                localStorage.removeItem("token");
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoadingUser(false);
    };

    useEffect(() => {
        loadUserFromToken();

        // 🔁 Watch for changes in localStorage (token changes)
        const handleStorageChange = () => loadUserFromToken();
        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loadingUser }}>
            {children}
        </UserContext.Provider>
    );
};
