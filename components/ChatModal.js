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
    <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md bg-slate-900/95 border border-red-500/30 rounded-2xl p-5 z-[60] shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-red-400 font-bold text-base">
              خطای سرور
            </h3>
            <p className="text-slate-500 text-xs">
              {type === "fetch" ? "دریافت پیام‌ها" : "ارسال پیام"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center transition-colors">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Error Details */}
      <div className="bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 mb-4 max-h-60 overflow-y-auto scrollbar-thin">
        {errorObj.status !== undefined && (
          <div className="mb-3">
            <span className="text-slate-500 text-xs">Status:</span>
            <span className="text-red-400 text-sm font-mono ml-2">
              {errorObj.status === 0
                ? "Connection Failed"
                : errorObj.status}
            </span>
          </div>
        )}

        {errorObj.statusText && (
          <div className="mb-3">
            <span className="text-slate-500 text-xs">
              Status Text:
            </span>
            <span className="text-slate-300 text-sm ml-2">
              {errorObj.statusText}
            </span>
          </div>
        )}

        <div className="mb-3">
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
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 bg-slate-800/50 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4" />
              کپی شد
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              کپی خطا
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2.5 rounded-xl text-sm font-medium transition-colors">
          بستن
        </button>
      </div>

      {/* Tips */}
      <div className="mt-4 bg-violet-500/5 border border-violet-500/20 rounded-xl p-3">
        <p className="text-violet-300 text-xs font-semibold mb-2">
          💡 نکات عیب‌یابی:
        </p>
        <ul className="text-slate-400 text-xs space-y-1.5 list-disc list-inside">
          <li>مطمئن شوید سرور در حال اجراست</li>
          <li>اتصال اینترنت را بررسی کنید</li>
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
    <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-slate-800/50 border border-slate-700/30">
      <div className="flex items-center gap-1.5">
        <div
          className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
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
          ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-violet-500/20"
          : "bg-slate-800/50 border border-slate-700/30 text-slate-200"
      }`}>
      <p className="text-sm leading-relaxed break-words">
        {linkifyText(message.text)}
      </p>
      <span
        className={`text-xs mt-1.5 block ${
          message.sender === "user"
            ? "text-white/60"
            : "text-slate-500"
        }`}>
        {message.time}
      </span>
    </div>
  </div>
));

Message.displayName = "Message";

// Telegram Icon Component
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

export default function ChatModal() {
  const [inputValue, setInputValue] = useState("");
  const [telegramId, setTelegramId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [previousMessageCount, setPreviousMessageCount] = useState(0);
  const [showFetchError, setShowFetchError] = useState(false);
  const [showSendError, setShowSendError] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const isOpen = useChatModalStore((s) => s.isChatOpen);
  const onClose = useChatModalStore((s) => s.closeChat);

  // Admin Telegram Username
  const ADMIN_USERNAME = "OFFICE_RAD";

  // Detect Keyboard Open/Close
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.clientHeight;

      // If window height is significantly smaller, keyboard is open
      setIsKeyboardOpen(windowHeight < documentHeight * 0.8);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="animate-scaleIn fixed inset-x-4 top-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:h-[600px] bg-slate-900 border border-slate-700/30 rounded-3xl z-50 flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative z-10 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-violet-600 ${
                  isError ? "bg-red-500" : "bg-emerald-400"
                }`}
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                پشتیبانی هوشمند AI
                <Sparkles className="w-4 h-4" />
              </h3>
              <p className="text-white/70 text-xs flex items-center gap-1.5 mt-0.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isError
                      ? "bg-red-400"
                      : "bg-emerald-400 animate-pulse"
                  }`}
                />
                {isError ? "خطا در اتصال" : "آنلاین 24/7"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all active:scale-95">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* AI Notice Banner - Hide when keyboard is open */}
        {!isKeyboardOpen && (
          <div className="relative z-10 bg-violet-500/10 border-b border-violet-500/20 px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-violet-200 flex items-center gap-2">
                <Bot className="w-4 h-4" />
                پاسخ‌ها توسط هوش مصنوعی ارائه می‌شود
              </p>
              <button
                onClick={handleContactAdmin}
                className="relative text-xs text-white font-semibold bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-95 shadow-lg shadow-blue-500/30 animate-blink">
                <TelegramIcon />
                <span>ارتباط مستقیم در تلگرام</span>
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="relative z-10 flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <ClipLoader color="#8b5cf6" size={40} />
                <p className="text-slate-400 text-sm mt-4">
                  در حال بارگذاری...
                </p>
              </div>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-red-400 text-base mb-2 font-semibold">
                  خطا در اتصال به سرور
                </p>
                <p className="text-slate-500 text-sm mb-4">
                  امکان دریافت پیام‌ها وجود ندارد
                </p>
                <button
                  onClick={() => {
                    setShowFetchError(true);
                  }}
                  className="text-sm text-violet-400 hover:text-violet-300 underline">
                  مشاهده جزئیات خطا
                </button>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot className="w-14 h-14 text-violet-500 mx-auto mb-4 opacity-60" />
                <p className="text-slate-300 text-base font-semibold">
                  سلام! من دستیار هوشمند شما هستم
                </p>
                <p className="text-slate-500 text-sm mt-2">
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
        <div className="relative z-10 p-5 border-t border-slate-700/30 bg-slate-900/50">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-slate-800/50 border border-slate-700/30 rounded-2xl px-4 py-3 focus-within:border-violet-500/40 transition-colors">
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
              className="w-11 h-11 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0 hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/30">
              {sendMessageMutation.isPending ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-3 flex items-center justify-center gap-2">
            <Bot className="w-3.5 h-3.5" />
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

        /* Blink Animation for Telegram Button */
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-blink {
          animation: blink 2s ease-in-out infinite;
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
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </>
  );
}
