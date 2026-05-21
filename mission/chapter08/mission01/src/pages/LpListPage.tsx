import { useState, useEffect, useRef } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLps, createLp } from '../apis/lpApi';
import { useAuth } from '../contexts/authContextCore';
import LpCard from '../components/LpCard';
import LpCardSkeleton from '../components/LpCardSkeleton';
import LpFormModal from '../components/LpFormModal';
import useDebounce from '../hooks/useDebounce';

const LpListPage = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();

  const debouncedQuery = useDebounce(query, 300);
  const trimmedQuery = debouncedQuery.trim();

  useEffect(() => {
    console.log('[debounce] API 요청 실행 - query:', trimmedQuery || '(전체 목록)');
  }, [trimmedQuery]);

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['lps', order, trimmedQuery],
    queryFn: ({ pageParam }) =>
      getLps(order, pageParam as number | undefined, trimmedQuery || undefined),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    enabled: !query || !!trimmedQuery,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const createMutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      setModalOpen(false);
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg ?? 'LP 생성에 실패했습니다.');
    },
  });

  const lps = data?.pages.flatMap((p) => p.data) ?? [];
  const isBlocked = query !== '' && trimmedQuery.length === 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-rose-600/5" />
      </div>

      <div className="relative pt-10 pb-4 px-4">
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-2">Collection</p>
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight">LP 디스커버리</h1>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            {(['desc', 'asc'] as const).map((o) => (
              <button
                key={o}
                onClick={() => setOrder(o)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  order === o ? 'bg-rose-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {o === 'desc' ? '최신순' : '오래된순'}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="LP 검색..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition"
        />
      </div>

      {isError && (
        <div className="flex flex-col items-center py-24 gap-4">
          <p className="text-zinc-600 text-sm">데이터를 불러오는 데 실패했습니다.</p>
          <button
            onClick={() => refetch()}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition-colors"
          >
            다시 시도
          </button>
        </div>
      )}

      {isBlocked && (
        <p className="text-center text-zinc-600 text-sm py-12">검색어를 입력해주세요.</p>
      )}

      {!isBlocked && (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0.5">
            {isPending
              ? Array.from({ length: 12 }).map((_, i) => <LpCardSkeleton key={i} />)
              : lps.map((lp) => <LpCard key={lp.id} lp={lp} />)
            }
            {isFetchingNextPage &&
              Array.from({ length: 6 }).map((_, i) => <LpCardSkeleton key={`next-${i}`} />)
            }
          </div>
          <div ref={sentinelRef} className="h-4" />
        </>
      )}

      {isLoggedIn && (
        <button
          onClick={() => setModalOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-2xl flex items-center justify-center shadow-lg shadow-rose-600/30 transition-colors z-50"
          aria-label="LP 추가"
        >
          +
        </button>
      )}

      <LpFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        modalTitle="Add LP"
        onSubmit={(formData) => createMutation.mutate({ ...formData, published: true })}
        isPending={createMutation.isPending}
      />
    </div>
  );
};

export default LpListPage;
