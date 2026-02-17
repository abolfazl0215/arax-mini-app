# 🚀 راهنمای سریع شروع

## مراحل اجرا (5 دقیقه!)

### 1️⃣ استخراج فایل

```bash
tar -xzf armenia-residency-miniapp.tar.gz
cd armenia-residency-miniapp
```

### 2️⃣ نصب وابستگی‌ها

```bash
npm install
```

### 3️⃣ اجرا

```bash
npm run dev
```

✅ باز کردن https://arax-mini-app-back-enzr.onrender.com

---

## 📱 تست در تلگرام (بدون deploy)

### استفاده از ngrok

```bash
# نصب ngrok
npm install -g ngrok

# در ترمینال جدید
npm run dev

# در ترمینال دیگر
ngrok http 3000
```

URL دریافتی (مثلاً `https://abc123.ngrok.io`) را در BotFather قرار
دهید.

---

## 🎨 سفارشی‌سازی سریع

### تغییر اطلاعات تماس

فایل: `components/ContactSection.js`

```js
// خط 52-54
<a href="tel:+374123456789">شماره خود</a>
<a href="mailto:info@...">ایمیل خود</a>
<a href="https://t.me/...">@username خود</a>
```

### تغییر قیمت‌ها

فایل: `components/ResidencyPlans.js`

```js
// خط 5-60
const plans = [
  {
    price: "$900", // قیمت خود را بگذارید
    // ...
  },
];
```

### تغییر رنگ اصلی

فایل: `tailwind.config.js`

```js
// خط 11-19
primary: {
  500: '#ef4444', // رنگ دلخواه
}
```

---

## 🔌 اتصال به Backend

### ساخت API Routes

در Next.js، فایل‌های API را در `app/api/` بسازید:

```
app/
  api/
    messages/
      route.js
    contact/
      route.js
```

### مثال: `app/api/messages/route.js`

```js
export async function POST(request) {
  const body = await request.json();

  // ذخیره در دیتابیس
  // await db.messages.create(body);

  return Response.json({ success: true });
}

export async function GET() {
  // دریافت از دیتابیس
  // const messages = await db.messages.findMany();

  return Response.json({ messages: [] });
}
```

### اتصال از Frontend

فایل: `components/ChatModal.js`

```js
const handleSend = async () => {
  // خط 23-30 را با این جایگزین کنید:

  const response = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: inputValue,
      userId: tg?.initDataUnsafe?.user?.id,
      timestamp: new Date(),
    }),
  });

  const data = await response.json();
  // ...
};
```

---

## 🚀 Deploy

### Vercel (رایگان و ساده)

```bash
# نصب Vercel CLI
npm i -g vercel

# لاگین
vercel login

# Deploy
vercel

# یا اتصال به GitHub و deploy خودکار
```

### Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy
```

### سرور شخصی (با Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

```bash
docker build -t armenia-app .
docker run -p 3000:3000 armenia-app
```

---

## 📋 Checklist قبل از انتشار

- [ ] تغییر اطلاعات تماس
- [ ] بررسی قیمت‌ها
- [ ] تست سیستم چت
- [ ] اتصال Backend
- [ ] تنظیم Environment Variables
- [ ] ساخت Bot در BotFather
- [ ] Deploy پروژه
- [ ] تنظیم URL در BotFather
- [ ] تست نهایی در تلگرام

---

## 🆘 رفع مشکلات

### خطا: Cannot find module

```bash
rm -rf node_modules package-lock.json
npm install
```

### خطا: Port in use

```bash
# تغییر پورت
npm run dev -- -p 3001
```

### تلگرام SDK کار نمی‌کند

1. حتماً در تلگرام باز کنید (نه مرورگر عادی)
2. بررسی کنید که URL در BotFather صحیح است
3. Console مرورگر را چک کنید

---

## 💡 نکات مهم

1. **بدون Navbar**: مینی‌اپ تلگرام navbar خودش را دارد
2. **Bottom Navigation**: فقط موبایل، در دسکتاپ چت button شناور
3. **Dark Theme**: تم دارک برای هماهنگی با تلگرام
4. **RTL**: کامل فارسی و راست‌چین

---

## 📞 پشتیبانی

مشکل دارید؟

- README.md اصلی را بخوانید
- مستندات Next.js: https://nextjs.org/docs
- Telegram Mini Apps: https://core.telegram.org/bots/webapps

موفق باشید! 🎉
