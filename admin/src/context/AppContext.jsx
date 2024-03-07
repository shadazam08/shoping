import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const serverPort = 5000;
    const serverIP = `localhost`;

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');

        if (storedToken) {
            setIsLoggedIn(true);
        }

    }, []);

    const login = (adminToken) => {
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', adminToken);
    }

    const logout = () => {
        // Perform your logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.clear()
        sessionStorage.clear();
        setIsLoggedIn(false);
        // history('/login');

    };


    return (
        <AppContext.Provider value={{ serverPort, serverIP, isLoggedIn, login, logout }}>
            {children}
        </AppContext.Provider>

    )
}

export const useAuth = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}