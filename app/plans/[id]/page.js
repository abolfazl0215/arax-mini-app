"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import { usePackages } from "@/hooks/usePackages";
import {
  Check,
  Phone,
  Sparkles,
  Crown,
  ChevronRight,
  Bot,
  Tag,
  Clock,
  Loader2,
  Send,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const setSelectedPlan = useChatModalStore((s) => s.setSelectedPlan);
  const openContactModal = useChatModalStore(
    (s) => s.openContactModal,
  );
  const openChat = useChatModalStore((s) => s.openChat);

  const [plan, setPlan] = useState(null);
  const [telegram, setTelegram] = useState(null);

  const isOpenChatModal = useChatModalStore((s) => s.isChatOpen);
  const isOpenContactModal = useChatModalStore(
    (s) => s.isContactModalOpen,
  );

  const { plans, isLoadingPlans } = usePackages();
  console.log({ plans });

  useEffect(() => {
    if (typeof window === "undefined" || !window.Telegram?.WebApp)
      return;

    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.BackButton.show();

    const handleBack = () => {
      if (isOpenChatModal) {
        useChatModalStore.getState().closeChat();
        return;
      }
      if (isOpenContactModal) {
        useChatModalStore.getState().closeContactModal();
        return;
      }
      router.push("/");
    };

    tg.BackButton.onClick(handleBack);
    setTelegram(tg);

    return () => tg.BackButton.offClick(handleBack);
  }, [router, isOpenChatModal, isOpenContactModal]);

  useEffect(() => {
    if (!plans || plans.length === 0) return;
    const foundPlan = plans.find((p) => p.id === params.id);
    if (foundPlan) {
      setPlan(foundPlan);
      setSelectedPlan(foundPlan);
    } else {
      router.push("/#plans");
    }
  }, [params.id, plans, router, setSelectedPlan]);

  const handleSelectPlan = () => {
    setSelectedPlan(plan);
    openContactModal();
  };

  const handleAIChat = () => {
    setSelectedPlan(plan);
    openChat();
  };

  const handleDirectTelegram = () => {
    setSelectedPlan(plan);
    const telegramUsername = "araks_support";
    const message = encodeURIComponent(
      `سلام، من در مورد پکیج "${plan.title}" سوال دارم.`,
    );

    if (telegram) {
      telegram.openTelegramLink(
        `https://t.me/${telegramUsername}?text=${message}`,
      );
    } else {
      window.open(
        `https://t.me/${telegramUsername}?text=${message}`,
        "_blank",
      );
    }
  };

  const formatEndDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSavings = () => {
    if (!plan || !plan.hasDiscount) return 0;
    return plan.originalPrice - plan.discountedPrice;
  };

  if (isLoadingPlans || !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const Icon = plan.icon;

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-28 right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="orb-2 absolute bottom-28 left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-gray-900/60 border border-gray-700/40 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
            {/* Badges */}
            <div className="flex flex-col gap-2 mb-6">
              {plan.popular && (
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md">
                  <Crown className="w-4 h-4" /> محبوب‌ترین
                </div>
              )}
              {plan.hasDiscount && (
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md">
                  <Tag className="w-4 h-4" />{" "}
                  {plan.discountPercentage}% تخفیف ویژه
                </div>
              )}
            </div>

            {/* Icon */}
            <div
              className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${plan.gradient} p-5 mb-6 mx-auto flex items-center justify-center shadow-lg`}>
              <Icon className="w-full h-full text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white text-center mb-3">
              {plan.title}
            </h1>

            {/* Duration */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r ${plan.gradient} bg-opacity-10 mx-auto justify-center`}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {plan.duration}
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              {plan.hasDiscount ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-xs block mb-1">
                      قیمت اصلی:
                    </span>
                    <span className="text-2xl font-semibold text-gray-500 line-through">
                      ${plan.originalPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-400 text-xs block mb-1 font-medium">
                      قیمت با تخفیف:
                    </span>
                    <span className="text-4xl md:text-5xl font-bold text-green-400">
                      ${plan.discountedPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2 mx-auto inline-block">
                    صرفه‌جویی ${getSavings().toLocaleString()}
                  </div>
                </div>
              ) : (
                <span className="text-4xl md:text-5xl font-bold text-white">
                  ${plan.price}
                </span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSelectPlan}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.97] ${plan.hasDiscount ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30" : plan.popular ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/30" : "bg-gray-800/80 text-white border border-gray-700 hover:bg-gray-800"}`}>
                <span className="flex items-center justify-center gap-2">
                  {plan.hasDiscount ? (
                    <>
                      <Tag className="w-5 h-5" /> دریافت با تخفیف
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />{" "}
                      {plan.contactRequired
                        ? "درخواست تماس"
                        : "انتخاب این پکیج"}
                    </>
                  )}
                </span>
              </button>

              <button
                onClick={handleAIChat}
                className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.97] bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg flex items-center justify-center gap-2">
                <Bot className="w-5 h-5" /> چت با دستیار هوش مصنوعی
              </button>

              <button
                onClick={handleDirectTelegram}
                className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.97] bg-gray-800 text-white border-2 border-blue-500/40 hover:border-blue-500 hover:bg-gray-700 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" /> چت مستقیم تلگرام
              </button>
            </div>

            {/* Features */}
            {plan.features?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-sm text-gray-400 mb-3 font-medium">
                  ویژگی‌های اصلی:
                </h3>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-gray-900/50 border border-gray-700/40 rounded-3xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">
              درباره این پکیج
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {plan.description}
            </p>
            {plan.longDescription && (
              <p className="text-gray-400 mt-4 leading-relaxed">
                {plan.longDescription}
              </p>
            )}
          </div>

          {/* Benefits */}
          {plan.benefits?.length > 0 && (
            <div className="bg-gray-900/50 border border-gray-700/40 rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-white mb-6">
                مزایای این پکیج
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-xl shadow-inner">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mt-0.5`}>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-gray-300">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {plan.requirements?.length > 0 && (
            <div className="bg-gray-900/50 border border-gray-700/40 rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-white mb-6">
                مدارک و شرایط مورد نیاز
              </h2>
              <ul className="space-y-3">
                {plan.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-300">
                    <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Process */}
          {plan.process?.length > 0 && (
            <div className="bg-gray-900/50 border border-gray-700/40 rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-white mb-6">
                مراحل دریافت
              </h2>
              <div className="space-y-4">
                {plan.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-gray-800/50 p-5 rounded-xl shadow-inner">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center font-bold text-white flex-shrink-0`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <span className="text-gray-300 text-base">
                        {step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
    </div>
  );
}
