import { useState } from "react";
import {
  Home,
  Users,
  Calendar,
  Activity,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("Classes");

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/Navbar" },
    { name: "Classes", icon: Home, path: "#" },
    { name: "Users", icon: Users, path: "#" },
    { name: "Schedules", icon: Calendar, path: "#" },
    { name: "New Meetings", icon: Activity, path: "#" },
  ];
  return (
    <div className="w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 p-6">ClassRoom</h1>
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setActive(item.name)}
              className={`flex items-center w-full px-6 py-3 text-black-600 hover:bg-blue-50 hover:text-blue-600 ${
                active === item.name
                  ? "bg-blue-100 bg-blue-300 font-semibold"
                  : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Illustration Bottom */}
      <div className="p-6">
        <img src="/LL-logo2.png" alt="Logo" className="w-full" />
      </div>
    </div>
  );
};

export default Sidebar;
