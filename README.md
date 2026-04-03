# FinanceHub Dashboard

A complete, interactive, and fully responsive Finance Dashboard built for the modern web with premium glassmorphism aesthetics. 

![Theme](https://img.shields.io/badge/theme-dark_mode-violet.svg)
![React](https://img.shields.io/badge/react-19-blue.svg)
![Vite](https://img.shields.io/badge/vite-8-purple.svg)
![Framer Motion](https://img.shields.io/badge/framer--motion-12-emerald.svg)

## Overview

FinanceHub is an interactive frontend application designed to mimic a real-world financial tracking dashboard. It features role-based access control (RBAC), auto-calculated insights, interactive charts (Recharts), and modern glassmorphism styling using TailwindCSS v4. It features soothing, dynamic interactions seamlessly powered by Framer Motion.

## 🚀 Key Features

- **Role-Based Access Control (RBAC)**: Toggle between 'viewer' and 'admin' directly from the header to enable/disable transactional edits contextually.
- **Dynamic Charts**: Interactive Area Trends & Donut Breakdown charts using `Recharts`, accurately calculated off the global store in real-time.
- **Premium Animations**: Integrated with `Framer Motion`. Offers a soothing blur-fade transition on tab navigation and staggered scroll-reveal animations for all dashboard sections.
- **Responsive Navigation**: A clickable interactive logo that triggers a quick site reset (reloading the application), working alongside robust Sidebar/Mobile header navigation layouts.
- **Dark Glassmorphism Interface**: Uses deep, visually harmonizing tones and modern translucent glass effect techniques throughout all components.

## 🛠 Setup Instructions

This project was bootstrapped using Vite. Follow these steps to get a local copy up and running quickly:

1. **Clone or Download the Repository**
   Make sure you are in the root `finance-dashboard` directory.

2. **Install Dependencies**
   The project requires Node.js (v18+ recommended).
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the dashboard in your system browser.

4. **Build for Production** 
   ```bash
   npm run build
   # To preview the bundled build locally:
   npm run preview
   ```

## 🏗 Architectural Approach

The application follows a clean, compartmentalized structure optimized for maintainability, transitions, and scalability:

- **Component-Driven UI**: UIs are separated into logical atomic and composite generic components (`SummaryCard`, `InsightsWidget`, `TransactionModal`, `AnimatedSection`, etc.).
- **Global Theme via CSS Variables**: The theme is centrally controlled via `index.css` leveraging Tailwind CSS v4's CSS variable configurations for sleek dark-mode custom styling.
- **Graceful Animations**: Replaced static CSS entrance animations with generic React `AnimatePresence` patterns and Framer's viewport techniques for complex layout shifts to make UI changes feel natural and snappy. 
- **Utility Functions**: Domain-agnostic utilities (`formatCurrency`, `formatDate`, `cn` for class merging) are abstracted to a isolated `/utils` directory.

## 🧠 State Management: Zustand

For state management, we chose **Zustand** over React Context API or Redux. 

**Why?**
1. **Zero Boilerplate**: Setting up a store (`src/store/useStore.js`) takes just a few lines compared to Redux slice/reducer configurations.
2. **Performance**: Unlike React Context which triggers re-renders on all consuming components when value references change, Zustand allows atomic, localized re-renders based purely on the slice of state the component subscribes to. This is ideal for dashboards where graphs should not needlessly re-render if an unrelated value changes.
3. **Simplicity**: It handles global UI state (`role: "viewer" | "admin"`, `activeTab: "Dashboard" | "Transactions" | ...`) and CRUD application data (`transactions`) elegantly in one place.

## 📊 Mock Data Structure

The dashboard operates on static mock data dynamically mapped during initialization. The internal structure for each transaction record follows this generic schema:

```javascript
{
  id: "exp-24",             // Unique string identifier
  date: "2023-11-20T12:00:00.000Z", // ISO Date string
  amount: 45.99,            // Float value (USD)
  category: "Food",         // Categorical String (e.g. Food, Transport, Salary)
  type: "expense"           // Enum-like String: "income" | "expense"
}
```

This robustly drives the mathematical logic underlying the trend aggregator, category breakdown visuals, Summary Cards, and dynamic Insights generation.
