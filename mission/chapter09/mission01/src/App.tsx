import Navbar from './components/Navbar';
import CartList from './components/CartList';
import Footer from './components/Footer';

const App = () => {
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
