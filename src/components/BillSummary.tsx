import React from 'react';
import type { BillSummary as BillSummaryType } from '../types';
import { useAppSelector } from '../app/store';
import { formatCurrency } from '../utils/calculations';
import { Tag, ArrowRight, ShieldCheck } from 'lucide-react';

interface BillSummaryProps {
  summary: BillSummaryType;
  onCheckout: () => void;
}

export const BillSummaryCard: React.FC<BillSummaryProps> = ({ summary, onCheckout }) => {
  const currencySymbol = useAppSelector((state) => state.cart.selectedCurrency);
  const { subtotal, appliedOffers, totalSavings, finalTotal, totalItemsCount } = summary;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between gap-6 relative overflow-hidden">
      {/* Decorative accent glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">
            Bill Receipt & Summary
          </h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            Digital Innk System
          </span>
        </div>

        {/* Breakdown List */}
        <div className="mt-4 space-y-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Sub Total</span>
            <span className="font-semibold text-white">
              {formatCurrency(subtotal, currencySymbol)}
            </span>
          </div>

          {/* Special Offers Section */}
          {appliedOffers.length > 0 ? (
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Special Offers Applied</span>
              </div>

              {appliedOffers.map((offer) => (
                <div
                  key={offer.ruleId}
                  className="flex items-center justify-between text-xs bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40"
                >
                  <div>
                    <span className="font-medium text-emerald-200">
                      {offer.ruleTitle}
                    </span>
                    <p className="text-[10px] text-emerald-400/80">
                      Target: {offer.targetProductName}
                    </p>
                  </div>
                  <span className="font-bold text-emerald-400">
                    -{formatCurrency(offer.savingAmount, currencySymbol)}
                  </span>
                </div>
              ))}

              {/* Savings Subtotal */}
              <div className="flex items-center justify-between text-sm pt-1 text-emerald-400 font-bold">
                <span>Total Savings</span>
                <span>-{formatCurrency(totalSavings, currencySymbol)}</span>
              </div>
            </div>
          ) : (
            <div className="pt-2 text-xs text-slate-500 italic">
              No special offer savings applied yet. Add qualifying items to unlock discounts!
            </div>
          )}

          {/* Final Total Amount */}
          <div className="pt-4 border-t-2 border-dashed border-slate-700 flex items-baseline justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-400 block">
                Total Amount
              </span>
              <span className="text-[10px] text-slate-400">Includes all applicable savings</span>
            </div>
            <span className="text-3xl font-black tracking-tight text-white bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              {formatCurrency(finalTotal, currencySymbol)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onCheckout}
          disabled={totalItemsCount === 0}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:-translate-y-0.5"
        >
          <span>Complete Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Calculated via Redux Toolkit & Rules Engine</span>
        </div>
      </div>
    </div>
  );
};
