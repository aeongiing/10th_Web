import { useMemo, useState } from 'react';
import TextInput from './components/TextInput';
import { getPrimes } from './utils/getPrimes';

function App() {
  const [inputValue, setInputValue] = useState(1000000);
  const [limit, setLimit] = useState(1000000);
  const [, forceRender] = useState(0);

  const primes = useMemo(() => getPrimes(limit), [limit]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-start p-8 gap-4">
      <h1 className="text-lg font-medium">같이 배우는 리액트: useMemo편</h1>
      <div className="flex items-center gap-2">
        <TextInput
          label="숫자 입력 (소수 찾기):"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
        <button
          onClick={() => setLimit(inputValue)}
          className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer"
        >
          찾기
        </button>
      </div>
      <button
        onClick={() => forceRender((n) => n + 1)}
        className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer"
      >
        강제 리렌더링 (useMemo 캐싱 확인)
      </button>
      <p className="text-base font-medium">소수 리스트:</p>
      <p className="text-base leading-7 max-w-2xl">{primes.join(' ')}</p>
    </div>
  );
}

export default App;
