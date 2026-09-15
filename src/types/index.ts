export type Currency = 'GBP' | 'USD' | 'EUR' | 'INR';

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  category: string;
  image: string;
  unit: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OfferType =
  | 'QUANTITY_DISCOUNT'     // e.g. Buy N items get £X discount
  | 'FIXED_DISCOUNT'        // e.g. Save £X on item
  | 'PERCENTAGE_DISCOUNT'   // e.g. X% off item price
  | 'BUY_X_GET_Y_DISCOUNT'; // e.g. Buy N of product X get Y at Z% discount

export interface OfferRule {
  id: string;
  title: string;
  description: string;
  type: OfferType;
  targetProductId: string;    // Product that receives the discount
  triggerProductId?: string;  // Product required to trigger offer (for BUY_X_GET_Y)
  requiredQuantity?: number;  // Threshold quantity needed to qualify
  discountValue: number;      // Amount in currency or percentage (e.g., 0.55 or 50)
  isActive: boolean;
}

export interface AppliedOffer {
  ruleId: string;
  ruleTitle: string;
  description: string;
  savingAmount: number;
  targetProductId: string;
  targetProductName: string;
}

export interface BillSummary {
  subtotal: number;
  appliedOffers: AppliedOffer[];
  totalSavings: number;
  finalTotal: number;
  totalItemsCount: number;
}

export interface OrderRecord {
  id: string;
  timestamp: string;
  items: CartItem[];
  billSummary: BillSummary;
  customerName?: string;
  status: 'COMPLETED' | 'PENDING';
}
