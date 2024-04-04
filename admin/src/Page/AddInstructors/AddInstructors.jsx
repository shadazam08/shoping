import React, { useState } from 'react';
import { Alert, Box, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useAuth } from '../../context/AppContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Add } from '@mui/icons-material';

const AddInstructors = () => {
    const { Main, DrawerHeader, open, serverIP, serverPort } = useAuth();
    const [error, setError] = useState('')
    const [msgSuccess, setMsgSuccess] = useState('');
    const [formData, setFormData] = useState({
        instructor_name: '',
        instructor_email: '',
        instructors_mobile: '',
        instructors_street: '',
        instructors_city: '',
        instructors_state: '',
        instructors_zip_code: '',
        instructors_join_date: ''
    });

    const handleChange = (event, date) => {
        if (date !== undefined) {
            setFormData({
                ...formData,
                instructors_join_date: date
            });
        } else {
            const { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value
            });
        }
        setError('');
    };
    
    const submitInstructor = async (event) => {
        event.preventDefault();

        const { instructors_join_date } = formData
        const adjustedJoinDate = new Date(instructors_join_date);
        adjustedJoinDate.setDate(adjustedJoinDate.getDate() + 1);

        if (
            formData.instructor_name.trim() === '' ||
            formData.instructor_email.trim() === '' ||
            formData.instructors_mobile === '' ||
            formData.instructors_street.trim() === '' ||
            formData.instructors_city.trim() === '' ||
            formData.instructors_state.trim() === '' ||
            formData.instructors_zip_code === '' ||
            formData.instructors_join_date === ''
        ) {
            setError('Please fill in all fields.');
            setTimeout(() => {
                setError('');
            }, 2000)
            return;
        }
        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/insertData/insertInstructors`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    instructors_join_date: adjustedJoinDate.toISOString()
                }),
            });
            const parseRes = await response.json();
            if (parseRes.message === 'success') {
                setMsgSuccess('Insert Success Full');
                setTimeout(() => {
                    setMsgSuccess('');
                    // Reset form state
                    setFormData({
                        instructor_name: '',
                        instructor_email: '',
                        instructors_mobile: '',
                        instructors_street: '',
                        instructors_city: '',
                        instructors_state: '',
                        instructors_zip_code: '',
                        instructors_join_date: null
                    });
                }, 2000);

            } else {
                console.error('Instructors Insert failed. Status:', response.status);
                const errorMessage = await response.text();
                console.error('Error message:', errorMessage);
            }
        } catch (error) {
            console.error('Error during Inser:', error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{
                    p: 1,
                    marginLeft: { sm: '240px', md: '240px', xs: '240px' },
                }}>
                    <form onSubmit={submitInstructor}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                            {error && <Alert variant="filled" severity="error">{error} </Alert>}
                            {msgSuccess && <Alert variant="filled" severity="success">{msgSuccess}</Alert>}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructor_name">Instructor Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-instructor_name"
                                    type='text'
                                    label="Instructor Name"
                                    name='instructor_name'
                                    value={formData.instructor_name}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructor_email">Email</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-instructor_email"
                                    type='email'
                                    label="Email"
                                    name='instructor_email'
                                    value={formData.instructor_email}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructors_mobile">Mobile</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-instructors_mobile"
                                    type='number'
                                    label="Mobile"
                                    name='instructors_mobile'
                                    value={formData.instructors_mobile}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructors_street">Street</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-instructors_street"
                                    type='text'
                                    label="Street"
                                    name='instructors_street'
                                    value={formData.instructors_street}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructors_city">City</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-instructors_city"
                                    type='text'
                                    label="City"
                                    name='instructors_city'
                                    value={formData.instructors_city}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructors_state">State</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-instructors_state"
                                    type='text'
                                    label="State"
                                    name='instructors_state'
                                    value={formData.instructors_state}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructors_zip_code">Zip Code</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-instructors_zip_code"
                                    type='number'
                                    label="Zip Code"
                                    name='instructors_zip_code'
                                    value={formData.instructors_zip_code}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Instructors Join Date"
                                        name='instructors_join_date'
                                        onChange={(date) => handleChange(date)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', margin: 1 }}>
                            <Button type='submit' variant="contained" color="success" className='mt-4 text-center'>
                                Add Instructors
                                <Add sx={{ ml: 1, my: 0.5 }} />
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Main>
        </Box>
    );
};

export default AddInstructors