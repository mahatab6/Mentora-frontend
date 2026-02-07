# 🎓 Mentora — Connect with Expert Tutors, Learn Anything

Mentora is a full-stack tutoring platform that connects students with expert tutors for personalized learning. Students can browse tutors, book sessions instantly, and leave reviews. Tutors can manage profiles, availability, and sessions, while admins oversee the entire platform.

🔗 **Live Demo:**
👉 [https://mentora-nu-vert.vercel.app/]

---

## 📂 Repositories

- **Frontend:**
  👉 [https://github.com/mahatab6/Mentora-frontend]
- **Backend:**
  👉 [https://github.com/mahatab6/Mentora-backend]

---

## 🚀 Features

### 🌍 Public Features

- Browse tutors by subject, rating, and price
- Filter tutors by category
- View detailed tutor profiles with reviews
- Landing page with featured tutors

### 🎓 Student Features

- Register and log in as a student
- Book tutoring sessions instantly
- View upcoming and past bookings
- Leave reviews after completed sessions
- Manage personal profile

### 👨‍🏫 Tutor Features

- Register and log in as a tutor
- Create and update tutor profile
- Set availability slots
- View booked teaching sessions
- Track ratings and reviews
- Mark sessions as completed

### 🛡️ Admin Features

- View all users (students & tutors)
- Ban / unban users
- View and manage all bookings
- Manage tutor categories

---

## 👥 Roles & Permissions

| Role    | Description                         | Key Permissions                             |
| ------- | ----------------------------------- | ------------------------------------------- |
| Student | Learners who book tutoring sessions | Browse tutors, book sessions, leave reviews |
| Tutor   | Experts offering tutoring services  | Manage profile, availability, sessions      |
| Admin   | Platform moderators                 | Manage users, bookings, and categories      |

## 🔄 Booking Status Flow

```
CONFIRMED (instant)
     |
     |—— Tutor marks complete ——▶ COMPLETED
     |
     |—— Student cancels ————▶ CANCELLED
```

---

## 🧭 User Journeys

### Student Journey

```
Register → Browse Tutors → View Profile → Book Session → Attend → Leave Review
```

### Tutor Journey

```
Register → Create Profile → Set Availability → View Sessions → Mark Complete
```

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Radix UI**
- **TanStack React Table & Form**
- **Zod**
- **Better Auth**
- **Date-fns**
- **Recharts**
- **Swiper**
- **Sonner (Toast notifications)**

### Backend

- **Node.js**
- **Express 5**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Better Auth**
- **CORS**
- **Dotenv**

---

## 🔐 Authentication

- Email & password authentication using **Better Auth**
- Role-based access control (Student / Tutor / Admin)
- Secure session handling

---

## 🧪 Environment Variables

### Frontend (`.env`)

```env
NEXT_PUBLIC_BASE_API
AUTH_URL
API_URL
NEXT_PUBLIC_BASE_API
```

### Backend (`.env`)

```env
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
Server_Port
App_url
```

---

## 🏗️ Installation & Setup

### 1️⃣ Clone the repositories

```bash
git clone https://github.com/mahatab6/Mentora-frontend
git clone https://github.com/mahatab6/Mentora-backend
```

### 2️⃣ Install dependencies

**Frontend**

```bash
cd Mentora-frontend
npm install
npm run dev
```

**Backend**

```bash
cd Mentora-backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## 📊 Database

- PostgreSQL
- Prisma schema with relations for users, tutors, students, bookings, reviews, and availability slots

---

## 🌱 Future Improvements

- Payment integration (Stripe)
- Video call integration (Zoom / WebRTC)
- Tutor verification system
- Notifications & reminders
- Admin analytics dashboard

---

## 🙌 Author

**Mahatab**
Full-Stack Developer (MERN / Next.js)

If you like this project, feel free to ⭐ the repo!
