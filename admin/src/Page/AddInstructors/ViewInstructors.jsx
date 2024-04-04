import React, { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../../context/AppContext';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';

const ViewInstructors = () => {
    const { open, Main, DrawerHeader, serverIP, serverPort } = useAuth();
    const { instructId } = useParams();
    const [instructDetails, setInstructDetails] = useState();
    const [isDisabled, setIsDisabled] = useState(false);
    const [messages, setMessage] = useState('');

    // const fetchInstructorsDetails = async () => {
    //     const response = await fetch(`http://${serverIP}:${serverPort}/showData/viewInstructors/${instructId}`);
    //     const parseRes = await response.json();
    //     const dataFetch = parseRes.instructorsDetail;

    //     setInstructDetails(dataFetch)
    //     setIsDisabled(dataFetch.status === 'disable');
    // }
    const fetchInstructorsDetails = useCallback(async () => {
        const response = await fetch(`http://${serverIP}:${serverPort}/showData/viewInstructors/${instructId}`);
        const parseRes = await response.json();
        const dataFetch = parseRes.instructorsDetail;

        setInstructDetails(dataFetch)
        setIsDisabled(dataFetch.status === 'disable');
    }, [serverIP, serverPort, instructId]);

    const updateInstructorStatus = async (status) => {
        try {
            const response = await fetch(`http://${serverIP}:${serverPort}/updateData/updateInstructor/${instructId}`, {
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
                fetchInstructorsDetails();
            } else if (data.message === 'Status Updation Failed') {
                setMessage('Status Updation Failed');
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    useEffect(() => {
        fetchInstructorsDetails();
    }, [fetchInstructorsDetails])

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
                    {instructDetails ? (
                        <Form>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Name"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructor_name}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Email"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructor_email}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Mobile Number</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Mobile Number"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructors_mobile}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Joining Date</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Join Date"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructors_join_date ? instructDetails.instructors_join_date.substring(0, 10) : ''}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Street</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Street"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructors_street}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">City</InputGroup.Text>
                                    <Form.Control
                                        aria-label="City"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructors_city}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">State</InputGroup.Text>
                                    <Form.Control
                                        aria-label="State"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructors_state}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Zip Code</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Zip Code"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.instructors_zip_code}
                                        readOnly
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Status</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Status"
                                        aria-describedby="basic-addon1"
                                        value={instructDetails.status}
                                        readOnly
                                    />
                                </InputGroup>
                                <Button variant={isDisabled ? 'success' : 'danger'} onClick={() => updateInstructorStatus(isDisabled ? 'enable' : 'disable')}>
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

export default ViewInstructors