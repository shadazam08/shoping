import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../../context/AppContext';
import logoImage from '../../assets/images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import userDefaultImage from '../../assets/images/21104.png'

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [viewImages, setImages] = useState();
    const { serverIP, serverPort } = useAuth();
    const studentId = localStorage.getItem('studentId')

    useEffect(() => {

        const fetchImageData = async (studentId) => {
            try {
                const responce = await fetch(`http://${serverIP}:${serverPort}/updateData/getImage?studentId=${studentId}`, {
                    method: 'GET',
                })
                if (responce.ok) {
                    const dataImage = await responce.json();
                    setImages(dataImage);
                } else {
                    console.error('Image fetch failed. Status:', responce.status);
                }
            } catch (error) {
                console.error('Error during FETCH:', error);
            }
        }
        fetchImageData(studentId);
    }, [serverIP, serverPort, studentId]);

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
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Azam</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Shad</Typography>
                            </MenuItem>
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
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Azam
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Shad
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {/* <Tooltip> */}
                        <IconButton onClick={() => handlUserMenu(`/dashboard`)} sx={{ p: 0 }}>
                            <Avatar alt="studentImage" src={viewImages ? `http://${serverIP}:${serverPort}/profilImage/${viewImages}` : userDefaultImage} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar