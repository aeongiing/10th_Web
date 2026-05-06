import axiosInstance from './axiosInstance';
import type { ApiResponse, Lp, LpListData } from '../types';

export const getLps = async (order: 'asc' | 'desc' = 'desc'): Promise<LpListData> => {
  const { data } = await axiosInstance.get<ApiResponse<LpListData>>('/lps', {
    params: { order, limit: 20 },
  });
  return data.data;
};

export const getLp = async (lpId: number): Promise<Lp> => {
  const { data } = await axiosInstance.get<ApiResponse<Lp>>(`/lps/${lpId}`);
  return data.data;
};


export const deleteLp = async (lpId: number): Promise<void> => {
  await axiosInstance.delete(`/lps/${lpId}`);
};

export const getMyLps = async (userId: number, order: 'asc' | 'desc' = 'desc'): Promise<LpListData> => {
  const { data } = await axiosInstance.get<ApiResponse<LpListData>>('/lps', {
    params: { order, limit: 20, authorId: userId },
  });
  return data.data;
};

export const likeLp = async (lpId: number): Promise<void> => {
  await axiosInstance.post(`/lps/${lpId}/likes`);
};

export const unlikeLp = async (lpId: number): Promise<void> => {
  await axiosInstance.delete(`/lps/${lpId}/likes`);
};
