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
  const handleCall = () => {
    if (tg) {
      tg.openTelegramLink("https://t.me/your_support_username");
    }
  };

  const handleEmail = () => {
    if (tg) {
      tg.openLink("mailto:info@armenia-residency.com");
    }
  };

  const contactItems = [
    {
      icon: Phone,
      title: "تماس تلفنی",
      subtitle: "پاسخگویی 24/7",
      value: "+374 12 345 6789",
      href: "tel:+374123456789",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      onClick: handleCall,
      clickable: true,
    },
    {
      icon: Mail,
      title: "ایمیل",
      subtitle: "پاسخ طی 24 ساعت",
      value: "info@armenia-residency.com",
      href: "mailto:info@armenia-residency.com",
      gradient: "from-purple-600 via-pink-600 to-indigo-600",
      onClick: handleEmail,
      clickable: true,
    },
    {
      icon: Send,
      title: "تلگرام",
      subtitle: "پشتیبانی آنلاین",
      value: "@your_support_username",
      href: "https://t.me/your_support_username",
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
      onClick: handleCall,
      clickable: true,
    },
    {
      icon: MapPin,
      title: "آدرس دفتر",
      subtitle: "ایروان، ارمنستان",
      value: "خیابان تومانیان، پلاک 15، طبقه 3",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      clickable: false,
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      subtitle: "شنبه تا پنجشنبه",
      value: "9:00 صبح - 6:00 عصر (به وقت تهران)",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      clickable: false,
    },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Lighter Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500/8 rounded-full blur-xl" />
        <div className="orb-2 absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/20 px-5 py-2.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              ارتباط با ما
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">تماس با </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ما
            </span>
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            تیم پشتیبانی ما آماده پاسخگویی به سوالات شما است
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Cards - No backdrop-blur */}
          <div className="space-y-4">
            {contactItems.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                className={`group relative bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-200 ${
                  item.clickable
                    ? "cursor-pointer hover:-translate-y-1"
                    : ""
                }`}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-2.5 flex-shrink-0`}>
                    <item.icon className="w-full h-full text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-2">
                      {item.subtitle}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                        dir="ltr"
                        onClick={(e) => e.stopPropagation()}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section - Simplified */}
          <div className="relative group bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center hover:border-slate-600 transition-all duration-200">
            {/* Simple Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />

            <div className="relative z-10 text-center p-8">
              {/* Icon */}
              <div className="inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
                  <MapPin className="w-full h-full text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                دفتر ما در ایروان
              </h3>

              <p className="text-slate-300 mb-8 max-w-sm mx-auto leading-relaxed">
                برای مشاوره حضوری می‌توانید به دفتر ما مراجعه کنید
              </p>

              <a
                href="https://maps.app.goo.gl/hDxGprhN8Anprq1y6"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95">
                <span>مشاهده در نقشه</span>
                <MapPin className="w-5 h-5" />
              </a>
            </div>

            {/* Simple Decorative Orbs */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Simple Orb Animation */
        .orb-1 {
          animation: float 10s ease-in-out infinite;
        }
        .orb-2 {
          animation: float 12s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
        }
      `}</style>
    </section>
  );
}
