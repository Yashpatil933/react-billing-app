import { describe, it, expect } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../cartSlice';
import { INITIAL_PRODUCTS } from '../../../data/initialData';

describe('cartSlice reducers', () => {
  const product = INITIAL_PRODUCTS[0]; // Bread

  it('should handle initial state', () => {
    const state = cartReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
    expect(state.selectedCurrency).toBe('£');
  });

  it('should handle addToCart', () => {
    let state = cartReducer(undefined, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe(product.id);
    expect(state.items[0].quantity).toBe(1);

    // Adding same product again increments quantity
    state = cartReducer(state, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should handle updateQuantity', () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(
      state,
      updateQuantity({ productId: product.id, quantity: 5 })
    );
    expect(state.items[0].quantity).toBe(5);

    // Updating to 0 removes item
    state = cartReducer(
      state,
      updateQuantity({ productId: product.id, quantity: 0 })
    );
    expect(state.items).toHaveLength(0);
  });

  it('should handle removeFromCart', () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(state, removeFromCart(product.id));
    expect(state.items).toHaveLength(0);
  });

  it('should handle clearCart', () => {
    let state = cartReducer(undefined, addToCart(product));
    state = cartReducer(state, clearCart());
    expect(state.items).toEqual([]);
  });
});
