# 🤝 NayePankh Foundation — Volunteer Registration System

A full-stack web application for managing volunteer registrations at NayePankh Foundation, one of India's biggest student-led NGOs.

## Live URL: https://nayepankh-volunteer-system.vercel.app/

## ✨ Features

- **🎨 Premium UI** — Modern glassmorphism design with micro-animations
- **📝 Registration Form** — Public volunteer self-registration with validation
- **🔐 Admin Auth** — Secure login with NextAuth.js (JWT sessions)
- **📊 Admin Dashboard** — Stats cards, search, filter, approve/reject
- **📧 Email Notifications** — Automated emails sent to volunteers upon approval/rejection (via Nodemailer)
- **📥 CSV Export** — Download volunteer data for offline use
- **🗄️ PostgreSQL Database** — Powerful relational database via Prisma ORM

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Configure Environment Variables:**
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nayepankh"
NEXTAUTH_SECRET="your-secret-key-for-development"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration for Nodemailer (Optional - for email notifications)
# Use an App Password for Gmail (not your regular password)
EMAIL_USER="your.email@gmail.com"
EMAIL_PASS="your-app-password"
```

3. **Initialize the Database:**
```bash
npx prisma db push
npx prisma generate
```

4. **Run the Development Server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Admin Access

Navigate to [http://localhost:3000/login](http://localhost:3000/login)

- **Email:** `admin@nayepankh.com`
- **Password:** *(Set this to anything during your very first login, it will become the permanent password)*

## 📖 Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed architecture, user flows, and database schema.

## 🛠️ Built With

- [Next.js 16](https://nextjs.org/) — Full-stack React framework
- [Prisma ORM](https://prisma.io/) — Type-safe database toolkit
- [NextAuth.js](https://next-auth.js.org/) — Authentication
- [Nodemailer](https://nodemailer.com/) — Email sending
- [PostgreSQL](https://www.postgresql.org/) — Relational database

---
