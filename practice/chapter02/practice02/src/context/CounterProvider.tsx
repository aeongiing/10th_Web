import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

// Context의 타입 정의
interface CounterContextType {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

// Context 생성 (초기값은 undefined로 설정)
export const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);

// Context Provider 생성
export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => setCount((prev) => prev + 1), []);
  const handleDecrement = useCallback(() => setCount((prev) => prev - 1), []);

  const value = useMemo(
    () => ({ count, handleIncrement, handleDecrement }),
    [count, handleIncrement, handleDecrement]
  );

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};

// CounterProvider.tsx 맨 아래 추가
export const useCount = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(
      'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};