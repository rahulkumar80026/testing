import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Images/logo.png";
import slide1 from "../assets/Images/slide1.png";
import slide2 from "../assets/Images/slide1.png";
import slide3 from "../assets/Images/slide1.png";

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

export default function SignupPage() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 seconds per slide

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto slide + progress bar logic
  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-10 mr-2" />
            <h1 className="text-xl font-bold">Sign up</h1>
          </div>

          <p className="mb-6 text-gray-500">
            Create your account to access 
          </p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Right side - Slider */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 items-center justify-center p-10 relative">
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
                className="w-64 mx-auto mb-6 drop-shadow-lg"
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
                {/* Progress animation only for active dash */}
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
