import React from 'react'
import { useAuth } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, Typography } from '@mui/material';
import './dasboard.scss';

// const drawerWidth = 240;

const Dashboard = () => {
  const { logout } = useAuth();
  const history = useNavigate();
  const drawerWidth = 240;

  const handleLogout = () => {
    logout();
    history('/login'); // Navigate to login page after logout
  }
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Shad Azam
          dashboard
          <button onClick={handleLogout} className='btn btn-danger' > Logout</button>
        </Typography>

      </Box>
    </>

  )
}

export default Dashboard
