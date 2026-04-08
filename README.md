



# 🚀 Ads Platform (Next.js + Supabase)

Live Demo 👉 https://ads-platform-eight.vercel.app

---

## 📌 Project Overview

This is a full-stack **Ads Management Platform** built with:

- Next.js (App Router)
- Supabase (Authentication + Database)
- Vercel (Deployment)

It allows users to:
- Create ads
- View ads
- Approve/reject ads (Admin)
- Login system
- Dashboard management

---

## ⚙️ Tech Stack

- Frontend: Next.js 13+
- Backend: Supabase
- Auth: Supabase Auth
- Styling: CSS / Tailwind (if used)
- Deployment: Vercel

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/maseera12345/Ads-platform.git
   cd adflow-pro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project on [Supabase](https://supabase.com).
   - Go to Settings > API to get your project URL and anon key.
   - Create a `.env.local` file in the root directory and add:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - Set up your database tables (e.g., ads, users) in Supabase Dashboard.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🚀 Live Demo

👉 **Vercel Live Link:** https://ads-platform-eight.vercel.app

---

## 📂 Project Structure

```
adflow-pro/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── admin/
│   │   ├── page.js
│   │   └── dashboard/
│   │       └── page.js
│   ├── ads/
│   │   ├── page.js
│   │   └── [id]/
│   │       └── page.js
│   ├── approved/
│   │   └── page.js
│   ├── components/
│   │   ├── Footer.js
│   │   └── Navbar.js
│   ├── create/
│   │   └── page.js
│   ├── dashboard/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── moderator/
│   │   └── page.js
│   ├── packages/
│   │   └── page.js
│   ├── register/
│   │   └── page.js
│   └── test/
│       └── page.js
├── lib/
│   └── supabase.js
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── README.md
└── AGENTS.md
```

---

## 🚀 Deployment

This project is deployed on Vercel:

👉 https://ads-platform-eight.vercel.app

Steps:
1. Push code to GitHub
2. Import repo in Vercel
3. Add environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. Deploy

---

## 👨‍💻 Features

- User authentication
- Create ads system
- Admin approval system
- Dashboard UI
- Supabase database integration
- Responsive design

---

## 📌 Author

Developed by: **Maseera Zulfiqar**

---

## ⭐ Status

✔ Fully deployed  
✔ Working live  
✔ Production ready

---

## 📄 License

This project is licensed under the MIT License.