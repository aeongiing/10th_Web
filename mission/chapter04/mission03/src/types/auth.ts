import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ error: '유효하지 않은 이메일 형식입니다.' }),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export const signupEmailSchema = z.object({
  email: z.string().email({ error: '올바른 이메일 형식을 입력해주세요.' }),
});

export const signupPasswordSchema = z
  .object({
    password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export const signupNameSchema = z.object({
  name: z.string().min(1, '닉네임을 입력해주세요.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupEmailFormData = z.infer<typeof signupEmailSchema>;
export type SignupPasswordFormData = z.infer<typeof signupPasswordSchema>;
export type SignupNameFormData = z.infer<typeof signupNameSchema>;

export interface LoginResponseData {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignupResponseData {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}
