# FinanceIQ — Finance Dashboard UI

A modern, interactive finance dashboard built for the Zorvyn Frontend Developer Intern assignment. Clean design with dark/light mode, role-based UI, rich visualizations, full transaction management, and AI-powered insights.

---
## 🚀 Quick Start
```bash
# 1. Repository clone karo
git clone https://github.com/Krishkumar2005/Finance-Dashboard.git

cd finance-dashboard

# 2. Dependencies install karo
npm install

# 3. Dev server run karo
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** If you're on Next.js 15+, rename `next.config.ts` to `next.config.js` and use `module.exports = {}` syntax.

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** If you're on Next.js 15+, rename `next.config.ts` to `next.config.js` and use `module.exports = {}` syntax.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css              # Design tokens (CSS vars), base styles, animations
│   ├── layout.tsx               # Root layout with font imports + ThemeProvider
│   └── page.tsx                 # Main page — tab-based routing
│
├── components/
│   ├── Providers.tsx            # next-themes ThemeProvider wrapper
│   ├── Sidebar.tsx              # Left navigation + role switcher (theme-aware)
│   ├── Topbar.tsx               # Top header, theme toggle, CSV export button
│   ├── DashboardView.tsx        # Dashboard tab — composes all widgets
│   ├── SummaryCards.tsx         # 4 KPI cards: Balance, Income, Expenses, Savings Rate
│   ├── BalanceTrendChart.tsx    # 6-month area chart (Recharts)
│   ├── SpendingBreakdown.tsx    # Donut chart + category legend (Recharts)
│   ├── RecentTransactions.tsx   # Latest 7 transactions widget
│   ├── TransactionsList.tsx     # Full transaction table with filters, sort, CRUD
│   ├── TransactionModal.tsx     # Add / Edit transaction modal with validation
│   ├── AIInsightCards.tsx       # AI-powered flip cards with financial insights
│   └── InsightsView.tsx         # Insight cards + monthly & category bar charts
│
├── store/
│   └── useAppStore.ts           # Zustand store — all app state + localStorage persist
│
└── lib/
    ├── mockData.ts              # 35 mock transactions, trend data, category colors
    ├── utils.ts                 # formatCurrency, formatDate, computeSummary, etc.
    └── insightEngine.ts         # AI insight generation logic from transaction data
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16+ (App Router) | React framework with SSR/SSG |
| **TypeScript** | 5+ | Type safety throughout |
| **Tailwind CSS** | 3+ | Utility-first styling |
| **Zustand** | 5+ | Lightweight global state management |
| **zustand/middleware (persist)** | built-in | localStorage persistence for state |
| **next-themes** | 0.4+ | Dark/light mode with class strategy |
| **Recharts** | 2+ | Composable chart library (Area, Bar, Pie) |
| **Lucide React** | 0.469+ | Icon library (React 19 compatible) |
| **autoprefixer** | 10+ | CSS vendor prefix automation |
| **Google Fonts** | — | Syne (display) + DM Sans (body) |

---

## ✨ Features

### 1. Dashboard Overview
- **4 KPI Summary Cards**: Total Balance, Income, Expenses, Savings Rate — each with a MoM % change badge
- **Balance Trend Chart**: 6-month area chart showing income vs expenses over time
- **Spending Breakdown**: Donut chart with per-category percentage bars
- **Recent Transactions**: Quick-view of last 7 transactions with category icons

### 2. Transactions Section
- Full table with 35 pre-loaded mock transactions
- **Search**: Real-time filter by description, category, or merchant
- **Filter Panel**: By type (income/expense), category dropdown, date range
- **Sort**: Click any column header — date, amount, category, type (asc/desc)
- **Admin actions**: Add, edit, delete transactions (hidden in Viewer mode)
- **Validation**: Required fields, positive amount check, clear error messages

### 3. Role-Based UI
- **Admin**: Full access — can add, edit, delete transactions + Export CSV button
- **Viewer**: Read-only — all action buttons hidden; data is still fully explorable
- Switch roles via the toggle in the sidebar — state persisted in localStorage

### 4. Insights Section
- **Top Spending Category** with total amount
- **Savings Rate** with qualitative label (Great / Okay / Needs improvement)
- **Month-over-Month Expense Change** with directional color
- **Average Monthly Spend** across all recorded months
- **Monthly Comparison Bar Chart**: Income, Expenses, Savings side-by-side
- **Category Horizontal Bar Chart**: All-time spend ranked by category

### 5. 🤖 AI Insight Cards (Unique Feature)
- **6 smart insights** auto-generated from real transaction data
- **Flip card animation** — front shows metric, back shows detailed AI analysis
- Insight types: Warning, Success, Tip, Trend — each color coded
- Insights cover: savings rate, MoM expense change, top category dominance, income consistency, diversification tips, weekend spending patterns
- **Skeleton loading** animation while insights generate
- **Refresh button** to recalculate insights on demand
- Fully dark/light mode aware

### 6. State Management (Zustand)
- Single store (`useAppStore`) managing: transactions, filters, sort, role, active tab
- `persist` middleware syncs `transactions` and `role` to `localStorage`
- Filters and sort are session-only (reset on page reload) for clean UX

### 7. Theme Toggle — Dark / Light Mode
- Sun/Moon button in the top-right header
- Powered by `next-themes` with `class` strategy on `<html>`
- **Sidebar fully theme-aware**: light mode = white sidebar with dark text, dark mode = pure dark sidebar with white text
- Sidebar has a subtle border + box shadow separator that adapts per theme
- Smooth `transition-colors duration-300` on all elements
- CSS custom properties drive all color tokens

### 8. Optional Enhancements Included
- ✅ **Dark mode** — full implementation including sidebar
- ✅ **Data persistence** — localStorage via Zustand persist
- ✅ **Export CSV** — admin only, downloads all transactions
- ✅ **Animations** — fadeInUp on card mount, flip cards, hover states
- ✅ **Advanced filtering** — search + type + category + date range
- ✅ **AI Insight Engine** — real insights from transaction data

---

## 🎨 Design Decisions

**Typography**: `Syne` (bold display font for headings/labels) paired with `DM Sans` (clean readable body text). Intentionally avoids generic system fonts like Inter or Roboto.

**Color system**: CSS custom properties for every color token — swapping dark/light requires zero JS for most elements. Sidebar uses `useTheme` hook directly for reliable `fixed` position theming. Accent colors are semantic: green = income/positive, red = expense/negative, blue = neutral/interactive.

**Sidebar theming**: Since the sidebar is `position: fixed`, CSS variables alone are unreliable for theme switching. The sidebar uses `useTheme` from `next-themes` and `isDark` boolean to apply colors directly — ensuring 100% reliable theme toggling.

**Layout**: Fixed sidebar (220px) + scrollable main content. Responsive grid collapses from 4-col to 2-col on smaller screens.

**AI Insight Cards**: Insights are not hardcoded — they are dynamically computed from actual transaction data using `insightEngine.ts`. The engine analyzes savings rate, MoM changes, category concentration, income diversity, and spending patterns to surface relevant, data-driven observations.

---

## 📋 Assumptions Made

1. No backend — all data is mock/static, persisted in localStorage
2. "Monthly trend" chart uses a separate curated dataset to show a clean 6-month view
3. MoM % changes on summary cards are illustrative values (would come from API in production)
4. Role switching is UI-only — no authentication or protected routes
5. Currency is USD throughout
6. AI insights are rule-based (not LLM) — computed from transaction data patterns

---

## 🔮 Production Improvements (if this were real)

- Replace Zustand with React Query + REST/GraphQL API
- Add authentication (NextAuth.js) for real RBAC
- Paginate the transactions table server-side
- Add unit tests (Jest + React Testing Library)
- Add E2E tests (Playwright)
- Internationalize currency and dates
- Replace rule-based insight engine with actual LLM API (OpenAI/Anthropic)
- Add budget goals and alerts system

---

## 📸 Pages

| Tab | Description |
|-----|-------------|
| **Dashboard** | Overview with KPI cards, trend chart, spending breakdown, recent transactions |
| **Transactions** | Full table with search, filters, sort, add/edit/delete (admin), CSV export |
| **Insights** | AI flip cards + monthly comparison chart + category breakdown chart |