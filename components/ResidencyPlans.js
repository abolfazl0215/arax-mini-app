"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import {
  Check,
  Phone,
  Sparkles,
  Crown,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ResidencyPlans({ onChatClick }) {
  const setShowContactModal = useChatModalStore(
    (s) => s.openContactModal,
  );
  const plans = useChatModalStore((s) => s.plans);
  const setSelectedPlan = useChatModalStore((s) => s.setSelectedPlan);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowContactModal();
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
                  className={`group relative bg-slate-900/50 border rounded-2xl p-6 transition-all duration-200 hover:-translate-y-2 ${
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

                  {/* CTAs */}
                  <div className="space-y-3">
                    {/* Primary CTA */}
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

                    {/* Secondary CTA - Link to Detail Page */}
                    <Link
                      href={`/plans/${plan.id}`}
                      className="block w-full py-3 rounded-xl font-medium text-center transition-all hover:scale-[1.02] active:scale-[0.98] bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-slate-600 hover:text-white">
                      <span className="flex items-center justify-center gap-2">
                        اطلاعات بیشتر
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
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
    </>
  );
}
