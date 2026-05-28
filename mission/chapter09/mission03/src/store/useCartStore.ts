import { create } from 'zustand';
import type { CartItem } from '../types/cart';
import mockCartItems from '../constants/cartItems';

interface CartStore {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isOpen: boolean;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
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

const useCartStore = create<CartStore>((set) => ({
  cartItems: mockCartItems,
  amount: initTotals.amount,
  total: initTotals.total,
  isOpen: false,

  increase: (id) =>
    set((state) => {
      const items = state.cartItems.map((i) =>
        i.id === id ? { ...i, amount: i.amount + 1 } : i,
      );
      return { cartItems: items, ...calcTotals(items) };
    }),

  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id);
      if (!item) return {};
      const items =
        item.amount <= 1
          ? state.cartItems.filter((i) => i.id !== id)
          : state.cartItems.map((i) =>
              i.id === id ? { ...i, amount: i.amount - 1 } : i,
            );
      return { cartItems: items, ...calcTotals(items) };
    }),

  removeItem: (id) =>
    set((state) => {
      const items = state.cartItems.filter((i) => i.id !== id);
      return { cartItems: items, ...calcTotals(items) };
    }),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0, isOpen: false }),

  calculateTotals: () =>
    set((state) => ({ ...calcTotals(state.cartItems) })),

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useCartStore;
