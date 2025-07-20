import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  Users,
  Receipt,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("dashboard");

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "clients", icon: Users, label: "Clients" },
    { id: "invoices", icon: Receipt, label: "Invoices" },
    { id: "add-client", icon: Users, label: "Add Client" },
    { id: "add-invoice", icon: Users, label: "Add Invoice" },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <div className="h-screen max-w-[21rem] p-4">
      <div
        className={`h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl transition-all duration-300 ${isCollapsed ? "w-28" : "w-80"
          }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">InvoSync Pvt</h1>
                <p className="text-xs text-gray-300">Freelance Finance</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Link key={`${item.id}`} to={`/${item.id}`}>
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${isActive
                      ? "bg-gradient-to-r from-gray-600/80 to-slate-700/80 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${isActive
                        ? "bg-white/20"
                        : "bg-white/5 group-hover:bg-white/10"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => handleItemClick("logout")}
            className="w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group text-red-300 hover:text-red-200 hover:bg-red-500/10"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 bg-red-500/10 group-hover:bg-red-500/20">
              <LogOut className="w-5 h-5" />
            </div>

            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {!isCollapsed && (
          <div className="absolute bottom-20 left-4 right-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">John Doe</p>
                <p className="text-gray-400 text-xs">Freelancer</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
