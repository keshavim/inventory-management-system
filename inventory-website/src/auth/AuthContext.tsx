import React, { createContext, useContext, useState, useEffect } from "react";
import type {User} from "../api.ts";

type AuthContextType = {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    logout: () => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    setCurrentUser: () => {},
    logout: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUserState] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("currentUser");
        if (stored) setCurrentUserState(JSON.parse(stored));
    }, []);

    // When currentUser changes, update localStorage
    const setCurrentUser = (user: User | null) => {
        setCurrentUserState(user);
        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("currentUser");
        }
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
