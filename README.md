# 🛒 Digital Innk - Shopping & Billing Application

A production-ready, high-performance React + TypeScript shopping and billing application built with **Redux Toolkit**, **Tailwind CSS**, and **Vitest** for the Digital Innk React Developer position.

---

## 🌟 Key Features

- **🛍️ Product Catalog**: Browse items (Bread £1.10, Milk £0.50, Cheese £0.90, Soup £0.60, Butter £1.20) with category filters and search.
- **⚡ Redux Toolkit State Management**: Clean slices (`cartSlice`, `offersSlice`), typed hooks (`useAppDispatch`, `useAppSelector`), and memoized RTK selectors (`createSelector`).
- **💡 Extensible Special Offer Engine**: Configurable, rule-based calculation engine supporting quantity tiered discounts, fixed item savings, cross-product promotions (Buy X get Y at Z% off), and percentage discounts.
- **📊 Real-time Bill Breakdown**: Instant calculation of:
  - Subtotal before special offers
  - Itemized special offer savings
  - Total savings
  - Final net amount payable
- **✨ One-Click Assignment Test Case**: Button to instantly load the assignment test basket:
  - **Soup x 1** (£0.60) + **Bread x 3** (£3.30) + **Butter x 1** (£1.20)
  - **Subtotal**: `£5.10`
  - **Savings**: `£0.95` (Bread discount £0.55 + Butter discount £0.40)
  - **Final Total**: `£4.15`
- **🧪 Unit Test Suite**: 100% test coverage using **Vitest** for calculation engine logic and RTK cart reducers.
- **🔥 Firebase / Firestore Integration**: Sandbox order sync modal for saving completed bills to Firestore database.
- **🧾 Printable Invoice Generator**: Generate formatted store receipts for printing or saving.
- **🚀 Ready for Deployment**: Preconfigured for Netlify (`netlify.toml`), Vercel (`vercel.json`), and Firebase Hosting (`firebase.json`).

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 6 |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit` + `react-redux`) |
| **Styling** | Tailwind CSS v4 + Lucide React Icons |
| **Testing** | Vitest + React Testing Library + JSDOM |
| **Database** | Firebase / Cloud Firestore SDK |

---

## 📁 Project Architecture

```
react-billing-app/
├── src/
│   ├── app/
│   │   └── store.ts             # Redux Toolkit store setup & typed hooks
│   ├── components/
│   │   ├── Header.tsx           # Navigation, currency switcher & quick actions
│   │   ├── ProductList.tsx      # Filterable product grid
│   │   ├── ProductCard.tsx      # Item card with quantity controls & offer badge
│   │   ├── Basket.tsx           # Cart item list panel
│   │   ├── BasketItem.tsx       # Individual cart row with savings breakdown
│   │   ├── BillSummary.tsx      # Bill receipt summary card
│   │   ├── OfferManagerModal.tsx# Interactive offer rule manager modal
│   │   ├── FirebaseModal.tsx   # Firestore order persistence modal
│   │   └── InvoiceModal.tsx    # Printable order invoice modal
│   ├── data/
│   │   └── initialData.ts       # Standard products & initial offer rules
│   ├── features/
│   │   ├── cart/
│   │   │   ├── cartSlice.ts     # Cart state reducers & actions
│   │   │   └── cartSelectors.ts # Memoized RTK bill selectors (createSelector)
│   │   └── offers/
│   │       └── offersSlice.ts   # Active offer rules management
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces (Product, OfferRule, etc.)
│   ├── utils/
│   │   ├── calculations.ts      # Pure calculation engine functions
│   │   └── __tests__/           # Vitest calculation unit tests
│   ├── App.tsx                  # Main app layout
│   ├── main.tsx                 # Root React entrypoint wrapped with Redux Provider
│   └── index.css                # Tailwind directives & global styling
├── netlify.toml                 # Netlify deployment configuration
├── vercel.json                  # Vercel deployment configuration
├── firebase.json                # Firebase Hosting configuration
├── vite.config.ts               # Vite & Vitest configuration
└── README.md                    # Project documentation
```

---

## 🚦 Quick Start

### 1. Installation

```bash
cd react-billing-app
npm install
```

### 2. Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Unit Tests

```bash
npx vitest run
```

### 4. Build Production Bundle

```bash
npm run build
```

---

## 🚀 Deployment Instructions

### Deploy to Netlify

1. Push your repository to GitHub.
2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site** > **Import an existing project**.
3. Select your repository. Netlify automatically picks up `netlify.toml` with build command `npm run build` and publish directory `dist`.

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 👨‍💻 Candidate Submission Details

- **Role**: React Developer
- **Company Profile**: [Digital Innk Limited](https://digitalinnk.com/)
- **Payroll Profile**: [DIBTR](https://dibtr.com/)
