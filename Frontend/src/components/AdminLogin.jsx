import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // Make sure baseURL matches your backend

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background.jpg')" }} // Change path
    >
      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-96 flex flex-col items-center"
      >
        {/* Logo */}
        <div className="mb-4">
          <img src="/your-logo.png" alt="Logo" className="h-16" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6">Welcome Admin</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Username */}
        <input
          type="text"
          placeholder="Login Id"
          className="border border-gray-300 rounded-md p-3 w-full mb-4 focus:outline-none focus:border-orange-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-3 w-full mb-6 focus:outline-none focus:border-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-md"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
