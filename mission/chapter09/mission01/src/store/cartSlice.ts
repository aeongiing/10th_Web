import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/cart';
import mockCartItems from '../constants/cartItems';

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

const calcTotals = (items: CartItem[]) =>
  items.reduce(
    (acc, item) => {
      acc.amount += item.amount;
      acc.total += Number(item.price) * item.amount;
      return acc;
    },
    { amount: 0, total: 0 },
  );

const initTotals = calcTotals(mockCartItems);

const initialState: CartState = {
  cartItems: mockCartItems,
  amount: initTotals.amount,
  total: initTotals.total,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase(state, action: PayloadAction<string>) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease(state, action: PayloadAction<string>) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.amount <= 1) {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      } else {
        item.amount -= 1;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotals(state) {
      const { amount, total } = calcTotals(state.cartItems);
      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
