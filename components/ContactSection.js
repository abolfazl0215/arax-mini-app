"use client";

import {
  Phone,
  Mail,
  Send,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ContactSection({ tg }) {
  const openTelegram = () => {
    if (tg) tg.openTelegramLink("https://t.me/araks_support");
    else window.open("https://t.me/araks_support", "_blank");
  };

  const contactItems = [
    {
      icon: Send,
      title: "پشتیبانی تلگرام",
      subtitle: "سریع‌ترین راه ارتباط",
      value: "@araks_support",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      onClick: openTelegram,
      primary: true,
    },
    {
      icon: Phone,
      title: "تماس تلفنی",
      subtitle: "پاسخگویی 24/7",
      value: "+374 12 345 6789",
      href: "tel:+374123456789",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: Mail,
      title: "ایمیل",
      subtitle: "پاسخ طی 24 ساعت",
      value: "info@araksgroup.com",
      href: "mailto:info@araksgroup.com",
      gradient: "from-purple-500 via-pink-500 to-indigo-500",
    },
    {
      icon: MapPin,
      title: "آدرس دفتر",
      subtitle: "ایروان، ارمنستان",
      value: "Fuchik 32/2",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      subtitle: "دوشنبه تا شنبه",
      value: "10:00 – 18:00",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-indigo-500/20 px-4 py-2 rounded-full mb-5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs md:text-sm font-medium text-indigo-300">
              ارتباط سریع
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-white">برای شروع فقط یک </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              پیام
            </span>
            <span className="text-white"> کافیست</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto">
            تیم ما آماده پاسخگویی سریع و مشاوره رایگان است
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onClick={item.onClick}
                  className={`group relative rounded-2xl p-5 md:p-6 border transition-all duration-200
                  ${
                    item.primary
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white cursor-pointer hover:scale-[1.02]"
                      : "bg-slate-900/70 border-slate-700/50 hover:border-indigo-500/40"
                  }`}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl p-2.5 flex-shrink-0 ${
                        item.primary
                          ? "bg-white/15"
                          : `bg-gradient-to-br ${item.gradient}`
                      }`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-bold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm opacity-80 mb-1">
                        {item.subtitle}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          item.primary
                            ? "text-white"
                            : "text-indigo-400"
                        }`}
                        dir="ltr">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map CTA */}
          <div className="relative rounded-2xl p-8 bg-slate-900/70 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 mb-6">
              <MapPin className="w-full h-full text-white" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              دفتر ما در ایروان
            </h3>

            <p className="text-slate-400 mb-6 max-w-sm">
              امکان مراجعه حضوری با هماهنگی قبلی
            </p>

            <a
              href="https://maps.app.goo.gl/hDxGprhN8Anprq1y6"
              target="_blank"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full font-semibold text-white hover:scale-105 active:scale-95 transition">
              مشاهده موقعیت روی نقشه
              <MapPin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
