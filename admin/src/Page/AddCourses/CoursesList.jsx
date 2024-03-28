import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AppContext';
import { Box } from '@mui/material';
import moment from 'moment'
import CoreDataTable from '../../CoreDataTable/CoreDataTable'
// import '../../table.scss';
import { Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const CoursesList = () => {
    const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
    const [userData, setUserData] = useState([]);
    const [instructorNames, setInstructorNames] = useState([]);
    const [messages, setMessage] = useState('');
    const history = useNavigate();

    const fetchCourseList = async () => {
        try {
            const response = await fetch(
                `http://${serverIP}:${serverPort}/showData/CourseDetail`,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const dataFetch = data.coursesDetails
            const fetchInstructorName = data.instructorNames;
            // Add a unique 'id' property to each row using 'user_id'
            const userDataWithId = dataFetch.map((user) => ({
                ...user,
                id: user.course_id,
            }));
            setUserData(userDataWithId);
            setInstructorNames(fetchInstructorName);

            console.log('userDataWithId: ', userDataWithId)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {

        fetchCourseList();
    }, []);

    const handleViewClick = (event, courseId) => {
        event.preventDefault();
        // Navigate to the user details page with the user ID
        history(`/dashboard/coursesList/viewCourse/${courseId}`);
    };

    const handleDeleteClick = async (courseId) => {
        console.log('courseId: ', courseId)
        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/updateData/deleteCourse/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (data.message === 'Deletion Successful') {
                setMessage(`Delete Successful`);
                setTimeout(() => setMessage(''), 3000);
                
            } else if (data.message === 'Deletion Failed') {
                setMessage('Deletion Failed');
            }

        } catch (error) {
            console.error('Error fetching Deletion data:', error)
        }
    }

    const userColumn = [
        // { field: 'id', headerName: 'ID', width: 100, sortable: false },
        { field: 'course_name', headerName: 'Course Name', width: 200 },
        { field: 'course_description', headerName: 'Desc', width: 200 },
        // { field: 'course_duration_hours', headerName: 'Daliy Hours', width: 90 },
        {
            field: 'instructor_id',
            headerName: 'Instructor Name',
            width: 140,
            valueGetter: (params) => {
                const instructorId = params.value;
                const instructor = instructorNames.find((item) => item.instructorId === instructorId);
                return instructor ? instructor.instructorName : '';
            }
        },
        { field: 'course_start_date', headerName: 'Start Date', width: 110, renderCell: params => moment(params.row.course_start_date).format('DD-MM-YYYY') },
        { field: 'course_end_date', headerName: 'End Date', width: 110, renderCell: params => moment(params.row.course_end_date).format('DD-MM-YYYY') },
    ];

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className="cellWithAction">
                        <div className="view-btn" onClick={(event) => handleViewClick(event, params.row.course_id)}>
                            <Visibility />
                            View
                        </div>
                        <div className="delete-btn" onClick={() => handleDeleteClick(params.row.course_id)}>
                            <Delete />
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    const initialState = {
        columns: [...userColumn, ...actionColumn], // Correct format: an array of column objects
        rows: userData,
    };
    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{
                    p: 1,
                    marginLeft: { sm: '240px', md: '240px', xs: '240px' },
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                        {messages && <Alert variant='success'>{messages}</Alert>}
                    </Box>
                    <Box>
                        <h1 className='mb-2'>Course List</h1>

                        <div className="list-container-wrapper">
                            <div className="list-table-container" >
                                <CoreDataTable
                                    {...initialState}
                                />
                            </div>
                        </div>
                    </Box>
                </Box>
            </Main>
        </Box>
    )
}

export default CoursesList
