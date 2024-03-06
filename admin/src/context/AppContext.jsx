import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
    const serverPort = 5000;
    const serverIP = `localhost`;


    return (
        <AppContext.Provider value={{ serverPort, serverIP }}>
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