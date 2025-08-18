import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/your-logo.png" alt="Logo" className="h-10" />
          <span className="text-lg font-bold text-gray-800">Admin Panel</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <Link to="/admin/dashboard" className="text-gray-700 hover:text-orange-500 font-medium">
            Dashboard
          </Link>
          <Link to="/admin/menu" className="text-gray-700 hover:text-orange-500 font-medium">
            Menu
          </Link>
          <Link to="/admin/orders" className="text-gray-700 hover:text-orange-500 font-medium">
            Orders
          </Link>
          <Link to="/admin/reports" className="text-gray-700 hover:text-orange-500 font-medium">
            Reports
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Profile / Logout (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <FaUserCircle size={28} className="text-gray-600" />
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3">
          <Link
            to="/admin/dashboard"
            className="block py-2 text-gray-700 hover:text-orange-500 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/menu"
            className="block py-2 text-gray-700 hover:text-orange-500 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/admin/orders"
            className="block py-2 text-gray-700 hover:text-orange-500 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/admin/reports"
            className="block py-2 text-gray-700 hover:text-orange-500 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reports
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
