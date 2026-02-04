"use client";

import {
  useState,
  useRef,
  useEffect,
  memo,
  useCallback,
} from "react";
import {
  X,
  Send,
  Sparkles,
  MessageCircle,
  Bot,
  AlertCircle,
  Copy,
  CheckCircle,
} from "lucide-react";
import { useChatModalStore } from "@/store/chatModalStore";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

// API Functions
const fetchMessages = async (telegramId) => {
  try {
    const response = await fetch(
      `https://arax-mini-app-back.onrender.com/api/messages?telegramId=${telegramId}`,
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          message: errorData.message || "Failed to fetch messages",
          error: errorData.error || "Unknown error",
        }),
      );
    }

    return response.json();
  } catch (error) {
    if (error.message.startsWith("{")) {
      throw error;
    }
    throw new Error(
      JSON.stringify({
        status: 0,
        message: "Network error or server is not running",
        error: error.message,
      }),
    );
  }
};

const sendMessage = async ({ telegramId, text }) => {
  try {
    const response = await fetch(
      "https://arax-mini-app-back.onrender.com/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telegramId,
          text,
          sender: "user",
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          message: errorData.message || "Failed to send message",
          error: errorData.error || "Unknown error",
        }),
      );
    }

    return response.json();
  } catch (error) {
    if (error.message.startsWith("{")) {
      throw error;
    }
    throw new Error(
      JSON.stringify({
        status: 0,
        message: "Network error or server is not running",
        error: error.message,
      }),
    );
  }
};

// Error Display Component
const ErrorDisplay = memo(({ error, onClose, type = "fetch" }) => {
  const [copied, setCopied] = useState(false);

  let errorObj = {};
  try {
    errorObj = JSON.parse(error.message);
  } catch {
    errorObj = { message: error.message };
  }

  const handleCopy = () => {
    const errorText = JSON.stringify(errorObj, null, 2);
    navigator.clipboard.writeText(errorText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md bg-slate-900 border border-red-500/50 rounded-xl p-4 z-[60] shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-red-400 font-bold text-sm">
              خطای سرور
            </h3>
            <p className="text-slate-500 text-xs">
              {type === "fetch" ? "دریافت پیام‌ها" : "ارسال پیام"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Error Details */}
      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-3 mb-3 max-h-60 overflow-y-auto scrollbar-thin">
        {errorObj.status !== undefined && (
          <div className="mb-2">
            <span className="text-slate-500 text-xs">Status:</span>
            <span className="text-red-400 text-sm font-mono ml-2">
              {errorObj.status === 0
                ? "Connection Failed"
                : errorObj.status}
            </span>
          </div>
        )}

        {errorObj.statusText && (
          <div className="mb-2">
            <span className="text-slate-500 text-xs">
              Status Text:
            </span>
            <span className="text-slate-300 text-sm ml-2">
              {errorObj.statusText}
            </span>
          </div>
        )}

        <div className="mb-2">
          <span className="text-slate-500 text-xs">Message:</span>
          <p className="text-slate-200 text-sm mt-1 break-words">
            {errorObj.message}
          </p>
        </div>

        {errorObj.error && (
          <div>
            <span className="text-slate-500 text-xs">Error:</span>
            <p className="text-red-300 text-xs mt-1 break-words font-mono">
              {errorObj.error}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
          {copied ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              کپی شد
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              کپی خطا
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg text-xs font-medium transition-colors">
          بستن
        </button>
      </div>

      {/* Tips */}
      <div className="mt-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-2">
        <p className="text-indigo-300 text-xs">💡 نکات عیب‌یابی:</p>
        <ul className="text-slate-400 text-xs mt-1 space-y-1 list-disc list-inside">
          <li>مطمئن شوید سرور روی پورت 3001 در حال اجراست</li>
          <li>MongoDB را چک کنید</li>
          <li>فایل .env را بررسی کنید</li>
          <li>Console مرورگر را چک کنید (F12)</li>
        </ul>
      </div>
    </div>
  );
});

ErrorDisplay.displayName = "ErrorDisplay";

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
  const [showFetchError, setShowFetchError] = useState(false);
  const [showSendError, setShowSendError] = useState(false);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const isOpen = useChatModalStore((s) => s.isChatOpen);
  const onClose = useChatModalStore((s) => s.closeChat);

  // Admin Telegram Username - تغییر بده به یوزرنیم خودت
  const ADMIN_USERNAME = "araks_support";

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
    refetchInterval: 3000,
    staleTime: 1000,
    retry: 1,
    onError: (error) => {
      console.error("Fetch messages error:", error);
      setShowFetchError(true);
    },
  });

  // مدیریت typing indicator
  useEffect(() => {
    if (
      messages.length > previousMessageCount &&
      previousMessageCount > 0
    ) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender !== "user") {
        setIsTyping(false);
      }
    }
    setPreviousMessageCount(messages.length);
  }, [messages, previousMessageCount]);

  // Send Message Mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: () => {
      setIsTyping(true);
      setShowSendError(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", telegramId],
      });
    },
    onError: (error) => {
      console.error("Send message error:", error);
      setIsTyping(false);
      setShowSendError(true);
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

      {/* Error Displays */}
      {isError && showFetchError && (
        <ErrorDisplay
          error={error}
          onClose={() => setShowFetchError(false)}
          type="fetch"
        />
      )}

      {sendMessageMutation.isError && showSendError && (
        <ErrorDisplay
          error={sendMessageMutation.error}
          onClose={() => setShowSendError(false)}
          type="send"
        />
      )}

      {/* Chat Modal */}
      <div className="animate-scaleIn fixed inset-x-4 top-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:h-[600px] bg-slate-900/95 border border-slate-700/50 rounded-2xl z-50 flex flex-col overflow-hidden">
        {/* Background Orbs */}
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
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-purple-600 ${
                  isError ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                پشتیبانی هوشمند AI
                <Sparkles className="w-3.5 h-3.5" />
              </h3>
              <p className="text-white/70 text-xs flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isError
                      ? "bg-red-500"
                      : "bg-emerald-500 animate-pulse"
                  }`}
                />
                {isError ? "خطا در اتصال" : "آنلاین 24/7"}
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
              <div className="text-center">
                <ClipLoader color="#8b5cf6" size={40} />
                <p className="text-slate-400 text-sm mt-3">
                  در حال بارگذاری...
                </p>
              </div>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-red-400 text-sm mb-2 font-medium">
                  خطا در اتصال به سرور
                </p>
                <p className="text-slate-500 text-xs mb-3">
                  امکان دریافت پیام‌ها وجود ندارد
                </p>
                <button
                  onClick={() => {
                    setShowFetchError(true);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline">
                  مشاهده جزئیات خطا
                </button>
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
