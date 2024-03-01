import React, { useState } from 'react'
import {
    AppBar,
    Box,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    alpha,
    styled
} from '@mui/material'
import {
    Login,
    Search
} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Searchs = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputsBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Header = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/* <MenuItem>
                <IconButton
                    size='large'
                    aria-label='show 4 new mails'
                    color='inherit'
                >
                    <Badge
                        badgeContent={4}
                        color='error'
                    >
                        <Mail />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem> */}
            <MenuItem>
                <IconButton
                    size='medium'
                    aria-label='show 17 new notifications'
                    color='inherit'
                >
                    <Login />
                </IconButton>
                <p>login / signup</p>
            </MenuItem>
            {/* <MenuItem
                onClick={handleProfileMenuOpen}
            >
                <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='primary-search-account-menu'
                    aria-haspopup='true'
                    color='inherit'
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem> */}
        </Menu>
    );
    return (
        <Box
            sx={{ flexGrow: 1 }}
        >
            <AppBar position='static'>
                <Toolbar>

                    <Typography
                        variant='h6'
                        noWrap
                        component={'div'}
                        sx={{
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        <Link to={'/'} >Online Tutorial</Link>
                    </Typography>
                    <Searchs>
                        <SearchIconWrapper>
                            <Search />
                        </SearchIconWrapper>
                        <StyledInputsBase
                            placeholder='Search...'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Searchs>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {/* <IconButton
                            size='large'
                            aria-label='show 4 new mails'
                            color='inherit'
                        >
                            <Badge
                                badgeContent={4}
                                color='error'
                            >
                                <Mail />
                            </Badge>
                        </IconButton> */}
                        <IconButton
                            size='small'
                            aria-label='show 17 new notifications'
                            color='inherit'
                        >
                            <Link to={'/login'}>login / signup</Link>

                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='show more'
                            aria-controls={mobileMenuId}
                            aria-haspopup='true'
                            onClick={handleMobileMenuOpen}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    )
}

export default Header
