import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/other/Layout.tsx"; 
import Login from "../pages/user/Login.tsx";
import Signup from "../pages/user/Signup.tsx"; 
import Dashboard from "../pages/user/Dashboard.tsx";
import Clients from "../pages/user/Clients.tsx";
import InvoiceCard from "../pages/invoice/Invoices.tsx"; 
import AddClient from "../pages/client/AddClient.tsx";

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
            },
            {
                path: '/dashboard',
                element: <Dashboard />
       
            },
            {
                path: '/clients',
                element: <Clients />
            },
            {
                path: '/client/:clientId',
                element: <InvoiceCard />
            },
            {
                path: '/add-client',
                element: <AddClient />
            }
        ]
    }
]);
