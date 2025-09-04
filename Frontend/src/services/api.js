// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // ✅ change this to your backend URL
});

export default API;
