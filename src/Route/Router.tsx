import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/common/Layout.tsx";
import Login from "../pages/user/Login.tsx";
import Signup from "../pages/user/Signup.tsx";
import Dashboard from "../pages/user/Dashboard.tsx";
import Clients from "../pages/user/Clients.tsx";
import AddClient from "../pages/client/AddClient.tsx";
import AddInvoice from "../pages/invoice/AddInvoice.tsx";
import UserProfile from "../pages/user/Profile.tsx";
import UserProfileEdit from "../pages/user/ProfileEdit.tsx";
import ViewInvoice from "../pages/invoice/ViewInvoice.tsx";
import GuestRoute from "./ProtectredRoute/GuestProtectedRoute.tsx";
import NotAuthProtectedRoute from "./ProtectredRoute/NotAuthProtectedRoute.tsx"; 
import Invoices from "../pages/invoice/Invoices.tsx";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: (
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                ),
            },
            {
                path: "/signup",
                element: (
                    <GuestRoute>
                        <Signup />
                    </GuestRoute>
                ),
            },
            {
                path: "/dashboard",
                element: (
                    <NotAuthProtectedRoute>
                        <Dashboard />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: "/clients",
                element: (
                    <NotAuthProtectedRoute>
                        <Clients />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: "/client/:clientId",
                element: (
                    <NotAuthProtectedRoute>
                        <Invoices />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: "/add-client",
                element: (
                    <NotAuthProtectedRoute>
                        <AddClient />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: "/add-invoice",
                element: (
                    <NotAuthProtectedRoute>
                        <AddInvoice />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <NotAuthProtectedRoute>
                        <UserProfile />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: "/profile-edit",
                element: (
                    <NotAuthProtectedRoute>
                        <UserProfileEdit />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: "/invoice/:invoiceId",
                element: (
                    <NotAuthProtectedRoute>
                        <ViewInvoice />
                    </NotAuthProtectedRoute>
                ),
            },
        ],
    },
]);
