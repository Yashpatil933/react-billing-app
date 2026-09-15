import React from 'react';
import { ShoppingBag, Trash2, Sparkles } from 'lucide-react';
import type { CartItem, AppliedOffer } from '../types';
import { BasketItem } from './BasketItem';
import { useAppDispatch } from '../app/store';
import { clearCart, loadSampleBasket } from '../features/cart/cartSlice';
import { INITIAL_PRODUCTS } from '../data/initialData';

interface BasketProps {
  items: CartItem[];
  appliedOffers: AppliedOffer[];
}

export const Basket: React.FC<BasketProps> = ({ items, appliedOffers }) => {
  const dispatch = useAppDispatch();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-md p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Your Basket
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
          </span>
        </div>

        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 font-medium transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Item List */}
      {items.length > 0 ? (
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
          {items.map((item) => (
            <BasketItem
              key={item.product.id}
              item={item}
              appliedOffers={appliedOffers}
            />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Your basket is empty.
          </p>
          <button
            onClick={() => dispatch(loadSampleBasket(INITIAL_PRODUCTS))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Sample Basket (Soup, Bread, Butter)</span>
          </button>
        </div>
      )}
    </div>
  );
};
