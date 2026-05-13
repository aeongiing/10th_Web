import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLp, deleteLp, likeLp, unlikeLp } from '../apis/lpApi';
import type { Lp } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useLpDetail = (lpId: string | undefined) => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const { data: lp, isPending, isError } = useQuery({
    queryKey: ['lp', lpId],
    queryFn: () => getLp(Number(lpId)),
    staleTime: 1000 * 30,
    enabled: !!lpId,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLp(Number(lpId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      navigate('/');
    },
  });

  const likeMutation = useMutation({
    mutationFn: ({ id, isLiked }: { id: number; isLiked: boolean }) =>
      isLiked ? unlikeLp(id) : likeLp(id),
    onMutate: async ({ id, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ['lp', lpId] });
      const previous = queryClient.getQueryData<Lp>(['lp', lpId]);
      queryClient.setQueryData<Lp>(['lp', lpId], (old) => {
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

  return { lp, isPending, isError, user, handleLike, handleDelete, likeMutation, deleteMutation };
};
