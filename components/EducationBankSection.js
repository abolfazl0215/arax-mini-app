"use client";

import {
  BookOpen,
  FileText,
  Scale,
  GraduationCap,
  Users,
  Shield,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EducationBankSection() {
  const router = useRouter();

  const highlights = [
    {
      icon: FileText,
      title: "مدارک مورد نیاز",
      description: "راهنمای کامل مدارک برای دریافت اقامت",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: Scale,
      title: "قوانین مهاجرت",
      description: "آشنایی با قوانین و مقررات ارمنستان",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      icon: GraduationCap,
      title: "آموزش گام به گام",
      description: "راهنمای تصویری فرآیند اقامت",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "تجربیات کاربران",
      description: "داستان‌های واقعی مهاجران در ارمنستان",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
  ];

  const handleNavigate = () => {
    router.push("/education");
  };

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-indigo-500/20 px-5 py-2.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              آموزش و راهنما
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">بانک آموزش و </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              قوانین مهاجرت
            </span>
          </h2>

          <p className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            همه چیزی که برای مهاجرت به ارمنستان نیاز دارید را اینجا
            بیاموزید
          </p>
        </div>

        {/* Hero Card */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-6 md:p-10 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 mb-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5 md:p-7">
                <BookOpen className="w-full h-full text-white" />
              </div>
            </div>

            <div className="flex-1 text-center lg:text-right">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
                راهنمای جامع اقامت در ارمنستان
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                با بانک اطلاعاتی ما، تمام مراحل دریافت اقامت، قوانین
                مهاجرت، مدارک مورد نیاز و نکات مهم را به صورت کامل و
                گام به گام یاد بگیرید.
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                <div className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-xs md:text-sm">
                  <Shield className="w-3 h-3 text-indigo-400" />
                  <span className="text-indigo-300">
                    اطلاعات 2026
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-xs md:text-sm">
                  <BookOpen className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-300">
                    +50 مقاله آموزشی
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 hover:border-slate-600/50 transition-all duration-300">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${item.gradient} p-2 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h4 className="text-white font-bold mb-1 text-sm md:text-base">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-4">
            <button
              onClick={handleNavigate}
              className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white text-sm md:text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
              مشاهده بانک اطلاعات کامل
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "مقالات آموزشی", value: "50+" },
            { label: "ویدیوهای راهنما", value: "25+" },
            { label: "قوانین و مقررات", value: "100+" },
            { label: "کاربران راضی", value: "1000+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
