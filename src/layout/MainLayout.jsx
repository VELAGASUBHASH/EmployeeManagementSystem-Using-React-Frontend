import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen 
                    bg-gray-50 dark:bg-gray-950 
                    text-gray-900 dark:text-gray-100 
                    transition-colors duration-300">


      <Sidebar />


      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}