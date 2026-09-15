import React from 'react';
import { Plus, Minus, Trash2, Tag } from 'lucide-react';
import type { CartItem, AppliedOffer } from '../types';
import { useAppDispatch, useAppSelector } from '../app/store';
import { updateQuantity, removeFromCart } from '../features/cart/cartSlice';
import { formatCurrency, roundMoney } from '../utils/calculations';

interface BasketItemProps {
  item: CartItem;
  appliedOffers: AppliedOffer[];
}

export const BasketItem: React.FC<BasketItemProps> = ({ item, appliedOffers }) => {
  const dispatch = useAppDispatch();
  const currencySymbol = useAppSelector((state) => state.cart.selectedCurrency);

  const { product, quantity } = item;
  const itemRawTotal = roundMoney(product.price * quantity);

  // Find any offer applied to this specific item
  const itemOffers = appliedOffers.filter(
    (offer) => offer.targetProductId === product.id
  );
  const itemSavingTotal = itemOffers.reduce(
    (sum, offer) => sum + offer.savingAmount,
    0
  );
  const itemFinalCost = roundMoney(Math.max(0, itemRawTotal - itemSavingTotal));

  return (
    <div className="group flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm transition hover:border-slate-300 dark:hover:border-slate-600">
      {/* Thumbnail */}
      <img
        src={product.image}
        alt={product.name}
        className="w-14 h-14 rounded-lg object-cover bg-slate-100 dark:bg-slate-900 flex-shrink-0"
      />

      {/* Item info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {product.name}
          </h4>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {formatCurrency(product.price, currencySymbol)} / {product.unit}
          </span>
        </div>

        {/* Price Breakdown */}
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            {quantity} × {formatCurrency(product.price, currencySymbol)} ={' '}
            <span className={itemSavingTotal > 0 ? 'line-through text-slate-400' : 'font-bold'}>
              {formatCurrency(itemRawTotal, currencySymbol)}
            </span>
          </span>

          {itemSavingTotal > 0 && (
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(itemFinalCost, currencySymbol)}
            </span>
          )}
        </div>

        {/* Applied Offer Badges */}
        {itemOffers.map((offer) => (
          <div
            key={offer.ruleId}
            className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60"
          >
            <Tag className="w-3 h-3" />
            <span>
              {offer.ruleTitle}: Save -{formatCurrency(offer.savingAmount, currencySymbol)}
            </span>
          </div>
        ))}
      </div>

      {/* Quantity & Delete Actions */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <button
          onClick={() => dispatch(removeFromCart(product.id))}
          className="text-slate-400 hover:text-rose-500 transition p-1"
          title="Remove item"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
          <button
            onClick={() =>
              dispatch(
                updateQuantity({
                  productId: product.id,
                  quantity: quantity - 1,
                })
              )
            }
            className="w-6 h-6 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold shadow-xs hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-7 text-center text-xs font-extrabold text-slate-800 dark:text-slate-100">
            {quantity}
          </span>
          <button
            onClick={() =>
              dispatch(
                updateQuantity({
                  productId: product.id,
                  quantity: quantity + 1,
                })
              )
            }
            className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs hover:bg-indigo-500"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
