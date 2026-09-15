import React, { useState } from 'react';
import { X, Database, CheckCircle, Cloud, Clock, RefreshCw } from 'lucide-react';
import type { BillSummary, CartItem, OrderRecord } from '../types';
import { formatCurrency } from '../utils/calculations';
import { useAppSelector } from '../app/store';

interface FirebaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSummary: BillSummary;
  cartItems: CartItem[];
}

export const FirebaseModal: React.FC<FirebaseModalProps> = ({
  isOpen,
  onClose,
  currentSummary,
  cartItems,
}) => {
  const currencySymbol = useAppSelector((state) => state.cart.selectedCurrency);
  const [customerName, setCustomerName] = useState('Jitendra (Digital Innk)');
  const [ordersHistory, setOrdersHistory] = useState<OrderRecord[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveOrderToFirestore = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate Firestore db save
    setTimeout(() => {
      const newRecord: OrderRecord = {
        id: `ORD-FS-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toLocaleString(),
        items: [...cartItems],
        billSummary: { ...currentSummary },
        customerName,
        status: 'COMPLETED',
      };

      setOrdersHistory([newRecord, ...ordersHistory]);
      setIsSaving(false);
      setSaveSuccess(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Firebase Firestore Integration
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sync current cart bill & order records to Firestore database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Firestore Connection Badge */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-amber-500 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  Cloud Firestore Sandbox Mode Active
                </h4>
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  Collection: <code className="font-mono">/orders</code> | Project: <code className="font-mono">digital-innk-billing</code>
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
              Connected
            </span>
          </div>

          {/* Current Order Quick Save */}
          <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              Sync Active Order
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Customer Name / Reference"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full sm:w-auto flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
              />
              <button
                onClick={handleSaveOrderToFirestore}
                disabled={cartItems.length === 0 || isSaving}
                className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing...
                  </>
                ) : (
                  <>
                    <Database className="w-3.5 h-3.5" /> Save Order to Firestore
                  </>
                )}
              </button>
            </div>

            {saveSuccess && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                <CheckCircle className="w-4 h-4" /> Order successfully saved to Firestore!
              </div>
            )}
          </div>

          {/* Saved Orders History */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              Firestore Collections History ({ordersHistory.length})
            </h3>
            {ordersHistory.length > 0 ? (
              <div className="space-y-2">
                {ordersHistory.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{rec.id}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {rec.customerName}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {rec.timestamp}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-emerald-500 text-sm">
                        {formatCurrency(rec.billSummary.finalTotal, currencySymbol)}
                      </span>
                      <p className="text-[10px] text-slate-400">
                        Savings: -{formatCurrency(rec.billSummary.totalSavings, currencySymbol)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400 italic">
                No orders saved yet in current session.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
