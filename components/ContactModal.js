"use client";
import { useChatModalStore } from "@/store/chatModalStore";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import React, { memo, useEffect } from "react";

// Optimized Modal - Removed backdrop-blur
const ContactModal = memo(() => {
  const openChat = useChatModalStore((s) => s.openChat);

  const isOpenContact = useChatModalStore((s) => s.openContactModal);
  const onClose = useChatModalStore((s) => s.closeContactModal);
  const isOpen = useChatModalStore((s) => s.isContactModalOpen);
  const plan = useChatModalStore((s) => s.selectedPlan);

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
                  href: "tel:+37493655375",
                  icon: Phone,
                  gradient: "from-emerald-600 to-teal-600",
                  label: "تماس تلفنی",
                  value: "+374 93 655 375",
                },
                {
                  href: "mailto:info@radgroup.com",
                  icon: Mail,
                  gradient: "from-cyan-600 to-blue-600",
                  label: "ایمیل",
                  value: "info@radgroup.com",
                },
                {
                  href: "https://t.me/OFFICE_RAD",
                  icon: Send,
                  gradient: "from-indigo-600 to-purple-600",
                  label: "تلگرام",
                  value: "@OFFICE_RAD",
                  external: true,
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={
                    item.external ? "noopener noreferrer" : undefined
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
                    Nikoghayos Tigranyan Street 1st Desdlock, 10
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
});

export default ContactModal;
