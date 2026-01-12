import { NavLink, Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import { Home, Droplet, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

const VolunteerDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 shadow-xl flex flex-col fixed h-screen">
        <div className="p-6 bg-red-600 text-white">
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            <Droplet size={24} /> BloodCare
          </h2>
          <p className="text-sm opacity-80">Volunteer Panel</p>
        </div>

        <ul className="menu p-4 gap-2 flex-1 overflow-y-auto">
          <motion.li
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              to="/volunteer"
              end
              className={({ isActive }) =>
                isActive
                  ? "bg-red-500 text-white font-semibold rounded-lg px-3 py-2 flex items-center gap-2"
                  : "px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-500 hover:text-white transition-colors duration-200"
              }
            >
              <Home size={18} /> Dashboard Home
            </NavLink>
          </motion.li>

          <motion.li
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <NavLink
              to="/volunteer/all-blood-donation-request"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-500 text-white font-semibold rounded-lg px-3 py-2 flex items-center gap-2"
                  : "px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-500 hover:text-white transition-colors duration-200"
              }
            >
              <Droplet size={18} /> Blood Requests
            </NavLink>
          </motion.li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col">
        <motion.div
          className="navbar bg-gray-800 shadow-md px-4 sticky top-0 z-10 text-gray-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-none lg:hidden">
            <label htmlFor="volunteer-drawer" className="btn btn-square btn-ghost text-gray-200">
              <FaBars />
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-red-500 flex items-center gap-2">
              <UserCheck size={20} /> Volunteer Dashboard
            </h1>
          </div>
          <NavLink className="btn btn-sm md:btn-md border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300" to="/">
            Home
          </NavLink>
        </motion.div>

        <motion.main
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default VolunteerDashboardLayout;
