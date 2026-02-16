"use client";

import {
  FileCheck,
  Users,
  Building,
  Gift,
  HeadphonesIcon,
  Clock,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "قرارداد رسمی",
    description: "تنظیم قرارداد رسمی در دفتر شرکت با ضمانت کامل",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "تیم متخصص و مجرب",
    description: "همراهی کادر حرفه‌ای در تمام مراحل اخذ اقامت",
    gradient: "from-purple-500 via-pink-500 to-indigo-500",
  },
  {
    icon: Building,
    title: "افتتاح حساب بانکی",
    description: "افتتاح حساب شرکتی و شخصی کاملاً رایگان",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
  },
  {
    icon: Gift,
    title: "آفر ویژه شرکت",
    description: "خدمات و تخفیف‌های اختصاصی مشتریان ما",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
  },
  {
    icon: HeadphonesIcon,
    title: "پشتیبانی مستمر",
    description: "پاسخگویی به سوالات و مشاوره رایگان 24/7",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "پردازش سریع",
    description: "انجام تمام مراحل در کوتاه‌ترین زمان",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
];

export default function Features() {
  return (
    <section className="relative py-16  md:py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0  bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Soft Glow */}
      <div className="absolute inset-0 grid-bg-dark pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-indigo-500/20 px-4 py-2 rounded-full mb-5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs md:text-sm font-medium text-indigo-300">
              مزایای انتخاب ما
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-white">چرا مشتریان </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ما
            </span>
            <span className="text-white"> را انتخاب می‌کنند؟</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto">
            خدمات حرفه‌ای، شفاف و تضمین‌شده برای تجربه‌ای بدون ریسک
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-900/70 border border-slate-700/50 rounded-2xl p-5 md:p-6 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]">
                {/* Icon */}
                <div
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 flex items-center justify-center shadow-lg`}>
                  <Icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-base md:text-lg font-bold mb-2 text-white">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
