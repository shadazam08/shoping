import React from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Navigate
} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../register/Register";
import Dashboard from "../Dashboard/Dashboard";
import NavBar from "../NavBar/NavBar";
import { useAuth } from '../../context/AppContext';
import { showNavBar } from './RouteUtils';
import UserProfile from '../user/UserProfile';
import SideBar from '../SideBar/SideBar';




const Routers = () => {
    const { isLoggedIn } = useAuth();


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route exact path="/" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
                <Route exact path="/login" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
                <Route exact path="/register" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Register />} />

                <Route exact path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Login />} />
                <Route exact path='/dashboard/userProfile' element={isLoggedIn ? <UserProfile /> : <Login />} />

            </>


        )
    );
    return (
        <>
            {showNavBar(isLoggedIn) && <NavBar />}
            {/* {showNavBar(isLoggedIn) && <SideBar />} */}
            <RouterProvider router={router} />
        </>

    )

}

export default Routers