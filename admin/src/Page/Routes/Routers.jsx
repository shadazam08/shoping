import React, { Suspense, useEffect, useState, lazy } from 'react'
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Navigate
} from "react-router-dom";
import { useAuth } from '../../context/AppContext';
import { showNavBar } from './RouteUtils';
import Login from "../Login/Login";
import Register from "../register/Register";
import Dashboard from "../Dashboard/Dashboard";
import UserProfile from '../user/UserProfile';
import NavBar from "../NavBar/NavBar";


const Routers = () => {
    const { isLoggedIn, serverIP, serverPort } = useAuth();
    // const [menuItems, setMenuItems] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`http://${serverIP}:${serverPort}/showData/sideBarMenu`)
    //         const parseRes = await response.json();
    //         if (parseRes.message === 'success') {
    //             // API call successful
    //             const { sideMenuItems } = parseRes;

    //             console.log('RouteMenu: ', sideMenuItems)
    //             setMenuItems(sideMenuItems);

    //         } else {
    //             console.error('Data fetch failed. Status:', response.status);
    //             const errorMessage = await response.text();
    //             console.error('Error message:', errorMessage);
    //         }
    //     }
    //     fetchData();
    // }, []);


    // const generateRoutes = () => {
    //     return menuItems && menuItems.map((menuItem, index) => (
    //         <Route
    //             key={menuItem.menu_id}
    //             exact
    //             path={menuItem.admin_url}
    //             element={isLoggedIn ? (
    //                 <Suspense fallback={<div>Loading...</div>}>
    //                     {lazy(() => import(`../${menuItem.admin_component}`))}
    //                 </Suspense>
    //             ) : (
    //                 <Login />
    //             )}
    //         // element={isLoggedIn ? <menuItem.admin_component /> : <Login />}
    //         />
    //     ));

    // };





    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route exact path="/" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
                <Route exact path="/login" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
                <Route exact path="/register" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Register />} />

                <Route exact path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Login />} />

                <Route exact path='/dashboard/userProfile' element={isLoggedIn ? <UserProfile /> : <Login />} />
                {/* {generateRoutes()} */}

            </>
        )
    );
    return (
        <>
            {showNavBar(isLoggedIn) && <NavBar />}
            <RouterProvider router={router} />
        </>
    )
}

export default Routers