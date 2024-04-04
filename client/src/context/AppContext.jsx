import { createContext, useContext, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';

const AppContext = createContext();

const drawerWidth = 180;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

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
        localStorage.removeItem('token');
        localStorage.removeItem('studentId');
        localStorage.clear()
        sessionStorage.clear();
        setIsLoggedIn(false);

    };

    return (
        <AppContext.Provider value={{ serverPort, serverIP, isLoggedIn, login, logout, open, setOpen, Main, DrawerHeader }}>
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