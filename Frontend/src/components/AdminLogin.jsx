import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

import logo from "../assets/Images/logo.png";
import slide1 from "../assets/Images/slide1.png";
import slide2 from "../assets/Images/slide1.png";
import slide3 from "../assets/Images/slide1.png";

import "../assets/css/loader.css";

const slides = [
  {
    img: slide1,
    title: "MFA for all accounts",
    text: "Secure online accounts with OneAuth 2FA. Back up OTP secrets and never lose access.",
  },
  {
    img: slide2,
    title: "Seamless Access",
    text: "Sign in once and get access to all your apps with single sign-on functionality.",
  },
  {
    img: slide3,
    title: "Stay Protected",
    text: "Advanced encryption keeps your data safe and ensures privacy.",
  },
];

export default function AdminLoginPage() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const duration = 3000;

  // Auto slide + progress bar
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, duration);

    const progressTimer = setInterval(() => {
      setProgress((prev) =>
        prev >= 100 ? 100 : prev + 100 / (duration / 100)
      );
    }, 100);

    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, [index]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { username, password });

      sessionStorage.setItem("token", res.data.token);

      toast.success("Login Successful 🎉");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Loader overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="loader-circle-9">
            <span></span>
            Loading
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden h-110">
        {/* Left side - Form (60%) */}
        <div className="w-full md:w-3/5 p-10">
          <div className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-10 mr-2" />
            <h1 className="text-xl font-bold">Admin Login</h1>
          </div>

          <p className="mb-6 text-gray-500">Enter credentials to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Login Id"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white py-3 rounded-lg transition`}
            >
              Log In
            </button>
          </form>
        </div>

        {/* Middle Divider */}
        <div className="hidden md:block w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 shadow-md"></div>

        {/* Right side - Slider (40%) */}
        <div className="hidden md:flex w-2/5 bg items-center justify-center p-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <img
                src={slides[index].img}
                alt={slides[index].title}
                className="w-64 mx-auto mb-6"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {slides[index].title}
              </h2>
              <p className="text-gray-600 mt-2 max-w-sm mx-auto">
                {slides[index].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicators */}
          <div className="absolute bottom-6 flex gap-2 justify-center">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className="relative w-8 h-1 bg-gray-300 rounded cursor-pointer overflow-hidden"
              >
                {index === i && (
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
