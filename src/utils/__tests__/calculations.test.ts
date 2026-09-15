import { describe, it, expect } from 'vitest';
import { calculateBill } from '../calculations';
import { INITIAL_PRODUCTS, INITIAL_OFFERS } from '../../data/initialData';
import type { CartItem, Product } from '../../types';

describe('Special Offer & Bill Calculation Engine', () => {
  const soup = INITIAL_PRODUCTS.find((p) => p.id === 'soup') as Product;
  const bread = INITIAL_PRODUCTS.find((p) => p.id === 'bread') as Product;
  const butter = INITIAL_PRODUCTS.find((p) => p.id === 'butter') as Product;
  const milk = INITIAL_PRODUCTS.find((p) => p.id === 'milk') as Product;

  it('should return zeros for an empty basket', () => {
    const summary = calculateBill([], INITIAL_OFFERS);
    expect(summary.subtotal).toBe(0);
    expect(summary.totalSavings).toBe(0);
    expect(summary.finalTotal).toBe(0);
    expect(summary.appliedOffers).toHaveLength(0);
  });

  it('should calculate correct subtotal when no offers qualify', () => {
    const items: CartItem[] = [
      { product: milk, quantity: 2 }, // 2 x 0.50 = 1.00
    ];
    const summary = calculateBill(items, INITIAL_OFFERS);
    expect(summary.subtotal).toBe(1.00);
    expect(summary.totalSavings).toBe(0);
    expect(summary.finalTotal).toBe(1.00);
  });

  it('MATCHES EXACT ASSIGNMENT SPEC: Soup x1, Bread x3, Butter x1 => Subtotal £5.10, Savings £0.95, Final £4.15', () => {
    const items: CartItem[] = [
      { product: soup, quantity: 1 },   // 0.60
      { product: bread, quantity: 3 },  // 3.30
      { product: butter, quantity: 1 }, // 1.20
    ];

    const summary = calculateBill(items, INITIAL_OFFERS);

    expect(summary.subtotal).toBe(5.10);
    expect(summary.appliedOffers).toHaveLength(2);

    const breadOffer = summary.appliedOffers.find((o) => o.targetProductId === 'bread');
    const butterOffer = summary.appliedOffers.find((o) => o.targetProductId === 'butter');

    expect(breadOffer).toBeDefined();
    expect(breadOffer?.savingAmount).toBe(0.55);

    expect(butterOffer).toBeDefined();
    expect(butterOffer?.savingAmount).toBe(0.40);

    expect(summary.totalSavings).toBe(0.95);
    expect(summary.finalTotal).toBe(4.15);
  });

  it('should apply multiple discount sets when quantity is doubled (e.g., Bread x6 gives £1.10 discount)', () => {
    const items: CartItem[] = [
      { product: bread, quantity: 6 }, // 6 x 1.10 = 6.60
    ];

    const summary = calculateBill(items, INITIAL_OFFERS);

    expect(summary.subtotal).toBe(6.60);
    expect(summary.totalSavings).toBe(1.10); // 2 sets of 3 breads = 2 * 0.55
    expect(summary.finalTotal).toBe(5.50);
  });
});
