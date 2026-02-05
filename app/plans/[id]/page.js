"use client";

import { useChatModalStore } from "@/store/chatModalStore";
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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const plans = useChatModalStore((s) => s.plans);
  const setSelectedPlan = useChatModalStore((s) => s.setSelectedPlan);
  const openContactModal = useChatModalStore(
    (s) => s.openContactModal,
  );
  const openChat = useChatModalStore((s) => s.openChat);

  const [plan, setPlan] = useState(null);
  const [telegram, setTelegram] = useState(null);

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      setTelegram(tg);

      // Expand the app
      tg.expand();

      // Enable back button
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        router.push("/");
      });

      // Cleanup on unmount
      return () => {
        tg.BackButton.hide();
      };
    }
  }, [router]);

  useEffect(() => {
    const foundPlan = plans.find((p) => p.id === parseInt(params.id));
    if (foundPlan) {
      setPlan(foundPlan);
      setSelectedPlan(foundPlan);
    } else {
      router.push("/#plans");
    }
  }, [params.id, plans, router]);

  const handleSelectPlan = () => {
    setSelectedPlan(plan);
    openContactModal();
  };

  const handleAIChat = () => {
    setSelectedPlan(plan);
    // Open AI chat modal (you can implement this in your store)
    // For now, we'll use the contact modal
    openChat();
  };

  const handleDirectTelegram = () => {
    setSelectedPlan(plan);
    // Replace with your actual Telegram username
    const telegramUsername = "araks_support";
    const message = encodeURIComponent(
      `سلام، من در مورد پکیج "${plan.title}" سوال دارم.`,
    );

    if (telegram) {
      // If in Telegram Mini App, use openTelegramLink
      telegram.openTelegramLink(
        `https://t.me/${telegramUsername}?text=${message}`,
      );
    } else {
      // Fallback for web browsers
      window.open(
        `https://t.me/${telegramUsername}?text=${message}`,
        "_blank",
      );
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white">در حال بارگذاری...</div>
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

      {/* Header - Only show for non-Telegram environments */}
      {!telegram && (
        <div className="relative z-10 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Link
              href="/#plans"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
              <span>بازگشت به پکیج‌ها</span>
            </Link>
          </div>
        </div>
      )}

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
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-bold px-4 py-2 rounded-xl mb-6">
                    <Crown className="w-4 h-4" />
                    <span>محبوب‌ترین</span>
                  </div>
                )}

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

                {/* Price */}
                <div className="mb-6 text-center">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  {!plan.contactRequired && (
                    <span className="text-slate-400 text-base mr-2">
                      / پکیج
                    </span>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {/* Primary CTA - Contact Modal */}
                  <button
                    onClick={handleSelectPlan}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      plan.popular
                        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/30"
                        : "bg-slate-800/80 text-white border border-slate-700 hover:bg-slate-800"
                    }`}>
                    <span className="flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      {plan.contactRequired
                        ? "درخواست تماس"
                        : "انتخاب این پکیج"}
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
              <p className="text-white/90 mb-6">
                یکی از گزینه‌های زیر را انتخاب کنید تا با ما در ارتباط
                باشید
              </p>

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
