import { memo, useRef } from 'react';

interface Props {
  count: number;
  onClick: () => void;
}

const CountButton = memo(function CountButton({ count, onClick }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">
        CountButton 렌더링 횟수: {renderCount.current}
      </p>
      <p className="text-base font-medium">Count : {count}</p>
      <button
        onClick={onClick}
        className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
      >
        카운트 증가
      </button>
    </div>
  );
});

export default CountButton;
