import React, { useState } from 'react'
import { useAuth } from '../../context/AppContext';
import { Box, OutlinedInput, InputLabel, InputAdornment, FormControl, Button, Alert } from '@mui/material';
import { Publish } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';

const CreateAdminUrl = () => {
    const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
    const [error, setError] = useState('')
    const [msgSuccess, setMsgSuccess] = useState('')
    const [formData, setFormData] = useState({
        menu_name: '',
        menu_url: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError('');
    };


    const submitUrl = async (event) => {
        event.preventDefault();
        if (formData.menu_name.trim() === '' || formData.menu_url.trim() === '') {
            setError('Please fill in all fields.');
            setTimeout(() => {
                setError('');
            }, 2000)
            return;
        }
        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/insertData/insertUrl`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const parseRes = await response.json();
            if (parseRes.message === 'url add success') {
                setMsgSuccess('Insert Success Full');
                setTimeout(() => {
                    setMsgSuccess('');
                }, 2000)

            } else {
                console.error('URL Insert failed. Status:', response.status);
                const errorMessage = await response.text();
                console.error('Error message:', errorMessage);
            }
        } catch (error) {
            console.error('Error during Inser:', error);
        }


        console.log('Submitted data:', formData);
    }


    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{
                    p: 1,
                    marginLeft: { sm: '240px', md: '240px', xs: '240px' },
                }}>

                    <form onSubmit={submitUrl}>
                        <Box sx={{ display: 'flex' }}>
                            {error && <Alert variant="filled" severity="error">{error} </Alert>}
                            {msgSuccess && <Alert variant="filled" severity="success">{msgSuccess}</Alert>}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-menu_name">Menu Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-menu_name"
                                    type='text'
                                    label="Menu Name"
                                    name='menu_name'
                                    value={formData.menu_name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-url">URL</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-url"
                                    startAdornment={<InputAdornment position="start">dashboard/</InputAdornment>}
                                    label="URL"
                                    name='menu_url'
                                    type='text'
                                    value={formData.menu_url}
                                    onChange={handleChange}

                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Button type='submit' variant="contained" color="error" className='mt-4 text-center'>
                                Submit
                                <Publish sx={{ ml: 1, my: 0.5 }} />
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Main>
        </Box>
    )
}

export default CreateAdminUrl
