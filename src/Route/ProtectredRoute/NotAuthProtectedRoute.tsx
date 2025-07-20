import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { JSX } from "react";

interface NotAuthProtectedRouteProps {
    children: JSX.Element;
}

const NotAuthProtectedRoute: React.FC<NotAuthProtectedRouteProps> = ({ children }) => { 
    const isUserLoggedIn = useSelector((state: any) => state.isUser); 
   
    if (!isUserLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default NotAuthProtectedRoute;