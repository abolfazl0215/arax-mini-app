"use client";

import {
  Home,
  Hotel,
  Plane,
  DollarSign,
  GraduationCap,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function OtherServicesSection() {
  const services = [
    {
      icon: Home,
      title: "پیدا کردن خانه برای اجاره",
      description: "کمک به یافتن بهترین خانه متناسب با بودجه شما",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      delay: "0ms",
    },
    {
      icon: Hotel,
      title: "رزرو هتل و سوییت",
      description: "رزرو روزانه هتل و سوییت با بهترین قیمت",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      delay: "100ms",
    },
    {
      icon: Plane,
      title: "ترانسفر فرودگاهی",
      description: "سرویس ایاب و ذهاب فرودگاه با راننده مجرب",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      delay: "200ms",
    },
    {
      icon: DollarSign,
      title: "صرافی و اکسچنج",
      description: "تبدیل ارز با بهترین نرخ روز",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      delay: "300ms",
    },
    {
      icon: GraduationCap,
      title: "ثبت نام دانشگاه و مدارس",
      description: "راهنمایی کامل برای ثبت نام تحصیلی",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      delay: "400ms",
    },
    {
      icon: Calendar,
      title: "اخذ وقت سفارت",
      description: "دریافت وقت سفارت برای امور کنسولی",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      delay: "500ms",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated Orbs */}
      <div className="absolute inset-0 pointer-events-none grid-bg-dark">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/20 px-5 py-2.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              خدمات دیگر
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">خدمات </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ما
            </span>
            <span className="text-white"> در ارمنستان</span>
          </h2>

          <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            مجموعه‌ای از خدمات متنوع برای زندگی و سفر آسان‌تر شما
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: service.delay }}>
              {/* Hover Gradient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 30px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, -30px);
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
