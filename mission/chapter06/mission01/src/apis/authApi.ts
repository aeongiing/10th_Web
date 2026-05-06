import axiosInstance from './axiosInstance';
import type { ApiResponse, AuthTokens, SignupFormData, UserInfo } from '../types';
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

export const getMe = async (): Promise<UserInfo> => {
  const { data } = await axiosInstance.get<ApiResponse<UserInfo>>('/users/me');
  return data.data;
};
