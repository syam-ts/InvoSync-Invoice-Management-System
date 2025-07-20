import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/common/Layout.tsx"; 
import Login from "../pages/user/Login.tsx";
import Signup from "../pages/user/Signup.tsx"; 
import Dashboard from "../pages/user/Dashboard.tsx";
import Clients from "../pages/user/Clients.tsx";
import InvoiceCard from "../pages/invoice/Invoices.tsx"; 
import AddClient from "../pages/client/AddClient.tsx";
import AddInvoice from "../pages/invoice/AddInvoice.tsx";
import UserProfile from "../pages/user/Profile.tsx";

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
            },
            {
                path: '/add-invoice',
                element: <AddInvoice />
            },
            {
                path: '/profile',
                element: <UserProfile />
            }
        ]
    }
]);
