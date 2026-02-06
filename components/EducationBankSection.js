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
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
    },
    {
      icon: Scale,
      title: "قوانین مهاجرت",
      description: "آشنایی با قوانین و مقررات ارمنستان",
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    },
    {
      icon: GraduationCap,
      title: "آموزش گام به گام",
      description: "راهنمای تصویری فرآیند اقامت",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    },
    {
      icon: Users,
      title: "تجربیات کاربران",
      description: "داستان‌های واقعی مهاجران در ارمنستان",
      gradient: "from-purple-600 via-pink-600 to-rose-600",
    },
  ];

  const handleNavigate = () => {
    router.push("/education");
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/6 rounded-full blur-3xl animate-pulse" />
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

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">بانک آموزش و </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              قوانین مهاجرت
            </span>
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            همه چیزی که برای مهاجرت به ارمنستان نیاز دارید را اینجا
            بیاموزید
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 md:p-12 mb-8">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8">
                <BookOpen className="w-full h-full text-white" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-right">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                راهنمای جامع اقامت در ارمنستان
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                با بانک اطلاعاتی ما، تمام مراحل دریافت اقامت، قوانین
                مهاجرت، مدارک مورد نیاز و نکات مهم را به صورت کامل و
                گام به گام یاد بگیرید.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-indigo-300">
                    اطلاعات به‌روز 2026
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300">
                    +50 مقاله آموزشی
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group bg-slate-800/30 border border-slate-700/30 rounded-xl p-5 hover:border-slate-600/50 transition-all duration-300">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h4 className="text-white font-bold mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleNavigate}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full font-bold text-white text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
              <span>مشاهده بانک اطلاعات کامل</span>
              <ArrowLeft className="w-6 h-6" />
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
              className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
