import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLps } from '../apis/lpApi';
import LpCard from '../components/LpCard';
import Spinner from '../components/Spinner';

const LpListPage = () => {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['lps', order],
    queryFn: () => getLps(order),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-rose-600/5" />
      </div>

      <div className="relative pt-10 pb-4 px-4">
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-2">Collection</p>
        <div className="flex items-end justify-between">
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
      </div>

      {isPending && <div className="px-4"><Spinner /></div>}

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

      {data && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0.5">
          {data.data.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LpListPage;
