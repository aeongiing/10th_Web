import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getMyLps } from '../apis/lpApi';
import LpCard from '../components/LpCard';
import Spinner from '../components/Spinner';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ['myLps', user?.id],
    queryFn: () => getMyLps(user!.id),
    enabled: !!user,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl bg-rose-600/5" />
      </div>

      <div className="relative pt-10 pb-4 px-4">
        <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-2">Account</p>
        <h1 className="text-2xl font-bold tracking-tight mb-6">마이페이지</h1>

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-rose-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-base">{user?.name}</p>
              <p className="text-zinc-500 text-sm mt-0.5">{user?.email}</p>
              <p className="text-zinc-600 text-xs mt-1">LP {data?.data.length ?? '—'}개</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-white text-xs transition-colors flex-shrink-0"
            >
              로그아웃
            </button>
          </div>
        </div>

        <p className="text-zinc-400 text-sm font-medium mb-3">내 LP 컬렉션</p>
      </div>

      {isPending && <div className="px-4"><Spinner /></div>}

      {data && data.data.length === 0 && (
        <div className="mx-4 rounded-2xl border border-zinc-800 border-dashed py-20 flex flex-col items-center gap-3">
          <span className="text-zinc-700 text-4xl">♪</span>
          <p className="text-zinc-600 text-sm">아직 LP가 없습니다.</p>
        </div>
      )}

      {data && data.data.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-0.5">
          {data.data.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
