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

      {/* CSS-only Animated Orbs - Much Lighter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="features-orb features-orb-1 absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="features-orb features-orb-2 absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header - No Animations */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full mb-6 shadow-xl shadow-indigo-500/5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              امکانات ویژه
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
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

        {/* Features Grid - No Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative">
                  {/* Icon with Gradient */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 shadow-lg mb-4 flex items-center justify-center`}>
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

                {/* Simplified Shine Effect */}
                <div className="shine-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Special Offer Banner - Simplified */}
        <div className="banner-container relative group backdrop-blur-xl bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 rounded-2xl p-8 text-center overflow-hidden border border-white/20 shadow-2xl shadow-indigo-500/20">
          {/* CSS-only Background Orbs */}
          <div className="banner-orb banner-orb-1 absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
          <div className="banner-orb banner-orb-2 absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="relative inline-flex mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-3 shadow-2xl">
                <Gift className="w-full h-full text-white" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
              پیشنهاد ویژه این ماه
            </h3>

            <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              افتتاح حساب بانکی شرکتی و شخصی کاملاً رایگان برای تمام
              مشتریان
            </p>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full text-white font-medium shadow-lg">
              <Clock className="w-4 h-4" />
              <span>محدود به زمان</span>
              <div className="pulse-dot w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Banner Shine Effect */}
          <div className="banner-shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>

      <style jsx>{`
        /* Feature Orbs Animation */
        .features-orb-1 {
          animation: float-features-1 10s ease-in-out infinite;
        }
        .features-orb-2 {
          animation: float-features-2 12s ease-in-out infinite;
        }

        @keyframes float-features-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(50px, 0) scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes float-features-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1.1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50px, 0) scale(1);
            opacity: 0.5;
          }
        }

        /* Feature Card Hover */
        .feature-card {
          will-change: transform;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.2);
        }

        /* Shine Effect */
        .shine-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
        }

        .feature-card:hover .shine-effect {
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

        /* Banner Orbs */
        .banner-orb-1 {
          animation: float-banner-1 4s ease-in-out infinite;
        }
        .banner-orb-2 {
          animation: float-banner-2 5s ease-in-out infinite;
        }

        @keyframes float-banner-1 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }

        @keyframes float-banner-2 {
          0%,
          100% {
            transform: scale(1.1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1);
            opacity: 0.4;
          }
        }

        /* Pulse Dot */
        .pulse-dot {
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }

        /* Banner Shine */
        .banner-shine {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transform: skewX(-12deg);
        }

        .banner-container:hover .banner-shine {
          animation: banner-shine-move 2s linear infinite;
        }

        @keyframes banner-shine-move {
          from {
            transform: translateX(-100%) skewX(-12deg);
          }
          to {
            transform: translateX(100%) skewX(-12deg);
          }
        }

        /* Performance Optimizations */
        .features-orb,
        .banner-orb,
        .feature-card,
        .shine-effect,
        .banner-shine {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
