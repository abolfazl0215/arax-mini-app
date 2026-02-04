"use client";

import {
  useState,
  useRef,
  useEffect,
  memo,
  useCallback,
} from "react";
import { X, Send, Sparkles, MessageCircle, Bot } from "lucide-react";
import { useChatModalStore } from "@/store/chatModalStore";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

// API Functions
const fetchMessages = async (telegramId) => {
  const response = await fetch(
    `http://localhost:3001/api/messages?telegramId=${telegramId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
};

const sendMessage = async ({ telegramId, text }) => {
  const response = await fetch("http://localhost:3001/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      telegramId,
      text,
      sender: "user",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  return response.json();
};

// Function to detect and linkify URLs
const linkifyText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-300 transition-colors"
          onClick={(e) => e.stopPropagation()}>
          {part}
        </a>
      );
    }
    return part;
  });
};

// Typing Indicator Component
const TypingIndicator = memo(() => (
  <div className="flex justify-start">
    <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-slate-800/80 border border-slate-700/50">
      <div className="flex items-center gap-1">
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  </div>
));

TypingIndicator.displayName = "TypingIndicator";

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
      <p className="text-sm leading-relaxed break-words">
        {linkifyText(message.text)}
      </p>
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
  const [inputValue, setInputValue] = useState("");
  const [telegramId, setTelegramId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [previousMessageCount, setPreviousMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const isOpen = useChatModalStore((s) => s.isChatOpen);
  const onClose = useChatModalStore((s) => s.closeChat);

  // Admin Telegram Username - تغییر بده به یوزرنیم خودت
  const ADMIN_USERNAME = "your_admin_username";

  // Get Telegram User ID
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;
      if (user?.id) {
        setTelegramId(user.id.toString());
      }
    }
  }, []);

  // Fetch Messages with React Query
  const {
    data: messages = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["messages", telegramId],
    queryFn: () => fetchMessages(telegramId),
    enabled: !!telegramId && isOpen,
    refetchInterval: 3000, // چک کردن پیام‌های جدید هر 3 ثانیه
    staleTime: 1000,
  });

  // مدیریت typing indicator
  useEffect(() => {
    if (
      messages.length > previousMessageCount &&
      previousMessageCount > 0
    ) {
      // پیام جدید از سرور اومده
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender !== "user") {
        // اگه پیام از AI بود، typing رو خاموش کن
        setIsTyping(false);
      }
    }
    setPreviousMessageCount(messages.length);
  }, [messages, previousMessageCount]);

  // Send Message Mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: () => {
      // وقتی کاربر پیام می‌فرسته، typing indicator رو فعال کن
      setIsTyping(true);
    },
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({
        queryKey: ["messages", telegramId],
      });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      setIsTyping(false);
      alert("خطا در ارسال پیام. لطفا دوباره تلاش کنید.");
    },
  });

  // Telegram Web App Back Button Handler
  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      if (isOpen) {
        tg.BackButton.show();

        const handleBackButton = () => {
          onClose();
        };

        tg.BackButton.onClick(handleBackButton);

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
    // هر وقت پیام جدید اومد یا typing شروع شد، scroll to bottom
    if (messages.length > 0 || isTyping) {
      scrollToBottom();
    }
  }, [messages.length, isTyping, scrollToBottom]);

  const handleSend = useCallback(() => {
    if (inputValue.trim() && telegramId) {
      sendMessageMutation.mutate({
        telegramId,
        text: inputValue.trim(),
      });
      setInputValue("");
    }
  }, [inputValue, telegramId, sendMessageMutation]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // دکمه ارتباط مستقیم با ادمین
  const handleContactAdmin = useCallback(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/${ADMIN_USERNAME}`,
      );
    }
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/90 z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Chat Modal */}
      <div className="animate-scaleIn fixed inset-x-4 top-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:h-[600px] bg-slate-900/95 border border-slate-700/50 rounded-2xl z-50 flex flex-col overflow-hidden">
        {/* Background Orbs - کاهش blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full opacity-50"
            style={{ filter: "blur(40px)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full opacity-50"
            style={{ filter: "blur(40px)" }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-purple-600" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                پشتیبانی هوشمند AI
                <Sparkles className="w-3.5 h-3.5" />
              </h3>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                آنلاین 24/7
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors active:scale-95">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* AI Notice Banner */}
        <div className="relative z-10 bg-indigo-500/10 border-b border-indigo-500/20 px-4 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-indigo-200 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5" />
              پاسخ‌ها توسط هوش مصنوعی ارائه می‌شود
            </p>
            <button
              onClick={handleContactAdmin}
              className="text-xs text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 active:scale-95">
              <MessageCircle className="w-3 h-3" />
              ارتباط مستقیم
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <ClipLoader color="#8b5cf6" size={40} />
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-red-400 text-sm mb-2">
                  خطا در بارگذاری پیام‌ها
                </p>
                <p className="text-slate-500 text-xs">
                  {error.message}
                </p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot className="w-12 h-12 text-purple-500 mx-auto mb-3 opacity-50" />
                <p className="text-slate-400 text-sm font-medium">
                  سلام! من دستیار هوشمند شما هستم
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  سوالات خود را از من بپرسید
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
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
                disabled={
                  sendMessageMutation.isPending || !telegramId
                }
              />
            </div>

            <button
              onClick={handleSend}
              disabled={
                !inputValue.trim() ||
                sendMessageMutation.isPending ||
                !telegramId
              }
              className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0 hover:scale-105 active:scale-95 will-change-transform">
              {sendMessageMutation.isPending ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-3 flex items-center justify-center gap-1.5">
            <Bot className="w-3 h-3" />
            پاسخ‌های خودکار در کمتر از چند ثانیه
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
