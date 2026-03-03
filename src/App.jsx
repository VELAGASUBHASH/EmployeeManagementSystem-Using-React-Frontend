import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import { Routes,Route } from "react-router-dom";
import Employee from "./pages/Employee";
import Department from "./pages/Department";


function App(){
  return(
    <>
    <Toaster/>
    <MainLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employees" element={<Employee/>} />
      <Route path="/departments" element={<Department />} />
    </Routes>
    </MainLayout>  
    </>
  );
}

export default App;