import useCartStore from './store/useCartStore';
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import Footer from './components/Footer';
import Modal from './components/Modal';

const App = () => {
  const isOpen = useCartStore((state) => state.isOpen);

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
