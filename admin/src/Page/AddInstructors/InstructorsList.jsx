import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AppContext';
import { Box } from '@mui/material';
import moment from 'moment'
import CoreDataTable from '../../CoreDataTable/CoreDataTable'
import { Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const InstructorsList = () => {
  const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
  const [userData, setUserData] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [messages, setMessage] = useState('');
  const history = useNavigate();

  const fetchInstructorsList = async () => {
    try {
      const response = await fetch(
        `http://${serverIP}:${serverPort}/showData/instructorsDetails`,
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
      const dataFetch = data.instructorsDetails
      const fetchCourseName = data.courseName;
      // Add a unique 'id' property to each row using 'user_id'
      const userDataWithId = dataFetch.map((user) => ({
        ...user,
        id: user.instructor_id,
      }));
      setUserData(userDataWithId);
      setCourseNames(fetchCourseName);

      console.log('fetchCourseName: ', fetchCourseName)
      console.log('userDataWithId: ', userDataWithId)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const handleViewClick = (event, instructId) => {
    event.preventDefault();
    // Navigate to the user details page with the user ID
    history(`/dashboard/instructorsList/viewInstructors/${instructId}`);
  };

  const handleDeleteClick = async (instructId) => {
    try {
      const response = await fetch(`http://${serverIP}:${serverPort}/updateData/deleteInstructors/${instructId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (data.message === 'Deletion Successful') {
        setMessage(`Delete Successful`);
        setTimeout(() => setMessage(''), 3000);
        fetchInstructorsList();
      } else if (data.message === 'Deletion Failed') {
        setMessage('Deletion Failed');
      }

    } catch (error) {
      console.error('Error fetching Deletion data:', error)
    }
  }

  const userColumn = [
    // { field: 'id', headerName: 'ID', width: 100, sortable: false },
    { field: 'instructor_name', headerName: 'Name', width: 200 },
    { field: 'instructor_email', headerName: 'Email', width: 200 },
    // { field: 'course_duration_hours', headerName: 'Daliy Hours', width: 90 },
    { field: 'instructors_mobile', headerName: 'Mobile', width: 140 },
    {
      field: 'instructor_id',
      headerName: 'Course Name',
      width: 140,
      valueGetter: (params) => {
        const courseId = params.value;
        const course = courseNames[courseId];
        return course ? course.join(', ') : '';
      }
    },
    { field: 'instructors_join_date', headerName: 'Join Date', width: 110, renderCell: params => moment(params.row.instructors_join_date).format('DD-MM-YYYY') },
    // { field: 'course_end_date', headerName: 'End Date', width: 110, renderCell: params => moment(params.row.course_end_date).format('DD-MM-YYYY') },
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
            <div className="view-btn" onClick={(event) => handleViewClick(event, params.row.instructor_id)}>
              <Visibility />
              View
            </div>
            <div className="delete-btn" onClick={() => handleDeleteClick(params.row.instructor_id)}>
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

  useEffect(() => {
    fetchInstructorsList();
  }, [])

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
          <h1 className='mb-2'>Instructor List</h1>

          <div className="list-container-wrapper">
            <div className="list-table-container" >
              <CoreDataTable
                {...initialState}
              />
            </div>
          </div>
        </Box>
      </Main>
    </Box>
  )
}

export default InstructorsList
