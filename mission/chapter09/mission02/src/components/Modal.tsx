import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="모달 닫기"
        onClick={() => dispatch(closeModal())}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-cart-title"
        className="relative bg-white rounded-2xl shadow-xl px-8 py-8 w-80 flex flex-col items-center gap-6"
      >
        <p
          id="clear-cart-title"
          className="text-base font-semibold text-center text-gray-800"
        >
          장바구니를 모두 비우시겠습니까?
        </p>
        <div className="flex gap-4 w-full">
          <button
            type="button"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            네
          </button>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
