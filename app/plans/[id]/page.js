"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import { usePackages } from "@/hooks/usePackages";
import {
  Check,
  Phone,
  ArrowRight,
  Sparkles,
  Crown,
  ChevronRight,
  MessageCircle,
  Send,
  Bot,
  Tag,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  // Use the custom hook to fetch packages
  const { plans, isLoadingPlans } = usePackages();

  useEffect(() => {
    if (typeof window === "undefined" || !window.Telegram?.WebApp)
      return;

    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.BackButton.show();

    const handleBack = () => {
      // اول مودال‌ها رو ببند
      if (isOpenChatModal) {
        useChatModalStore.getState().closeChat();
        return;
      }

      if (isOpenContactModal) {
        useChatModalStore.getState().closeContactModal();
        return;
      }

      // اگر مودالی باز نیست → برگرد صفحه قبل
      router.push("/");
    };

    tg.BackButton.onClick(handleBack);
    setTelegram(tg);

    return () => {
      tg.BackButton.offClick(handleBack); // ✅ مهم‌ترین بخش
      tg.BackButton.hide();
    };
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

  // Format discount end date
  const formatEndDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate savings
  const getSavings = () => {
    if (!plan || !plan.hasDiscount) return 0;
    return plan.originalPrice - plan.discountedPrice;
  };

  // Loading state
  if (isLoadingPlans || !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const Icon = plan.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute top-20 right-20 w-80 h-80 bg-indigo-500/8 rounded-full blur-xl" />
        <div className="orb-2 absolute bottom-20 left-20 w-80 h-80 bg-purple-500/8 rounded-full blur-xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Plan Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div
                className={`bg-slate-900/50 border rounded-2xl p-6 ${
                  plan.popular
                    ? "border-indigo-500/50"
                    : "border-slate-700/50"
                }`}>
                {/* Popular & Discount Badges */}
                <div className="flex flex-col gap-2 mb-6">
                  {plan.popular && (
                    <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-bold px-4 py-2 rounded-xl">
                      <Crown className="w-4 h-4" />
                      <span>محبوب‌ترین</span>
                    </div>
                  )}

                  {plan.hasDiscount && (
                    <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg">
                      <Tag className="w-4 h-4" />
                      <span>
                        {plan.discountPercentage}% تخفیف ویژه
                      </span>
                    </div>
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${plan.gradient} p-4 mb-5 mx-auto`}>
                  <Icon className="w-full h-full text-white" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold mb-3 text-white text-center">
                  {plan.title}
                </h1>

                {/* Duration Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-gradient-to-r ${plan.gradient} bg-opacity-10 mx-auto flex justify-center w-full`}>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white/90">
                    {plan.duration}
                  </span>
                </div>

                {/* Price Section with Discount */}
                <div className="mb-6 text-center">
                  {plan.hasDiscount ? (
                    <div className="space-y-3">
                      {/* Original Price - Strikethrough */}
                      <div>
                        <span className="text-slate-500 text-xs block mb-1">
                          قیمت اصلی:
                        </span>
                        <span className="text-2xl font-semibold text-slate-500 line-through">
                          ${plan.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Discounted Price */}
                      <div>
                        <span className="text-green-400 text-xs block mb-1 font-medium">
                          قیمت با تخفیف:
                        </span>
                        <span className="text-5xl font-bold text-green-400">
                          ${plan.discountedPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Savings Amount */}
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2 mx-auto inline-block">
                        <span className="text-green-400 text-sm font-medium">
                          صرفه‌جویی ${getSavings().toLocaleString()}
                        </span>
                      </div>

                      {/* Campaign Info */}
                      {plan.campaignName && (
                        <div className="pt-3 border-t border-slate-800 space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-medium">
                              {plan.campaignName}
                            </span>
                          </div>

                          {plan.campaignEndDate && (
                            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                              <Clock className="w-3.5 h-3.5" />
                              <span>
                                تا{" "}
                                {formatEndDate(plan.campaignEndDate)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      {!plan.contactRequired && (
                        <span className="text-slate-400 text-base mr-2">
                          / پکیج
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {/* Primary CTA - Contact Modal */}
                  <button
                    onClick={handleSelectPlan}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      plan.hasDiscount
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                        : plan.popular
                          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/30"
                          : "bg-slate-800/80 text-white border border-slate-700 hover:bg-slate-800"
                    }`}>
                    <span className="flex items-center justify-center gap-2">
                      {plan.hasDiscount ? (
                        <>
                          <Tag className="w-5 h-5" />
                          دریافت با تخفیف
                        </>
                      ) : (
                        <>
                          <Phone className="w-5 h-5" />
                          {plan.contactRequired
                            ? "درخواست تماس"
                            : "انتخاب این پکیج"}
                        </>
                      )}
                    </span>
                  </button>

                  {/* AI Chat Button */}
                  <button
                    onClick={handleAIChat}
                    className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20">
                    <span className="flex items-center justify-center gap-2">
                      <Bot className="w-5 h-5" />
                      چت با دستیار هوش مصنوعی
                    </span>
                  </button>

                  {/* Direct Telegram Button */}
                  <button
                    onClick={handleDirectTelegram}
                    className="w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] bg-slate-800 text-white border-2 border-blue-500/50 hover:border-blue-500 hover:bg-slate-700">
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      چت مستقیم تلگرام
                    </span>
                  </button>
                </div>

                {/* Quick Features */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="text-sm text-slate-400 mb-3 font-medium">
                    ویژگی‌های اصلی:
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Special Discount Alert */}
            {plan.hasDiscount && (
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      🎉 پیشنهاد ویژه - {plan.discountPercentage}%
                      تخفیف!
                    </h3>
                    <p className="text-white/90 mb-3">
                      {plan.campaignName
                        ? plan.campaignName
                        : "تخفیف ویژه برای مدت محدود"}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          تا{" "}
                          {plan.campaignEndDate
                            ? formatEndDate(plan.campaignEndDate)
                            : "اتمام موجودی"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>
                          صرفه‌جویی ${getSavings().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description Section */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  درباره این پکیج
                </h2>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {plan.description}
              </p>
              {plan.longDescription && (
                <p className="text-slate-400 mt-4 leading-relaxed">
                  {plan.longDescription}
                </p>
              )}
            </div>

            {/* Benefits Section */}
            {plan.benefits && plan.benefits.length > 0 && (
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  مزایای این پکیج
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plan.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-slate-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements Section */}
            {plan.requirements && plan.requirements.length > 0 && (
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  مدارک و شرایط مورد نیاز
                </h2>
                <ul className="space-y-3">
                  {plan.requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-300">
                      <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process Section */}
            {plan.process && plan.process.length > 0 && (
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  مراحل دریافت اقامت
                </h2>
                <div className="space-y-4">
                  {plan.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 bg-slate-800/50 p-5 rounded-xl">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 font-bold text-white`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <span className="text-slate-300 text-base">
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section with Multiple Options */}
            <div
              className={`bg-gradient-to-r ${plan.gradient} rounded-2xl p-8 text-white`}>
              <h3 className="text-2xl font-bold mb-3">
                آماده شروع هستید؟
              </h3>
              <p className="text-white/90 mb-2">
                یکی از گزینه‌های زیر را انتخاب کنید تا با ما در ارتباط
                باشید
              </p>
              {plan.hasDiscount && (
                <p className="text-white/80 text-sm mb-6 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  برای استفاده از {plan.discountPercentage}% تخفیف،
                  همین حالا اقدام کنید!
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Contact Form Option */}
                <button
                  onClick={handleSelectPlan}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-4 rounded-xl font-bold hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-2">
                  <Phone className="w-6 h-6" />
                  <span className="text-sm">فرم تماس</span>
                </button>

                {/* AI Chat Option */}
                <button
                  onClick={handleAIChat}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-4 rounded-xl font-bold hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-2">
                  <Bot className="w-6 h-6" />
                  <span className="text-sm">دستیار هوش مصنوعی</span>
                </button>

                {/* Direct Telegram Option */}
                <button
                  onClick={handleDirectTelegram}
                  className="bg-white text-slate-900 px-6 py-4 rounded-xl font-bold hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-2 shadow-lg">
                  <Send className="w-6 h-6" />
                  <span className="text-sm">چت مستقیم</span>
                </button>
              </div>
            </div>
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
    </div>
  );
}
