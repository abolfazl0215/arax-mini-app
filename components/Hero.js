"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Award,
  Users,
  Clock,
  Shield,
} from "lucide-react";

export default function Hero() {
  const onChatClick = useChatModalStore((s) => s.openChat);

  return (
    <section className="relative  min-h-screen md:min-h-[85vh] flex items-center justify-center overflow-hidden px-4 py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B0B0F]" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-fuchsia-950/20" />

      {/* Light Orbs */}
      <div className="absolute grid-bg-dark inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            animation: "fadeInOut 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
            animation: "fadeInOut 10s ease-in-out infinite 2s",
          }}
        />
      </div>

      {/* Grid */}

      {/* Content */}
      <div className="relative  z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900/90 border border-violet-500/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-8 md:mb-10">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-xs sm:text-sm font-semibold text-violet-200">
            شرکت راد - پیشرو در خدمات اقامت ارمنستان
          </span>
          <div className="relative w-2 h-2 rounded-full bg-violet-400">
            <div className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-75" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-6 leading-[1.15] md:leading-[1.05] tracking-tight">
          <span className="block text-white mb-2">
            دریافت اقامت ارمنستان
          </span>

          <span className="block text-base sm:text-lg md:text-2xl text-slate-400 font-light my-3 md:my-4">
            با
          </span>

          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            شرکت راد
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl text-slate-300 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-2">
          سریع، آسان و مطمئن — با تیم حرفه‌ای راد، اقامت خود را با{" "}
          <span className="text-violet-400 font-semibold">
            بهترین قیمت
          </span>{" "}
          و{" "}
          <span className="text-fuchsia-400 font-semibold">
            بالاترین کیفیت
          </span>{" "}
          دریافت کنید
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto mb-10 md:mb-12">
          {" "}
          {[
            {
              icon: Users,
              value: "+500",
              label: "مشتری راضی",
              borderColor: "border-violet-500/20",
              iconBg: "bg-violet-500/10",
              iconColor: "text-violet-400",
            },
            {
              icon: Award,
              value: "5",
              label: "نوع اقامت",
              borderColor: "border-cyan-500/20",
              iconBg: "bg-cyan-500/10",
              iconColor: "text-cyan-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className={`group bg-slate-900/80 border ${stat.borderColor} rounded-2xl p-4 sm:p-5 md:p-6`}>
              <div className="flex items-center gap-4 mb-2">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon
                    className={`w-5 h-5 ${stat.iconColor}`}
                  />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                  {stat.value}
                </div>
              </div>
              <div className="text-xs sm:text-sm md:text-base font-semibold text-slate-300 text-right">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={onChatClick}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl font-bold text-base sm:text-lg text-white shadow-lg shadow-violet-500/30">
            <span>مشاوره رایگان دریافت کنید</span>
            <Sparkles className="w-5 h-5" />
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          {/* <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 md:py-5 bg-slate-900/70 border border-slate-700/50 rounded-2xl font-semibold text-base sm:text-lg text-white">
            <Clock className="w-5 h-5 text-slate-400" />
            <span>درباره ما بیشتر بدانید</span>
          </motion.button> */}
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>تضمین بازگشت وجه</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-400" />
            <span>پشتیبانی 24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>مجوز رسمی</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }
      `}</style>
    </section>
  );
}
