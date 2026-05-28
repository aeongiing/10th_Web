import useCartStore from '../store/useCartStore';
import CartItem from './CartItem';

const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  if (cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500 py-16 text-sm">
        장바구니가 비어있습니다.
      </p>
    );
  }

  return (
    <section>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </section>
  );
};

export default CartList;
