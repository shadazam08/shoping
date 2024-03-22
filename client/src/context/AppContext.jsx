import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);

    const serverPort = 5000;
    const serverIP = window.location.hostname === 'localhost' ? 'localhost' : '192.168.1.7';
   

    useEffect(() => {
        const storedToken = localStorage.getItem('studentToken');

        if (storedToken) {
            setIsLoggedIn(true);
        }

    }, []);

    const login = (studentToken) => {
        setIsLoggedIn(true);
        localStorage.setItem('studentToken', studentToken);
    }

    const logout = () => {
        // Perform your logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('studentId');
        localStorage.clear()
        sessionStorage.clear();
        setIsLoggedIn(false);
        // history('/login');

    };


    return (
        <AppContext.Provider value={{ serverPort, serverIP, isLoggedIn, login, logout, open, setOpen }}>
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