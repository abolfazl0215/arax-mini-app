"use client";
import ContactModal from "@/components/ContactModal";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import ChatModal from "@/components/ChatModal";
import useAnalytics from "@/hooks/useAnalytics";

// export const metadata = {
//   title: "Armenia Residency | اقامت ارمنستان",
//   description: "دریافت اقامت ارمنستان با بهترین قیمت و خدمات",
// };

export default function RootLayout({ children }) {
  // Initialize analytics tracking
  useAnalytics();
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className="bg-dark-50 min-h-screen">
        <ReactQueryProvider>
          <ContactModal />
          {/* Chat Modal */}
          <ChatModal />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
