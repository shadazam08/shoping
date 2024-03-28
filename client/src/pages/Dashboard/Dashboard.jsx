import React from 'react'
import { useAuth } from '../../context/AppContext';
import { Box } from '@mui/material';


const Dashboard = () => {
    const { DrawerHeader, Main } = useAuth();

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Main>
                <DrawerHeader />
                <Box sx={{
                    p: 1,
                }}>
                    dashboard

                </Box>
            </Main>
        </Box>

    )
}

export default Dashboard
