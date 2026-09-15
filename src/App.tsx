import React, { useState } from 'react';
import { useAppSelector } from './app/store';
import { selectBillSummary } from './features/cart/cartSelectors';
import { INITIAL_PRODUCTS } from './data/initialData';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Basket } from './components/Basket';
import { BillSummaryCard } from './components/BillSummary';
import { OfferManagerModal } from './components/OfferManagerModal';
import { FirebaseModal } from './components/FirebaseModal';
import { InvoiceModal } from './components/InvoiceModal';
import { Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const offerRules = useAppSelector((state) => state.offers.rules);
  const summary = useAppSelector(selectBillSummary);

  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isFirebaseOpen, setIsFirebaseOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        onOpenOffers={() => setIsOffersOpen(true)}
        onOpenFirebase={() => setIsFirebaseOpen(true)}
        onOpenInvoice={() => setIsInvoiceOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner callout */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Digital Innk React + Redux Assessment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Grocery Store Shopping & Billing Calculator
            </h2>
            <p className="text-sm text-slate-300">
              Select grocery items, adjust quantities, and watch the rule-based Special Offer engine automatically compute subtotal, offer savings, and net payable amounts in real time.
            </p>
          </div>
        </div>

        {/* 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Selection Grid (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                Available Products
              </h2>
              <span className="text-xs text-slate-400">
                {INITIAL_PRODUCTS.length} standard items available
              </span>
            </div>

            <ProductList products={INITIAL_PRODUCTS} offerRules={offerRules} />
          </div>

          {/* Right Column: Basket & Bill Receipt Breakdown (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            {/* Basket Items List */}
            <Basket items={cartItems} appliedOffers={summary.appliedOffers} />

            {/* Bill Summary Receipt Card */}
            <BillSummaryCard
              summary={summary}
              onCheckout={() => setIsInvoiceOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Digital Innk Assessment - Built with React, Redux Toolkit, TypeScript & Tailwind CSS</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Coding Best Practices & Vitest Verified</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <OfferManagerModal
        isOpen={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
      />

      <FirebaseModal
        isOpen={isFirebaseOpen}
        onClose={() => setIsFirebaseOpen(false)}
        currentSummary={summary}
        cartItems={cartItems}
      />

      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        cartItems={cartItems}
        summary={summary}
      />
    </div>
  );
};
