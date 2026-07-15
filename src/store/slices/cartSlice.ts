import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  color?: string;
  size?: string;
  others?: Record<string, string>;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isHydrated: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isHydrated: false,
};

function recalculate(items: CartItem[]) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = Math.round(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
  ) / 100;
  return { totalQuantity, totalAmount };
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Hydrate the cart from localStorage or DB on app boot
    hydrateCart(state, action: PayloadAction<Partial<CartState> & { isHydrated?: boolean }>) {
      state.items = action.payload.items ?? state.items;
      const { totalQuantity, totalAmount } = recalculate(state.items);
      state.totalQuantity = action.payload.totalQuantity ?? totalQuantity;
      state.totalAmount = action.payload.totalAmount ?? totalAmount;
      state.isHydrated = action.payload.isHydrated ?? true;
    },

    // Mark cart as hydrated (when localStorage has nothing)
    setHydrated(state) {
      state.isHydrated = true;
    },

    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const getKey = (i: CartItem) =>
        `${i.productId}-${i.color || ''}-${i.size || ''}-${JSON.stringify(i.others || {})}`;
      const key = getKey(item);
      const existing = state.items.find((i) => getKey(i) === key);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      const { totalQuantity, totalAmount } = recalculate(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },

    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; color?: string; size?: string; others?: Record<string, string> }>
    ) {
      const { productId, color, size, others } = action.payload;
      const key = `${productId}-${color || ''}-${size || ''}-${JSON.stringify(others || {})}`;
      state.items = state.items.filter(
        (i) => `${i.productId}-${i.color || ''}-${i.size || ''}-${JSON.stringify(i.others || {})}` !== key
      );

      const { totalQuantity, totalAmount } = recalculate(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; color?: string; size?: string; others?: Record<string, string>; quantity: number }>
    ) {
      const { productId, color, size, others, quantity } = action.payload;
      const key = `${productId}-${color || ''}-${size || ''}-${JSON.stringify(others || {})}`;
      const item = state.items.find(
        (i) => `${i.productId}-${i.color || ''}-${i.size || ''}-${JSON.stringify(i.others || {})}` === key
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }

      const { totalQuantity, totalAmount } = recalculate(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  hydrateCart,
  setHydrated,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
