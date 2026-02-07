"use client";

import {
  Home,
  FileText,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useState, memo } from "react";
import { useChatModalStore } from "@/store/chatModalStore";

// Optimized Nav Button - No Framer Motion
const NavButton = memo(
  ({ icon: Icon, label, isActive, onClick, hasNotification }) => (
    <button
      onClick={onClick}
      className="nav-button relative flex flex-col items-center gap-1.5 px-4 py-2.5 transition-all group active:scale-90">
      {/* Active Indicator */}
      {isActive && (
        <div className="active-indicator absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/50" />
      )}

      {/* Icon Container */}
      <div className="relative">
        {/* Glow Effect on Active */}
        {isActive && (
          <div className="active-glow absolute inset-0 -inset-2 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-xl rounded-full" />
        )}

        {/* Icon with Enhanced Styling */}
        <div className="relative icon-wrapper">
          <Icon
            className={`w-6 h-6 transition-all duration-300 ${
              isActive
                ? "text-white drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                : "text-slate-400 group-hover:text-slate-200 group-hover:scale-110"
            }`}
          />
        </div>

        {/* Notification Badge */}
        {hasNotification && (
          <div className="notification-badge absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-2 border-slate-900 shadow-lg" />
        )}
      </div>

      {/* Label with Better Typography */}
      <span
        className={`text-[10px] font-medium transition-all duration-300 ${
          isActive
            ? "text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text font-bold tracking-wide"
            : "text-slate-500 group-hover:text-slate-300"
        }`}>
        {label}
      </span>

      {/* Active Sparkle - Positioned Better */}
      {isActive && (
        <div className="active-sparkle absolute -top-1 -right-0.5">
          <Sparkles className="w-3 h-3 text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.8)]" />
        </div>
      )}

      {/* Ripple Effect Container */}
      {isActive && (
        <div className="ripple-effect absolute inset-0 rounded-2xl" />
      )}
    </button>
  ),
);

NavButton.displayName = "NavButton";

export default function BottomNav() {
  const [active, setActive] = useState("home");

  const onChatClick = useChatModalStore((s) => s.openChat);

  const scrollToSection = (id) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", icon: Home, label: "خانه" },
    { id: "plans", icon: FileText, label: "پکیج‌ها" },
    {
      id: "chat",
      icon: MessageCircle,
      label: "چت",
      hasNotification: true,
      onClick: onChatClick,
    },
    { id: "contact", icon: Phone, label: "تماس" },
  ];

  return (
    <>
      {/* Bottom Nav - Enhanced Design */}
      <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-40 md:hidden">
        {/* Premium Backdrop with Glass Effect */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-t from-slate-950/98 via-slate-900/95 to-slate-900/90 border-t border-white/10 shadow-2xl">
          {/* Top Glow Line - Enhanced */}
          <div className="absolute -top-px left-0 right-0 h-px">
            <div className="glow-line absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent" />
          </div>

          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

          {/* Animated Background Orb - CSS Only */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="nav-orb absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />
          </div>

          {/* Nav Items */}
          <div className="relative flex items-center justify-around py-1 px-2">
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={active === item.id}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                hasNotification={item.hasNotification}
              />
            ))}
          </div>

          {/* Bottom Safe Area */}
          <div className="h-safe-area-inset-bottom bg-gradient-to-b from-slate-950/98 to-slate-950" />
        </div>
      </nav>

      {/* Safe Area Spacer */}
      {/* <div className="h-20 md:hidden" /> */}

      <style jsx>{`
        /* Active Indicator Animation */
        .active-indicator {
          animation: slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideIn {
          from {
            transform: translate(-50%, -8px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        /* Active Glow Pulse */
        .active-glow {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        /* Active Sparkle */
        .active-sparkle {
          animation: sparkle-spin 3s linear infinite;
        }

        @keyframes sparkle-spin {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotate(180deg) scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
        }

        /* Notification Badge Pulse */
        .notification-badge {
          animation: badge-pulse 2s ease-in-out infinite;
        }

        @keyframes badge-pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0);
          }
        }

        /* Top Glow Line Animation */
        .glow-line {
          animation: glow-sweep 3s ease-in-out infinite;
        }

        @keyframes glow-sweep {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        /* Background Orb Movement */
        .nav-orb {
          animation: orb-slide 8s linear infinite;
        }

        @keyframes orb-slide {
          0% {
            transform: translateX(-50%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(150%);
            opacity: 0;
          }
        }

        /* Ripple Effect on Active */
        .ripple-effect {
          animation: ripple 1.5s ease-out infinite;
        }

        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4);
          }
          100% {
            box-shadow: 0 0 0 12px rgba(168, 85, 247, 0);
          }
        }

        /* Icon Wrapper Hover */
        .nav-button:hover .icon-wrapper {
          transform: translateY(-2px);
        }

        /* Bottom Nav Entrance */
        .bottom-nav {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Performance Optimizations */
        .nav-button,
        .active-indicator,
        .active-glow,
        .active-sparkle,
        .notification-badge,
        .nav-orb,
        .icon-wrapper {
          will-change: transform, opacity;
        }

        /* Enhanced Shadow for Active State */
        .nav-button:active {
          filter: brightness(1.1);
        }
      `}</style>
    </>
  );
}
