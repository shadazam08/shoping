import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import Login from "../Login/Login";
import Register from "../register/Register";

const routers = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </>


    )
);
export { routers }