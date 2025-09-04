import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import API from "../services/api";
import { useLoader } from "../components/context/LoaderContext";

import logo from "../assets/Images/logo.png";
import slide1 from "../assets/Images/slide1.png";
import slide2 from "../assets/Images/slide1.png";
import slide3 from "../assets/Images/slide1.png";
import { useAuth } from "./context/AuthContext";
import Footer from "./Footer";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  // Slider state
  const [index, setIndex] = useState(0);
  const duration = 3000;

  const slides = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % slides.length), duration);
    return () => clearInterval(t);
  }, [slides.length]);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data) => {
    showLoader();
    try {
      const res = await API.post("/auth/login", data);
      const token = res?.data?.token;
      if (!token) throw new Error("Token missing in response");
      login(token);
      toast.success("Login Successful 🎉");
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Invalid credentials";
      toast.error(msg);
      setError("username", { message: " " }, { shouldFocus: false });
      setError("password", { message: "" }, { shouldFocus: false });
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50 px-4 overflow-hidden">
        {/* Main scrollable content */}
        <div className="flex-grow flex items-center justify-center overflow-auto">
          <div className="w-full max-w-5xl h-full md:h-auto bg-white shadow-xl rounded-2xl grid md:grid-cols-[1fr_auto_1fr] overflow-hidden">
            {/* Left: Form */}
            <div className="p-10 flex flex-col justify-center">
              <div className="mb-6">
                <img src={logo} alt="Logo" className="h-10 mb-4" />
                <h1 className="text-2xl font-bold">Sign in</h1>
                <p className="mt-2 text-gray-600">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Username */}
                <div>
                  <input
                    type="text"
                    placeholder="Login Id"
                    className={`w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${
                      errors.username ? "focus:ring-red-400" : "focus:ring-orange-400"
                    }`}
                    {...register("username")}
                    autoComplete="username"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                  )}
                </div>

                {/* Password with toggle */}
                <div>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      className={`w-full p-3 pr-12 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 ${
                        errors.password ? "focus:ring-red-400" : "focus:ring-orange-400"
                      }`}
                      {...register("password")}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute inset-y-0 right-3 my-auto text-gray-500 hover:text-gray-700"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  Log In
                </button>
              </form>

              <div className="mt-4 text-sm text-right">
                <button
                  type="button"
                  className="text-orange-600 hover:underline"
                  onClick={() => toast.info("Please contact admin to reset password.")}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200" />

            {/* Right: Slider */}
            <div className="hidden md:flex items-center justify-center p-10 relative bg-gradient-to-br from-orange-400 to-red-500 h-full">
              <div className="absolute inset-0 bg-black/35" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.6 }}
                  className="text-center text-white relative z-10"
                >
                  <img
                    src={slides[index].img}
                    alt={slides[index].title}
                    className="w-56 mx-auto mb-6 drop-shadow-xl"
                  />
                  <h2 className="text-2xl font-bold">{slides[index].title}</h2>
                  <p className="text-white/90 mt-2 max-w-sm mx-auto">{slides[index].text}</p>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="absolute bottom-5 left-0 right-0 flex gap-2 justify-center z-10">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1 rounded-full transition-all ${
                      index === i ? "w-8 bg-white" : "w-6 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer at bottom */}
        <Footer className="fixed bottom-0 left-0 right-0 z-50" />
      </div>
    </>
  );
}
