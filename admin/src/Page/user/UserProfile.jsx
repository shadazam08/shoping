import React from 'react'
import { Box } from '@mui/material';
import { useAuth } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const { logout, open, Main, DrawerHeader } = useAuth();
    const history = useNavigate();

    const handleLogout = () => {
        logout();
        history('/login'); // Navigate to login page after logout
    }
    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{
                    p: 1,
                    marginLeft: { sm: '240px', md: '240px', xs: '240px' },
                }}>
                    Shad Azam
                    UserProfile
                    <button onClick={handleLogout} className='btn btn-danger'> Logout</button>
                </Box>



            </Main>
        </Box>
    )
}

export default UserProfile
