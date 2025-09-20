
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // ✅ change this to your backend URL
  // baseURL: "https://display-menu-1.onrender.com", // ✅ change this to your backend URL
});

export default API;
