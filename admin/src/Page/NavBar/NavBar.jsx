import React, { useState } from 'react'
import { AppBar, Avatar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types'
import { Adb, Inbox, Mail } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    // const { window } = props;
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const drawerWidth = 240;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = (page) => {
        setAnchorElNav(null);
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }

        if (page && typeof page === 'string') {
            // Ensure page is a valid string before modifying history
            // window.history.pushState(null, null, page);
            window.location.href = page;
            // Optionally dispatch popstate event
            // window.dispatchEvent(new Event('popstate'));
        }
    };



    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }
    // const handleCloseNavMenu = (page) => {
    //     setAnchorElNav(null);
    //     if (page && typeof page === 'string') {
    //         // Ensure page is a valid string before modifying history
    //         // window.history.pushState(null, null, page);
    //         window.location.href = page;
    //         // Optionally dispatch popstate event
    //         // window.dispatchEvent(new Event('popstate'));
    //     }
    // };
    const handleCloseUserMenu = (page) => {
        setAnchorElUser(null);
        if (page && typeof page === 'string') {
            // Ensure page is a valid string before modifying history
            // window.history.pushState(null, null, page);
            window.location.href = page;
            // navigates(page);

            // Optionally dispatch popstate event
            // window.dispatchEvent(new Event('popstate'));
        }

    };

    // const container = window !== undefined ? () => window().document.body : undefined;

    return (
        // <Box sx={{ display: 'flex' }}>
        <AppBar position='static' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
            <Container maxWidth='xl'>
                <Toolbar disableGutters sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders"
                    >
                        <Drawer
                            // container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onTransitionEnd={handleDrawerTransitionEnd}
                            onClose={handleDrawerClose}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { width: drawerWidth },
                            }}
                        >
                            <div>
                                <Toolbar />
                                <Divider />
                                <List>
                                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                                <List>
                                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': { width: drawerWidth },
                            }}
                            open
                        >
                            <div>
                                <Toolbar sx={{color:''}} />
                                <Divider />
                                <List>
                                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                                <List>
                                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {index % 2 === 0 ? <Inbox /> : <Mail />}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </Drawer>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
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
                                    <Typography textAlign={'center'}>{'Dasboard'}</Typography>
                                </MenuItem>
                            )}
                            {window?.location.pathname !== '/dashboard/userProfile' && (
                                <MenuItem onClick={() => handleCloseUserMenu('/dashboard/userProfile')}>
                                    <Typography textAlign={'center'}>{'Profile'}</Typography>
                                </MenuItem>
                            )}
                            {/* <NavLink to='/dashboard/userProfile'> */}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        // </Box>

    )
}

// NavBar.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * Remove this when copying and pasting into your project.
//      */
//     window: PropTypes.func,
// };

export default NavBar
