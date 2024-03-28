import React from 'react';
import { useAuth } from '../context/AppContext';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Navigate
} from "react-router-dom";
import UserAuth from '../pages/userAuth/UserAuth';
import Dashboard from '../pages/Dashboard/Dashboard';
import { showNavBar } from './RouteUtil';
import Navbar from '../pages/Navbar/Navbar';
import SideBar from '../pages/SideBar/SideBar';
import StudentProfile from '../pages/Profile/StudentProfile';

const Rought = () => {
    const { isLoggedIn } = useAuth();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route exact path="/" element={isLoggedIn ? <Navigate to='/dashboard' /> : <UserAuth />} />
                <Route exact path="/login" element={isLoggedIn ? <Navigate to='/dashboard' /> : <UserAuth />} />
                <Route exact path="/register" element={isLoggedIn ? <Navigate to='/dashboard' /> : <UserAuth />} />

                <Route exact path='/dashboard' element={isLoggedIn ? <Dashboard /> : <UserAuth />} />
                <Route exact path='/dashboard/profile' element={isLoggedIn ? <StudentProfile /> : <UserAuth />} />

            </>
        )
    );
    return (
        <>
            {showNavBar(isLoggedIn) && <Navbar />}
            {showNavBar(isLoggedIn) && <SideBar />}
            <RouterProvider router={router} />
        </>
    )
}

export default Rought
