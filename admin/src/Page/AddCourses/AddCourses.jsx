import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AppContext';
import { Box, OutlinedInput, InputLabel, InputAdornment, FormControl, Button, Alert, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add } from '@mui/icons-material';

const AddCourses = () => {
    const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
    const [error, setError] = useState('')
    const [msgSuccess, setMsgSuccess] = useState('');
    const [instructors, setInstructors] = useState([]);
    const [formData, setFormData] = useState({
        course_name: '',
        course_description: '',
        course_duration_hours: '',
        course_start_date: '',
        course_end_date: '',
        course_fee: '',
        instructor_id: ''
    });

    useEffect(() => {
        const fetchInstructors = async () => {
            const responce = await fetch(`http://${serverIP}:${serverPort}/showData/instructorsDetails`);
            const parseRes = await responce.json();
            if (parseRes.message === 'success') {
                setInstructors(parseRes.instructorsDetails);
            } else {
                console.error('Course Insert failed. Status:', responce.status);
                const errorMessage = await responce.text();
                console.error('Error message:', errorMessage);
            }
        }
        fetchInstructors();
    }, [serverIP, serverPort]);

    const handleChange = (event, date, names) => {

        if (names === 'course_start_date') {
            setFormData({
                ...formData,
                course_start_date: date
                // course_end_date: date
            });
        } else if (names === 'course_end_date') {
            setFormData({
                ...formData,
                course_end_date: date
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

    const submitCourse = async (event) => {
        event.preventDefault();

        const { course_end_date, course_start_date } = formData;
        const adjustedStartDate = new Date(course_start_date);
        adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);
        const adjustedEndDate = new Date(course_end_date);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        if (
            formData.course_name.trim() === '' ||
            formData.course_description.trim() === '' ||
            formData.course_duration_hours === '' ||
            formData.course_start_date === '' ||
            formData.course_end_date === '' ||
            formData.course_fee === ''
        ) {
            setError('Please fill in all fields.');
            setTimeout(() => {
                setError('');
                setFormData({
                    course_name: '',
                    course_description: '',
                    course_duration_hours: '',
                    course_start_date: null,
                    course_end_date: null,
                    course_fee: '',
                    instructor_id: ''
                });
            }, 2000);
            return;
        }
        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/insertData/insertCourse`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    course_start_date: adjustedStartDate.toISOString(),
                    course_end_date: adjustedEndDate.toISOString(),
                }),
            });
            const parseRes = await response.json();
            if (parseRes.message === 'success') {
                setMsgSuccess('Insert Success Full');
                setTimeout(() => {
                    setMsgSuccess('');
                    setFormData({
                        course_name: '',
                        course_description: '',
                        course_duration_hours: '',
                        course_start_date: null,
                        course_end_date: null,
                        course_fee: '',
                        instructor_id: ''

                    });
                }, 2000);

            } else if (parseRes.message === 'Allready Exits') {
                setError('This course Allready Exits');
                setTimeout(() => {
                    setError('');
                }, 2000)
            } else {
                console.error('Course Insert failed. Status:', response.status);
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
                    <form onSubmit={submitCourse}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                            {error && <Alert variant="filled" severity="error">{error} </Alert>}
                            {msgSuccess && <Alert variant="filled" severity="success">{msgSuccess}</Alert>}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-course_name">Course Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-course_name"
                                    type='text'
                                    label="Course Name"
                                    name='course_name'
                                    value={formData.course_name}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-course_description">Course Description</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-course_description"
                                    type='text'
                                    label="Course Description"
                                    name='course_description'
                                    value={formData.course_description}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-course_duration_hours">Course Duration</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-course_duration_hours"
                                    endAdornment={<InputAdornment position="end">hours daliy</InputAdornment>}
                                    type='number'
                                    label="Course Duration"
                                    name='course_duration_hours'
                                    value={formData.course_duration_hours}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Course Start Date"
                                        name='course_start_date'
                                        onChange={(date) => handleChange(date, 'course_start_date')}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Course End Date"
                                        name='course_end_date'
                                        onChange={(date) => handleChange(date, 'course_end_date')}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 250 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-instructor_id">Instructor Name</InputLabel>
                                <Select
                                    id="outlined-adornment-instructor_id"
                                    label="Instructor Name"
                                    name="instructor_id"
                                    value={formData.instructor_id}
                                    onChange={(event) => handleChange(event)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {instructors && instructors.map(instructor => (
                                        <MenuItem key={instructor.instructor_id} value={instructor.instructor_id}>
                                            {instructor.instructor_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-course_fee">Course Fee</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-course_fee"
                                    endAdornment={<InputAdornment position="end">&#8377;</InputAdornment>}
                                    type='number'
                                    label="Course Fee"
                                    name='course_fee'
                                    value={formData.course_fee}
                                    onChange={(event) => handleChange(event)}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', margin: 1 }}>
                            <Button type='submit' variant="contained" color="success" className='mt-4 text-center'>
                                Add Course
                                <Add sx={{ ml: 1, my: 0.5 }} />
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Main>
        </Box>
    );
};

export default AddCourses