"use client";

import { useChatModalStore } from "@/store/chatModalStore";
import {
  ArrowRight,
  FileText,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Scale,
  Users,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  Download,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

    return () => {
      tg.BackButton.offClick(handleBack); // ✅ مهم‌ترین بخش
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
      color: "from-indigo-600 to-purple-600",
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
      color: "from-pink-600 to-rose-600",
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
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-2">
                    نکته مهم
                  </h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    تمام مدارک باید به زبان ارمنی یا روسی ترجمه و توسط
                    دفتر ترجمه رسمی یا سفارت تایید شوند.
                  </p>
                </div>
              </div>
            </div>

            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-5 hover:border-slate-600/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {doc.required ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-bold">
                        {doc.title}
                      </h4>
                      {doc.required && (
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                          الزامی
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "types":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {residencyTypes.map((type, index) => (
              <div
                key={index}
                className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} p-3 mb-4`}>
                  <type.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {type.title}
                </h3>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">
                      {type.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">
                      {type.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {type.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "process":
        return (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-2">
                    مدت زمان کل فرآیند
                  </h4>
                  <p className="text-amber-200 text-sm leading-relaxed">
                    به طور متوسط 2-4 ماه زمان می‌برد. این مدت بسته به
                    نوع اقامت و تکمیل بودن مدارک متفاوت است.
                  </p>
                </div>
              </div>
            </div>

            {processSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-slate-700/30 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm text-indigo-300">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="absolute right-[1.375rem] top-[4.5rem] bottom-[-1rem] w-0.5 bg-gradient-to-b from-indigo-600/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        );

      case "laws":
        return (
          <div className="space-y-4">
            {importantLaws.map((law, index) => (
              <div
                key={index}
                className={`bg-slate-800/30 border rounded-xl p-5 hover:border-slate-600/50 transition-all duration-300 ${
                  law.importance === "high"
                    ? "border-rose-500/30"
                    : "border-slate-700/30"
                }`}>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl p-2.5 flex-shrink-0 ${
                      law.importance === "high"
                        ? "bg-gradient-to-br from-rose-600 to-pink-600"
                        : "bg-gradient-to-br from-indigo-600 to-purple-600"
                    }`}>
                    <law.icon className="w-full h-full text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-bold">
                        {law.title}
                      </h4>
                      {law.importance === "high" && (
                        <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-1 rounded-full border border-rose-500/20">
                          بسیار مهم
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {law.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      {/* <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">بازگشت</span>
            </button>

            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              <h1 className="text-xl font-bold text-white">
                بانک آموزش و قوانین
              </h1>
            </div>
          </div>
        </div>
      </div> */}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            راهنمای جامع اقامت در ارمنستان
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            همه چیزی که برای دریافت اقامت در ارمنستان نیاز دارید
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-2 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}>
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 md:p-8">
          {renderContent()}
        </div>

        {/* Download Section */}
        <div className="mt-8 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 p-3 flex-shrink-0">
                <Download className="w-full h-full text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  دانلود راهنمای PDF
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  راهنمای کامل اقامت را به صورت PDF دانلود کنید
                </p>
              </div>
            </div>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">
              <Download className="w-5 h-5" />
              <span>دانلود راهنما</span>
            </button>
          </div>
        </div>

        {/* External Resources */}
        <div className="mt-8 bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
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
              <a
                key={index}
                href={`https://${resource.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 hover:border-indigo-500/50 transition-all duration-300 group">
                <span className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                  {resource.title}
                </span>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
