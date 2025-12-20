# 📰 Content Management Dashboard

A full-stack Content Management System (CMS) built with **Next.js** and **Strapi**, featuring authentication, role-based admin dashboard, and CRUD management for Articles and Categories.

This project is designed as an admin dashboard for managing articles and categories, with secure authentication using JWT and a clean, modular frontend architecture.

---

## 📌 Project Features

### 🔐 Authentication

- Login & Register (Strapi Auth)
- JWT-based authentication
- Protected admin routes
- Auto logout on unauthorized access
- Manual logout / clear token

### 📊 Admin Dashboard

- Dashboard overview with total articles count
- Sidebar-based admin layout
- Protected pages (Dashboard, Articles, Categories)

### 📰 Articles Management

- Create articles
- Read articles (list view)
- Update articles
- Delete articles
- Category relation support

### 🗂️ Categories Management

- Create categories
- Read categories
- Update categories
- Delete categories

### 🔔 User Experience

- Global toast notification (success & error)
- Dynamic error handling from backend
- Clean and responsive UI

---

## 🏗️ Project Structure

```bash
.
├── app/
│   ├── (public)/           # Public pages (login, register, home)
│   ├── dashboard/          # Admin dashboard layout & page
│   ├── articles/           # Articles CRUD pages
│   ├── categories/         # Categories CRUD pages
│   └── middleware.ts       # Route protection
│
├── components/
│   ├── layout/             # Navbar, Sidebar, Footer
│   └── ui/                 # Reusable UI components
│
├── lib/
│   ├── api.ts              # Axios instance & interceptors
│   ├── articles.ts         # Articles API handler
│   ├── categories.ts       # Categories API handler
│   ├── dashboard.ts        # Dashboard statistics
│   ├── storage.ts          # JWT storage helpers
│   └── toast.ts            # Global toast helper
│
├── store/
│   └── slices/             # Redux slices
│
└── README.md
```
