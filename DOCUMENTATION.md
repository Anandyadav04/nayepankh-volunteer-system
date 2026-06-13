# NayePankh Volunteer Registration System

> **Full Stack Development Internship Assignment — Option 2**
> Built for NayePankh Foundation — One of the Biggest Student-led NGOs of India

---

## 🌟 Project Overview

This is a **full-stack Volunteer Registration System** that digitizes NayePankh Foundation's volunteer onboarding process. It replaces manual workflows with an automated pipeline where:
- Volunteers **self-register** through a beautiful public form
- Admins **review, approve, or reject** applications via a secure dashboard
- Data can be **exported as CSV reports** for organizational use

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Full-stack React framework for SSR + API routes |
| **Frontend** | React 19 + Vanilla CSS Modules | Component-based UI with scoped, collision-free styles |
| **Database** | SQLite via Prisma ORM v6 | Zero-config local DB with type-safe queries |
| **Auth** | NextAuth.js v4 (JWT) | Session management with Credentials provider |
| **Security** | bcryptjs | Password hashing (salted, 10 rounds) |

### Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout (Navbar + Footer)
│   ├── page.js            # Landing page (Hero + Registration)
│   ├── globals.css         # Global design system
│   ├── login/
│   │   ├── page.js        # Admin login (split-screen)
│   │   └── login.module.css
│   ├── admin/
│   │   └── dashboard/
│   │       ├── page.js    # Server component (auth + data fetch)
│   │       ├── DashboardClient.js  # Interactive table + stats
│   │       └── dashboard.module.css
│   └── api/
│       ├── register/route.js       # POST volunteer registration
│       ├── volunteers/[id]/route.js # PATCH update status
│       └── auth/[...nextauth]/route.js # NextAuth handler
├── components/
│   ├── Navbar.js          # Sticky navbar with glassmorphism
│   ├── Footer.js          # 3-column footer
│   ├── VolunteerForm.js   # Registration form (client component)
│   └── VolunteerForm.module.css
├── lib/
│   ├── prisma.js          # Prisma singleton
│   └── auth.js            # NextAuth config
prisma/
├── schema.prisma          # Database models
└── dev.db                 # SQLite database file
```

---

## 🔄 User Flows

### Flow 1: Volunteer Registration (Public)
1. User lands on the **Home Page** (`/`) and sees the hero section with NayePankh branding
2. Scrolls to the **Registration Section** (or clicks "Register as Volunteer")
3. Fills out: **Name**, **Email**, **Phone**, **Skills**, and **Reason for joining**
4. On submit → `POST /api/register` validates data, checks for duplicate emails, and saves to DB with status `Pending`
5. User sees an animated **success confirmation** without page reload

### Flow 2: Admin Authentication
1. Admin navigates to `/login` and sees a **split-screen layout** (branding panel + login form)
2. Enters credentials → `POST /api/auth/callback/credentials`
3. NextAuth validates the password hash via `bcryptjs`, issues a **JWT session cookie**
4. Redirects to `/admin/dashboard`
5. **First-time setup**: If no admin account exists and the email is `admin@nayepankh.com`, the system auto-creates the account with the provided password

### Flow 3: Admin Dashboard Operations
1. **Server component** checks session; redirects to login if unauthenticated
2. Fetches all volunteers via Prisma and computes **real-time statistics**
3. Dashboard displays:
   - **4 stat cards** (Total, Pending, Approved, Rejected)
   - **Filter toolbar** (All / Pending / Approved / Rejected)
   - **Search bar** (search by name, email, or skills)
   - **Data table** with volunteer avatars, contact info, skills, and status badges
4. Admin can **Approve**, **Reject**, or **Reset** any application → `PATCH /api/volunteers/[id]`
5. Admin can **Export CSV** with all volunteer data for offline use

---

## 📦 Key Features

### 1. Premium UI/UX Design System
- **Glassmorphism Navbar**: Sticky with backdrop blur, seamless navigation
- **Animated Hero Section**: Gradient orbs, floating animations, glassmorphism badge
- **Stat Cards**: With hover lift effects, animated entry
- **Micro-animations**: `fadeInUp`, `scaleIn`, `float` — applied throughout for a dynamic feel
- **CSS Modules**: All styles are component-scoped to prevent collisions

### 2. Server-Side Rendering (SSR) + Client Interactivity
- Dashboard page fetches data server-side for fast initial load
- Client components handle interactive features (search, filter, approve/reject)
- API routes are protected with session checks

### 3. Database Design (Prisma + SQLite)

**User Model** (Admin):
| Field | Type | Notes |
|-------|------|-------|
| id | String | CUID auto-generated |
| email | String | Unique |
| passwordHash | String | bcrypt hashed |
| createdAt | DateTime | Auto timestamp |

**Volunteer Model**:
| Field | Type | Notes |
|-------|------|-------|
| id | String | CUID auto-generated |
| name | String | Full name |
| email | String | Unique |
| phone | String | Contact number |
| skills | String | Skills/interests |
| reason | String | Why they want to join |
| status | String | Pending / Approved / Rejected |
| createdAt | DateTime | Auto timestamp |

### 4. Secure Authentication
- JWT-based session strategy (stateless, scalable)
- Passwords hashed with bcrypt (10 salt rounds)
- API routes check for valid sessions before mutations
- Dynamic first-admin provisioning (no database seeding scripts needed)

### 5. Report Generation
- Client-side CSV export using Web APIs (`Blob` + `URL.createObjectURL`)
- Timestamped filename: `nayepankh_volunteers_YYYY-MM-DD.csv`
- Properly escaped CSV fields (handles commas and quotes in data)

### 6. Email Notifications
- Integration with `nodemailer` for automated emails
- Volunteers receive an HTML-formatted welcome email upon Approval
- Rejection emails are sent with a polite, professional message

---

## 🚀 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Set up database
npx prisma db push
npx prisma generate

# 3. Start development server
npm run dev

# 4. Open in browser
# Landing Page:  http://localhost:3000
# Admin Login:   http://localhost:3000/login
# Dashboard:     http://localhost:3000/admin/dashboard
```

**Default Admin Credentials:**
- Email: `admin@nayepankh.com`
- Password: *(Set during first login)*

---

## 💡 Future Enhancements

1. **Pagination**: Server-side pagination for handling thousands of applications
2. **Role-Based Access**: Add Moderator roles with limited permissions
3. **Analytics Dashboard**: Charts showing registration trends over time
4. **Mobile App**: React Native companion app for field volunteers

---

## 📄 Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration for Nodemailer
EMAIL_USER="your.email@gmail.com"
EMAIL_PASS="your-app-password"
```

---

*Built with ❤️ for NayePankh Foundation*
