import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLp, deleteLp, likeLp, unlikeLp, getComments, createComment, deleteComment } from '../apis/lpApi';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';
import CommentSkeleton from '../components/CommentSkeleton';
import { formatRelativeTime } from '../utils/time';

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [commentOrder, setCommentOrder] = useState<'asc' | 'desc'>('desc');
  const [commentText, setCommentText] = useState('');
  const commentSentinelRef = useRef<HTMLDivElement>(null);

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

  const likeMutation = useMutation({
    mutationFn: () => {
      const liked = lp!.likes.some((l) => l.userId === user?.id);
      return liked ? unlikeLp(lp!.id) : likeLp(lp!.id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lp', lpId] }),
  });

  const commentMutation = useMutation({
    mutationFn: (content: string) => createComment(Number(lpId), content),
    onSuccess: () => {
      setCommentText('');
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
    likeMutation.mutate();
  };

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    deleteMutation.mutate();
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    commentMutation.mutate(commentText.trim());
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

      <div className="relative max-w-sm mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          ← 목록으로
        </button>

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
                <button
                  onClick={handleDelete}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                </button>
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
                  onClick={handleCommentSubmit}
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
                      {comment.user?.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-zinc-300">{comment.user?.name ?? '알 수 없음'}</span>
                        <span className="text-[10px] text-zinc-600">{formatRelativeTime(comment.createdAt)}</span>
                        {user?.id === comment.userId && (
                          <button
                            onClick={() => deleteCommentMutation.mutate(comment.id)}
                            className="ml-auto text-[10px] text-zinc-600 hover:text-red-400 transition-colors"
                          >
                            삭제
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed break-words">{comment.content}</p>
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
    </div>
  );
};

export default LpDetailPage;
