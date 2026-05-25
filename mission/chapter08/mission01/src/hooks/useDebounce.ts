import { useState, useEffect, useRef } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const prevSerializedRef = useRef<string>('');

  useEffect(() => {
    const currentSerialized = JSON.stringify(value);
    if (prevSerializedRef.current === currentSerialized) return;
    prevSerializedRef.current = currentSerialized;

    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
