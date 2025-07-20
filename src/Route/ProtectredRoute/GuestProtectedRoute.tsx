import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { JSX } from "react";

interface GuestRouteProps {
    children: JSX.Element;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
    const isUserLoggedIn = useSelector((state: any) => state.isUser);

    if (isUserLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default GuestRoute;