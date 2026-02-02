"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import { motion } from "framer-motion";
import { MapPin, Shield, TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
  const onChatClick = useChatModalStore((s) => s.openChat);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Optimized Background - Static Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 via-transparent to-purple-950/30" />

      {/* Simplified CSS-only Animated Orbs - Much Better Performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1 absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="orb orb-2 absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl" />
        <div className="orb orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-bl from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern - Static */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content - Reduced Animations */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge - Simple Fade In */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full mb-8 shadow-xl shadow-indigo-500/5">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            شرکت آراکس - خدمات اقامت ارمنستان
          </span>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse" />
        </motion.div>

        {/* Main Heading - Reduced Animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          <span className="text-white">دریافت اقامت ارمنستان</span>
          <br />
          <span className="text-lg md:text-xl text-slate-400 font-normal block mb-3">
            با
          </span>
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
            شرکت آراکس
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[4.3vw] md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          سریع، آسان و مطمئن - با تیم حرفه‌ای آراکس، اقامت خود را با
          بهترین قیمت و کیفیت دریافت کنید
        </motion.p>

        {/* Stats Cards - Simplified Hover Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-2 md:gap-6 max-w-3xl mx-auto">
          {[
            {
              icon: Shield,
              value: "100%",
              label: "موفقیت",
              gradient: "from-emerald-500 to-teal-500",
            },
            {
              icon: TrendingUp,
              value: "500+",
              label: "مشتری راضی",
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              icon: MapPin,
              value: "5",
              label: "نوع اقامت",
              gradient: "from-cyan-500 to-blue-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-[3vw] md:p-6 transition-all duration-300 overflow-hidden">
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon with Gradient */}
              <div
                className={`relative w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.gradient} p-2.5 shadow-lg`}>
                <stat.icon className="w-full h-full text-white" />
              </div>

              {/* Value */}
              <div className="relative text-[6vw] md:text-4xl font-bold text-white mb-1 tracking-tight">
                {stat.value}
              </div>

              {/* Label */}
              <div className="relative text-[3.5vw] md:text-sm text-slate-400 font-medium">
                {stat.label}
              </div>

              {/* Simplified Shine Effect */}
              <div className="absolute inset-0 shine-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </motion.div>

        {/* CTA Button - Simplified Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-12">
          <button
            onClick={onChatClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105">
            <span>مشاوره رایگان</span>
            <Sparkles className="w-5 h-5 sparkle-icon" />

            {/* Simplified Border Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        /* CSS-only Orb Animations - Much Better Performance */
        .orb-1 {
          animation: float-1 12s ease-in-out infinite;
        }
        .orb-2 {
          animation: float-2 15s ease-in-out infinite;
        }
        .orb-3 {
          animation: float-3 20s ease-in-out infinite;
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(50px, 30px) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1.1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-30px, -50px) scale(1);
            opacity: 0.5;
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15) rotate(90deg);
            opacity: 0.4;
          }
        }

        /* Gradient Animation */
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          animation: gradient-shift 3s ease infinite;
        }

        /* Simplified Shine Effect */
        .shine-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
        }

        .stat-card:hover .shine-effect {
          animation: shine 1s ease-in-out;
        }

        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        /* Sparkle Icon Animation */
        .sparkle-icon {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }

        /* Performance Optimizations */
        .orb {
          will-change: transform, opacity;
        }

        .stat-card {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
