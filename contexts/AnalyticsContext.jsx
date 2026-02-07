// contexts/AnalyticsContext.jsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { trackVisit, checkUser } from "../api/analytics";

const AnalyticsContext = createContext({});

export const useAnalyticsContext = () => useContext(AnalyticsContext);

export function AnalyticsProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const initialize = async () => {
      try {
        setIsLoading(true);

        // Check if we're in Telegram Mini App
        if (
          typeof window === "undefined" ||
          !window.Telegram?.WebApp
        ) {
          console.log("Not in Telegram environment");
          setIsLoading(false);
          return;
        }

        const tg = window.Telegram.WebApp;
        const telegramUser = tg.initDataUnsafe?.user;

        if (telegramUser) {
          // Register/Check user and track visit
          const response = await checkUser(telegramUser);

          if (response?.success && response.user) {
            setUser(response.user);
            console.log(
              "✅ User registered/checked:",
              response.user.telegramId,
            );
          }

          // Track visit
          await trackVisit(telegramUser.id?.toString());

          hasInitialized.current = true;
        } else {
          // Track anonymous visit
          await trackVisit(null);
          hasInitialized.current = true;
        }
      } catch (error) {
        console.error("Error initializing analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const value = {
    user,
    isLoading,
    trackVisit: async (telegramId) => {
      try {
        await trackVisit(telegramId);
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    },
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}
