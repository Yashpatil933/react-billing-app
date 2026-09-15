import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { calculateBill } from '../../utils/calculations';

const selectCartItems = (state: RootState) => state.cart.items;
const selectOfferRules = (state: RootState) => state.offers.rules;

export const selectBillSummary = createSelector(
  [selectCartItems, selectOfferRules],
  (cartItems, offerRules) => {
    return calculateBill(cartItems, offerRules);
  }
);
