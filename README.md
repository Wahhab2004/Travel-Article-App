# 🧭 Tracle — Travel Article Dashboard

**Tracle** adalah aplikasi **Content Management System (CMS)** berbasis web untuk mengelola artikel perjalanan (travel articles).  
Aplikasi ini dibangun menggunakan **Next.js (App Router)** sebagai frontend dan **Strapi v4** sebagai backend, dengan fitur autentikasi, dashboard admin, serta CRUD untuk Articles dan Categories.

---

## ✨ Fitur Utama

### 🔐 Autentikasi

- Login & Register (Strapi Auth)
- Autentikasi berbasis JWT
- Proteksi halaman admin menggunakan Middleware
- Logout & Clear Token
- Auto logout ketika token tidak valid (401)

### 📊 Dashboard Admin

- Halaman dashboard admin
- Menampilkan total artikel
- Sidebar khusus admin

### 📰 Manajemen Artikel (Articles)

- Create artikel
- Read / List artikel
- Update artikel
- Delete artikel
- Relasi artikel dengan kategori

### 🗂️ Manajemen Kategori (Categories)

- Create kategori
- Read / List kategori
- Update kategori
- Delete kategori

### 🔔 User Experience

- Toast notification global (success & error)
- Pesan error dinamis dari backend
- Struktur layout terpisah (public, auth, admin)

---

## 🏗️ Struktur Folder Project

Struktur utama project **Tracle** adalah sebagai berikut:

```bash
TRAVEL-ARTICLE-APP
├── app/
│   ├── (admin)/                 # Halaman admin (protected)
│   │   ├── articles/            # CRUD Articles
│   │   ├── categories/          # CRUD Categories
│   │   ├── dashboard/           # Dashboard admin
│   │   └── layout.tsx           # Layout admin (Sidebar)
│   │
│   ├── (auth)/                  # Halaman autentikasi
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (public)/                # Halaman publik
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── layout.tsx               # Root layout
│   ├── providers.tsx            # Provider (Redux, dll)
│   └── favicon.ico
│
├── components/
│   ├── article/                 # Komponen artikel
│   ├── layout/                  # Navbar, Sidebar, Footer
│   ├── ui/                      # Komponen UI reusable
│   └── LogoutButton.tsx
│
├── hooks/                       # Custom hooks
├── lib/                         # Helper API, toast, storage
├── schemas/                     # Zod schemas
├── store/                       # Redux store & slices
├── styles/                      # Styling tambahan
├── types/                       # TypeScript types
├── middleware.ts                # Route protection
├── .env                         # Environment variables
└── README.md
```
