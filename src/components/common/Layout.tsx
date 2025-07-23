import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Footer from "./Footer";

const Layout = () => {
    const location = useLocation();
    const hideSidebarAndFooterRoutes = ["/login", "/signup"];
    const shouldHideSidebar = hideSidebarAndFooterRoutes.includes(location.pathname);
    const shouldHideFooter = hideSidebarAndFooterRoutes.includes(location.pathname);

    return (
        <>
            <div className="flex h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
                {!shouldHideSidebar && <Sidebar />}
                <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
                    <Outlet />
                {!shouldHideFooter && <Footer />}
                </div>
            </div>
        </>
    );
};

export default Layout;
