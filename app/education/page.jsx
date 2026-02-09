"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import {
  FileText,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Scale,
  Users,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EducationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("documents");

  const isOpenChatModal = useChatModalStore((s) => s.isChatOpen);
  const isOpenContactModal = useChatModalStore(
    (s) => s.isContactModalOpen,
  );

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

    return () => {
      tg.BackButton.offClick(handleBack);
      tg.BackButton.hide();
    };
  }, [router, isOpenChatModal, isOpenContactModal]);

  const tabs = [
    { id: "documents", label: "مدارک مورد نیاز", icon: FileText },
    { id: "types", label: "انواع اقامت", icon: Home },
    { id: "process", label: "مراحل اخذ اقامت", icon: CheckCircle2 },
    { id: "laws", label: "قوانین و مقررات", icon: Scale },
  ];

  const documents = [
    {
      title: "پاسپورت معتبر",
      description: "پاسپورت با حداقل 6 ماه اعتبار",
      required: true,
    },
    {
      title: "عکس پرسنلی",
      description: "2 قطعه عکس پرسنلی رنگی 3x4",
      required: true,
    },
    {
      title: "گواهی عدم سوء پیشینه",
      description: "گواهی از کشور مبدا (ترجمه شده و تایید شده)",
      required: true,
    },
    {
      title: "مدرک تحصیلی",
      description: "مدارک تحصیلی ترجمه شده به ارمنی یا روسی",
      required: false,
    },
    {
      title: "قرارداد اجاره یا سند مالکیت",
      description: "مدرک اقامتگاه در ارمنستان",
      required: true,
    },
    {
      title: "بیمه درمانی",
      description: "بیمه سلامت معتبر در ارمنستان",
      required: true,
    },
    {
      title: "مدارک مالی",
      description: "گواهی توانایی مالی یا حساب بانکی",
      required: true,
    },
    {
      title: "فرم درخواست",
      description: "فرم تکمیل شده درخواست اقامت",
      required: true,
    },
  ];

  const residencyTypes = [
    {
      icon: Briefcase,
      title: "اقامت کاری",
      duration: "1-3 سال",
      price: "تقریبی: $500-800",
      requirements: [
        "قرارداد کار با شرکت ارمنی",
        "مجوز کار از وزارت کار",
        "بیمه درمانی",
        "اثبات توانایی مالی",
      ],
      color: "from-violet-600 to-purple-600",
    },
    {
      icon: GraduationCap,
      title: "اقامت تحصیلی",
      duration: "مدت تحصیل",
      price: "تقریبی: $300-500",
      requirements: [
        "پذیرش از دانشگاه یا مدرسه",
        "اثبات توانایی پرداخت شهریه",
        "بیمه دانشجویی",
        "محل سکونت معتبر",
      ],
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: Heart,
      title: "اقامت خانوادگی",
      duration: "1-3 سال",
      price: "تقریبی: $400-600",
      requirements: [
        "شناسنامه و سند ازدواج",
        "اثبات رابطه خانوادگی",
        "حمایت مالی از خانواده",
        "محل سکونت مشترک",
      ],
      color: "from-pink-600 to-fuchsia-600",
    },
    {
      icon: Home,
      title: "اقامت از طریق سرمایه‌گذاری",
      duration: "3-5 سال",
      price: "تقریبی: $1000-2000",
      requirements: [
        "خرید ملک به ارزش حداقل $100,000",
        "یا سرمایه‌گذاری تجاری",
        "گواهی ثبت شرکت یا سند ملک",
        "حساب بانکی در ارمنستان",
      ],
      color: "from-emerald-600 to-teal-600",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "جمع‌آوری مدارک",
      description:
        "تمام مدارک مورد نیاز را مطابق لیست جمع‌آوری و ترجمه کنید",
      duration: "2-4 هفته",
    },
    {
      step: 2,
      title: "تایید مدارک",
      description:
        "مدارک را در سفارت ارمنستان یا وزارت امور خارجه تایید کنید",
      duration: "1-2 هفته",
    },
    {
      step: 3,
      title: "ورود به ارمنستان",
      description:
        "با ویزا یا معافیت ویزا (برای ایرانیان تا 180 روز) وارد ارمنستان شوید",
      duration: "1 روز",
    },
    {
      step: 4,
      title: "ثبت نام موقت",
      description:
        "ظرف 3 روز کاری ثبت نام موقت را در پلیس مهاجرت انجام دهید",
      duration: "1-3 روز",
    },
    {
      step: 5,
      title: "تکمیل فرم درخواست",
      description:
        "فرم درخواست اقامت را تکمیل و به همراه مدارک ارسال کنید",
      duration: "1 روز",
    },
    {
      step: 6,
      title: "پرداخت هزینه‌ها",
      description: "هزینه‌های اداری و صدور کارت اقامت را پرداخت کنید",
      duration: "1 روز",
    },
    {
      step: 7,
      title: "بررسی درخواست",
      description:
        "منتظر بررسی و تایید درخواست توسط پلیس مهاجرت باشید",
      duration: "30-60 روز",
    },
    {
      step: 8,
      title: "دریافت کارت اقامت",
      description:
        "کارت اقامت خود را از دفتر پلیس مهاجرت دریافت کنید",
      duration: "1 روز",
    },
  ];

  const importantLaws = [
    {
      title: "قانون ماندگاری بدون ویزا",
      icon: Shield,
      content:
        "شهروندان ایرانی می‌توانند تا 180 روز در سال بدون ویزا در ارمنستان بمانند.",
      importance: "high",
    },
    {
      title: "تمدید اقامت",
      icon: Clock,
      content:
        "درخواست تمدید باید حداقل 30 روز قبل از انقضای اقامت فعلی انجام شود.",
      importance: "high",
    },
    {
      title: "کار با اقامت",
      icon: Briefcase,
      content:
        "داشتن اقامت به تنهایی مجوز کار نیست. نیاز به اخذ مجوز کار جداگانه دارید.",
      importance: "high",
    },
    {
      title: "خروج از کشور",
      icon: AlertCircle,
      content:
        "در صورت خروج بیش از 6 ماه متوالی، اقامت شما باطل می‌شود.",
      importance: "medium",
    },
    {
      title: "ثبت آدرس",
      icon: Home,
      content:
        "هر تغییر آدرس باید ظرف 3 روز کاری به پلیس مهاجرت اطلاع داده شود.",
      importance: "medium",
    },
    {
      title: "اقامت دائم",
      icon: Users,
      content:
        "پس از 3 سال اقامت موقت مداوم، می‌توانید برای اقامت دائم درخواست دهید.",
      importance: "medium",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "documents":
        return (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 sm:p-6 mb-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-base sm:text-lg mb-2">
                    نکته مهم
                  </h4>
                  <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
                    تمام مدارک باید به زبان ارمنی یا روسی ترجمه و توسط
                    دفتر ترجمه رسمی یا سفارت تایید شوند.
                  </p>
                </div>
              </div>
            </motion.div>

            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-5 sm:p-6 hover:border-slate-600/50 transition-all duration-300">
                <div className="flex items-start gap-3 sm:gap-4">
                  {doc.required ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h4 className="text-white font-bold text-base sm:text-lg">
                        {doc.title}
                      </h4>
                      {doc.required && (
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold">
                          الزامی
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "types":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {residencyTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-5 sm:p-6 hover:border-slate-600/50 transition-all duration-300">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${type.color} p-2.5 sm:p-3 mb-4`}>
                  <type.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white mb-3">
                  {type.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-xs sm:text-sm text-slate-400 font-medium">
                      {type.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-xs sm:text-sm text-slate-400 font-medium">
                      {type.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {type.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-slate-300">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "process":
        return (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 sm:p-6 mb-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-base sm:text-lg mb-2">
                    مدت زمان کل فرآیند
                  </h4>
                  <p className="text-amber-200 text-sm sm:text-base leading-relaxed">
                    به طور متوسط 2-4 ماه زمان می‌برد. این مدت بسته به
                    نوع اقامت و تکمیل بودن مدارک متفاوت است.
                  </p>
                </div>
              </div>
            </motion.div>

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative bg-slate-800/30 border border-slate-700/30 rounded-2xl p-5 sm:p-6 hover:border-slate-600/50 transition-all duration-300">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                      <span className="text-white font-black text-base sm:text-lg">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-slate-700/30 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4 text-violet-400" />
                      <span className="text-xs sm:text-sm text-violet-300 font-medium">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="absolute right-[1.375rem] sm:right-[1.5rem] top-[4.5rem] sm:top-[5rem] bottom-[-1rem] w-0.5 bg-gradient-to-b from-violet-600/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        );

      case "laws":
        return (
          <div className="space-y-4">
            {importantLaws.map((law, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-slate-800/30 border rounded-2xl p-5 sm:p-6 hover:border-slate-600/50 transition-all duration-300 ${
                  law.importance === "high"
                    ? "border-rose-500/30"
                    : "border-slate-700/30"
                }`}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-2.5 flex-shrink-0 ${
                      law.importance === "high"
                        ? "bg-gradient-to-br from-rose-600 to-pink-600"
                        : "bg-gradient-to-br from-violet-600 to-purple-600"
                    }`}>
                    <law.icon className="w-full h-full text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h4 className="text-white font-bold text-base sm:text-lg">
                        {law.title}
                      </h4>
                      {law.importance === "high" && (
                        <span className="text-xs bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-full border border-rose-500/20 font-semibold">
                          بسیار مهم
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {law.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-fuchsia-950/20 pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            animation: "fadeInOut 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
            animation: "fadeInOut 10s ease-in-out infinite 2s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-2xl p-6 sm:p-8 md:p-10 mb-8 shadow-2xl shadow-violet-500/20">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              راهنمای جامع اقامت در ارمنستان
            </h2>
          </div>
          <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed font-light">
            همه چیزی که برای دریافت اقامت در ارمنستان نیاز دارید
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-2 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}>
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm sm:text-base">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 sm:p-6 md:p-8 mb-8">
          {renderContent()}
        </motion.div>

        {/* Download Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 p-3 flex-shrink-0 shadow-lg shadow-emerald-500/30">
                <Download className="w-full h-full text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-2">
                  دانلود راهنمای PDF
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  راهنمای کامل اقامت را به صورت PDF دانلود کنید
                </p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-bold text-base sm:text-lg text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95">
              <Download className="w-5 h-5" />
              <span>دانلود راهنما</span>
            </motion.button>
          </div>
        </motion.div> */}

        {/* External Resources */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
            منابع مفید
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "وب‌سایت رسمی پلیس مهاجرت ارمنستان",
                url: "police.am",
              },
              { title: "وزارت امور خارجه ارمنستان", url: "mfa.am" },
              { title: "پورتال دولت الکترونیک", url: "e-gov.am" },
              {
                title: "سفارت ارمنستان در تهران",
                url: "tehran.mfa.am",
              },
            ].map((resource, index) => (
              <motion.a
                key={index}
                href={`https://${resource.url}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between bg-slate-800/30 border border-slate-700/30 rounded-2xl p-4 sm:p-5 hover:border-violet-500/50 transition-all duration-300 group">
                <span className="text-white font-semibold text-sm sm:text-base group-hover:text-violet-300 transition-colors">
                  {resource.title}
                </span>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-violet-400 transition-colors flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
}
