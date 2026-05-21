import axiosInstance from './axiosInstance';
import type {
  ApiResponse,
  Comment,
  CommentListData,
  CreateLpBody,
  Lp,
  LpListData,
  UpdateLpBody,
} from '../types';

export const getLps = async (
  order: 'asc' | 'desc' = 'desc',
  cursor?: number,
  search?: string
): Promise<LpListData> => {
  const { data } = await axiosInstance.get<ApiResponse<LpListData>>('/lps', {
    params: { order, limit: 20, cursor, ...(search ? { search } : {}) },
  });
  return data.data;
};

export const getLp = async (lpId: number): Promise<Lp> => {
  const { data } = await axiosInstance.get<ApiResponse<Lp>>(`/lps/${lpId}`);
  return data.data;
};

export const createLp = async (body: CreateLpBody): Promise<Lp> => {
  const { data } = await axiosInstance.post<ApiResponse<Lp>>('/lps', body);
  return data.data;
};

export const updateLp = async (lpId: number, body: UpdateLpBody): Promise<Lp> => {
  const { data } = await axiosInstance.patch<ApiResponse<Lp>>(`/lps/${lpId}`, body);
  return data.data;
};

export const deleteLp = async (lpId: number): Promise<void> => {
  await axiosInstance.delete(`/lps/${lpId}`);
};

export const getMyLps = async (userId: number): Promise<LpListData> => {
  const { data } = await axiosInstance.get<ApiResponse<LpListData>>('/lps', {
    params: { order: 'desc', limit: 20, authorId: userId },
  });
  return data.data;
};

export const likeLp = async (lpId: number): Promise<void> => {
  await axiosInstance.post(`/lps/${lpId}/likes`);
};

export const unlikeLp = async (lpId: number): Promise<void> => {
  await axiosInstance.delete(`/lps/${lpId}/likes`);
};

export const getComments = async (
  lpId: number,
  order: 'asc' | 'desc' = 'desc',
  cursor?: number
): Promise<CommentListData> => {
  const { data } = await axiosInstance.get<ApiResponse<CommentListData>>(
    `/lps/${lpId}/comments`,
    { params: { order, limit: 10, cursor } }
  );
  return data.data;
};

export const createComment = async (lpId: number, content: string): Promise<Comment> => {
  const { data } = await axiosInstance.post<ApiResponse<Comment>>(
    `/lps/${lpId}/comments`,
    { content }
  );
  return data.data;
};

export const updateComment = async (
  lpId: number,
  commentId: number,
  content: string
): Promise<Comment> => {
  const { data } = await axiosInstance.patch<ApiResponse<Comment>>(
    `/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data.data;
};

export const deleteComment = async (lpId: number, commentId: number): Promise<void> => {
  await axiosInstance.delete(`/lps/${lpId}/comments/${commentId}`);
};
