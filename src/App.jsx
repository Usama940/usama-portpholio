import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";


export default function App() {
  const navigate = useNavigate(); // ⬅️ initialize navigate
  const [isOpen, setIsOpen] = useState(false); // 🔧 Toggle for mobile nav

  return (
    <div className="flex flex-col min-h-screen">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950 flex items-center justify-between py-4 px-4 shadow-md">
        <h1 className="font-bold text-3xl text-white">Usama Aslam</h1>

        {/* 🔧 Hamburger icon for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>


        <div
          className={`flex-col md:flex md:flex-row md:items-center 
            space-y-4 md:space-y-0 md:space-x-6 text-white font-semibold 
            absolute md:static bg-blue-950 w-full md:w-auto left-0 px-4 md:px-0 
            transition-all duration-300 ease-in-out z-40 
            ${isOpen ? 'top-16' : 'top-[-300px]'}`} // 🔧 Slide-in menu
        >
          <Link className="hover:text-indigo-400 block" to="/" >Home</Link>
          <Link className="hover:text-indigo-400 block" to="/about" >About</Link>
          <Link className="hover:text-indigo-400 block" to="/projects" >Projects</Link>
          <Link className="hover:text-indigo-400 block" to="/contact" >Contact</Link>

          <button onClick={() => navigate("/contact")} className="px-4 py-1 mt-2 md:mt-0 rounded bg-white text-black hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      <Outlet />

      <Footer />


    </div>


  );
}
