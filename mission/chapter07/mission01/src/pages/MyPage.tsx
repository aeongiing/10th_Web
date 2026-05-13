import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/authContextCore';
import { updateMe } from '../apis/authApi';
import { getMyLps } from '../apis/lpApi';
import LpCard from '../components/LpCard';
import Spinner from '../components/Spinner';

interface EditForm {
  name: string;
  bio: string;
  avatar?: string;
}

const MyPage = () => {
  const { user, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState<EditForm>({ name: '', bio: '', avatar: undefined });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isPending } = useQuery({
    queryKey: ['myLps', user?.id],
    queryFn: () => getMyLps(user!.id),
    enabled: !!user,
  });

  const updateMutation = useMutation({
    mutationFn: updateMe,
    onSuccess: (updated) => {
      updateUser(updated);
      queryClient.invalidateQueries({ queryKey: ['myLps', user?.id] });
      setEditOpen(false);
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg ?? '프로필 저장에 실패했습니다.');
    },
  });

  const openEdit = () => {
    setForm({ name: user?.name ?? '', bio: user?.bio ?? '', avatar: user?.avatar });
    setEditOpen(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateMutation.mutate({
      name: form.name.trim() || undefined,
      bio: form.bio.trim(),
      avatar: form.avatar || undefined,
    });
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
            <div className="w-14 h-14 rounded-full bg-rose-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.[0]?.toUpperCase() ?? '?'
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-base">{user?.name}</p>
              <p className="text-zinc-500 text-sm mt-0.5">{user?.email}</p>
              {user?.bio && <p className="text-zinc-600 text-xs mt-1">{user.bio}</p>}
              <p className="text-zinc-600 text-xs mt-1">LP {data?.data.length ?? '—'}개</p>
            </div>
            <button
              onClick={openEdit}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-white text-xs transition-colors flex-shrink-0"
            >
              설정
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

      {editOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="w-full max-w-sm mx-4 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <h2 className="text-white font-semibold text-sm">프로필 수정</h2>
              <button
                onClick={() => setEditOpen(false)}
                className="w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex justify-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 rounded-full bg-rose-600 flex items-center justify-center text-white text-2xl font-bold cursor-pointer overflow-hidden hover:opacity-80 transition-opacity"
                >
                  {form.avatar ? (
                    <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    form.name?.[0]?.toUpperCase() ?? '?'
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <p className="text-center text-xs text-zinc-600">클릭하여 프로필 사진 변경</p>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">이름</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Bio (선택)</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="자기소개를 입력해주세요"
                  rows={3}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-rose-500 transition resize-none"
                />
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-zinc-800">
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (!form.name.trim() || updateMutation.isPending) return;
                  handleSave();
                }}
                disabled={!form.name.trim() || updateMutation.isPending}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                {updateMutation.isPending ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
