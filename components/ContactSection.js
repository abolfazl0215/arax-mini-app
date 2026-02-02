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

      {/* CSS-only Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="contact-orb contact-orb-1 absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="contact-orb contact-orb-2 absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header - No Animations */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full mb-6 shadow-xl shadow-indigo-500/5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ارتباط با ما
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
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
          {/* Contact Info Cards - No Framer Motion */}
          <div className="space-y-4">
            {contactItems.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                className={`contact-card group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden ${
                  item.clickable ? "cursor-pointer" : ""
                }`}>
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon with Gradient */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-2.5 shadow-lg flex-shrink-0`}>
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
                        className="text-sm bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 transition-all font-medium"
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

                {/* Shine Effect */}
                {item.clickable && (
                  <div className="contact-shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Map Section - Simplified */}
          <div className="map-section relative group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center hover:bg-white/10 transition-all duration-300">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />

            <div className="relative z-10 text-center p-8">
              {/* Icon */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 shadow-2xl">
                  <MapPin className="w-full h-full text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                دفتر ما در ایروان
              </h3>
              <p className="text-slate-300 mb-8 max-w-sm mx-auto leading-relaxed">
                برای مشاوره حضوری می‌توانید به دفتر ما مراجعه کنید
              </p>

              <button className="map-button group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300">
                <span>مشاهده در نقشه</span>
                <MapPin className="w-5 h-5" />

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
              </button>
            </div>

            {/* CSS-only Decorative Orbs */}
            <div className="map-orb map-orb-1 absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl" />
            <div className="map-orb map-orb-2 absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Background Orbs Animation */
        .contact-orb-1 {
          animation: float-contact-1 8s ease-in-out infinite;
        }
        .contact-orb-2 {
          animation: float-contact-2 10s ease-in-out infinite;
        }

        @keyframes float-contact-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(30px, 30px) scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes float-contact-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1.1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-30px, -30px) scale(1);
            opacity: 0.5;
          }
        }

        /* Contact Card Hover */
        .contact-card {
          will-change: transform;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.2);
        }

        /* Shine Effect */
        .contact-shine {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
        }

        .contact-card:hover .contact-shine {
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

        /* Map Section Orbs */
        .map-orb-1 {
          animation: float-map-1 4s ease-in-out infinite;
        }
        .map-orb-2 {
          animation: float-map-2 5s ease-in-out infinite;
        }

        @keyframes float-map-1 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        @keyframes float-map-2 {
          0%,
          100% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        /* Map Button Hover */
        .map-button {
          will-change: transform;
        }

        .map-button:hover {
          transform: scale(1.05);
        }

        .map-button:active {
          transform: scale(0.95);
        }

        /* Performance Optimizations */
        .contact-orb,
        .map-orb,
        .contact-card,
        .contact-shine,
        .map-button {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
}
