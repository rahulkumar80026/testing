import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "./context/AuthContext";
import logo from "../assets/Images/logo.png";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { logout } = useAuth();
  const handleLogout = () => {
    // sessionStorage.removeItem("token");
    logout();
    toast.success("Logged out successfully!");
    navigate("/" );
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div
            className="hidden md:flex items-center gap-2 cursor-pointer relative"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <FaUserCircle
              size={30}
              className="text-gray-600 hover:text-orange-500 transition"
            />
            <span className="text-gray-700 font-medium">Admin</span>

            {profileMenuOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-40 py-2 border">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-white shadow-md px-4 py-3 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            handleLogout();
          }}
          className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
