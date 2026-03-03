import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function PinModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState("");

  const correctPin = "123456"; 

  const handleVerify = () => {
    if (pin === correctPin) {
      toast.success("Access Granted");
      onSuccess();
      onClose();
      setPin("");
    } else {
      toast.error("Wrong PIN");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-80 shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter Admin PIN
        </h2>

        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-3 rounded-xl border 
                     dark:bg-gray-800 dark:border-gray-700"
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
          >
            Verify
          </button>
        </div>
      </motion.div>
    </div>
  );
}