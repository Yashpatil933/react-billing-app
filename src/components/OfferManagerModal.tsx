import React, { useState } from 'react';
import { X, Tag, ToggleLeft, ToggleRight, Plus, RotateCcw } from 'lucide-react';
import type { OfferRule, OfferType } from '../types';
import { useAppDispatch, useAppSelector } from '../app/store';
import { toggleOfferRule, addOfferRule, resetOffersToDefault } from '../features/offers/offersSlice';
import { INITIAL_PRODUCTS } from '../data/initialData';

interface OfferManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferManagerModal: React.FC<OfferManagerModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const rules = useAppSelector((state) => state.offers.rules);

  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<OfferType>('QUANTITY_DISCOUNT');
  const [targetProductId, setTargetProductId] = useState('bread');
  const [requiredQuantity, setRequiredQuantity] = useState(1);
  const [discountValue, setDiscountValue] = useState(0.5);

  if (!isOpen) return null;

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule: OfferRule = {
      id: `offer-custom-${Date.now()}`,
      title,
      description,
      type,
      targetProductId,
      requiredQuantity: Number(requiredQuantity),
      discountValue: Number(discountValue),
      isActive: true,
    };
    dispatch(addOfferRule(newRule));
    setShowAddForm(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Special Offer Rules Engine
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toggle active offer rules or inject custom promotion logic on the fly
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Actions */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              Active Promotion Rules
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(resetOffersToDefault())}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Rule
              </button>
            </div>
          </div>

          {/* Add Rule Form */}
          {showAddForm && (
            <form onSubmit={handleCreateRule} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Create Custom Offer Rule
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Offer Title (e.g. Cheese Weekend Special)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
                <input
                  type="text"
                  placeholder="Description (e.g. Save £0.30 on Cheese)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
                <select
                  value={targetProductId}
                  onChange={(e) => setTargetProductId(e.target.value)}
                  className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                >
                  {INITIAL_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      Target: {p.name} (£{p.price.toFixed(2)})
                    </option>
                  ))}
                </select>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as OfferType)}
                  className="px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                >
                  <option value="QUANTITY_DISCOUNT">QUANTITY_DISCOUNT</option>
                  <option value="FIXED_DISCOUNT">FIXED_DISCOUNT</option>
                  <option value="PERCENTAGE_DISCOUNT">PERCENTAGE_DISCOUNT</option>
                </select>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Req Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Discount Amount / %</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.05"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
              >
                Save Custom Rule
              </button>
            </form>
          )}

          {/* Offer Rules List */}
          <div className="space-y-3">
            {rules.map((rule) => {
              const targetProduct = INITIAL_PRODUCTS.find(
                (p) => p.id === rule.targetProductId
              );
              return (
                <div
                  key={rule.id}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                    rule.isActive
                      ? 'bg-emerald-500/5 border-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {rule.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {rule.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {rule.description}
                    </p>
                    <p className="text-[11px] text-indigo-500 font-medium">
                      Applies to: {targetProduct?.name || rule.targetProductId} (Req Qty: {rule.requiredQuantity || 1})
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(toggleOfferRule(rule.id))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      rule.isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {rule.isActive ? (
                      <>
                        <ToggleRight className="w-4 h-4" /> Active
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-4 h-4" /> Disabled
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
