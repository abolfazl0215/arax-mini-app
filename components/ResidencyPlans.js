"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import {
  Building2,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Check,
  Phone,
  Sparkles,
  Crown,
  X,
  Mail,
  Send,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useState, memo, useEffect } from "react";

const plans = [
  {
    id: 1,
    icon: Building2,
    title: "اقامت از طریق ثبت شرکت",
    duration: "1 ساله",
    price: "$900",
    description: "دریافت اقامت یک ساله از طریق ثبت شرکت در ارمنستان",
    features: [
      "ثبت شرکت رسمی",
      "اقامت 1 ساله",
      "افتتاح حساب بانکی",
      "پشتیبانی کامل",
    ],
    popular: false,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    icon: Building2,
    title: "اقامت 5 ساله",
    duration: "5 ساله",
    price: "$1,500",
    description: "اقامت بلند مدت با امکانات ویژه",
    features: [
      "اقامت 5 ساله",
      "قابل تمدید",
      "حساب بانکی رایگان",
      "مشاوره حقوقی",
    ],
    popular: true,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "اقامت تحصیلی",
    duration: "تحصیلی",
    price: "$800",
    description: "برای دانشجویان و محققین",
    features: [
      "پذیرش تحصیلی",
      "اقامت دانشجویی",
      "تخفیف ویژه",
      "پشتیبانی آموزشی",
    ],
    popular: false,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 4,
    icon: Stethoscope,
    title: "اقامت پزشکی / دندانپزشکی",
    duration: "پزشکی",
    price: "$800",
    description: "برای پزشکان و دندانپزشکان",
    features: [
      "پروانه فعالیت",
      "اقامت حرفه‌ای",
      "مجوز کاری",
      "تسهیلات ویژه",
    ],
    popular: false,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 5,
    icon: Briefcase,
    title: "ورک پرمیت + جاب آفر",
    duration: "کاری",
    price: "تماس بگیرید",
    description: "اقامت از طریق کار و استخدام",
    features: [
      "جاب آفر معتبر",
      "ورک پرمیت",
      "حمایت کامل",
      "استعلام قیمت",
    ],
    popular: false,
    contactRequired: true,
    gradient: "from-orange-500 to-amber-500",
  },
];

// Optimized Modal - Removed backdrop-blur
const ContactModal = memo(
  ({ isOpen, onClose, plan, onChatClick }) => {
    const openChat = useChatModalStore((s) => s.openChat);

    // Telegram Web App Back Button Handler
    useEffect(() => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;

        if (isOpen) {
          // نمایش دکمه Back
          tg.BackButton.show();

          // تعریف handler برای کلیک روی Back Button
          const handleBackButton = () => {
            onClose();
          };

          tg.BackButton.onClick(handleBackButton);

          // پاکسازی در هنگام بسته شدن مودال
          return () => {
            tg.BackButton.offClick(handleBackButton);
            tg.BackButton.hide();
          };
        }
      }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop - No blur */}
        <div
          className="fixed inset-0 bg-slate-950/90 z-40 animate-fadeIn"
          onClick={onClose}
        />

        {/* Modal - No backdrop-blur */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <div className="animate-scaleIn pointer-events-auto w-full max-w-lg mx-auto max-h-[90vh] flex flex-col bg-slate-900/95 border border-slate-700/50 rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Header */}
            <div className="shrink-0 px-6 sm:px-8 pt-8 pb-5 border-b border-slate-800">
              <div className="text-center">
                <div className="relative inline-flex mx-auto mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan?.gradient || "from-indigo-600 to-purple-600"} p-3.5 mx-auto`}>
                    {plan?.icon && (
                      <plan.icon className="w-full h-full text-white" />
                    )}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {plan?.title || "تماس با ما"}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  برای دریافت اطلاعات کامل و ثبت نام، لطفاً با ما در
                  ارتباط باشید
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8 scrollbar-thin">
              {/* Primary CTA */}
              <button
                onClick={() => {
                  openChat();
                  // onClose();
                }}
                className="w-full mb-6 py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl font-bold text-white text-base sm:text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <span>ارسال پیام</span>
                <Sparkles className="w-4 h-4" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-xs sm:text-sm text-slate-500">
                  یا
                </span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              {/* Contact Options */}
              <div className="space-y-4">
                {[
                  {
                    href: "tel:+374123456789",
                    icon: Phone,
                    gradient: "from-emerald-600 to-teal-600",
                    label: "تماس تلفنی",
                    value: "+374 12 345 6789",
                  },
                  {
                    href: "mailto:info@araxtour.com",
                    icon: Mail,
                    gradient: "from-cyan-600 to-blue-600",
                    label: "ایمیل",
                    value: "info@araxtour.com",
                  },
                  {
                    href: "https://t.me/your_support_username",
                    icon: Send,
                    gradient: "from-indigo-600 to-purple-600",
                    label: "تلگرام",
                    value: "@your_support_username",
                    external: true,
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={
                      item.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/80 transition-colors">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mb-1">
                        {item.label}
                      </p>
                      <p
                        className="text-sm font-semibold text-white"
                        dir="ltr">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 mb-1.5">
                      دفتر ما
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      ایروان، ارمنستان - خیابان تومانیان، پلاک ۱۵
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          .animate-scaleIn {
            animation: scaleIn 0.2s ease-out;
          }
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: rgb(71 85 105);
            border-radius: 3px;
          }
        `}</style>
      </>
    );
  },
);

ContactModal.displayName = "ContactModal";

export default function ResidencyPlans({ onChatClick }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowContactModal(true);
  };

  return (
    <>
      <section
        className="relative py-20 px-4 overflow-hidden"
        id="plans">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Lighter Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb-1 absolute top-20 right-20 w-80 h-80 bg-indigo-500/8 rounded-full blur-xl" />
          <div className="orb-2 absolute bottom-20 left-20 w-80 h-80 bg-purple-500/8 rounded-full blur-xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">
                پکیج‌های آراکس
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              پکیج‌های{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                اقامت ارمنستان
              </span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              انتخاب کنید نوع اقامتی که نیاز دارید و ما در آراکس همراه
              شما هستیم
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`group relative bg-slate-900/50 border rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-2 ${
                    plan.popular
                      ? "border-indigo-500/50"
                      : "border-slate-700/50 hover:border-slate-600"
                  }`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                        <Crown className="w-3.5 h-3.5" />
                        <span>محبوب‌ترین</span>
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} p-3.5 mb-5`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {plan.title}
                  </h3>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-5 bg-gradient-to-r ${plan.gradient} bg-opacity-10`}>
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-white animate-pulse`}
                    />
                    <span className="text-white/90">
                      {plan.duration}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-5">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    {!plan.contactRequired && (
                      <span className="text-slate-400 text-sm mr-2">
                        / پکیج
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      plan.popular
                        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
                        : "bg-slate-800/80 text-white border border-slate-700 hover:bg-slate-800"
                    }`}>
                    {plan.contactRequired ? (
                      <span className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        تماس بگیرید
                      </span>
                    ) : (
                      "انتخاب پکیج"
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-slate-700/50 px-6 py-3 rounded-full">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${plans[i]?.gradient} border-2 border-slate-900`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-300">
                <span className="font-bold text-white">500+</span>{" "}
                مشتری راضی از خدمات آراکس
              </span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
        </div>

        <style jsx>{`
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

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        plan={selectedPlan}
        onChatClick={onChatClick}
      />
    </>
  );
}
