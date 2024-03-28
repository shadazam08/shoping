import React, { useEffect } from 'react'
import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { AccountBox, Logout, PieChart } from '@mui/icons-material';
import { useAuth } from '../../context/AppContext';

const drawerWidth = 180;

const SideBar = () => {
    const { logout, serverIP, serverPort } = useAuth();
    

    const handleLogout = (urlpage) => {
        logout();
        if (urlpage && typeof urlpage === 'string') {
            window.location.href = urlpage;
        }
    }

    const handleCloseUserMenu = (page) => {
        console.log('Redirecting to:', page);
        if (page && typeof page === 'string') {
            window.location.href = page;
        }

    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: 'sticky',
                    top: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth },
                    zIndex: '1',


                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleCloseUserMenu(`/dashboard`)}>
                                <ListItemIcon>
                                    <PieChart />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleCloseUserMenu(`/dashboard/profile`)}>
                                <ListItemIcon>
                                    <AccountBox />
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleLogout(`/login`)}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                    </List>

                </Box>
            </Drawer>

        </Box>
    )
}

export default SideBar
