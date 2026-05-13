import axiosInstance from './axiosInstance';
import type { ApiResponse, AuthTokens, SignupFormData, UpdateMeBody, UserInfo } from '../types';
import type { LoginFormData } from '../types/auth';

export const signin = async (body: LoginFormData): Promise<AuthTokens> => {
  const { data } = await axiosInstance.post<ApiResponse<AuthTokens>>(
    '/auth/signin',
    body
  );
  return data.data;
};

export const signup = async (body: SignupFormData): Promise<UserInfo> => {
  const { data } = await axiosInstance.post<ApiResponse<UserInfo>>('/auth/signup', body);
  return data.data;
};

export const signout = async (): Promise<void> => {
  await axiosInstance.post('/auth/signout');
};

export const getMe = async (): Promise<UserInfo> => {
  const { data } = await axiosInstance.get<ApiResponse<UserInfo>>('/users/me');
  return data.data;
};

export const updateMe = async (body: UpdateMeBody): Promise<UserInfo> => {
  const { data } = await axiosInstance.patch<ApiResponse<UserInfo>>('/users', body);
  return data.data;
};

export const deleteMe = async (): Promise<void> => {
  await axiosInstance.delete('/users');
};
