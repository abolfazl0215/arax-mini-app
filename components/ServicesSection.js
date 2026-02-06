"use client";

import {
  Home,
  Hotel,
  Plane,
  DollarSign,
  GraduationCap,
  Calendar,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: "پیداکردن خانه برای اجاره",
      description: "کمک به یافتن بهترین خانه متناسب با بودجه شما",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      delay: "0ms",
    },
    {
      icon: Hotel,
      title: "رزرو هتل و سوییت",
      description: "رزرو روزانه هتل و سوییت با بهترین قیمت",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      delay: "100ms",
    },
    {
      icon: Plane,
      title: "ترانسفر فرودگاهی",
      description: "سرویس ایاب و ذهاب فرودگاه با راننده مجرب",
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
      delay: "200ms",
    },
    {
      icon: DollarSign,
      title: "صرافی و اکسچنج",
      description: "تبدیل ارز با بهترین نرخ روز",
      gradient: "from-purple-600 via-pink-600 to-rose-600",
      delay: "300ms",
    },
    {
      icon: GraduationCap,
      title: "ثبت نام دانشگاه و مدارس",
      description: "راهنمایی کامل برای ثبت نام تحصیلی",
      gradient: "from-orange-600 via-amber-600 to-yellow-600",
      delay: "400ms",
    },
    {
      icon: Calendar,
      title: "اخذ وقت سفارت",
      description: "دریافت وقت سفارت برای امور کنسولی",
      gradient: "from-pink-600 via-rose-600 to-red-600",
      delay: "500ms",
    },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated Orbs - Lighter */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/20 px-5 py-2.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              خدمات ما
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">خدمات </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ویژه
            </span>
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            ما با ارائه خدمات متنوع، سفر و زندگی شما را در ارمنستان
            آسان‌تر می‌کنیم
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ animationDelay: service.delay }}>
              {/* Gradient Glow on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Arrow Icon */}
                {/* <div className="flex items-center gap-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">
                    اطلاعات بیشتر
                  </span>
                  <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <div className="mt-16 text-center">
          <div className="inline-block bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              نیاز به مشاوره دارید؟
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              تیم ما آماده است تا بهترین راهنمایی را برای شما فراهم
              کند
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95">
              <span>تماس با ما</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div> */}
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
