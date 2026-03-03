import { useEffect, useState } from "react";
import {
  getalldepartment,
  adddepartment,
  updatedepartment,
  deletedepartment,
} from "../api/departmentApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Building2, MapPin, Pencil, Trash2 } from "lucide-react";
import PinModal from "../Components/PinModal";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [editId, setEditId] = useState(null);

  const [showPin, setShowPin] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getalldepartment();
    setDepartments(res.data);
  };

  const executeSubmit = async () => {
    try {
      if (editId) {
        await updatedepartment(editId, form);
        toast.success("Department Updated");
      } else {
        await adddepartment(form);
        toast.success("Department Added");
      }
      setForm({ name: "", location: "" });
      setEditId(null);
      load();
    } catch {
      toast.error("Operation Failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPendingAction(() => executeSubmit);
    setShowPin(true);
  };

  const handleEdit = (dep) => {

    setPendingAction(() => () => {
      setForm({ name: dep.name, location: dep.location });
      setEditId(dep.id);
    });
    setShowPin(true);
  };

  const handleDelete = (id) => {

    setPendingAction(() => async () => {
      await deletedepartment(id);
      toast.success("Department Deleted");
      load();
    });
    setShowPin(true);
  };

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-3xl font-bold">Departments</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage organization departments
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 
                      p-6 rounded-2xl shadow-md 
                      border border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">

          <input
            placeholder="Department Name"
            className="p-3 rounded-xl 
                       bg-gray-50 dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700
                       focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Location"
            className="p-3 rounded-xl 
                       bg-gray-50 dark:bg-gray-800 
                       border border-gray-200 dark:border-gray-700
                       focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <button
            className="bg-gradient-to-r from-indigo-500 to-violet-500 
                       text-white font-medium rounded-xl 
                       hover:opacity-90 transition"
          >
            {editId ? "Update Department" : "Add Department"}
          </button>
        </form>
      </div>


      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dep) => (
          <motion.div
            key={dep.id}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-gray-900 
                       rounded-2xl shadow-md 
                       border border-gray-100 dark:border-gray-800
                       p-6 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
                <Building2 className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{dep.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                  <MapPin size={14} />
                  {dep.location}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleEdit(dep)}
                className="flex items-center gap-1 text-indigo-600 hover:underline"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(dep.id)}
                className="flex items-center gap-1 text-red-500 hover:underline"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

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