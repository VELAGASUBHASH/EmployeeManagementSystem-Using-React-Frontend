🚀 Employee Management System – Frontend

A modern Admin Dashboard UI built with React (Vite) and Tailwind CSS for managing Employees and Departments.

This application connects to a Spring Boot backend and demonstrates clean architecture, reusable components, state management, API integration, and UI/UX best practices.

🎯 Project Objective

To build a production-style Admin Dashboard that demonstrates:

CRUD operations with API integration

Modern UI design principles

Component-based architecture

State management using React Hooks

Route management

Secure admin action handling (PIN protection)

✨ Core Features
📊 Dashboard

Employee profile cards

Real-time search

Responsive grid layout

Smooth animations using Framer Motion

Dark / Light theme toggle

👨‍💼 Employee Management

Add Employee

Update Employee

Delete Employee

Department mapping

Card-based layout

Admin PIN protection before critical actions

🏢 Department Management

Add Department

Update Department

Delete Department

Modern animated department cards

PIN-protected actions

🔐 Security Layer (UI-Level)

Admin PIN required for:

Add

Edit

Delete

Reusable PinModal component

Action-based verification logic

Note: PIN validation is frontend-based for demonstration purposes.

🎨 UI & UX Highlights

Fully responsive layout

Tailwind CSS utility-based styling

Gradient CTA buttons

Dark mode support (darkMode: "class")

Framer Motion animations

Toast notifications for user feedback

Clean SaaS-style layout

🛠 Tech Stack

React (Vite)

Tailwind CSS

Axios

React Router DOM

Framer Motion

Lucide Icons

React Hot Toast

📁 Project Structure
src/
 ├── api/
 │    ├── axios.js
 │    ├── departmentApi.js
 │    └── employeeApi.js
 │
 ├── components/
 │    ├── Navbar.jsx
 │    ├── Sidebar.jsx
 │    ├── PinModal.jsx
 │    └── Loader.jsx
 │
 ├── layout/
 │    └── MainLayout.jsx
 │
 ├── pages/
 │    ├── Dashboard.jsx
 │    ├── Employee.jsx
 │    └── Departments.jsx
 │
 ├── App.jsx
 └── main.jsx
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/EmployeeManagementSystemFrontend.git
cd EmployeeManagementSystemFrontend
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev

Application runs at:

http://localhost:5173
🌐 Backend Configuration

Ensure backend is running.

Update axios.js:

import axios from "axios";

export default axios.create({
  baseURL: "https://your-backend-url.onrender.com/api",
});
🚀 Production Build
npm run build
