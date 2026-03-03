/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",   // Indigo-500
        secondary: "#8b5cf6", // Purple-500
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};