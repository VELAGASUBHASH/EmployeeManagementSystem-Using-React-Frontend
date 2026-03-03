import { useState, useEffect, useMemo } from "react";
import { getallemployees } from "../api/employeeApi";
import { motion } from "framer-motion";
import { Users, IndianRupee } from "lucide-react";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getallemployees();
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    return employees.filter(emp =>
      emp.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  const totalEmployees = employees.length;
  const avgSalary =
    employees.length > 0
      ? Math.round(
          employees.reduce((acc, emp) => acc + emp.salary, 0) /
            employees.length
        )
      : 0;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Overview of your organization
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-gray-900 
                        rounded-2xl p-6 shadow-md 
                        border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
              <Users className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <h2 className="text-2xl font-bold">{totalEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 
                        rounded-2xl p-6 shadow-md 
                        border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
              <IndianRupee className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Salary</p>
              <h2 className="text-2xl font-bold">₹ {avgSalary}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search employee..."
          className="w-full pl-4 pr-4 py-3 rounded-xl
                     bg-white dark:bg-gray-900
                     border border-gray-200 dark:border-gray-700
                     focus:ring-2 focus:ring-indigo-500
                     outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Profile Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((emp) => (
          <motion.div
            key={emp.id}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-900 
                       rounded-2xl shadow-md 
                       border border-gray-100 dark:border-gray-800
                       p-6 text-center transition-all duration-300"
          >
            {/* Avatar */}
            <div className="w-20 h-20 mx-auto rounded-full 
                            bg-gradient-to-r from-indigo-500 to-violet-500 
                            flex items-center justify-center 
                            text-white text-2xl font-bold mb-4 shadow-lg">
              {emp.name?.charAt(0).toUpperCase()}
            </div>

            <h3 className="text-lg font-semibold">
              {emp.name}
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {emp.email}
            </p>

            <div className="mt-4 space-y-2">
              <span className="block px-3 py-1 text-sm rounded-full 
                               bg-green-100 dark:bg-green-900 
                               text-green-600 dark:text-green-400">
                ₹ {emp.salary}
              </span>

              <span className="block px-3 py-1 text-sm rounded-full 
                               bg-indigo-100 dark:bg-indigo-900 
                               text-indigo-600 dark:text-indigo-400">
                {emp.department?.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}