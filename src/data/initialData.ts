import type { Product, OfferRule } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bread',
    name: 'Bread',
    price: 1.10,
    currency: 'GBP',
    category: 'Bakery',
    unit: 'loaf',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    description: 'Freshly baked artisanal wholemeal loaf',
  },
  {
    id: 'milk',
    name: 'Milk',
    price: 0.50,
    currency: 'GBP',
    category: 'Dairy',
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400',
    description: 'Fresh whole organic milk (1 Litre)',
  },
  {
    id: 'cheese',
    name: 'Cheese',
    price: 0.90,
    currency: 'GBP',
    category: 'Dairy',
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=400',
    description: 'Rich mature cheddar cheese pack (250g)',
  },
  {
    id: 'soup',
    name: 'Soup',
    price: 0.60,
    currency: 'GBP',
    category: 'Pantry',
    unit: 'can',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
    description: 'Hearty tomato & basil vegetable soup',
  },
  {
    id: 'butter',
    name: 'Butter',
    price: 1.20,
    currency: 'GBP',
    category: 'Dairy',
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400',
    description: 'Creamy salted farm butter (250g)',
  },
];

export const INITIAL_OFFERS: OfferRule[] = [
  {
    id: 'offer-cheese-bogo',
    title: 'Cheese Buy 1 Get 1 Free',
    description: 'When you buy a Cheese, you get a second Cheese free!',
    type: 'BUY_X_GET_Y_DISCOUNT',
    triggerProductId: 'cheese',
    targetProductId: 'cheese',
    requiredQuantity: 2,
    discountValue: 100, // 100% off second cheese
    isActive: true,
  },
  {
    id: 'offer-soup-bread',
    title: 'Soup & Bread Offer',
    description: 'When you buy a Soup, you get a half price Bread!',
    type: 'BUY_X_GET_Y_DISCOUNT',
    triggerProductId: 'soup',
    targetProductId: 'bread',
    requiredQuantity: 1,
    discountValue: 50, // 50% off bread
    isActive: true,
  },
  {
    id: 'offer-butter-third-off',
    title: 'Butter Special Savings',
    description: 'Get a third off Butter!',
    type: 'PERCENTAGE_DISCOUNT',
    targetProductId: 'butter',
    requiredQuantity: 1,
    discountValue: 33.333333333333336, // 1/3 off Butter
    isActive: true,
  },
];
