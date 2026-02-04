import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";

export const metadata = {
  title: "Armenia Residency | اقامت ارمنستان",
  description: "دریافت اقامت ارمنستان با بهترین قیمت و خدمات",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className="bg-dark-50 min-h-screen">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
