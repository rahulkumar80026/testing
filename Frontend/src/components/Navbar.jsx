import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Images/logo.png";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  // Function to check if route is active
  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500";

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <Link to="/admin/dashboard" className={`${isActive("/admin/dashboard")}`}>
            Dashboard
          </Link>
          <Link to="/admin/menu" className={`${isActive("/admin/menu")}`}>
            Menu
          </Link>
          <Link to="/admin/orders" className={`${isActive("/admin/orders")}`}>
            Orders
          </Link>
          <Link to="/admin/reports" className={`${isActive("/admin/reports")}`}>
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
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden bg-white shadow-md px-4 py-3 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link
          to="/admin/dashboard"
          className={`block py-2 ${isActive("/admin/dashboard")}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/menu"
          className={`block py-2 ${isActive("/admin/menu")}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Menu
        </Link>
        <Link
          to="/admin/orders"
          className={`block py-2 ${isActive("/admin/orders")}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Orders
        </Link>
        <Link
          to="/admin/reports"
          className={`block py-2 ${isActive("/admin/reports")}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Reports
        </Link>
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
