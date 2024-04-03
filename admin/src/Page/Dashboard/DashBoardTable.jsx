import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AppContext';
import moment from 'moment';
import '../../table.scss'
import CoreDashBoard from './CoreDashBoard';


const DashBoardTable = () => {
    const { serverIP, serverPort } = useAuth();
    const [userData, setUserData] = useState([]);

    const fetchInstructorsList = async () => {
        try {
            const response = await fetch(
                `http://${serverIP}:${serverPort}/showData/studentDetails`,
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
            const dataFetch = data.allStudent
            console.log(dataFetch);
            // Add a unique 'id' property to each row using 'student_id'
            const userDataWithId = dataFetch.map((user, index) => ({
                ...user,
                id: user.student_id,
                serialNumber: index + 1,
            }));
            setUserData(userDataWithId);
            console.log('userDataWithId: ', userDataWithId)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const userColumn = [
        { field: 'serialNumber', headerName: '#', width: 70, sortable: false },
        { field: 'student_firstname', headerName: 'First Name', width: 240 },
        { field: 'student_lastname', headerName: 'Last Name', width: 240 },
        { field: 'student_email', headerName: 'Email', width: 270 },
        { field: 'student_mobile', headerName: 'Mobile', width: 140 },
        { field: 'student_state', headerName: 'State', width: 180 },
        { field: 'student_join_date', headerName: 'Join Date', width: 130, renderCell: params => moment(params.row.student_join_date).format('DD-MM-YYYY') },
    ];

    const initialState = {
        columns: [...userColumn],
        rows: userData,
    };

    useEffect(() => {
        fetchInstructorsList();
    }, [])
    return (
        <div>

            <CoreDashBoard {...initialState} />
        </div>
    )
}

export default DashBoardTable
