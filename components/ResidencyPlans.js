"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import { usePackages } from "@/hooks/usePackages";
import {
  Check,
  Phone,
  Sparkles,
  Crown,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Tag,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function ResidencyPlans() {
  const setShowContactModal = useChatModalStore((s) => s.openContactModal);
  const setSelectedPlan = useChatModalStore((s) => s.setSelectedPlan);
  const { plans, isLoadingPlans, plansError } = usePackages();

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowContactModal();
  };

  const formatEndDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="plans" className="relative py-16 md:py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B0B0F]" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-fuchsia-950/20" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-violet-500/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-200 font-medium">
              پکیج‌های آراکس
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            پکیج‌های{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              اقامت ارمنستان
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            نوع اقامت مورد نیاز خود را انتخاب کنید و تیم آراکس تمام مراحل را برای شما انجام می‌دهد
          </p>
        </div>

        {/* Loading */}
        {isLoadingPlans && (
          <div className="flex flex-col items-center py-16">
            <Loader2 className="w-10 h-10 text-violet-400 animate-spin mb-3" />
            <p className="text-slate-400">در حال بارگذاری پکیج‌ها...</p>
          </div>
        )}

        {/* Error */}
        {plansError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 max-w-md mx-auto text-sm text-red-300">
            {plansError}
          </div>
        )}

        {/* Plans */}
        {!isLoadingPlans && !plansError && plans.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative group bg-slate-900/70 border rounded-2xl p-5 md:p-6 transition-all duration-200 ${
                    plan.popular
                      ? "border-violet-500/40"
                      : "border-slate-800 hover:border-slate-600"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-3 text-xs bg-violet-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" /> محبوب‌ترین
                    </div>
                  )}

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{plan.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">{plan.duration}</p>

                 {/* Price */}
<div className="mb-5">
  {plan.hasDiscount ? (
    <div className="space-y-1.5">
      {/* old price */}
      <div className="text-sm text-slate-500 line-through">
        ${plan.originalPrice?.toLocaleString()}
      </div>

      {/* new price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl md:text-4xl font-black text-emerald-400">
          ${plan.discountedPrice?.toLocaleString()}
        </span>
        {!plan.contactRequired && (
          <span className="text-slate-400 text-xs">/ پکیج</span>
        )}
      </div>

      {/* discount badge */}
      <div className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
        <Tag className="w-3.5 h-3.5" />
        {plan.discountPercentage}% تخفیف ویژه
      </div>

      {/* end date */}
      {plan.campaignEndDate && (
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="w-3 h-3" />
          تا {formatEndDate(plan.campaignEndDate)}
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-baseline gap-2">
      <span className="text-3xl md:text-4xl font-black text-white">
        {plan.price}
      </span>
      {!plan.contactRequired && (
        <span className="text-slate-400 text-xs">/ پکیج</span>
      )}
    </div>
  )}
</div>


                  {/* Features */}
                  <ul className="space-y-2 mb-5 text-sm">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-4 h-4 text-violet-400 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handlePlanClick(plan)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white font-semibold text-sm active:scale-95"
                  >
                    انتخاب پکیج
                  </button>

                  <Link
                    href={`/plans/${plan.id}`}
                    className="block text-center text-xs text-slate-400 mt-3 hover:text-white"
                  >
                    اطلاعات بیشتر <ArrowLeft className="inline w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
