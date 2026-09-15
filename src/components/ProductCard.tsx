import React from 'react';
import { Plus, Minus, Tag } from 'lucide-react';
import type { Product, OfferRule } from '../types';
import { useAppDispatch, useAppSelector } from '../app/store';
import { addToCart, updateQuantity } from '../features/cart/cartSlice';
import { formatCurrency } from '../utils/calculations';

interface ProductCardProps {
  product: Product;
  offerRules: OfferRule[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, offerRules }) => {
  const dispatch = useAppDispatch();
  const currencySymbol = useAppSelector((state) => state.cart.selectedCurrency);
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.product.id === product.id)
  );

  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Check if any active offer applies to this product
  const activeOffer = offerRules.find(
    (rule) => rule.isActive && (rule.targetProductId === product.id || rule.triggerProductId === product.id)
  );

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Active Offer Badge */}
      {activeOffer && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur">
          <Tag className="w-3 h-3" />
          <span>Offer Available</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-2 right-2 text-xs font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-slate-200 backdrop-blur">
          {product.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {product.name}
            </h3>
            <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
              {formatCurrency(product.price, currencySymbol)}
            </span>
          </div>

          {product.description && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Offer Banner if active */}
          {activeOffer && (
            <div className="mt-2.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
              🎁 {activeOffer.description}
            </div>
          )}
        </div>

        {/* Quantity Controls / Add Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50">
          {quantityInCart > 0 ? (
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      productId: product.id,
                      quantity: quantityInCart - 1,
                    })
                  )
                }
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center font-bold shadow-sm transition"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="text-sm font-bold text-slate-900 dark:text-white px-2">
                {quantityInCart} in basket
              </span>

              <button
                onClick={() => dispatch(addToCart(product))}
                className="w-8 h-8 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 flex items-center justify-center font-bold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addToCart(product))}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Basket</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
