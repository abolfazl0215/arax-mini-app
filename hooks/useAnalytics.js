"use client";

// hooks/useAnalytics.js
import { useEffect, useRef } from "react";
import { trackVisit, checkUser } from "@/api/analytics";

/**
 * Custom hook for tracking analytics
 * This should be used in the main layout or root component
 */
export const useAnalytics = () => {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per session
    if (hasTracked.current) return;

    const initAnalytics = async () => {
      try {
        // Check if we're in Telegram Mini App environment
        if (
          typeof window === "undefined" ||
          !window.Telegram?.WebApp
        ) {
          console.log(
            "Not in Telegram environment - skipping analytics",
          );
          return;
        }

        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe?.user;

        if (user) {
          // Check/Register user and track visit
          await checkUser(user);
          await trackVisit(user.id?.toString());

          hasTracked.current = true;
          console.log("✅ Analytics tracked for user:", user.id);
        } else {
          // Track anonymous visit (no user data)
          await trackVisit(null);
          hasTracked.current = true;
          console.log("✅ Anonymous visit tracked");
        }
      } catch (error) {
        console.error("Error initializing analytics:", error);
        // Don't block the app if analytics fails
      }
    };

    initAnalytics();
  }, []);

  // Return tracking function for manual tracking if needed
  const trackManualVisit = async (telegramId) => {
    try {
      await trackVisit(telegramId);
      console.log("✅ Manual visit tracked");
    } catch (error) {
      console.error("Error tracking manual visit:", error);
    }
  };

  return { trackManualVisit };
};

/**
 * Hook for tracking specific page views
 * Use this in individual pages to track page-specific visits
 */
export const usePageView = (pageName) => {
  useEffect(() => {
    console.log(`📊 Page view tracked: ${pageName}`);

    // You can extend this to send page-specific analytics
    // For example, tracking which packages are viewed most
  }, [pageName]);
};

export default useAnalytics;
