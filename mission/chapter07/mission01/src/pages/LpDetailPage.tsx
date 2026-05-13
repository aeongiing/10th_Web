import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLp,
  deleteLp,
  likeLp,
  unlikeLp,
  updateLp,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../apis/lpApi';
import { useAuth } from '../contexts/authContextCore';
import Spinner from '../components/Spinner';
import CommentSkeleton from '../components/CommentSkeleton';
import LpFormModal from '../components/LpFormModal';
import { formatRelativeTime } from '../utils/time';

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [commentOrder, setCommentOrder] = useState<'asc' | 'desc'>('desc');
  const [commentText, setCommentText] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const commentSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuOpenId === null) return;
    const close = () => setMenuOpenId(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuOpenId]);

  const { data: lp, isPending, isError } = useQuery({
    queryKey: ['lp', lpId],
    queryFn: () => getLp(Number(lpId)),
    staleTime: 1000 * 30,
  });

  const {
    data: commentsData,
    isPending: isCommentsPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['lpComments', lpId, commentOrder],
    queryFn: ({ pageParam }) =>
      getComments(Number(lpId), commentOrder, pageParam as number | undefined),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: 1000 * 30,
  });

  useEffect(() => {
    const el = commentSentinelRef.current;
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

  const deleteMutation = useMutation({
    mutationFn: () => deleteLp(Number(lpId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      navigate('/');
    },
  });

  const editMutation = useMutation({
    mutationFn: (body: Parameters<typeof updateLp>[1]) => updateLp(Number(lpId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      setEditModalOpen(false);
    },
  });

  const likeMutation = useMutation({
    mutationFn: ({ id, isLiked }: { id: number; isLiked: boolean }) =>
      isLiked ? unlikeLp(id) : likeLp(id),
    onMutate: async ({ id, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ['lp', lpId] });
      const previous = queryClient.getQueryData<typeof lp>(['lp', lpId]);
      queryClient.setQueryData<typeof lp>(['lp', lpId], (old) => {
        if (!old || !user) return old;
        return {
          ...old,
          likes: isLiked
            ? old.likes.filter((l) => l.userId !== user.id)
            : [...old.likes, { id: Date.now(), userId: user.id, lpId: id }],
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(['lp', lpId], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['lp', lpId] }),
  });

  const commentMutation = useMutation({
    mutationFn: (content: string) => createComment(Number(lpId), content),
    onSuccess: () => {
      setCommentText('');
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(Number(lpId), commentId, content),
    onSuccess: () => {
      setEditingCommentId(null);
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(Number(lpId), commentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] }),
  });

  const handleLike = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인을 해주세요!');
      navigate('/login');
      return;
    }
    if (!lp) return;
    likeMutation.mutate({ id: lp.id, isLiked: lp.likes.some((l) => l.userId === user?.id) });
  };

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    deleteMutation.mutate();
  };

  const startEditComment = (id: number, content: string) => {
    setEditingCommentId(id);
    setEditingContent(content);
    setMenuOpenId(null);
  };

  if (isPending) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <Spinner />
    </div>
  );

  if (isError || !lp) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-600 text-sm">
      LP를 불러올 수 없습니다.
    </div>
  );

  const isOwner = user?.id === lp.authorId;
  const isLiked = lp.likes.some((l) => l.userId === user?.id);
  const comments = commentsData?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-rose-600/8" />
      </div>

      <div className="sticky top-14 z-20 bg-zinc-950/90 backdrop-blur-sm">
        <div className="max-w-sm mx-auto px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            ← 목록으로
          </button>
        </div>
      </div>

      <div className="relative max-w-sm mx-auto px-4 pt-6 pb-10">

        <div className="rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {lp.author?.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{lp.author?.name}</p>
                <p className="text-zinc-600 text-xs">{formatRelativeTime(lp.createdAt)}</p>
              </div>
              {isOwner && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                  </button>
                </div>
              )}
            </div>
            <h1 className="text-white font-bold text-lg leading-snug">{lp.title}</h1>
          </div>

          <div className="relative bg-zinc-950 flex items-center justify-center py-10">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-52 h-52 rounded-full bg-rose-600/8 blur-2xl" />
            </div>
            <div
              className="relative w-52 h-52 rounded-full"
              style={{ background: 'linear-gradient(135deg, #1c1c1c 0%, #0a0a0a 100%)', boxShadow: '0 0 40px rgba(0,0,0,0.8)' }}
            >
              {[5, 12, 20, 28].map((i) => (
                <div key={i} className="absolute rounded-full border border-zinc-800/30" style={{ inset: `${i}px` }} />
              ))}
              <div className="absolute rounded-full overflow-hidden" style={{ inset: '38px' }}>
                {lp.thumbnail ? (
                  <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-600 text-xl">♪</span>
                  </div>
                )}
              </div>
              <div className="absolute w-4 h-4 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-zinc-950 border-2 border-zinc-700" />
            </div>
          </div>

          <div className="px-5 pb-5 pt-4">
            {lp.content && (
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{lp.content}</p>
            )}
            {lp.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {lp.tags.map((tag) => (
                  <span key={tag.id} className="text-xs text-zinc-500 bg-zinc-800 border border-zinc-700 px-2.5 py-0.5 rounded-full">
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={handleLike}
              disabled={likeMutation.isPending}
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all border ${
                isLiked
                  ? 'bg-rose-600/15 border-rose-600/30 text-rose-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-rose-600/30 hover:text-rose-400'
              }`}
            >
              {isLiked ? '♥' : '♡'} {lp.likes.length}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-zinc-300">댓글</p>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
              {(['desc', 'asc'] as const).map((o) => (
                <button
                  key={o}
                  onClick={() => setCommentOrder(o)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    commentOrder === o ? 'bg-rose-600 text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {o === 'desc' ? '최신순' : '오래된순'}
                </button>
              ))}
            </div>
          </div>

          {isLoggedIn && (
            <div className="mb-5 rounded-xl bg-zinc-900 border border-zinc-800 p-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="댓글을 입력해주세요"
                rows={2}
                className="w-full bg-transparent text-sm text-white placeholder-zinc-600 outline-none resize-none"
              />
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                <span className={`text-xs ${commentText.length > 200 ? 'text-red-400' : 'text-zinc-600'}`}>
                  {commentText.length} / 200
                </span>
                <button
                  onClick={() => { if (commentText.trim()) commentMutation.mutate(commentText.trim()); }}
                  disabled={!commentText.trim() || commentText.length > 200 || commentMutation.isPending}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors"
                >
                  {commentMutation.isPending ? '등록 중...' : '등록'}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {isCommentsPending
              ? Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)
              : comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {(comment.author?.name ?? (comment.authorId === user?.id ? user?.name : undefined))?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-zinc-300">{comment.author?.name ?? (comment.authorId === user?.id ? user?.name : '알 수 없음')}</span>
                        <span className="text-[10px] text-zinc-600">{formatRelativeTime(comment.createdAt)}</span>
                        {user?.id === comment.authorId && (
                          <div className="ml-auto relative">
                            <button
                              onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === comment.id ? null : comment.id); }}
                              className="text-zinc-600 hover:text-zinc-400 transition-colors px-1"
                            >
                              •••
                            </button>
                            {menuOpenId === comment.id && (
                              <div className="absolute right-0 top-5 z-10 w-20 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden shadow-xl">
                                <button
                                  onClick={() => startEditComment(comment.id, comment.content)}
                                  className="w-full px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-700 text-left transition-colors"
                                >
                                  수정
                                </button>
                                <button
                                  onClick={() => {
                                    setMenuOpenId(null);
                                    deleteCommentMutation.mutate(comment.id);
                                  }}
                                  className="w-full px-3 py-2 text-xs text-red-400 hover:bg-zinc-700 text-left transition-colors"
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {editingCommentId === comment.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && editingContent.trim()) {
                                e.preventDefault();
                                editCommentMutation.mutate({ commentId: comment.id, content: editingContent.trim() });
                              }
                            }}
                            rows={2}
                            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white outline-none resize-none focus:border-rose-500 transition"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="flex-1 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-xs transition-colors"
                            >
                              취소
                            </button>
                            <button
                              onClick={() => {
                                if (editingContent.trim())
                                  editCommentMutation.mutate({ commentId: comment.id, content: editingContent.trim() });
                              }}
                              disabled={!editingContent.trim() || editCommentMutation.isPending}
                              className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-medium transition-colors"
                            >
                              {editCommentMutation.isPending ? '저장 중...' : '저장'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-zinc-400 leading-relaxed break-words">{comment.content}</p>
                      )}
                    </div>
                  </div>
                ))
            }
            {isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={`next-${i}`} />)
            }
          </div>

          <div ref={commentSentinelRef} className="h-4" />
        </div>
      </div>

      <LpFormModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        modalTitle="LP 수정"
        initialData={lp ? {
          title: lp.title,
          content: lp.content,
          thumbnail: lp.thumbnail,
          tags: lp.tags.map((t) => t.name),
        } : undefined}
        onSubmit={(formData) => editMutation.mutate(formData)}
        isPending={editMutation.isPending}
      />
    </div>
  );
};

export default LpDetailPage;
