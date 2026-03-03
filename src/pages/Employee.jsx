import { useState, useEffect } from "react";
import {
  addemployeee,
  updateemployee,
  getallemployees,
  deleteemployee,
} from "../api/employeeApi";
import { getalldepartment } from "../api/departmentApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Pencil, Trash2, IndianRupee } from "lucide-react";
import PinModal from "../Components/PinModal";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    salary: "",
    departmentId: "",
  });
  const [editId, setEditId] = useState(null);

  // 🔐 PIN STATES
  const [showPin, setShowPin] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const emp = await getallemployees();
    const dep = await getalldepartment();
    setEmployees(emp.data);
    setDepartments(dep.data);
  };

  // 🔥 REAL SUBMIT FUNCTION
  const executeSubmit = async () => {
    const payload = {
      name: form.name,
      email: form.email,
      salary: Number(form.salary),
      department: {
        id: form.departmentId,
      },
    };

    try {
      if (editId) {
        await updateemployee(editId, payload);
        toast.success("Employee Updated");
      } else {
        await addemployeee(payload);
        toast.success("Employee Added");
      }
      resetForm();
      load();
    } catch {
      toast.error("Operation Failed");
    }
  };

  // 🔐 HANDLE SUBMIT WITH PIN
  const handleSubmit = (e) => {
    e.preventDefault();

    setPendingAction(() => executeSubmit);
    setShowPin(true);
  };

  const handleEdit = (emp) => {
    // 🔐 Protect Edit with PIN
    setPendingAction(() => () => {
      setForm({
        name: emp.name,
        email: emp.email,
        salary: emp.salary,
        departmentId: emp.department?.id,
      });
      setEditId(emp.id);
    });
    setShowPin(true);
  };

  const handleDelete = (id) => {
    // 🔐 Protect Delete with PIN
    setPendingAction(() => async () => {
      await deleteemployee(id);
      toast.success("Employee Deleted");
      load();
    });
    setShowPin(true);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", salary: "", departmentId: "" });
    setEditId(null);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Employees</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your team members
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-900 
                      p-6 rounded-2xl shadow-md 
                      border border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-6">

          <input
            placeholder="Name"
            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Salary"
            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />

          <select
            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.departmentId}
            onChange={(e) =>
              setForm({ ...form, departmentId: e.target.value })
            }
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>

          <button
            className="col-span-4 bg-gradient-to-r from-indigo-500 to-violet-500
                       text-white font-medium py-3 rounded-xl
                       hover:opacity-90 transition"
          >
            {editId ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>

      {/* Employee Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.map((emp) => (
          <motion.div
            key={emp.id}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-900 
                       rounded-2xl shadow-md 
                       border border-gray-100 dark:border-gray-800
                       p-6 transition"
          >
            <div className="w-16 h-16 rounded-full 
                            bg-gradient-to-r from-indigo-500 to-purple-500
                            flex items-center justify-center
                            text-white font-bold text-xl mb-4">
              {emp.name?.charAt(0).toUpperCase()}
            </div>

            <h3 className="text-lg font-semibold">{emp.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {emp.email}
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <IndianRupee size={16} />
                {emp.salary}
              </div>

              <span className="inline-block px-3 py-1 text-sm rounded-full 
                               bg-indigo-100 dark:bg-indigo-900
                               text-indigo-600 dark:text-indigo-400">
                {emp.department?.name}
              </span>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => handleEdit(emp)}
                className="flex items-center gap-1 text-indigo-600 hover:underline"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(emp.id)}
                className="flex items-center gap-1 text-red-500 hover:underline"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔐 PIN MODAL */}
      <PinModal
        isOpen={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={() => {
          if (pendingAction) pendingAction();
        }}
      />
    </div>
  );
}