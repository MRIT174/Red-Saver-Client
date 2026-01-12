import { NavLink, Outlet } from "react-router";
import {
  Home,
  Users,
  Droplet,
  Menu,
  ArrowLeft,
} from "lucide-react";

const AdminDashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-900">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar bg-gray-800 border-b border-gray-700 px-4 sticky top-0 z-20">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="admin-drawer"
              className="btn btn-square btn-ghost text-gray-300 hover:text-red-400 transition"
            >
              <Menu />
            </label>
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-red-500 tracking-wide">
              Admin Dashboard
            </h1>
          </div>

          <NavLink
            to="/"
            className="btn btn-sm md:btn-md border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Home
          </NavLink>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen sticky top-0">
          {/* Brand */}
          <div className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              🩸 BloodCare
            </h2>
            <p className="text-sm opacity-90">Admin Panel</p>
          </div>

          {/* Menu */}
          <ul className="menu p-4 text-gray-300 gap-2">
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                   ${
                     isActive
                       ? "bg-red-500 text-white shadow-md"
                       : "hover:bg-gray-700 hover:text-red-400"
                   }`
                }
              >
                <Home size={20} />
                Dashboard Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                   ${
                     isActive
                       ? "bg-red-500 text-white shadow-md"
                       : "hover:bg-gray-700 hover:text-red-400"
                   }`
                }
              >
                <Users size={20} />
                All Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/all-blood-donation-request"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                   ${
                     isActive
                       ? "bg-red-500 text-white shadow-md"
                       : "hover:bg-gray-700 hover:text-red-400"
                   }`
                }
              >
                <Droplet size={20} />
                Blood Requests
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
