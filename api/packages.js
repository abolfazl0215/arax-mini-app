// api/packages.js
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://arax-mini-app-back-enzr.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all active packages with discount information
export const fetchPackages = async () => {
  try {
    const response = await api.get("/api/packages");
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

// Fetch single package details
export const fetchPackageById = async (id) => {
  try {
    const response = await api.get(`/api/packages/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};

export default api;
