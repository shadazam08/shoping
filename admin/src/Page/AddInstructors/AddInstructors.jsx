import React, { useState } from 'react'
import { Alert, Box, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { useAuth } from '../../context/AppContext'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Add } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import CoreDataTable from '../../CoreDataTable/CoreDataTable';
// import moment from 'moment'

const AddInstructors = () => {
    const { Main, DrawerHeader, open, serverIP, serverPort } = useAuth();
    const [error, setError] = useState('')
    const [msgSuccess, setMsgSuccess] = useState('');
    // const [userData, setUserData] = useState([]);
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(
    //                 `http://${serverIP}:${serverPort}/showData/instructorsDetails`,
    //                 {
    //                     method: 'GET',
    //                     mode: 'cors',
    //                     headers: { 'Content-Type': 'application/json' },
    //                 }
    //             );
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const data = await response.json();
    //             const dataFetch = data.instructorsDetails
    //             console.log('data: ', data.instructorsDetails)
    //             // Add a unique 'id' property to each row using 'user_id'
    //             const userDataWithId = dataFetch.map((user) => ({
    //                 ...user,
    //                 id: user.instructor_id,
    //             }));
    //             setUserData(userDataWithId);

    //             console.log('userDataWithId: ', userDataWithId)
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    // const userColumn = [
    //     // { field: 'id', headerName: 'ID', width: 100, sortable: false },
    //     { field: 'instructor_name', headerName: 'Name', width: 250 },
    //     { field: 'instructor_email', headerName: 'Email ID', width: 250 },
    //     { field: 'instructors_mobile', headerName: 'Mobile Number', width: 110 },
    //     { field: 'instructors_state', headerName: 'State', width: 200, type: 'singleSelect', valueOptions: ['admin', 'scheduler', 'watcher'], editable: true },
    //     { field: 'instructors_city', headerName: 'City', width: 150, type: 'singleSelect', editable: true },
    //     { field: 'instructors_join_date', headerName: 'Joining Date', width: 120, renderCell: params => moment(params.row.instructors_join_date).format('DD-MM-YYYY') },
    // ];


    // const actionColumn = [
    //     {
    //         field: 'action',
    //         headerName: 'Action',
    //         width: 150,
    //         sortable: false,
    //         renderCell: () => {
    //             return (
    //                 <div className="cellWithAction">
    //                     <div className="view-btn">View</div>
    //                     <div className="delete-btn">Suspend</div>
    //                 </div>
    //             );
    //         },
    //     },
    // ];







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
        console.log('adjustedJoinDate: ', adjustedJoinDate)

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

                    {/* <Box sx={{ display: 'flex', marginTop: 4, width: { sm: '240px', md: '240px', xs: '240px' } }}>
                        <div className="list-container-wrapper">
                            <div className="list-table-container">
                                <div className="title">
                                    <h1>Instructor Data</h1>
                                    <div className="add-new">
                                        <Link
                                            to="/dashboard/users/new"
                                            className="add-new-btn"
                                        >
                                            Add New
                                        </Link>
                                    </div>
                                </div>
                                <CoreDataTable
                                    rows={userData}
                                    columns={userColumn.concat(actionColumn)}
                                />
                            </div>
                        </div>
                    </Box> */}
                </Box>
            </Main>
        </Box>
    )
}

export default AddInstructors