import useCartStore from '../store/useCartStore';
import type { CartItem as CartItemType } from '../types/cart';

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const { increase, decrease, removeItem } = useCartStore();

  return (
    <article className="flex items-center gap-4 py-4 border-b border-gray-200">
      <img
        src={item.img}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
        <p className="text-gray-500 text-xs mt-0.5 truncate">{item.singer}</p>
        <p className="text-gray-700 text-sm mt-1 font-medium">
          {Number(item.price).toLocaleString()}원
        </p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => increase(item.id)}
          className="w-7 h-7 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold text-lg leading-none"
          aria-label={`${item.title} 수량 증가`}
        >
          +
        </button>
        <span className="text-sm font-semibold w-7 text-center">{item.amount}</span>
        <button
          type="button"
          onClick={() => decrease(item.id)}
          className="w-7 h-7 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold text-lg leading-none"
          aria-label={`${item.title} 수량 감소`}
        >
          -
        </button>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="text-gray-400 hover:text-red-500 transition-colors ml-2"
        aria-label={`${item.title} 삭제`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </article>
  );
};

export default CartItem;
