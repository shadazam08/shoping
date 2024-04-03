import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AppContext';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';

const ViewCourse = () => {
    const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState();
    const [instructName, setInstructName] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [messages, setMessage] = useState('');


    const fetchCourseDetails = async () => {
        const response = await fetch(`http://${serverIP}:${serverPort}/showData/viewCourse/${courseId}`);
        const parseRes = await response.json();
        const dataFetch = parseRes.courseDetail;
        const fetchInstructorName = parseRes.instructorNames;
        setCourseDetails(dataFetch);
        setIsDisabled(dataFetch.status === 'disable');

        console.log('dataFetch: ', dataFetch.status)
        console.log('fetchInstructorName: ', fetchInstructorName)
        setInstructName(fetchInstructorName)

    }

    const updateCourseStatus = async (status) => {
        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/updateData/updateCourse/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.message === 'Status Updated Successfully') {
                setIsDisabled(status === 'disable');
                setMessage(`${status.charAt(0).toUpperCase() + status.slice(1)} Successful`);
                setTimeout(() => setMessage(''), 3000);
                fetchCourseDetails();
            } else if (data.message === 'Status Updation Failed') {
                setMessage('Status Updation Failed');
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }


    useEffect(() => {
        fetchCourseDetails();
    }, [courseId])

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{
                    p: 1,
                    marginLeft: { sm: '240px', md: '240px', xs: '240px' },
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                        {messages && <Alert variant={isDisabled ? 'danger' : 'success'}>{messages}</Alert>}
                    </Box>
                    {courseDetails ? (
                        <Form>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Course Name</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Course Name"
                                        aria-describedby="basic-addon1"
                                        value={courseDetails.course_name}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Course Description</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Course Description"
                                        aria-describedby="basic-addon1"
                                        value={courseDetails.course_description}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Course Duration</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Course Duration"
                                        aria-describedby="basic-addon1"
                                        value={courseDetails.course_duration_hours}
                                        readOnly
                                    />
                                    <InputGroup.Text>hours daily</InputGroup.Text>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Course Start Date</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Course Start Date"
                                        aria-describedby="basic-addon1"
                                        value={courseDetails.course_start_date ? courseDetails.course_start_date.substring(0, 10) : ''}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Course End Date</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Course End Date"
                                        aria-describedby="basic-addon1"
                                        value={courseDetails.course_end_date ? courseDetails.course_end_date.substring(0, 10) : ''}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Instructor Name</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Instructor Name"
                                        aria-describedby="basic-addon1"
                                        value={
                                            instructName.find(data => data.instructorId === courseDetails.instructor_id)?.instructorName || ''
                                        }
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Status</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Status"
                                        aria-describedby="basic-addon1"
                                        value={courseDetails.status}
                                        readOnly
                                    />
                                </InputGroup>
                                <Button variant={isDisabled ? 'success' : 'danger'} onClick={() => updateCourseStatus(isDisabled ? 'enable' : 'disable')}>
                                    {isDisabled ? 'Enable' : 'Disable'}
                                </Button>
                            </Box>
                        </Form>
                    ) : (
                        <p>loading...</p>
                    )}
                </Box>
            </Main>
        </Box>
    )
}

export default ViewCourse
