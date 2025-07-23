import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
    const location = useLocation();
    const hideSidebarRoutes = ["/login", "/signup"];
    const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

    return (
        <>
            <div className="flex h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
                {!shouldHideSidebar && <Sidebar />}
                <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
