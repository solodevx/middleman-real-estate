![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://vercelbadge.vercel.app/api/solodevx/middleman-real-estate)
![Status](https://img.shields.io/badge/Status-In_Development-yellow)
![License](https://img.shields.io/badge/License-Proprietary-red)

# Middleman

A modern real estate showcase website built with **React**, **Vite**, and **Tailwind CSS**.  
This project is designed to present property listings, company information, and contact details in a clean, responsive interface.

> ⚠️ This is a showcase platform, not a marketplace. No buying or selling is handled directly.

---

## 🚀 Tech Stack

- **React** – UI library
- **Vite** – Fast build tool and dev server
- **Tailwind CSS** – Utility-first styling framework
- **JavaScript (ES6+)**

---

## 📁 Project Structure

```txt
src/
├─ assets/        # Images, icons, fonts
├─ components/    # Reusable UI components
├─ pages/         # Application pages (Home, About, Contact, etc.)
├─ main.jsx       # Application entry point
├─ App.jsx        # Root component
└─ index.css      # Tailwind CSS imports
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Installation

### Installation
```bash
npm install
```
### Run the development server
```bash
npm run dev
```
The app will be available at:
```arduino
http://localhost:5173
```

---

## 🎨 Styling

Tailwind CSS is configured using the Vite plugin.
All Tailwind directives are imported in:

```txt
src/index.css
```
Utility classes are applied directly in React components.

---

### 📦 Production Build

- To create an optimized production build:
```bash
npm run build
```
- Preview the build locally:
```bash
npm run preview
```

---

### 📌 Project Status
🟡 In active development
Features are being added incrementally.

---

## 📄 License

This project is private and proprietary.

---


## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.