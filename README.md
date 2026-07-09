# 🐾 PetNest - Pet Adoption Platform

PetNest Adopt is a full-stack pet adoption platform built to connect lovely companions with their forever families. Users can browse available pets, filter them by specific criteria, submit adoption requests, and manage their listings through a seamless, interactive dashboard dashboard.

## 🚀 Live Demo

## [PetNest](https://petnest-client-rust.vercel.app/)

---

## ✨ Features

### 👤 Authentication & Security

- **Secure Sessions:** Handled via **Better-Auth** for robust client and server-side state tracking.
- **Route Protection:** JSON Web Tokens (JWT) verify incoming backend API request parameter validations securely.

### 🐶 Pet Directory & Advanced Browsing

- **Dynamic Search:** Case-insensitive search utilizing MongoDB `$regex` string parsing rules.
- **Multi-Species Filter:** Refine searches down across custom parameters dynamically using MongoDB `$in` operator matching.
- **Server-Side Rendering (SSR):** Powered by Next.js App Router `searchParams` state synchronization pipelines for ultra-fast, SEO-friendly performance.

### 📑 Adoption Application Engine

- **Double-Submit Protection:** Disables interactive interfaces while submissions process asynchronously.
- **Live Registry Monitoring:** Instantly detects and warns users if a specific pet has an application pending.
- **Interactive Requests Management Dashboard:** Application profiles can change statuses (Approved/Rejected/Pending) with interactive animations.

### 🎨 User Experience

- **Theming Infrastructure:** Native Dark and Light mode controls synced perfectly with **Next-Themes** and custom **HeroUI** compound toggles.
- **Responsive Visual Scaffolding:** Styled beautifully with **TailwindCSS** for complete desktop and mobile compatibility.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js (App Router)
- **Styling & UI Components:** TailwindCSS, HeroUI
- **Authentication Client:** Better-Auth (Client Utilities)
- **Icons:** React Icons

### Backend

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database Object Modeling:** MongoDB (Native Driver)
- **Token Authentication:** JWT Validation Middlewares

---
