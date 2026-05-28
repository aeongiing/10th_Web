import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { calculateTotals } from './store/cartSlice';
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import Footer from './components/Footer';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
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
