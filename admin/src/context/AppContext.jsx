import { createContext, useContext, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

const AppContext = createContext();

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);

    const serverPort = 5000;
    const serverIP = window.location.hostname === 'localhost' ? 'localhost' : '192.168.1.7';

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
    };

    return (
        <AppContext.Provider value={{ serverPort, serverIP, isLoggedIn, login, logout, open, setOpen, drawerWidth, Main, DrawerHeader, AppBar }}>
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