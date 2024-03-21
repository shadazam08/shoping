import React from 'react'
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
import AddCourses from '../AddCourses/AddCourses';
import AddInstructors from '../AddInstructors/AddInstructors';
import InstructorsList from '../AddInstructors/InstructorsList';
import CoursesList from '../AddCourses/CoursesList';
import ViewCourse from '../AddCourses/ViewCourse';
import ViewInstructors from '../AddInstructors/ViewInstructors';


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
                <Route exact path='/dashboard/addCourses' element={isLoggedIn ? <AddCourses /> : <Login />} />
                <Route exact path='/dashboard/addInstructors' element={isLoggedIn ? <AddInstructors /> : <Login />} />
                <Route exact path='/dashboard/instructorsList' element={isLoggedIn ? <InstructorsList /> : <Login />} />
                <Route exact path='/dashboard/instructorsList/viewInstructors/:instructId' element={isLoggedIn ? <ViewInstructors /> : <Login />} />
                <Route exact path='/dashboard/coursesList' element={isLoggedIn ? <CoursesList /> : <Login />} />
                <Route exact path='/dashboard/coursesList/viewCourse/:courseId' element={isLoggedIn ? <ViewCourse /> : <Login />} />

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