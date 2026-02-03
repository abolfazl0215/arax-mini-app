"use client";

import {
  useState,
  useRef,
  useEffect,
  memo,
  useCallback,
} from "react";
import { X, Send, Sparkles } from "lucide-react";
import { useChatModalStore } from "@/store/chatModalStore";

// Optimized Message Component
const Message = memo(({ message }) => (
  <div
    className={`flex ${
      message.sender === "user" ? "justify-end" : "justify-start"
    }`}>
    <div
      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
        message.sender === "user"
          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white"
          : "bg-slate-800/80 border border-slate-700/50 text-slate-200"
      }`}>
      <p className="text-sm leading-relaxed">{message.text}</p>
      <span
        className={`text-xs mt-1 block ${
          message.sender === "user"
            ? "text-white/70"
            : "text-slate-500"
        }`}>
        {message.time}
      </span>
    </div>
  </div>
));

Message.displayName = "Message";

export default function ChatModal() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "سلام! به سیستم پیام‌رسانی ما خوش آمدید. چطور می‌توانم کمکتان کنم؟",
      sender: "support",
      time: "10:30",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const isOpen = useChatModalStore((s) => s.isChatOpen);
  const onClose = useChatModalStore((s) => s.closeChat);

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

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages.length, scrollToBottom]);

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: "user",
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");

      // Simulate support response
      setTimeout(() => {
        const supportMessage = {
          id: Date.now() + 1,
          text: "پیام شما دریافت شد. کارشناس ما به زودی پاسخ خواهد داد.",
          sender: "support",
          time: new Date().toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, supportMessage]);
      }, 1000);
    }
  }, [inputValue]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - No blur */}
      <div
        className="fixed inset-0 bg-slate-950/90 z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Chat Modal - Reduced backdrop-blur */}
      <div className="animate-scaleIn fixed inset-x-4 top-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:h-[600px] bg-slate-900/95 border border-slate-700/50 rounded-2xl z-50 flex flex-col overflow-hidden">
        {/* Simple Background Orb */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/8 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/8 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Header */}
        <div className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-purple-600" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">
                پشتیبانی
              </h3>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                آنلاین
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative z-10 p-4 border-t border-slate-700/50 bg-slate-900/80">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-slate-800/80 border border-slate-700/50 rounded-2xl px-4 py-2 focus-within:border-slate-600 transition-colors">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="پیام خود را بنویسید..."
                className="w-full bg-transparent text-white placeholder-slate-500 resize-none outline-none text-sm max-h-24"
                rows="1"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0 hover:scale-105 active:scale-95">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-3 flex items-center justify-center gap-1">
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
            معمولاً ظرف چند دقیقه پاسخ می‌دهیم
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Fade In */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        /* Scale In */
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .animate-scaleIn {
            animation: slideUp 0.2s ease-out;
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        /* Scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </>
  );
}
