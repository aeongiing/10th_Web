import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { clearCart } from '../store/cartSlice';

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { amount, total } = useSelector((state: RootState) => state.cart);

  return (
    <footer className="border-t border-gray-200 pt-6 mt-2">
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600 text-sm">총 수량</span>
        <span className="font-semibold text-sm">{amount}개</span>
      </div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600 text-sm">총 금액</span>
        <span className="font-bold text-lg text-red-500">
          {total.toLocaleString()}원
        </span>
      </div>
      <button
        onClick={() => dispatch(clearCart())}
        className="w-full py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
      >
        전체 삭제
      </button>
    </footer>
  );
};

export default Footer;
