import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserAuth from '../pages/userAuth/UserAuth';
import Dashboard from '../pages/Dashboard/Dashboard';

const Rought = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<UserAuth />} />
                <Route path='/login' element={<UserAuth />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    )
}

export default Rought
