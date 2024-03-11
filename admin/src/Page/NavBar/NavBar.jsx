import React, { useEffect, useState } from 'react'
import { Avatar, CssBaseline, Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { AccountCircle, AltRoute, Link, Logout, SpaceDashboard } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../context/AppContext';

const NavBar = () => {
    const theme = useTheme();
    const { open, setOpen, drawerWidth, DrawerHeader, AppBar, serverIP, serverPort, logout } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = (page) => {
        setAnchorElUser(null);
        if (page && typeof page === 'string') {
            window.location.href = page;
        }

    };

    const handleLogout = (urlpage) => {
        logout();
        if (urlpage && typeof urlpage === 'string') {
            window.location.href = urlpage;
        }
    }


    return (
        <>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' }
                            }}
                        >
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' }
                            }}
                        >
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open Settings'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt='Remy Sharp' src='https://live.staticflickr.com/4761/40467034982_9b599c76af_n.jpg' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {window?.location.pathname !== '/dashboard' && window?.location.pathname !== '/dashboard/' && (
                                    <MenuItem onClick={() => handleCloseUserMenu('/dashboard')}>
                                        <SpaceDashboard sx={{ marginRight: '2px' }} />
                                        <Typography textAlign={'center'}>{'Dasboard'}</Typography>
                                    </MenuItem>
                                )}
                                {window?.location.pathname !== '/dashboard/userProfile' && (
                                    <MenuItem onClick={() => handleCloseUserMenu('/dashboard/userProfile')}>
                                        <AccountCircle sx={{ marginRight: '2px' }} />
                                        <Typography textAlign={'center'}>{'Profile'}</Typography>
                                    </MenuItem>
                                )}
                                <MenuItem onClick={() => handleLogout('/login')} >
                                    <Logout sx={{ marginRight: '2px' }} />
                                    <Typography textAlign={'center'}>{'Logout'}</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {/* {menuItems && menuItems.map((text, index) => (
                            <React.Fragment key={text.menu_id}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {getIconForMenuItem(text.menu_name)}
                                        </ListItemIcon>
                                        <ListItemText sx={{ textTransform: 'capitalize' }} onClick={() => handleCloseUserMenu(`/${text.admin_url}`)} primary={text.menu_name} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider sx={{ backgroundColor: 'red' }} />
                            </React.Fragment>
                        ))} */}

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SpaceDashboard />
                                </ListItemIcon>
                                <ListItemText onClick={() => handleCloseUserMenu(`/dashboard`)} primary={'Dashboard'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText onClick={() => handleCloseUserMenu(`/dashboard/userProfile`)} primary={'Profile'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Logout sx={{ marginRight: '2px' }} />
                                </ListItemIcon>
                                <ListItemText sx={{ textTransform: 'capitalize' }} onClick={() => handleLogout('/login')} primary={'Logout'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                    </List>
                </Drawer>
            </Box>
        </>
    )
}

export default NavBar