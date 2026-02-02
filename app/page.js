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

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const telegram = window.Telegram.WebApp;
      telegram.ready();
      telegram.expand();
      telegram.enableClosingConfirmation();
      
      // Set dark theme
      telegram.setHeaderColor("#09090b");
      telegram.setBackgroundColor("#09090b");
      
      setTg(telegram);
    }
  }, []);

  return (
    <main className="min-h-screen bg-dark-50 pb-20 md:pb-0">
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
