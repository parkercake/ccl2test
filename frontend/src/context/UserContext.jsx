import { createContext, useEffect, useState, useContext } from "react";
import { fetchMe } from "../../services/authApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Optional: block rendering during check

    useEffect(() => {
        const restoreUser = async () => {
            try {
                const userData = await fetchMe();
                setUser(userData);
            } catch (err) {
                console.error("fetchMe failed:", err);
                setUser(null); // Not logged in
            } finally {
                setLoading(false);
            }
        };

        restoreUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);