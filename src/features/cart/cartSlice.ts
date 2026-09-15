import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';

export interface CartState {
  items: CartItem[];
  selectedCurrency: string;
}

const initialState: CartState = {
  items: [],
  selectedCurrency: '£',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.product.id !== productId);
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
    },
    loadSampleBasket: (state, action: PayloadAction<Product[]>) => {
      // Loads sample basket matching assignment: 1 Soup, 3 Bread, 1 Butter
      const products = action.payload;
      const soup = products.find((p) => p.id === 'soup');
      const bread = products.find((p) => p.id === 'bread');
      const butter = products.find((p) => p.id === 'butter');

      state.items = [];
      if (soup) state.items.push({ product: soup, quantity: 1 });
      if (bread) state.items.push({ product: bread, quantity: 3 });
      if (butter) state.items.push({ product: butter, quantity: 1 });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCurrency,
  loadSampleBasket,
} = cartSlice.actions;

export default cartSlice.reducer;
