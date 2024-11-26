import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Check if there's an authentication token in localStorage
    const initialLoggedInState = localStorage.getItem("isLoggedIn") === "true";

    const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);

    // Update localStorage whenever isLoggedIn changes
    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
