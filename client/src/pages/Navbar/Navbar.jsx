import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoImage from '../../assets/images/logo.png';
import { useAuth } from '../../context/AppContext';
import userDefaultImage from '../../assets/images/21104.png'

const pages = ['Products', 'Pricing', 'Blog'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [viewImages, setImages] = useState();
    const { serverIP, serverPort } = useAuth();

    useEffect(() => {
        const studentId = localStorage.getItem('studentId')
        const fetchImageData = async (studentId) => {
            try {
                const responce = await fetch(`http://${serverIP}:${serverPort}/updateData/getImage?studentId=${studentId}`, {
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
        fetchImageData(studentId);
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };



    const handlUserMenu = (page) => {
        console.log('Redirecting to:', page);
        if (page && typeof page === 'string') {
            window.location.href = page;
        }

    };


    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton onClick={() => handlUserMenu(`/dashboard`)} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <img src={logoImage} alt='tutorial_logo' style={{ height: 40 }} />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/dashboard"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Tutorial
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <IconButton onClick={() => handlUserMenu(`/dashboard`)} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <img src={logoImage} alt='tutorial_logo' style={{ height: 40 }} />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/dashboard"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Tutorial
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {/* <Tooltip> */}
                        <IconButton onClick={() => handlUserMenu(`/dashboard`)} sx={{ p: 0 }}>
                            <Avatar alt="studentImage" src={viewImages ? `http://localhost:5000/profilImage/${viewImages}` : userDefaultImage} />
                        </IconButton>
                        {/* </Tooltip> */}
                        {/* <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
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
                            <MenuItem onClick={() => handlUserMenu(`/dashboard`)}>
                                <Typography textAlign="center">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handlUserMenu(`/dashboard/profile`)}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleLogout(`/login`)}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>

                        </Menu> */}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar
