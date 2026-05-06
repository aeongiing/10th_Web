import { useEffect, useRef, useState } from 'react';

const STALE_TIME = 5 * 60 * 1_000;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    setIsError(false);

    const fetchData = async (currentRetry = 0) => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(url);

      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);
          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            console.log(`[Cache Hit] 캐시 사용: ${url}`);
            return;
          }
          setData(cachedData.data);
          console.log(`[Cache Stale] 백그라운드 갱신: ${url}`);
        } catch {
          localStorage.removeItem(url);
        }
      }

      setIsPending(true);

      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }

        const newData: T = await response.json();
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };
        localStorage.setItem(url, JSON.stringify(newCacheEntry));
        setIsPending(false);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log(`[Fetch Cancelled] 요청 취소: ${url}`);
          return;
        }

        if (currentRetry < MAX_RETRIES) {
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(
            `[Retry ${currentRetry + 1}/${MAX_RETRIES}] ${retryDelay}ms 후 재시도...`
          );
          retryTimeoutRef.current = window.setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          setIsError(true);
          setIsPending(false);
          console.error(
            `[Fetch Failed] 최대 재시도(${MAX_RETRIES}회) 초과:`,
            error
          );
        }
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url]);

  return { data, isPending, isError };
};
