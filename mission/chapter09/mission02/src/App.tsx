import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { calculateTotals } from './features/cart/cartSlice';
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import Footer from './components/Footer';
import Modal from './components/Modal';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {isOpen && <Modal />}
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">장바구니</h2>
        <CartList />
        <Footer />
      </main>
    </div>
  );
};

export default App;
