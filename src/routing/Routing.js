import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../pages/home/Home";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router= createBrowserRouter([
    {
        path:'/',
        element: <PrivateRoute>  <Home/></PrivateRoute>
    },
    {
        path:'/signup',
        element: <PublicRoute> <SignUp /> </PublicRoute>
    },
    {
        path:'/login',
        element:<PublicRoute><Login /></PublicRoute>
    },
]);
export default function Routing(params) {
    return (
        <RouterProvider router={router} />
    )
}