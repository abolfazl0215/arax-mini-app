"use client";

import {
  FileCheck,
  CreditCard,
  Building,
  Gift,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "قرارداد رسمی",
    description: "تنظیم قرارداد رسمی در دفتر شرکت با ضمانت کامل",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
  },
  {
    icon: CreditCard,
    title: "پرداخت بعد از اقامت",
    description: "پرداخت هزینه بعد از گرفتن اقامت - بدون پیش‌پرداخت",
    gradient: "from-purple-600 via-pink-600 to-indigo-600",
  },
  {
    icon: Building,
    title: "افتتاح حساب بانکی",
    description: "افتتاح حساب بانکی شرکتی و شخصی کاملاً رایگان",
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
  },
  {
    icon: Gift,
    title: "آفر ویژه شرکت",
    description: "تخفیفات و خدمات ویژه برای مشتریان",
    gradient: "from-pink-600 via-purple-600 to-indigo-600",
  },
  {
    icon: Shield,
    title: "تضمین 100٪",
    description: "تضمین دریافت اقامت یا بازگشت کامل هزینه",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
  },
  {
    icon: Clock,
    title: "پردازش سریع",
    description: "انجام سریع کارها در کمترین زمان ممکن",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900" />

      {/* Lighter Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500/8 rounded-full blur-xl" />
        <div className="orb-2 absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-xl" />
      </div>

      {/* Static Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/20 px-5 py-2.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              امکانات ویژه
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">چرا </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ما
            </span>
            <span className="text-white"> را انتخاب کنید؟</span>
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            با خدمات منحصر به فرد و حرفه‌ای ما، تجربه‌ای متفاوت را
            احساس کنید
          </p>
        </div>

        {/* Features Grid - No backdrop-blur */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-200 hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 flex items-center justify-center`}>
                  <Icon className="w-full h-full text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner - Simplified */}
        {/* <div className="relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="inline-flex mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-3">
                <Gift className="w-full h-full text-white" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              پیشنهاد ویژه این ماه
            </h3>

            <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              افتتاح حساب بانکی شرکتی و شخصی کاملاً رایگان برای تمام
              مشتریان
            </p>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-medium">
              <Clock className="w-4 h-4" />
              <span>محدود به زمان</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        /* Simple Orb Animation */
        .orb-1 {
          animation: float 12s ease-in-out infinite;
        }
        .orb-2 {
          animation: float 15s ease-in-out infinite reverse;
        }

        @keyframes float {
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
