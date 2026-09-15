import React from 'react';
import { X, Printer, CheckCircle, Tag, ShoppingBag } from 'lucide-react';
import type { CartItem, BillSummary } from '../types';
import { formatCurrency } from '../utils/calculations';
import { useAppSelector } from '../app/store';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  summary: BillSummary;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  summary,
}) => {
  const currencySymbol = useAppSelector((state) => state.cart.selectedCurrency);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Actions Header */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Official Invoice Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Content */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1 font-sans">
          {/* Company Branding Header */}
          <div className="flex items-center justify-between border-b pb-6 border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                  Digital Innk Ltd
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Grocery & Supermarket Billing System
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Website: https://digitalinnk.com/
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                PAID IN FULL
              </span>
              <p className="text-xs font-mono font-semibold text-slate-500 mt-2">
                INV-{Math.floor(100000 + Math.random() * 900000)}
              </p>
              <p className="text-[11px] text-slate-400">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2 font-bold">Item Description</th>
                  <th className="py-2 font-bold text-center">Qty</th>
                  <th className="py-2 font-bold text-right">Unit Price</th>
                  <th className="py-2 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <tr key={item.product.id}>
                    <td className="py-2.5 font-bold text-slate-800">
                      {item.product.name}
                    </td>
                    <td className="py-2.5 text-center font-semibold text-slate-600">
                      {item.quantity}
                    </td>
                    <td className="py-2.5 text-right text-slate-600">
                      {formatCurrency(item.product.price, currencySymbol)}
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-900">
                      {formatCurrency(item.product.price * item.quantity, currencySymbol)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Sub Total Before Special Offers</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(summary.subtotal, currencySymbol)}
              </span>
            </div>

            {summary.appliedOffers.map((offer) => (
              <div
                key={offer.ruleId}
                className="flex justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded"
              >
                <span className="flex items-center gap-1 font-medium">
                  <Tag className="w-3 h-3 text-emerald-600" />
                  {offer.ruleTitle} ({offer.targetProductName})
                </span>
                <span className="font-bold">
                  -{formatCurrency(offer.savingAmount, currencySymbol)}
                </span>
              </div>
            ))}

            {summary.appliedOffers.length > 0 && (
              <div className="flex justify-between text-xs font-bold text-emerald-700 pt-1">
                <span>Total Savings Applied</span>
                <span>-{formatCurrency(summary.totalSavings, currencySymbol)}</span>
              </div>
            )}

            <div className="border-t-2 border-slate-900 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-extrabold uppercase text-slate-900">
                Final Amount Paid
              </span>
              <span className="text-2xl font-black text-indigo-600">
                {formatCurrency(summary.finalTotal, currencySymbol)}
              </span>
            </div>
          </div>

          {/* Verification Footer */}
          <div className="pt-6 border-t border-slate-100 text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600">
              <CheckCircle className="w-4 h-4" /> Thank you for shopping with Digital Innk!
            </div>
            <p className="text-[10px] text-slate-400">
              This billing assignment demonstrates React, Redux Toolkit, TypeScript & Business Logic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
