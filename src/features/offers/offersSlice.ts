import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { OfferRule } from '../../types';
import { INITIAL_OFFERS } from '../../data/initialData';

export interface OffersState {
  rules: OfferRule[];
}

const initialState: OffersState = {
  rules: INITIAL_OFFERS,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    toggleOfferRule: (state, action: PayloadAction<string>) => {
      const ruleId = action.payload;
      const rule = state.rules.find((r) => r.id === ruleId);
      if (rule) {
        rule.isActive = !rule.isActive;
      }
    },
    addOfferRule: (state, action: PayloadAction<OfferRule>) => {
      state.rules.push(action.payload);
    },
    resetOffersToDefault: (state) => {
      state.rules = INITIAL_OFFERS;
    },
  },
});

export const { toggleOfferRule, addOfferRule, resetOffersToDefault } = offersSlice.actions;

export default offersSlice.reducer;
