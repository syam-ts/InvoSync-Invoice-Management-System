import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/other/Layout.tsx"; 
import Login from "../pages/user/Login.tsx";
import Signup from "../pages/user/Signup.tsx";

export const router = createBrowserRouter([ 
    {
        element: <Layout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    }
]);
