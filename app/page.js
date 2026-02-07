"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import ResidencyPlans from "@/components/ResidencyPlans";
import Features from "@/components/Features";
import ContactSection from "@/components/ContactSection";
import ChatButton from "@/components/ChatButton";
import ChatModal from "@/components/ChatModal";
import BottomNav from "@/components/BottomNav";
import ContactModal from "@/components/ContactModal";
import ServicesSection from "@/components/ServicesSection";
import EducationBankSection from "@/components/EducationBankSection";
import { usePageView } from "@/hooks/useAnalytics";

// API Function برای check کردن کاربر
const checkUser = async (userData) => {
  const response = await fetch(
    "https://arax-mini-app-back.onrender.com/api/checkUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to check user");
  }
  return response.json();
};

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [tg, setTg] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Track page view
  usePageView("home");

  // Mutation برای ارسال اطلاعات کاربر به سرور
  const checkUserMutation = useMutation({
    mutationFn: checkUser,
    onSuccess: (data) => {
      console.log("User checked successfully:", data);
      // می‌تونی اینجا کارهای اضافی انجام بدی
      // مثلا ذخیره کردن اطلاعات برگشتی از سرور
    },
    onError: (error) => {
      console.error("Error checking user:", error);
      // می‌تونی اینجا error handling داشته باشی
    },
  });

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      telegram.ready();
      // telegram.expand();
      telegram.enableClosingConfirmation();

      // Set dark theme
      telegram.setHeaderColor("#09090b");
      telegram.setBackgroundColor("#09090b");

      setTg(telegram);

      // Get user info
      const user = telegram.initDataUnsafe?.user;
      if (user) {
        const userData = {
          telegramId: user.id.toString(),
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          username: user.username || "",
          languageCode: user.language_code || "en",
          photoUrl: user.photo_url || "",
        };

        setUserInfo(userData);

        // ارسال اطلاعات کاربر به سرور
        checkUserMutation.mutate(userData);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-dark-50 pb-20 md:pb-0">
      {/* User Info Display - TEMPORARY */}

      {/* {userInfo && (
        <div className="fixed top-4 left-4 z-50 bg-slate-900/95 border border-indigo-500/50 rounded-xl p-4 max-w-xs">
          <div className="flex items-center gap-3 mb-3">
            {userInfo.photoUrl ? (
              <img
                src={userInfo.photoUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-indigo-500"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {userInfo.firstName?.charAt(0) || "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {userInfo.firstName} {userInfo.lastName || ""}
              </p>
              {userInfo.username && (
                <p className="text-slate-400 text-xs truncate">
                  @{userInfo.username}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-300">
              <span className="text-slate-500">ID:</span>{" "}
              <span className="font-mono">{userInfo.telegramId}</span>
            </p>
            {userInfo.languageCode && (
              <p className="text-slate-300">
                <span className="text-slate-500">Language:</span>{" "}
                {userInfo.languageCode}
              </p>
            )}
            {checkUserMutation.isPending && (
              <p className="text-yellow-400 text-xs">
                Checking user...
              </p>
            )}
            {checkUserMutation.isSuccess && (
              <p className="text-green-400 text-xs">
                ✓ User verified
              </p>
            )}
            {checkUserMutation.isError && (
              <p className="text-red-400 text-xs">
                ✗ Verification failed
              </p>
            )}
          </div>
        </div>
      )} */}

      {/* Hero Section */}
      <div id="home">
        <Hero onChatClick={() => setIsChatOpen(true)} />
      </div>

      {/* Residency Plans */}
      <div id="plans">
        <ResidencyPlans />
      </div>

      {/* Features */}
      <Features />

      {/* Contact Section */}
      <div id="contact">
        <ContactSection tg={tg} />
      </div>

      <ServicesSection />
      <EducationBankSection />

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav onChatClick={() => setIsChatOpen(true)} />

      {/* Chat Button - Desktop */}
      <div className="hidden md:block">
        <ChatButton onClick={() => setIsChatOpen(true)} />
      </div>
    </main>
  );
}
