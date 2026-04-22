

# AdFlow Pro - Ads Management Platform

A comprehensive full-stack advertising management platform built with modern web technologies, enabling users to create, manage, and moderate ads with role-based access control.

**Live Demo:** [https://ads-platform-eight.vercel.app](https://ads-platform-eight.vercel.app)
**Login Credentials:**
Email:admin@gmail.com
Password:123456



## Features

- **User Management** - Registration, authentication, and profile management
- **Ad Creation & Management** - Create, edit, and manage advertisements
- **Admin Dashboard** - Approve or reject ad submissions with detailed management capabilities
- **Moderator Tools** - Review and moderate user-generated content
- **Category & City-based Organization** - Browse ads by category and geographic location
- **Role-Based Access Control** - Distinct user, admin, and moderator roles
- **Responsive Design** - Works seamlessly across all devices

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 13+ (App Router) |
| **Backend** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Styling** | CSS / Tailwind CSS |
| **Deployment** | Vercel |
| **Runtime** | Node.js |

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Supabase account ([create one here](https://supabase.com))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/maseera12345/Ads-platform.git
   cd adflow-pro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Supabase:**
   - Create a new project on [Supabase Dashboard](https://supabase.com)
   - Navigate to **Settings > API** to retrieve your credentials
   - Create a `.env.local` file in the project root and add the following:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - Set up required database tables in Supabase Dashboard

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Demo Credentials

Access the live demo with the following credentials:
- **Email:** admin@gmail.com
- **Password:** 123456

## Project Structure

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

## 📋 Key Directories and Files

- **app/**: Contains Next.js App Router pages and layouts.
  - **globals.css**: Global styles.
  - **layout.js**: Root layout component.
  - **page.js**: Home page.
  - **admin/**: Admin panel for approving/rejecting ads.
    - **dashboard/**: Admin dashboard.
  - **ads/**: Ads listing and individual ad pages.
    - **[id]/**: Dynamic route for viewing a specific ad.
  - **approved/**: Page showing approved ads.
  - **components/**: Reusable React components.
    - **Footer.js**: Site footer.
    - **Navbar.js**: Navigation bar.
  - **create/**: Page for creating new ads.
  - **dashboard/**: User dashboard for managing ads.
  - **login/**: User login page.
  - **moderator/**: Moderator interface.
  - **packages/**: Package management page.
  - **register/**: User registration page.
  - **test/**: Test page.
- **lib/**: Utility functions and configurations.
  - **supabase.js**: Supabase client setup.
- **public/**: Static assets like images and icons.
- **package.json**: Project metadata, dependencies, and scripts.
- **next.config.ts**: Next.js configuration file.
- **tsconfig.json**: TypeScript configuration.
- **eslint.config.mjs**: ESLint rules for code linting.
- **postcss.config.mjs**: PostCSS configuration for Tailwind CSS.
- **AGENTS.md**: Custom agent rules for development tools.
- **CLAUDE.md**: Reference to agent rules.

---

## 📜 Available Scripts

From `package.json`:

- `npm run dev`: Starts the development server on `http://localhost:3000`.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check code quality.

---

## 📦 Dependencies

### Production Dependencies
- **@supabase/supabase-js**: Supabase JavaScript client for database and auth.
- **next**: React framework for production.
- **react**: React library.
- **react-dom**: React DOM rendering.

### Development Dependencies
- **@tailwindcss/postcss**: Tailwind CSS PostCSS plugin.
- **@types/node**: TypeScript types for Node.js.
- **@types/react**: TypeScript types for React.
- **@types/react-dom**: TypeScript types for React DOM.
- **eslint**: JavaScript linter.
- **eslint-config-next**: ESLint config for Next.js.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: TypeScript compiler.

---

## 🔧 Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (e.g., `https://your-project-id.supabase.co`).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

Create a `.env.local` file in the root directory and add these values.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

Please ensure code follows the ESLint rules and is properly typed with TypeScript.

---

## 🐛 Troubleshooting

- **Build Errors**: Ensure all dependencies are installed with `npm install`.
- **Supabase Connection Issues**: Verify your environment variables are correct and Supabase project is active.
- **TypeScript Errors**: Run `npm run lint` to check for issues.
- **Next.js Specifics**: This project uses a custom Next.js version with potential breaking changes. Refer to `node_modules/next/dist/docs/` for guides.

---

## 📝 Notes

- This project uses a modified version of Next.js. APIs, conventions, and file structure may differ from standard Next.js. Always check the docs in `node_modules/next/dist/docs/` and heed deprecation notices.
- AGENTS.md contains custom agent rules for development tools.
- CLAUDE.md references the agent rules.

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