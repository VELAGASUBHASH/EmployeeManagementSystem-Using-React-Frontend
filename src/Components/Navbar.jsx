import { Sun, Moon, Search, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 
                 bg-white/70 dark:bg-gray-900/80 
                 backdrop-blur-xl 
                 border-b border-gray-200 dark:border-gray-800 
                 px-8 py-4 flex justify-between items-center"
    >

      <div className="relative w-1/3 hidden md:block">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-xl 
                     bg-gray-100 dark:bg-gray-800 
                     text-gray-800 dark:text-white 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     transition"
        />
      </div>

      <div className="flex items-center gap-6">



        <button
          onClick={toggleTheme}
          className="p-2 rounded-full 
                     bg-gray-100 dark:bg-gray-800 
                     hover:scale-105 transition"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" size={18} />
          ) : (
            <Moon className="text-gray-700 dark:text-gray-200" size={18} />
          )}
        </button>

        <div className="w-9 h-9 rounded-full 
                        bg-gradient-to-r from-indigo-500 to-violet-500 
                        flex items-center justify-center 
                        text-white font-semibold cursor-pointer">
          S
        </div>

      </div>
    </motion.div>
  );
}