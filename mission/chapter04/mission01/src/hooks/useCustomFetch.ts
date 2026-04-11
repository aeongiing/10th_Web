import { useEffect, useState } from 'react';

function useCustomFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setError('데이터를 불러오는 데 실패했습니다.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fetchFn]);

  return { data, isLoading, error };
}

export default useCustomFetch;
