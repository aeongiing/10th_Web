import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../types/auth';
import type { LoginFormData } from '../types/auth';
import { signin } from '../apis/authApi';
import useLocalStorage from '../hooks/useLocalStorage';

const LoginPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const { setValue: setToken } = useLocalStorage<string>('accessToken', '');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      const res = await signin(data);
      setToken(res.accessToken);
      navigate('/');
    } catch {
      setServerError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950">
      <div className="hidden w-1/2 flex-col items-center justify-center bg-indigo-950 lg:flex">
        <div className="text-center">
          <div className="mb-4 text-6xl">🎬</div>
          <h2 className="text-3xl font-bold text-white">MovieApp</h2>
          <p className="mt-2 text-indigo-300">당신만의 영화 공간</p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            ← 뒤로가기
          </button>

          <h1 className="mb-1 text-2xl font-bold text-white">로그인</h1>
          <p className="mb-8 text-sm text-white/40">계정에 로그인해 주세요.</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                {...register('email')}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">비밀번호</label>
              <input
                type="password"
                placeholder="6자 이상 입력해 주세요"
                {...register('password')}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-center text-xs text-red-400">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
