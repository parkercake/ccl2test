// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        try {
            if (user) localStorage.setItem("user", JSON.stringify(user));
            else localStorage.removeItem("user");
        } catch {
            console.warn("Unable to access localStorage for user context.");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
