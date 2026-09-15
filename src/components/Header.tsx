import React from 'react';
import { ShoppingBag, Sparkles, Tag, Database, Receipt } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { setCurrency, loadSampleBasket } from '../features/cart/cartSlice';
import { INITIAL_PRODUCTS } from '../data/initialData';

interface HeaderProps {
  onOpenOffers: () => void;
  onOpenFirebase: () => void;
  onOpenInvoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenOffers,
  onOpenFirebase,
  onOpenInvoice,
}) => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useAppSelector((state) => state.cart.selectedCurrency);
  const cartItemsCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Digital Innk Grocery Mart
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Interactive Billing & Special Offer Rules Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Quick Load Assignment Test Case */}
          <button
            onClick={() => dispatch(loadSampleBasket(INITIAL_PRODUCTS))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition shadow-sm"
            title="Load sample items: Soup x1, Bread x3, Butter x1 (£4.15)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Load Assignment Test Case</span>
          </button>

          {/* Manage Offers */}
          <button
            onClick={onOpenOffers}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
          >
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Special Offers</span>
          </button>

          {/* Firebase Sync */}
          <button
            onClick={onOpenFirebase}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Firestore Sync</span>
          </button>

          {/* Invoice */}
          <button
            onClick={onOpenInvoice}
            disabled={cartItemsCount === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Receipt className="w-3.5 h-3.5 text-cyan-400" />
            <span>Invoice</span>
          </button>

          {/* Currency Switcher */}
          <select
            value={selectedCurrency}
            onChange={(e) => dispatch(setCurrency(e.target.value))}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="£">GBP (£)</option>
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="₹">INR (₹)</option>
          </select>
        </div>
      </div>
    </header>
  );
};
