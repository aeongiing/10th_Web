import axios from 'axios';
import type {
  ApiResponse,
  LoginFormData,
  LoginResponseData,
  SignupResponseData,
} from '../types/auth';

const BASE_URL = 'http://localhost:8000/v1';

export const signin = async (body: LoginFormData): Promise<LoginResponseData> => {
  const { data } = await axios.post<ApiResponse<LoginResponseData>>(
    `${BASE_URL}/auth/signin`,
    body
  );
  return data.data;
};

export const signup = async (body: {
  email: string;
  password: string;
  name: string;
}): Promise<SignupResponseData> => {
  const { data } = await axios.post<ApiResponse<SignupResponseData>>(
    `${BASE_URL}/auth/signup`,
    body
  );
  return data.data;
};
