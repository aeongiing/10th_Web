import { create } from 'zustand';
import type { CartItem } from '../types/cart';
import mockCartItems from '../constants/cartItems';

interface CartStore {
  cartItems: CartItem[];
  isOpen: boolean;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  cartItems: mockCartItems,
  isOpen: false,

  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((i) =>
        i.id === id ? { ...i, amount: i.amount + 1 } : i,
      ),
    })),

  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id);
      if (!item) return {};
      return {
        cartItems:
          item.amount <= 1
            ? state.cartItems.filter((i) => i.id !== id)
            : state.cartItems.map((i) =>
                i.id === id ? { ...i, amount: i.amount - 1 } : i,
              ),
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export const useCartTotals = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const amount = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.amount, 0);
  return { amount, total };
};

export default useCartStore;
