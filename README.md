# Armenia Residency Telegram Mini App 🇦🇲

یک مینی‌اپ تلگرامی حرفه‌ای برای ارائه خدمات اقامت ارمنستان با طراحی
دارک و مدرن.

## ✨ ویژگی‌ها

- 🎨 **طراحی دارک مدرن** - رابط کاربری زیبا و حرفه‌ای
- 💬 **سیستم پیام‌رسانی** - چت آنلاین با پشتیبانی
- 📱 **Telegram Mini App** - یکپارچه با تلگرام
- 🚀 **پرفورمنس بالا** - بهینه‌سازی شده با Next.js
- 🎭 **انیمیشن‌های روان** - با Framer Motion
- 📦 **5 نوع اقامت** - پکیج‌های متنوع

## 📋 پکیج‌های اقامت

1. **اقامت یکساله از طریق ثبت شرکت** - $900
2. **اقامت 5 ساله** - $1,500
3. **اقامت تحصیلی** - $800
4. **اقامت پزشکی/دندانپزشکی** - $800
5. **ورک پرمیت + جاب آفر** - تماس بگیرید

## 🎁 امکانات ویژه

- ✅ تنظیم قرارداد رسمی در دفتر شرکت
- ✅ پرداخت هزینه بعد از گرفتن اقامت
- ✅ افتتاح حساب بانکی شرکتی و شخصی رایگان
- ✅ آفر ویژه شرکت

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn

### مراحل نصب

```bash
# 1. نصب dependencies
npm install

# 2. اجرای development server
npm run dev

# 3. باز کردن در مرورگر
# https://arax-mini-app-back.onrender.com
```

### Build برای Production

```bash
# Build
npm run build

# اجرا
npm start
```

## 📱 راه‌اندازی در Telegram

### 1. ساخت Bot

1. به [@BotFather](https://t.me/BotFather) در تلگرام مراجعه کنید
2. دستور `/newbot` را ارسال کنید
3. نام و username برای بات انتخاب کنید
4. توکن دریافتی را ذخیره کنید

### 2. فعال‌سازی Mini App

1. به بات خود در BotFather بروید
2. دستور `/newapp` را ارسال کنید
3. بات خود را انتخاب کنید
4. اطلاعات اپ را وارد کنید:
   - نام اپ
   - توضیحات
   - عکس (640x360)
   - GIF دمو (اختیاری)
   - URL اپ (بعد از deploy)

### 3. Deploy

#### روش 1: Vercel (توصیه می‌شود)

```bash
# نصب Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### روش 2: سرورهای شخصی

```bash
# Build
npm run build

# آپلود فولدر .next و سایر فایل‌ها
# اجرا با PM2 یا Docker
```

### 4. تنظیم URL در BotFather

1. دستور `/myapps` در BotFather
2. اپ خود را انتخاب کنید
3. "Edit Web App URL"
4. URL دیپلوی شده را وارد کنید

## 🎨 سفارشی‌سازی

### تغییر رنگ‌ها

فایل `tailwind.config.js`:

```js
colors: {
  primary: {
    // رنگ‌های اصلی
  }
}
```

### تغییر متن‌ها

فایل‌های کامپوننت در `components/`:

- `Hero.js` - صفحه اصلی
- `ResidencyPlans.js` - پکیج‌ها
- `Features.js` - ویژگی‌ها
- `ContactSection.js` - تماس

### اضافه کردن پکیج جدید

فایل `components/ResidencyPlans.js`:

```js
const plans = [
  // پکیج جدید خود را اضافه کنید
];
```

## 🔧 اتصال Backend

### API Endpoints مورد نیاز

```
POST /api/messages - ارسال پیام
GET /api/messages - دریافت پیام‌ها
POST /api/orders - ثبت سفارش
POST /api/contact - ارسال فرم تماس
```

### مثال اتصال:

فایل `components/ChatModal.js`:

```js
const handleSend = async () => {
  await fetch("/api/messages", {
    method: "POST",
    body: JSON.stringify({ message: inputValue }),
  });
};
```

## 📞 اطلاعات تماس

برای سفارشی‌سازی اطلاعات تماس:

فایل `components/ContactSection.js`:

```js
// تلفن
<a href="tel:+374123456789">+374 12 345 6789</a>

// ایمیل
<a href="mailto:info@armenia-residency.com">

// تلگرام
<a href="https://t.me/your_support_username">
```

## 🛠️ تکنولوژی‌ها

- **Next.js 14** - React Framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Telegram Web App SDK** - Integration

## 📝 لایسنس

This project is private and proprietary.

## 💬 پشتیبانی

برای سوالات و پشتیبانی:

- تلگرام: [@your_support_username](https://t.me/your_support_username)
- ایمیل: info@armenia-residency.com

---

ساخته شده با ❤️ برای خدمات اقامت ارمنستان
