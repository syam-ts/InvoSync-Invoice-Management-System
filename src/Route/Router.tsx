import { createBrowserRouter } from "react-router-dom"; 
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
import { ROUTE } from "../utils/constants/route.ts";
import NotFoundPage from "../pages/common/NotfoundPage.tsx"; 
import Layout from "../components/common/Layout.tsx";

const { LOGIN, SIGNUP } = ROUTE;
const {
    DASHBOARD,
    CLIENTS,
    VIEW_ALL_INVOICES,
    ADD_CLIENT,
    ADD_INVOICE,
    VIEW_INVOICE,
} = ROUTE.APP;
const { PROFILE, PROFILE_EDIT } = ROUTE.USER;

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            
            {
                path: LOGIN,
                element: (
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                ),
            },
            {
                path: SIGNUP,
                element: (
                    <GuestRoute>
                        <Signup />
                    </GuestRoute>
                ),
            },
            {
                path: DASHBOARD,
                element: (
                    <NotAuthProtectedRoute>
                        <Dashboard />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: CLIENTS,
                element: (
                    <NotAuthProtectedRoute>
                        <Clients />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: VIEW_ALL_INVOICES,
                element: (
                    <NotAuthProtectedRoute>
                        <Invoices />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: ADD_CLIENT,
                element: (
                    <NotAuthProtectedRoute>
                        <AddClient />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: ADD_INVOICE,
                element: (
                    <NotAuthProtectedRoute>
                        <AddInvoice />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: PROFILE,
                element: (
                    <NotAuthProtectedRoute>
                        <UserProfile />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: PROFILE_EDIT,
                element: (
                    <NotAuthProtectedRoute>
                        <UserProfileEdit />
                    </NotAuthProtectedRoute>
                ),
            },
            {
                path: VIEW_INVOICE,
                element: (
                    <NotAuthProtectedRoute>
                        <ViewInvoice />
                    </NotAuthProtectedRoute>
                ),
            },
        ],
    },
    {
       path: '*',
       element: <NotFoundPage />
    },
]);
