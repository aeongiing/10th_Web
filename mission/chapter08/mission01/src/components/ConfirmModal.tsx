interface Props {
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

const ConfirmModal = ({ message, confirmLabel = '예', onConfirm, onCancel, isPending }: Props) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    onClick={onCancel}
  >
    <div
      className="w-full max-w-xs mx-4 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-5"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-white text-sm text-center leading-relaxed">{message}</p>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
        >
          아니오
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-sm font-medium transition-colors"
        >
          {isPending ? '처리 중...' : confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
