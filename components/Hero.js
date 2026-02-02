"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import { motion } from "framer-motion";
import { MapPin, Shield, TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
  const onChatClick = useChatModalStore((s) => s.openChat);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Static Background - No Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-purple-950/20" />

      {/* Reduced to 2 Orbs - Lighter Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-2xl" />
        <div className="orb-2 absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl" />
      </div>

      {/* Static Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge - No backdrop-blur */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/20 px-5 py-2.5 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-300">
            شرکت آراکس - خدمات اقامت ارمنستان
          </span>
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        </motion.div>

        {/* Heading - Simple Animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          <span className="text-white">دریافت اقامت ارمنستان</span>
          <br />
          <span className="text-lg md:text-xl text-slate-400 font-normal block mb-3">
            با
          </span>
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            شرکت آراکس
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[4.3vw] md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          سریع، آسان و مطمئن - با تیم حرفه‌ای آراکس، اقامت خود را با بهترین قیمت و
          کیفیت دریافت کنید
        </motion.p>

        {/* Stats Cards - No backdrop-blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-3 gap-2 md:gap-6 max-w-3xl mx-auto">
          {[
            {
              icon: Shield,
              value: "100%",
              label: "موفقیت",
              color: "emerald",
            },
            {
              icon: TrendingUp,
              value: "500+",
              label: "مشتری راضی",
              color: "indigo",
            },
            {
              icon: MapPin,
              value: "5",
              label: "نوع اقامت",
              color: "cyan",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-[3vw] md:p-6 transition-all duration-200 hover:border-slate-600">
              {/* Icon */}
              <div
                className={`relative w-12 h-12 mx-auto mb-3 rounded-xl bg-${stat.color}-500/10 p-2.5`}>
                <stat.icon className={`w-full h-full text-${stat.color}-400`} />
              </div>

              {/* Value */}
              <div className="relative text-[6vw] md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>

              {/* Label */}
              <div className="relative text-[3.5vw] md:text-sm text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12">
          <button
            onClick={onChatClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold text-white transition-transform duration-200 hover:scale-105">
            <span>مشاوره رایگان</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        /* Lighter Orb Animations */
        .orb-1 {
          animation: float-simple 15s ease-in-out infinite;
        }
        .orb-2 {
          animation: float-simple 18s ease-in-out infinite reverse;
        }

        @keyframes float-simple {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 20px);
          }
        }
      `}</style>
    </section>
  );
}