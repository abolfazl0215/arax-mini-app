"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ResidencyPlans from "@/components/ResidencyPlans";
import Features from "@/components/Features";
import ContactSection from "@/components/ContactSection";
import ChatButton from "@/components/ChatButton";
import ChatModal from "@/components/ChatModal";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [tg, setTg] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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
        setUserInfo({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          languageCode: user.language_code,
          photoUrl: user.photo_url,
        });
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-dark-50 pb-20 md:pb-0">
      {/* User Info Display - TEMPORARY */}
      {userInfo && (
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
              <span className="font-mono">{userInfo.id}</span>
            </p>
            {userInfo.languageCode && (
              <p className="text-slate-300">
                <span className="text-slate-500">Language:</span>{" "}
                {userInfo.languageCode}
              </p>
            )}
          </div>
        </div>
      )}

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

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav onChatClick={() => setIsChatOpen(true)} />

      {/* Chat Button - Desktop */}
      <div className="hidden md:block">
        <ChatButton onClick={() => setIsChatOpen(true)} />
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        tg={tg}
      />
    </main>
  );
}
