// api/analytics.js
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://arax-mini-app-back.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Track user visit to mini app
 * @param {string} telegramId - User's Telegram ID
 * @returns {Promise}
 */
export const trackVisit = async (telegramId) => {
  try {
    const response = await api.post("/api/trackVisit", {
      telegramId: telegramId || null,
    });
    return response.data;
  } catch (error) {
    console.error("Error tracking visit:", error);
    // Don't throw error - tracking shouldn't break the app
    return null;
  }
};

/**
 * Check/Register user when they open the mini app
 * @param {object} userData - User data from Telegram WebApp
 * @returns {Promise}
 */
export const checkUser = async (userData) => {
  try {
    const response = await api.post("/api/checkUser", {
      telegramId: userData.id?.toString(),
      firstName: userData.first_name || "",
      lastName: userData.last_name || "",
      username: userData.username || "",
      photoUrl: userData.photo_url || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
};

export default api;
