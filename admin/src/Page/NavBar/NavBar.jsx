import React, { useEffect, useState } from 'react';
import { Avatar, CssBaseline, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { AccountCircle, CastForEducation, LibraryBooks, Logout, SpaceDashboard } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../context/AppContext';
import userDefaultImage from '../../assets/images/21104.png';

const NavBar = () => {
    const theme = useTheme();
    const { open, setOpen, drawerWidth, DrawerHeader, AppBar, logout, serverIP, serverPort } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [viewImages, setImages] = useState();
    const adminId = localStorage.getItem('adminId');

    useEffect(() => {

        const fetchImageData = async (adminId) => {
            try {
                const responce = await fetch(`http://${serverIP}:${serverPort}/updateData/getAdminImage?adminId=${adminId}`, {
                    method: 'GET',
                })
                if (responce.ok) {
                    const dataImage = await responce.json();
                    console.log(dataImage);
                    setImages(dataImage);
                } else {
                    console.error('Image fetch failed. Status:', responce.status);
                }
            } catch (error) {
                console.error('Error during FETCH:', error);
            }
        }
        fetchImageData(adminId);
    }, [adminId, serverIP, serverPort]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

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
    };

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
                                    <Avatar alt="studentImage" src={viewImages ? `http://${serverIP}:${serverPort}/adminProfileImage/${viewImages}` : userDefaultImage} />
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
                                    <CastForEducation />
                                </ListItemIcon>
                                <ListItemText onClick={() => handleCloseUserMenu(`/dashboard/addInstructors`)} primary={'Add Instructors'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CastForEducation />
                                </ListItemIcon>
                                <ListItemText onClick={() => handleCloseUserMenu(`/dashboard/instructorsList`)} primary={'Instructors List'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LibraryBooks />
                                </ListItemIcon>
                                <ListItemText onClick={() => handleCloseUserMenu(`/dashboard/addCourses`)} primary={'Add Courses'} />
                            </ListItemButton>
                        </ListItem>
                        <Divider sx={{ backgroundColor: 'red' }} />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LibraryBooks />
                                </ListItemIcon>
                                <ListItemText onClick={() => handleCloseUserMenu(`/dashboard/coursesList`)} primary={'Courses List'} />
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