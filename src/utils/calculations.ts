import type { CartItem, OfferRule, AppliedOffer, BillSummary } from '../types';

/**
 * Rounds a monetary amount to 2 decimal places cleanly
 */
export const roundMoney = (val: number): number => {
  return Math.round((val + Number.EPSILON) * 100) / 100;
};

/**
 * Pure calculation function to compute cart subtotal, special offers applied, 
 * total savings, and net payable amount.
 */
export const calculateBill = (
  items: CartItem[],
  offerRules: OfferRule[]
): BillSummary => {
  // 1. Calculate subtotal before any offers
  const subtotal = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const roundedSubtotal = roundMoney(subtotal);

  // 2. Evaluate active offer rules against cart items
  const appliedOffers: AppliedOffer[] = [];

  const activeRules = offerRules.filter((rule) => rule.isActive);

  activeRules.forEach((rule) => {
    const targetItem = items.find((i) => i.product.id === rule.targetProductId);
    if (!targetItem || targetItem.quantity <= 0) return;

    let savingAmount = 0;

    switch (rule.type) {
      case 'QUANTITY_DISCOUNT': {
        const reqQty = rule.requiredQuantity || 1;
        if (targetItem.quantity >= reqQty) {
          const sets = Math.floor(targetItem.quantity / reqQty);
          savingAmount = sets * rule.discountValue;
        }
        break;
      }

      case 'FIXED_DISCOUNT': {
        const reqQty = rule.requiredQuantity || 1;
        if (targetItem.quantity >= reqQty) {
          savingAmount = targetItem.quantity * rule.discountValue;
        }
        break;
      }

      case 'PERCENTAGE_DISCOUNT': {
        const reqQty = rule.requiredQuantity || 1;
        if (targetItem.quantity >= reqQty) {
          const perItemDiscount = targetItem.product.price * (rule.discountValue / 100);
          savingAmount = targetItem.quantity * perItemDiscount;
        }
        break;
      }

      case 'BUY_X_GET_Y_DISCOUNT': {
        if (!rule.triggerProductId) break;
        const triggerItem = items.find((i) => i.product.id === rule.triggerProductId);
        if (!triggerItem || triggerItem.quantity <= 0) break;

        const reqQty = rule.requiredQuantity || 1;
        if (triggerItem.quantity >= reqQty) {
          const qualifyingSets = Math.floor(triggerItem.quantity / reqQty);
          const discountedItemsCount = Math.min(targetItem.quantity, qualifyingSets);
          const perItemDiscount = targetItem.product.price * (rule.discountValue / 100);
          savingAmount = discountedItemsCount * perItemDiscount;
        }
        break;
      }

      default:
        break;
    }

    if (savingAmount > 0) {
      const roundedSaving = roundMoney(savingAmount);
      appliedOffers.push({
        ruleId: rule.id,
        ruleTitle: rule.title,
        description: rule.description,
        savingAmount: roundedSaving,
        targetProductId: targetItem.product.id,
        targetProductName: targetItem.product.name,
      });
    }
  });

  // 3. Compute total savings and final total
  const totalSavings = roundMoney(
    appliedOffers.reduce((sum, offer) => sum + offer.savingAmount, 0)
  );

  const finalTotal = roundMoney(Math.max(0, roundedSubtotal - totalSavings));

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal: roundedSubtotal,
    appliedOffers,
    totalSavings,
    finalTotal,
    totalItemsCount,
  };
};

/**
 * Format currency amount for display
 */
export const formatCurrency = (amount: number, currencySymbol: string = '£'): string => {
  return `${currencySymbol}${amount.toFixed(2)}`;
};
