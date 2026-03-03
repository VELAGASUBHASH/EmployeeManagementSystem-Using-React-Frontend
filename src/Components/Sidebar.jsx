import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, Building } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const baseClass =
    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <div className="w-64 min-h-screen 
                    bg-white/70 dark:bg-gray-900/80 
                    backdrop-blur-xl 
                    border-r border-gray-200 dark:border-gray-800 
                    shadow-sm p-6">


      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-12 
                   bg-gradient-to-r from-indigo-600 to-violet-600 
                   bg-clip-text text-transparent"
      >
        EMS 
      </motion.h1>

      <nav className="space-y-3">


        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>


        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600"
            }`
          }
        >
          <User size={18} />
          Employees
        </NavLink>


        <NavLink
          to="/departments"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive
                ? "bg-indigo-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600"
            }`
          }
        >
          <Building size={18} />
          Departments
        </NavLink>

      </nav>
    </div>
  );
}